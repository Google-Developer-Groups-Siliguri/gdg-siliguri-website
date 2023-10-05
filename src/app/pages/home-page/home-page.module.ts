import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { OrganizersComponent } from 'src/app/components/organizers/organizers.component';
import { AboutUsComponent } from 'src/app/components/about-us/about-us.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';


const routes: Routes = [{ path: '', component: HomePageComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), WelcomeComponent, HeroComponent],
  declarations: [HomePageComponent, OrganizersComponent, AboutUsComponent],
})
export class HomePageModule {}
