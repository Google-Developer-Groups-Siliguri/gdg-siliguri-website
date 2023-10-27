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

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private speakerPath = '/speakers';

  constructor(private db: Database) {}

  getAllTeams() {
    const starCountRef = ref(this.db, '/teams');

    return new Observable<Members[]>((observer) => {
      const unsubscribe = onValue(starCountRef, (snapshot) => {
        const data: Members[] = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }
  getAllSpeakers() {
    const starCountRef = ref(this.db, '/speakers');

    return new Observable<Members[]>((observer) => {
      const unsubscribe = onValue(starCountRef, (snapshot) => {
        const data: Members[] = snapshot.val();
        observer.next(data);
      });

      // Clean up the subscription when the Observable is unsubscribed
      return () => {
        unsubscribe();
      };
    });
  }
}
