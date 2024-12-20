import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DataService, Feedbacks } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div
      class="grid grid-cols-12 md:gap-10 gap-5 overflow-hidden mx-[1.5rem] mb-[2rem] bg-[#cddef5] lg:p-12 rounded-2xl items-center md:p-5 p-3"
    >
      <div class="col-span-12 lg:col-span-7 md:col-span-6">
        <h1
          class="lg:text-7xl md:text-5xl text-3xl font-[600] text-[#3c4043] text-center md:text-left"
        >
          See what our Attendees have to say
        </h1>
      </div>
      @if (reviewsData$ | async; as data) { @if(data.enabled) {
      <div class="col-span-12 lg:col-span-5 md:col-span-6">
        <swiper-container
          class="swiper mySwiper lg:w-[25rem] md:w-[18rem] md:h-full w-[280px] h-[22rem]"
          effect="cards"
          grab-cursor="true"
          observer="true"
          observe-parents="true"
          observe-slide-children="true"
          autoplay-delay="2300"
          autoplay-disable-on-interaction="false"
          pagination="true"
        >
          @for (item of data.data; track $index) {

          <swiper-slide
            class="bg-[#f5f5f5] lg:h-[30rem] md:h-[23rem] h-[20rem] w-full rounded-xl text-black md:px-4 md:py-7 p-4 lg:p-7"
          >
            <div class="grid items-center grid-cols-12 gap-5 mb-3">
              <div class="col-span-3">
                <svg
                  class="lg:w-[5rem] w-[3rem] h-full text-gray-400 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                  />
                </svg>
              </div>
              <div class="col-span-9">
                <p class="text-lg font-bold lg:text-2xl">{{ item.name }}</p>
                <p class="text-base text-gray-700 lg:text-xl">
                  {{ item.eventAttended }}
                </p>
              </div>
            </div>
            <p
              class="text-sm font-semibold text-gray-800 md:text-base lg:text-2xl"
            >
              {{ item.feedbackTitle }}
            </p>
            <p
              class="mt-3 text-xs font-medium text-gray-700 md:text-sm lg:text-[1rem] lg:leading-6"
            >
              {{ item.feedbackDescription }}
            </p>
          </swiper-slide>
          }
        </swiper-container>
      </div>
      } } @else {
      <app-coming-soon-card></app-coming-soon-card>
      }
    </div>
  `,
})
export class ReviewComponent implements OnInit {
  reviewsData$: Observable<{ enabled: boolean; data: Feedbacks[] }>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private $firebaseDataService: DataService
  ) {
    this.reviewsData$ = this.$firebaseDataService.getAllFeedbacks();
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
  }
}
