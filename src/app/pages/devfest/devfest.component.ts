import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ContactMapComponent } from 'src/app/components/contact-map/contact-map.component';
import { DevfestHeroComponent } from 'src/app/components/devfest-hero/devfest-hero.component';
import { FaqComponent } from 'src/app/components/faq/faq.component';
import { GoogleProductsComponent } from 'src/app/components/google-products/google-products.component';
import { KeepInTouchComponent } from 'src/app/components/keep-in-touch/keep-in-touch.component';
import { PartnersComponent } from 'src/app/components/partners/partners.component';
import { ReviewComponent } from 'src/app/components/review/review.component';
import { SpeakersComponent } from 'src/app/components/speakers/speakers.component';
import { SponsorsComponent } from 'src/app/components/sponsors/sponsors.component';
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
    GoogleProductsComponent,
    KeepInTouchComponent,
    FaqComponent,
  ],
  template: `
    @if (eventData$ | async; as data) {
      <app-devfest-hero [eventData]="data" />
    }
    <app-contact-map />
    <app-speakers />
    <app-partners />
    <app-sponsors />
    <app-review />
    <app-faq source="devfest" />
    <app-google-products />
    <app-keep-in-touch />
  `,
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
      content: 'Home | Devfest Siliguri 2025',
    });
    this.title.setTitle('Home | Devfest Siliguri 2025');
    this.eventData$ = this.firebaseService.getEventData();
  }
}
