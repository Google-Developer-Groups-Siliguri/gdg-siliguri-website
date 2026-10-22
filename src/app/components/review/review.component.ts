import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DataService } from 'src/app/services/data.service';
import { M3ShapeComponent } from '../ui/m3-shape/m3-shape';

@Component({
  selector: 'app-review',
  imports: [AsyncPipe, M3ShapeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (reviews$ | async; as reviews) {
      @if (reviews.enabled && reviews.data.length) {
        <section class="page-container py-8">
          <div
            class="relative isolate grid grid-cols-[minmax(0,1fr)] items-center gap-10 overflow-hidden rounded-m3-2xl bg-g-blue-container px-6 py-12 text-on-g-blue-container md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:px-12 lg:px-16"
          >
            <app-m3-shape
              shape="clover8"
              class="absolute -bottom-20 -left-16 -z-10 w-72 animate-spin-slow text-g-blue opacity-15"
            />
            <div class="flex flex-col gap-4">
              <span class="text-label-lg font-bold uppercase tracking-[0.12em]">Attendee stories</span>
              <h2 class="text-display-sm font-medium md:text-display-md">See what our attendees have to say</h2>
            </div>

            <swiper-container
              class="review-swiper mx-auto w-full max-w-[22rem]"
              effect="cards"
              cards-effect-slide-shadows="false"
              grab-cursor="true"
              observer="true"
              observe-parents="true"
              autoplay-delay="3500"
              autoplay-disable-on-interaction="false"
              pagination="true"
            >
              @for (review of reviews.data; track $index) {
                <swiper-slide class="rounded-m3-xl">
                  <article class="flex h-full min-h-[22rem] flex-col gap-4 rounded-m3-xl bg-surface-container-lowest p-6 pb-10 text-on-surface shadow-elevation-1 dark:bg-surface-container-high">
                    <div class="flex items-center gap-3">
                      <span
                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-container text-title-lg font-medium text-on-secondary-container"
                        aria-hidden="true"
                      >
                        {{ review.name.charAt(0) }}
                      </span>
                      <div>
                        <p class="text-title-md font-bold">{{ review.name }}</p>
                        <p class="text-body-md text-on-surface-variant">{{ review.eventAttended }}</p>
                      </div>
                    </div>
                    <p class="text-title-lg font-medium">{{ review.feedbackTitle }}</p>
                    <p class="text-body-md text-on-surface-variant">{{ review.feedbackDescription }}</p>
                  </article>
                </swiper-slide>
              }
            </swiper-container>
          </div>
        </section>
      }
    }
  `,
  styles: `
    .review-swiper {
      --swiper-pagination-color: rgb(var(--md-primary));
      --swiper-pagination-bullet-inactive-color: rgb(var(--md-on-surface-variant));
      --swiper-pagination-bullet-inactive-opacity: 0.4;
    }
  `,
})
export class ReviewComponent implements OnInit {
  protected readonly reviews$ = inject(DataService).getAllFeedbacks();
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit(): void {
    if (this.isBrowser) {
      register();
    }
  }
}
