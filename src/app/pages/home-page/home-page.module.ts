import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { OrganizersComponent } from 'src/app/components/organizers/organizers.component';
import { AboutUsComponent } from 'src/app/components/about-us/about-us.component';

const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  declarations: [HomePageComponent,OrganizersComponent,AboutUsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomePageModule {}
