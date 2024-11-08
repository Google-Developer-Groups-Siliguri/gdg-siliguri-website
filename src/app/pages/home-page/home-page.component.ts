import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AboutUsComponent } from 'src/app/components/about-us.component';
import { BannerComponent } from 'src/app/components/banner.component';
import { HeroComponent } from 'src/app/components/hero.component';
import { OrganizersComponent } from 'src/app/components/organizers.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { GoogleProductsComponent } from '../../components/google-products/google-products.component';
import { KeepInTouchComponent } from '../../components/keep-in-touch/keep-in-touch.component';
import { Observable } from 'rxjs';
import { DataService, EventData } from 'src/app/services/data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    BannerComponent,
    WelcomeComponent,
    AboutUsComponent,
    OrganizersComponent,
    HeroComponent,
    FaqComponent,
    GoogleProductsComponent,
    KeepInTouchComponent,
    AsyncPipe,
  ],
  template: `
    <div class="mt-20 w-full">
      <div class="bg-[#f2f3f5] w-full">
        <div class="md:container md:mx-auto md:px-4 ">
          @if (eventData$ | async; as data) {
          <app-banner [ticketUrl]="data.eventTicketURL"></app-banner>
          }
        </div>
      </div>
      <div class="w-full">
        <div class="md:container md:mx-auto md:p-4">
          <app-hero></app-hero>
        </div>
      </div>
      <div class="w-full">
        <div class="md:container md:mx-auto md:px-4">
          <app-organizers></app-organizers>
        </div>
      </div>
      <div class=" w-full">
        <div class="md:container md:mx-auto md:px-4">
          <app-faq></app-faq>
        </div>
        <div class=" w-full">
          <div class="md:container md:mx-auto md:px-4">
            <app-google-products></app-google-products>
          </div>
          <div class=" w-full">
            <div class="md:container md:mx-auto md:px-4">
              <app-keep-in-touch></app-keep-in-touch>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class HomePageComponent {
  eventData$: Observable<EventData>;

  constructor(
    private meta: Meta,
    private title: Title,
    private firebaseService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Google Developers Group Siliguri',
    });
    this.title.setTitle('Google Developers Group Siliguri');
    this.eventData$ = this.firebaseService.getEventData();
  }
}
