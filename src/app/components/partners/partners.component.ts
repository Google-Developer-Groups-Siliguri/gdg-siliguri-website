import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityPartners, DataService } from 'src/app/services/data.service';
import { PartnerCardComponent } from '../partner-card/partner-card.component';
import { Observable } from 'rxjs';
import { ComingSoonCardComponent } from '../coming-soon-card/coming-soon-card.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, PartnerCardComponent, ComingSoonCardComponent],
  template: `
    <div class="mx-[1.5rem] mb-12">
      <h1
        class="text-[50px] lg:text-[70px] leading-tight tracking-wide font-semibold text-black text-center mt-6"
      >
        Community Partners
      </h1>
      <div class="md:mx-[1.5rem] mx-[1.5rem] py-10 rounded-2xl">
        @if (communityPartnerDetails$ | async; as data) { @if (data.enabled) {
        <div
          class="grid items-center justify-center grid-cols-12 gap-x-4 gap-y-10 xl:gap-x-15"
        >
          @for (user of data.data; track $index) {

          <div
            class="h-full col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-4"
          >
            <div class="flex items-center justify-center h-full">
              <app-partner-card
                [item]="user"
                class="w-full h-full"
              ></app-partner-card>
            </div>
          </div>
          }
        </div>
        } @else {
        <app-coming-soon-card> </app-coming-soon-card>
        } }
      </div>
    </div>
  `,
})
export class PartnersComponent {
  communityPartnerDetails$: Observable<{
    enabled: boolean;
    data: CommunityPartners[];
  }>;
  constructor(private $firebaseDataService: DataService) {
    this.communityPartnerDetails$ =
      this.$firebaseDataService.getAllCommunityPartners();
  }
}
