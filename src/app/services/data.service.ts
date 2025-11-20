import { inject, Injectable, makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
}

export interface EventData {
  bannerDescription: string;
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
  perks: {
    enabled: boolean;
    data: string[];
  };
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

export interface HashnodeResponse {
  data: {
    publication: {
      posts: {
        edges: Array<{
          node: BlogPost;
        }>;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
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
  };

  private getWithTransferState<T>(key: string, url: string): Observable<T> {
    const stateKey = makeStateKey<T>(key);

    const existing = this.transferState.get(stateKey, null);
    if (existing) {
      return of(existing);
    }

    return this.http.get<T>(url).pipe(
      tap(data => this.transferState.set(stateKey, data))
    );
  }

  private postWithTransferState<T>(key: string, url: string, body: any): Observable<T> {
    const stateKey = makeStateKey<T>(key);

    const existing = this.transferState.get(stateKey, null);
    if (existing) {
      return of(existing);
    }

    return this.http.post<T>(url, body).pipe(
      tap(data => this.transferState.set(stateKey, data))
    );
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

  //hashnode blogs
  getHashnodeBlogs(): Observable<BlogPost[]> {
    const query = `
      query Publication {
        publication(host: "gdgsiliguri.hashnode.dev") {
          posts(first: 20) {
            edges {
              node {
                id
                title
                brief
                slug
                coverImage {
                  url
                }
                publishedAt
                author {
                  name
                  profilePicture
                }
                readTimeInMinutes
                url
              }
            }
          }
        }
      }
    `;

    return this.postWithTransferState<HashnodeResponse>(
      'hashnodeBlogs',
      'https://gql.hashnode.com',
      { query }
    ).pipe(
      map((response) => response.data.publication.posts.edges.map((edge) => edge.node))
    );
  }
}
