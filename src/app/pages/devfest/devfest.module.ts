import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevfestComponent } from './devfest.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactMapComponent } from 'src/app/components/contact-map/contact-map.component';
import { SpeakersComponent } from 'src/app/components/speakers/speakers.component';
import { AssociationComponent } from 'src/app/components/association/association.component';
import { SponsorsComponent } from 'src/app/components/sponsors/sponsors.component';
import { PartnersComponent } from 'src/app/components/partners/partners.component';

const routes: Routes = [{ path: '', component: DevfestComponent }];

@NgModule({
  declarations: [DevfestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContactMapComponent,
    SpeakersComponent,
    AssociationComponent,
    SponsorsComponent,
    PartnersComponent,
  ],
})
export class DevfestModule {}
