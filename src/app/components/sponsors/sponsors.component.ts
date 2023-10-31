import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Sponsors } from 'src/app/services/data.service';
import { SponsorCardComponent } from '../sponsor-card/sponsor-card.component';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule, SponsorCardComponent],
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent {
  sponsorsDetails: Sponsors[] = [];
  constructor (private $firebaseService: DataService) {
    this.getcommunitySponsorsList()
  }

  getcommunitySponsorsList() {
    const subscription$ = this.$firebaseService
      .getAllSponsors()
      .subscribe({
        next: (result) => {
          if (result) {
            console.log('RES', result);
            this.sponsorsDetails = result;
            subscription$.unsubscribe();
          }
        },
        error: (err) => console.error(err),
      });
  }
}
