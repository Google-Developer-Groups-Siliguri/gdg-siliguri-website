import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ContactMapComponent } from 'src/app/components/contact-map/contact-map.component';
import { DevfestFaqComponent } from 'src/app/components/devfest-faq.component';
import { DevfestHeroComponent } from 'src/app/components/devfest-hero/devfest-hero.component';
import { GoogleProductsComponent } from 'src/app/components/google-products/google-products.component';
import { KeepInTouchComponent } from 'src/app/components/keep-in-touch/keep-in-touch.component';
import { PartnersComponent } from 'src/app/components/partners/partners.component';
import { ReviewComponent } from 'src/app/components/review/review.component';
import { SpeakersComponent } from 'src/app/components/speakers/speakers.component';
import { SponsorsComponent } from 'src/app/components/sponsors/sponsors.component';
import { WhatsIsComponent } from 'src/app/components/whats-is/whats-is.component';
import { DataService, EventData } from 'src/app/services/data.service';

@Component({
  selector: 'app-devfest',
  imports: [
    AsyncPipe,
    DevfestHeroComponent,
    ContactMapComponent,
    SpeakersComponent,
    SponsorsComponent,
    PartnersComponent,
    ReviewComponent,
    WhatsIsComponent,
    GoogleProductsComponent,
    KeepInTouchComponent,
    DevfestFaqComponent,
  ],
  template: `
    <div class="mx-auto min-h-[70vh] max-w-screen-2xl">
      <div class="mt-20">
        @if (eventData$ | async; as data) {
        <app-devfest-hero [eventData]="data"></app-devfest-hero>
        }
        <app-contact-map> </app-contact-map>
        <app-speakers> </app-speakers>
        <app-partners> </app-partners>
        <app-sponsors> </app-sponsors>
        <app-devfest-faq></app-devfest-faq>
        <app-google-products></app-google-products>
        <app-keep-in-touch></app-keep-in-touch>
        <!-- 
    <app-whats-is></app-whats-is>
    <app-review></app-review>
     -->
      </div>
    </div>
  `,
  standalone: true,
})
export class DevfestComponent {
  eventData$: Observable<EventData>;
  constructor(
    private meta: Meta,
    private title: Title,
    private firebaseService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Home | Devfest Siliguri 2023',
    });
    this.title.setTitle('Home | Devfest Siliguri 2023');
    this.eventData$ = this.firebaseService.getEventData();
  }
}
