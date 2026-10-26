import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  toDevfestView,
  toEventsView,
  toHomeView,
  toShowcaseItems,
  toSiteView,
  toTeam,
} from '../shared/content';
import {
  toLegacyDevfestView,
  toLegacyEventsView,
  toLegacyHomeView,
  toLegacySiteView,
  toLegacyTeam,
} from '../shared/legacy-content';
import {
  findPageModule,
  modulePageParams,
  showcasePageModule,
  showcasePath,
  toBlogPosts,
  toModuleView,
} from '../shared/modules';
import {
  BlogPost,
  BlogsView,
  ContentPage,
  DevfestView,
  EventsView,
  HomeView,
  ModulePageView,
  ShowcaseCard,
  ShowcaseView,
  SiteView,
  TeamMember,
} from '../shared/view-models';
import type { HomeBundle } from './bundle-types';
import { DataService } from './data.service';
import { LegacyDataService } from './legacy-data.service';

const HOME_BLOGS_PAGE = 10;

@Injectable({
  providedIn: 'root',
})
export class SiteContentService {
  private readonly data = inject(DataService);
  private readonly legacy = inject(LegacyDataService);
  readonly useRtdb = environment.dataSource === 'rtdb';
  private readonly useFixtures = environment.dataSource === 'fixture';

  site(): Observable<SiteView> {
    if (this.useRtdb) {
      return this.legacy.getEventData().pipe(map(toLegacySiteView));
    }
    return this.data
      .getHomeBundle()
      .pipe(map((home) => toSiteView(home.site, home.edition.year, home.modules)));
  }

  home(): Observable<HomeView> {
    if (this.useRtdb) {
      return combineLatest({
        event: this.legacy.getEventData(),
        gdgFaqs: this.legacy.getAllGDGFAQS(),
        feedbacks: this.legacy.getAllFeedbacks(),
        sponsors: this.legacy.getAllSponsors(),
        partners: this.legacy.getAllCommunityPartners(),
        events: this.legacy.getCommunityEventsData(),
      }).pipe(map((sources) => toLegacyHomeView(sources, Date.now())));
    }
    return this.data.getHomeBundle().pipe(map((home) => toHomeView(home, Date.now())));
  }

  team(): Observable<TeamMember[]> {
    if (this.useRtdb) {
      return this.legacy.getAllTeams().pipe(map(toLegacyTeam));
    }
    return this.data.getHomeBundle().pipe(map(toTeam));
  }

  events(): Observable<EventsView> {
    if (this.useRtdb) {
      return combineLatest({
        events: this.legacy.getCommunityEventsData(),
        event: this.legacy.getEventData(),
        speakers: this.legacy.getAllSpeakers(),
        schedule: this.legacy.getAllSchedules(),
        pastDevfests: this.legacy.getPastDevfests(),
      }).pipe(map((sources) => toLegacyEventsView(sources, Date.now())));
    }
    return this.data.getHomeBundle().pipe(map((home) => toEventsView(home, Date.now())));
  }

  devfest(year?: number): Observable<DevfestView> {
    if (this.useRtdb) {
      return combineLatest({
        event: this.legacy.getEventData(),
        speakers: this.legacy.getAllSpeakers(),
        schedule: this.legacy.getAllSchedules(),
        faqs: this.legacy.getAllFAQS(),
        sponsors: this.legacy.getAllSponsors(),
        partners: this.legacy.getAllCommunityPartners(),
      }).pipe(map((sources) => toLegacyDevfestView(sources, Date.now())));
    }
    const edition = year ? this.data.getEditionBundle(year) : this.data.getActiveEdition();
    return combineLatest([this.data.getHomeBundle(), edition]).pipe(
      map(([home, bundle]) => toDevfestView(home, bundle, Date.now()))
    );
  }

  archiveYears(): Observable<number[]> {
    if (this.useRtdb) {
      return of([]);
    }
    return this.data.getEditionsBundle().pipe(map((bundle) => bundle.items.map((e) => e.year)));
  }

