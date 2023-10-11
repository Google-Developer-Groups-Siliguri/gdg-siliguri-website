import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevfestComponent } from './devfest.component';
import { RouterModule, Routes } from '@angular/router';
import { DevfestHeroComponent } from 'src/app/components/devfest-hero/devfest-hero.component';

const routes: Routes = [{ path: '', component: DevfestComponent }];

@NgModule({
  declarations: [DevfestComponent],
  imports: [CommonModule, DevfestHeroComponent, RouterModule.forChild(routes)],
})
export class DevfestModule {}
