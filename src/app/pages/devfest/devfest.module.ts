import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevfestComponent } from './devfest.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactMapComponent } from 'src/app/components/contact-map/contact-map.component';

const routes: Routes = [{ path: '', component: DevfestComponent }];

@NgModule({
  declarations: [DevfestComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ContactMapComponent],
})
export class DevfestModule {}