  showcase(year?: number): Observable<ShowcaseView | null> {
    if (this.useRtdb) {
      return of(null);
    }
    return this.data.getHomeBundle().pipe(
      switchMap((home) => {
        const path = showcasePath(home.site, home.modules);
        if (!path) {
          return of(null);
        }
        const module = showcasePageModule(home.modules);
        const source = module?.source.kind === 'showcase' ? module.source : undefined;
        const selected = year ?? source?.edition ?? home.site.activeEdition;
        return combineLatest([this.archiveYears(), this.showcaseItems(selected)]).pipe(
          map(([years, items]) => ({
            site: toSiteView(home.site, home.edition.year, home.modules),
            title: module?.title ?? 'Showcase',
            subtitle: module?.subtitle ?? 'Projects built by the GDG Siliguri community',
            years,
            year: selected,
            items: source?.limit ? items.slice(0, source.limit) : items,
          }))
        );
      })
    );
  }

  showcaseItems(year: number): Observable<ShowcaseCard[]> {
    if (this.useRtdb) {
      return of([]);
    }
    return this.data.getEditionBundle(year).pipe(map(toShowcaseItems));
  }

  modulePage(key: string): Observable<ModulePageView | null> {
    if (this.useRtdb) {
      return of(null);
    }
    return this.data.getHomeBundle().pipe(
      switchMap((home) => {
        const module = findPageModule(home.modules, key);
        if (!module) {
          return of(null);
        }
        const source = module.source;
        const showcase =
          source.kind === 'showcase'
            ? this.data
                .getEditionBundle(source.edition ?? home.site.activeEdition)
                .pipe(map((bundle) => bundle.showcase))
            : of(home.showcaseFeatured);
        return showcase.pipe(
          map((items) => {
            const view = toModuleView(module, { showcase: items, blogs: home.blogs });
            return view
              ? { site: toSiteView(home.site, home.edition.year, home.modules), module: view }
              : null;
          })
        );
      })
    );
  }

  modulePageParams(): Observable<{ ids: string[]; paths: string[] }> {
    if (this.useRtdb) {
      return of({ ids: [], paths: [] });
    }
    return this.data
      .getHomeBundle()
      .pipe(map((home) => modulePageParams(home.site, home.modules)));
  }

  contentPage(path: string): Observable<ContentPage | null> {
    if (this.useRtdb) {
      return of(null);
    }
    return this.data.getHomeBundle().pipe(
      switchMap((home) =>
        path === showcasePath(home.site, home.modules)
          ? this.showcase().pipe(
              map((showcase): ContentPage | null => (showcase ? { kind: 'showcase', showcase } : null))
            )
          : this.modulePage(path).pipe(
              map((page): ContentPage | null => (page ? { kind: 'module', page } : null))
            )
      )
    );
  }

  blogs(): Observable<BlogsView> {
    if (this.useRtdb) {
      return this.legacy.getHashnodeBlogs().pipe(map((posts) => ({ posts, pageable: false })));
    }
    return this.data.getHomeBundle().pipe(switchMap((home) => this.homeBlogs(home)));
  }

  blogsPage(pageToken?: string): Observable<{ posts: BlogPost[]; next?: string }> {
    return this.data
      .getBlogsPage(pageToken)
      .pipe(map((page) => ({ posts: toBlogPosts(page.items), next: page.next })));
  }

  private homeBlogs(home: HomeBundle): Observable<BlogsView> {
    if (!home.site.sections.blogs) {
      return of({ posts: [], pageable: false });
    }
    if (home.blogs.length || this.useFixtures) {
      return of({
        posts: toBlogPosts(home.blogs),
        pageable: !this.useFixtures && home.blogs.length >= HOME_BLOGS_PAGE,
      });
    }
    return this.legacy.getHashnodeBlogs().pipe(map((posts) => ({ posts, pageable: false })));
  }
}
