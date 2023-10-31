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
  };

  constructor(private db: Database) {}

  //organizers and volunteers
  getAllTeams() {
    const teamsRef = ref(this.db, this.dbPaths.teams);

    return new Observable<Members[]>((observer) => {
      const unsubscribe = onValue(teamsRef, (snapshot) => {
        const data: Members[] = snapshot.val();
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

    return new Observable<Members[]>((observer) => {
      const unsubscribe = onValue(speakersRef, (snapshot) => {
        const data: Members[] = snapshot.val();
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

    return new Observable<CommunityPartners[]>((observer) => {
      const unsubscribe = onValue(partnersRef, (snapshot) => {
        const data: CommunityPartners[] = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }

  //feedbacks
  getAllFeedbacks() {
    const feedbacksRef = ref(this.db, this.dbPaths.feedbacks);

    return new Observable<Feedbacks[]>((observer) => {
      const unsubscribe = onValue(feedbacksRef, (snapshot) => {
        const data: Feedbacks[] = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }

  //faqs
  getAllFAQS() {
    const faqsRef = ref(this.db, this.dbPaths.faqs);

    return new Observable<FAQ[]>((observer) => {
      const unsubscribe = onValue(faqsRef, (snapshot) => {
        const data: FAQ[] = snapshot.val();
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

    return new Observable<Schedule[]>((observer) => {
      const unsubscribe = onValue(scheduleRef, (snapshot) => {
        const data: Schedule[] = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }

  //sponsors
  getAllSponsors() {
    const sponsorsRef = ref(this.db, this.dbPaths.sponsors);

    return new Observable<Sponsors[]>((observer) => {
      const unsubscribe = onValue(sponsorsRef, (snapshot) => {
        const data: Sponsors[] = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }
}
