import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevfestComponent } from './devfest.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactMapComponent } from 'src/app/components/contact-map/contact-map.component';
import { SpeakersComponent } from 'src/app/components/speakers/speakers.component';
import { SponsorsComponent } from 'src/app/components/sponsors/sponsors.component';
import { PartnersComponent } from 'src/app/components/partners/partners.component';
import { DevfestHeroComponent } from 'src/app/components/devfest-hero/devfest-hero.component';
import { ReviewComponent } from 'src/app/components/review/review.component';
import { WhatsIsComponent } from 'src/app/components/whats-is/whats-is.component';
import { GoogleProductsComponent } from 'src/app/components/google-products/google-products.component';
import { KeepInTouchComponent } from 'src/app/components/keep-in-touch/keep-in-touch.component';
import { DevfestFaqComponent } from '../../components/devfest-faq.component';

const routes: Routes = [{ path: '', component: DevfestComponent }];

@NgModule({
  declarations: [DevfestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
})
export class DevfestModule {}
