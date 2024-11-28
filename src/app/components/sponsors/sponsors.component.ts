import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DataService, Sponsors } from 'src/app/services/data.service';
import { SponsorCardComponent } from '../sponsor-card/sponsor-card.component';
import { Observable } from 'rxjs';
import { ComingSoonCardComponent } from '../coming-soon-card/coming-soon-card.component';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [AsyncPipe, SponsorCardComponent, ComingSoonCardComponent],
  template: `
    <div class="2xl:mx-[8rem] md:mx-[4rem] mx-[1.5rem] mt-10">
      <h1
        class="text-[50px] lg:text-[70px] leading-tight tracking-wide font-semibold text-black text-center mt-6"
      >
        Sponsors
      </h1>
      <div class="md:mx-[1.5rem] mx-[1.5rem] py-10 rounded-2xl">
        @if (sponsorsDetails$ | async; as data) { @if (data.enabled) {
        <p
          class="text-[30px] lg:text-[50px] leading-tight tracking-wide font-semibold text-gray-600 text-center mt-2"
        >
          Platinum
        </p>
        <div
          class="grid items-center justify-center grid-cols-12 gap-x-4 gap-y-10 xl:gap-x-15"
        >
          @for (user of data.platinum; track $index) {
          <div
            class="h-full col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-4"
          >
            <div class="flex items-center justify-center h-full">
              <app-sponsor-card
                [item]="user"
                class="w-full h-full"
              ></app-sponsor-card>
            </div>
          </div>
          }
        </div>
        <!-- <p
          class="text-[30px] lg:text-[50px] leading-tight tracking-wide font-semibold text-gray-600 text-center mt-2"
        >
          Gold
        </p> -->
        <div
          class="grid items-center justify-center grid-cols-12 gap-x-4 gap-y-10 xl:gap-x-15"
        >
          @for (user of data.gold; track $index) {
          <div
            class="h-full col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-4"
          >
            <div class="flex items-center justify-center h-full">
              <app-sponsor-card
                [item]="user"
                class="w-full h-full"
              ></app-sponsor-card>
            </div>
          </div>
          }
        </div>
        <!-- <p
          class="text-[30px] lg:text-[50px] leading-tight tracking-wide font-semibold text-gray-600 text-center mt-2"
        >
          Silver
        </p> -->
        <div
          class="grid items-center justify-center grid-cols-12 gap-x-4 gap-y-10 xl:gap-x-15"
        >
          @for (user of data.silver; track $index) {
          <div
            class="h-full col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-4"
          >
            <div class="flex items-center justify-center h-full">
              <app-sponsor-card
                [item]="user"
                class="w-full h-full"
              ></app-sponsor-card>
            </div>
          </div>
          }
        </div>
        } @else {
        <app-coming-soon-card> </app-coming-soon-card>
        } } @else {
        <app-coming-soon-card> </app-coming-soon-card>

        }
      </div>
    </div>
  `,
})
export class SponsorsComponent {
  sponsorsDetails$: Observable<{
    enabled: boolean;
    gold: Sponsors[];
    platinum: Sponsors[];
    silver: Sponsors[];
  }>;

  constructor(private $firebaseService: DataService) {
    this.sponsorsDetails$ = this.$firebaseService.getAllSponsors();
  }
}
