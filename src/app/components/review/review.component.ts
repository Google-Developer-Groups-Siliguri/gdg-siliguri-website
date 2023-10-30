import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { DataService, Feedbacks } from 'src/app/services/data.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewComponent implements OnInit {
  reviewsData: Feedbacks[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private $firebaseDataService: DataService
  ) {
    this.getFeedbacks();
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
    console.log(this.reviewsData);
  }

  getFeedbacks() {
    const subscription$ = this.$firebaseDataService
      .getAllFeedbacks()
      .subscribe({
        next: (result) => {
          if (result) {
            this.reviewsData = result;
            subscription$.unsubscribe();
          }
        },
        error: (err) => console.error(err),
      });
  }
}
