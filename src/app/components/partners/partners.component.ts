import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityPartners, DataService } from 'src/app/services/data.service';
import { PartnerCardComponent } from '../partner-card/partner-card.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, PartnerCardComponent],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
  providers: [],
})
export class PartnersComponent {
  communityPartnerDetails: CommunityPartners[] = [];
  constructor(private $firebaseDataService: DataService) {
    this.getcommunityPartnersList();
  }

  getcommunityPartnersList() {
    const subscription$ = this.$firebaseDataService
      .getAllCommunityPartners()
      .subscribe({
        next: (result) => {
          if (result) {
            this.communityPartnerDetails = result;
            subscription$.unsubscribe();
          }
        },
        error: (err) => console.error(err),
      });
  }
}
