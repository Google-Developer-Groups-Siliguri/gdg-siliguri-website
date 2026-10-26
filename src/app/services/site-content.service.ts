import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  toBlogPosts,
  toDevfestView,
  toEventsView,
  toHomeView,
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
  BlogPost,
  DevfestView,
  EventsView,
  HomeView,
  SiteView,
  TeamMember,
} from '../shared/view-models';
import { DataService } from './data.service';
import { LegacyDataService } from './legacy-data.service';

@Injectable({
  providedIn: 'root',
})
export class SiteContentService {
  private readonly data = inject(DataService);
  private readonly legacy = inject(LegacyDataService);
  private readonly useRtdb = environment.dataSource === 'rtdb';
  private readonly useFixtures = environment.dataSource === 'fixture';

  site(): Observable<SiteView> {
    if (this.useRtdb) {
      return this.legacy.getEventData().pipe(map(toLegacySiteView));
    }
    return this.data.getHomeBundle().pipe(map((home) => toSiteView(home.site, home.edition.year)));
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

  devfest(): Observable<DevfestView> {
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
    return combineLatest([this.data.getHomeBundle(), this.data.getActiveEdition()]).pipe(
      map(([home, edition]) => toDevfestView(home, edition, Date.now()))
    );
  }

  blogs(): Observable<BlogPost[]> {
    if (this.useRtdb) {
      return this.legacy.getHashnodeBlogs();
    }
    return this.data.getHomeBundle().pipe(
      switchMap((home) => {
        if (!home.site.sections.blogs) {
          return of([]);
        }
        return home.blogs.length || this.useFixtures
          ? of(toBlogPosts(home.blogs))
          : this.legacy.getHashnodeBlogs();
      })
    );
  }
}
