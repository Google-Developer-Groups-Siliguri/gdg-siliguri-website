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
import { FaqComponent } from 'src/app/components/faq/faq.component';
<<<<<<< HEAD
import { WhatsIsComponent } from 'src/app/components/whats-is/whats-is.component';
=======
>>>>>>> 78ae60faa51f0a73c67582acce6ad0609c5333c1
import { GoogleProductsComponent } from 'src/app/components/google-products/google-products.component';
import { KeepInTouchComponent } from 'src/app/components/keep-in-touch/keep-in-touch.component';

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
    FaqComponent,
    WhatsIsComponent,
    GoogleProductsComponent,
    KeepInTouchComponent
  ],
})
export class DevfestModule {}
