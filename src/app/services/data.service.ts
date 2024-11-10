import { Injectable } from '@angular/core';
import { Database, ref, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface Members {
  description: string;
  designation: string;
  githubURL: string;
  linkedInURL: string;
  name: string;
  profilePictureURL: string;
  twitterURL: string;
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
  dbPaths = {
    teams: '/teams', //organizers and volunteers
    speakers: '/speakers', //speakers
    partners: '/communityPartners', //community partners
    feedbacks: '/feedbacks', //feedbacks
    faqs: '/FAQs', //FAQ
    schedule: '/schedule', //schedules
    sponsors: '/sponsors', //sponsors
    eventDetails: '/eventDetails', //eventDetails
    gdgFaqs: '/home/gdgFAQs', //eventDetails
  };

  constructor(private db: Database) {}

  //organizers and volunteers
  getAllTeams() {
    const teamsRef = ref(this.db, this.dbPaths.teams);

    return new Observable<{ enabled: boolean; data: Members[] }>((observer) => {
      const unsubscribe = onValue(teamsRef, (snapshot) => {
        const data: { enabled: boolean; data: Members[] } = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }

  //speakers
  getAllSpeakers() {
    const speakersRef = ref(this.db, this.dbPaths.speakers);

    return new Observable<{ enabled: boolean; data: Members[] }>((observer) => {
      const unsubscribe = onValue(speakersRef, (snapshot) => {
        const data: { enabled: boolean; data: Members[] } = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }

  //community partners
  getAllCommunityPartners() {
    const partnersRef = ref(this.db, this.dbPaths.partners);

    return new Observable<{ enabled: boolean; data: CommunityPartners[] }>(
      (observer) => {
        const unsubscribe = onValue(partnersRef, (snapshot) => {
          const data: { enabled: boolean; data: CommunityPartners[] } =
            snapshot.val();
          observer.next(data);
        });

        // Clean up the subscription when the Observable is unsubscribed
        return () => {
          unsubscribe();
        };
      }
    );
  }

  //feedbacks
  getAllFeedbacks() {
    const feedbacksRef = ref(this.db, this.dbPaths.feedbacks);

    return new Observable<{ enabled: boolean; data: Feedbacks[] }>(
      (observer) => {
        const unsubscribe = onValue(feedbacksRef, (snapshot) => {
          const data: { enabled: boolean; data: Feedbacks[] } = snapshot.val();
          observer.next(data);
        });

        // Clean up the subscription when the Observable is unsubscribed
        return () => {
          unsubscribe();
        };
      }
    );
  }

  //faqs
  getAllFAQS() {
    const faqsRef = ref(this.db, this.dbPaths.faqs);

    return new Observable<{ enabled: boolean; data: FAQ[] }>((observer) => {
      const unsubscribe = onValue(faqsRef, (snapshot) => {
        const data: { enabled: boolean; data: FAQ[] } = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }
  //faqs
  getAllGDGFAQS() {
    const faqsRef = ref(this.db, this.dbPaths.gdgFaqs);

    return new Observable<{ enabled: boolean; data: FAQ[] }>((observer) => {
      const unsubscribe = onValue(faqsRef, (snapshot) => {
        const data: { enabled: boolean; data: FAQ[] } = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }

  //schedule
  getAllSchedules() {
    const scheduleRef = ref(this.db, this.dbPaths.schedule);

    return new Observable<{ enabled: Boolean; data: Schedule[] }>(
      (observer) => {
        const unsubscribe = onValue(scheduleRef, (snapshot) => {
          const data: { enabled: Boolean; data: Schedule[] } = snapshot.val();
          observer.next(data);
        });

        // Clean up the subscription when the Observable is unsubscribed
        return () => {
          unsubscribe();
        };
      }
    );
  }

  //sponsors
  getAllSponsors() {
    const sponsorsRef = ref(this.db, this.dbPaths.sponsors);

    return new Observable<{
      enabled: boolean;
      gold: Sponsors[];
      platinum: Sponsors[];
      silver: Sponsors[];
    }>((observer) => {
      const unsubscribe = onValue(sponsorsRef, (snapshot) => {
        const data: {
          enabled: boolean;
          gold: Sponsors[];
          platinum: Sponsors[];
          silver: Sponsors[];
        } = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }

  //eventDetails
  getEventData() {
    const eventsRef = ref(this.db, this.dbPaths.eventDetails);

    return new Observable<EventData>((observer) => {
      const unsubscribe = onValue(eventsRef, (snapshot) => {
        const data: EventData = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }
}
