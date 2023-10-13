import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewComponent implements OnInit {
  data = [
    {
      name: 'Eishan Chattaraj',
      header:
        'Attended the most innovative and informative events from the Window of Mt Kanchenjunga!',
      content:
        'GDG Siliguri has organised the innovative Google DevFest events at SIT where every bits was enjoyable, informative and the energy from both side of Speaker, Organizer Audience have made the GDG more Masala-dar. I have enjoyed lot and gain many knowledge for my core area of industry.',
    },
    {
      name: 'Sahil Saha',
      header: 'Awesome Experience!',
      content:
        'Got to learn a lot from the amazing speakers. I had a lot of fun interacting with other like minded developers from the region and participating in the hackathon! Eagerly waiting for the next Devfest!',
    },
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      register();
    }
  }
}
