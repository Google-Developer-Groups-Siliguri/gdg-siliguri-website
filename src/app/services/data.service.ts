import {
  ApplicationRef,
  inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  StateKey,
  TransferState,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { concat, EMPTY, from, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { loadFixture } from './bundle-fixtures';
import type { BlogDoc, EditionBundle, EditionsBundle, HomeBundle } from './bundle-types';
import { DataLoadFailures } from './data-load-failures';
import { DocPage, getDoc, listDocs } from './firestore-rest';

const BLOGS_PAGE_SIZE = 10;
const BLOGS_ORDER = 'pinned desc, publishedAt desc';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);
  private appRef = inject(ApplicationRef);
  private failures = inject(DataLoadFailures);
  private isBrowser = isPlatformBrowser(this.platformId);
  private refreshRequests = new Map<string, Observable<unknown>>();
  private inFlight = new Map<string, Observable<unknown>>();
  private firestoreBaseUrl = environment.firestoreBaseUrl;
  private useFixtures = environment.dataSource === 'fixture';

  getHomeBundle(): Observable<HomeBundle> {
    return this.getBundle<HomeBundle>('bundles/home');
  }

  getEditionBundle(year: number): Observable<EditionBundle> {
    return this.getBundle<EditionBundle>(`bundles/edition-${year}`);
  }

  getEditionsBundle(): Observable<EditionsBundle> {
    return this.getBundle<EditionsBundle>('bundles/editions');
  }

  getActiveEdition(): Observable<EditionBundle> {
    return this.getHomeBundle().pipe(
      map((home) => home.site.activeEdition),
      distinctUntilChanged(),
      switchMap((year) => this.getEditionBundle(year))
    );
  }

  getBlogsPage(pageToken?: string): Observable<DocPage<Omit<BlogDoc, 'id'>>> {
    if (this.useFixtures) {
      return of({ items: [] });
    }
    return listDocs<Omit<BlogDoc, 'id'>>(this.http, this.firestoreBaseUrl, 'blogs', {
      pageSize: BLOGS_PAGE_SIZE,
      orderBy: BLOGS_ORDER,
      pageToken,
    });
  }

  private getBundle<T>(path: string): Observable<T> {
    return this.getCachedThenFresh(`fs:${path}`, () => this.fetchBundle<T>(path));
  }

  private fetchBundle<T>(path: string): Observable<T> {
    const pending = this.inFlight.get(path);
    if (pending) {
      return pending as Observable<T>;
    }
    const request = this.requestBundle<T>(path).pipe(
      finalize(() => this.inFlight.delete(path)),
      shareReplay(1)
    );
    this.inFlight.set(path, request);
    return request;
  }

  private requestBundle<T>(path: string): Observable<T> {
    const source = this.useFixtures ? 'fixtures' : this.firestoreBaseUrl;
    const request = this.useFixtures
      ? loadFixture<T>(path)
      : getDoc<T>(this.http, this.firestoreBaseUrl, path);
    return request.pipe(
      catchError((cause: unknown) => {
        const reason = (cause as { message?: string } | null)?.message ?? String(cause);
        const error = new Error(`Could not load ${path} from ${source}: ${reason}`);
        if (!this.isBrowser) {
          this.failures.record(error);
        }
        return throwError(() => error);
      })
    );
  }

  private getCachedThenFresh<T>(key: string, fetch: () => Observable<T>): Observable<T> {
    const stateKey = makeStateKey<T>(key);
    const fetchAndCache = () =>
      fetch().pipe(tap((data) => this.transferState.set(stateKey, data)));

    if (!this.transferState.hasKey(stateKey)) {
      return fetchAndCache();
    }
    const cached = this.transferState.get(stateKey, null) as T;
    if (!this.isBrowser) {
      return of(cached);
    }

    return concat(
      of(cached),
      this.refreshOnceAfterHydration(stateKey, fetchAndCache).pipe(
        filter((fresh) => JSON.stringify(fresh) !== JSON.stringify(cached))
      )
    );
  }

  private refreshOnceAfterHydration<T>(
    stateKey: StateKey<T>,
    fetchAndCache: () => Observable<T>
  ): Observable<T> {
    const existing = this.refreshRequests.get(stateKey);
    if (existing) {
      return existing as Observable<T>;
    }

    const refresh = from(this.appRef.whenStable()).pipe(
      switchMap(fetchAndCache),
      catchError(() => EMPTY),
      shareReplay(1)
    );
    this.refreshRequests.set(stateKey, refresh);
    return refresh;
  }
}
