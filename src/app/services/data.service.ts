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
import { concat, EMPTY, from, Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BLOG_FEED_PROXY_PATH, HASHNODE_RSS_URL, parseHashnodeRss } from './hashnode-rss';

export interface Members {
  description: string;
  designation: string;
  githubURL: string;
  linkedInURL: string;
  name: string;
  profilePictureURL: string;
  twitterURL: string;
}
export interface Events {
  id: string;
  description: string;
  name: string;
  thumbnail: string;
  coverImg: string;
  registrationDate: string;
  eventDate: string;
  speakers: EventSpeakers[];
  tagline: string;
  registrationLink: string;
}
export interface EventSpeakers {
  name: string;
  imageUrl: string;
  description: string;
}
export interface CommunityPartners {
  icon: string;
  communityName: string;
  socialMediaLink: string;
}

export interface Feedbacks {
  name: string;
  eventAttended: string;
  feedbackTitle: string;
  feedbackDescription: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
export interface Schedule {
  durationInMins: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  title: string;
  subTitle: string;
  image: string;
}
export interface Sponsors {
  sponsorName: string;
  icon: string;
  socialMediaLink: string;
}

export interface SOCIAL {
  name: string;
  url: string;
  image: string;
}

export interface EventData {
  bannerDescription: string;
  communityDescription: string;
  eventDateTime: string;
  bannerImages: {
    large: string;
    long: string;
    medium: string;
    small: string;
    aisummit: string;
  };
  communityEmail: string;
  communityJoinLink: string;
  eventTicketURL: string;
  registrationExpiryDateTime: string;
  eventVenue: {
    imageURL: string;
    mapsURL: string;
    name: string;
  };
  socialMediaLinks: SOCIAL[];
  pointsToNote: {
    enabled: boolean;
    data: string[];
  };
  theme?: string;
  techStack?: string[];
  perks: {
    enabled: boolean;
    data: string[];
  };
}

export interface PastDevfest {
  year: string;
  highlight: string;
  note?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: {
    url: string;
  };
  publishedAt: string;
  author: {
    name: string;
    profilePicture: string;
  };
  readTimeInMinutes: number;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);
  private appRef = inject(ApplicationRef);
  private isBrowser = isPlatformBrowser(this.platformId);
  private refreshRequests = new Map<string, Observable<unknown>>();
  private apiBaseUrl = environment.apiBaseUrl;

  private dbPaths = {
    teams: '/teams.json', //organizers and volunteers
    speakers: '/speakers.json', //speakers
    partners: '/communityPartners.json', //community partners
    feedbacks: '/feedbacks.json', //feedbacks
    faqs: '/FAQs.json', //FAQ
    schedule: '/schedule.json', //schedules
    sponsors: '/sponsors.json', //sponsors
    eventDetails: '/eventDetails.json', //eventDetails
    communityEvents: '/events.json', //eventDetails
    gdgFaqs: '/home/gdgFAQs.json', //eventDetails
    pastDevfests: '/home/pastDevfests.json',
  };

  private getWithTransferState<T>(key: string, url: string): Observable<T> {
    return this.getCachedThenFresh(key, () => this.http.get<T>(url));
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

  //organizers and volunteers
  getAllTeams(): Observable<{ enabled: boolean; data: Members[] }> {
    return this.getWithTransferState<{ enabled: boolean; data: Members[] }>(
      'teams',
      `${this.apiBaseUrl}${this.dbPaths.teams}`
    );
  }

  //speakers
  getAllSpeakers(): Observable<{ enabled: boolean; data: Members[] }> {
    return this.getWithTransferState<{ enabled: boolean; data: Members[] }>(
      'speakers',
      `${this.apiBaseUrl}${this.dbPaths.speakers}`
    );
  }

  //community partners
  getAllCommunityPartners(): Observable<{
    enabled: boolean;
    data: CommunityPartners[];
  }> {
    return this.getWithTransferState<{ enabled: boolean; data: CommunityPartners[] }>(
      'partners',
      `${this.apiBaseUrl}${this.dbPaths.partners}`
    );
  }

  //feedbacks
  getAllFeedbacks(): Observable<{ enabled: boolean; data: Feedbacks[] }> {
    return this.getWithTransferState<{ enabled: boolean; data: Feedbacks[] }>(
      'feedbacks',
      `${this.apiBaseUrl}${this.dbPaths.feedbacks}`
    );
  }

  //faqs
  getAllFAQS(): Observable<{ enabled: boolean; data: FAQ[] }> {
    return this.getWithTransferState<{ enabled: boolean; data: FAQ[] }>(
      'faqs',
      `${this.apiBaseUrl}${this.dbPaths.faqs}`
    );
  }

  //faqs
  getAllGDGFAQS(): Observable<{ enabled: boolean; data: FAQ[] }> {
    return this.getWithTransferState<{ enabled: boolean; data: FAQ[] }>(
      'gdgFaqs',
      `${this.apiBaseUrl}${this.dbPaths.gdgFaqs}`
    );
  }

  //schedule
  getAllSchedules(): Observable<{ enabled: boolean; data: Schedule[] }> {
    return this.getWithTransferState<{ enabled: boolean; data: Schedule[] }>(
      'schedule',
      `${this.apiBaseUrl}${this.dbPaths.schedule}`
    );
  }

  //sponsors
  getAllSponsors(): Observable<{
    enabled: boolean;
    gold: Sponsors[];
    platinum: Sponsors[];
    silver: Sponsors[];
  }> {
    return this.getWithTransferState<{
      enabled: boolean;
      gold: Sponsors[];
      platinum: Sponsors[];
      silver: Sponsors[];
    }>('sponsors', `${this.apiBaseUrl}${this.dbPaths.sponsors}`);
  }

  //eventDetails
  getEventData(): Observable<EventData> {
    return this.getWithTransferState<EventData>(
      'eventData',
      `${this.apiBaseUrl}${this.dbPaths.eventDetails}`
    );
  }

  //eventDetails
  getCommunityEventsData(): Observable<{ enabled: boolean; data: Events[] }> {
    return this.getWithTransferState<{ enabled: boolean; data: Events[] }>(
      'communityEvents',
      `${this.apiBaseUrl}${this.dbPaths.communityEvents}`
    );
  }

  getPastDevfests(): Observable<{ enabled: boolean; data: PastDevfest[] } | null> {
    return this.getWithTransferState<{ enabled: boolean; data: PastDevfest[] } | null>(
      'pastDevfests',
      `${this.apiBaseUrl}${this.dbPaths.pastDevfests}`
    ).pipe(catchError(() => of(null)));
  }

  //hashnode blogs
  getHashnodeBlogs(): Observable<BlogPost[]> {
    const feedUrl = this.isBrowser ? BLOG_FEED_PROXY_PATH : HASHNODE_RSS_URL;

    return this.getCachedThenFresh('hashnodeBlogs', () =>
      this.http.get(feedUrl, { responseType: 'text' }).pipe(map(parseHashnodeRss))
    ).pipe(catchError(() => of([])));
  }
}
