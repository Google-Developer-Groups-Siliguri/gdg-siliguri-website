import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
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

  //organizers and volunteers
  getAllTeams(): Observable<{ enabled: boolean; data: Members[] }> {
    return this.http.get<{ enabled: boolean; data: Members[] }>(
      `${this.apiBaseUrl}${this.dbPaths.teams}`
    );
  }

  //speakers
  getAllSpeakers(): Observable<{ enabled: boolean; data: Members[] }> {
    return this.http.get<{ enabled: boolean; data: Members[] }>(
      `${this.apiBaseUrl}${this.dbPaths.speakers}`
    );
  }

  //community partners
  getAllCommunityPartners(): Observable<{
    enabled: boolean;
    data: CommunityPartners[];
  }> {
    return this.http.get<{ enabled: boolean; data: CommunityPartners[] }>(
      `${this.apiBaseUrl}${this.dbPaths.partners}`
    );
  }

  //feedbacks
  getAllFeedbacks(): Observable<{ enabled: boolean; data: Feedbacks[] }> {
    return this.http.get<{ enabled: boolean; data: Feedbacks[] }>(
      `${this.apiBaseUrl}${this.dbPaths.feedbacks}`
    );
  }

  //faqs
  getAllFAQS(): Observable<{ enabled: boolean; data: FAQ[] }> {
    return this.http.get<{ enabled: boolean; data: FAQ[] }>(
      `${this.apiBaseUrl}${this.dbPaths.faqs}`
    );
  }

  //faqs
  getAllGDGFAQS(): Observable<{ enabled: boolean; data: FAQ[] }> {
    return this.http.get<{ enabled: boolean; data: FAQ[] }>(
      `${this.apiBaseUrl}${this.dbPaths.gdgFaqs}`
    );
  }

  //schedule
  getAllSchedules(): Observable<{ enabled: boolean; data: Schedule[] }> {
    return this.http.get<{ enabled: boolean; data: Schedule[] }>(
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
    return this.http.get<{
      enabled: boolean;
      gold: Sponsors[];
      platinum: Sponsors[];
      silver: Sponsors[];
    }>(`${this.apiBaseUrl}${this.dbPaths.sponsors}`);
  }

  //eventDetails
  getEventData(): Observable<EventData> {
    return this.http.get<EventData>(
      `${this.apiBaseUrl}${this.dbPaths.eventDetails}`
    );
  }

  //eventDetails
  getCommunityEventsData(): Observable<{ enabled: boolean; data: Events[] }> {
    return this.http.get<{ enabled: boolean; data: Events[] }>(
      `${this.apiBaseUrl}${this.dbPaths.communityEvents}`
    );
  }
}
