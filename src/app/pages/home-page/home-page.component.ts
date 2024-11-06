import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AboutUsComponent } from 'src/app/components/about-us.component';
import { BannerComponent } from 'src/app/components/banner.component';
import { HeroComponent } from 'src/app/components/hero.component';
import { OrganizersComponent } from 'src/app/components/organizers/organizers.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { DevfestHeroComponent } from '../../components/devfest-hero/devfest-hero.component';
import { TeamComponent } from '../team/team.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { GoogleProductsComponent } from '../../components/google-products/google-products.component';
import { KeepInTouchComponent } from '../../components/keep-in-touch/keep-in-touch.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    BannerComponent,
    WelcomeComponent,
    AboutUsComponent,
    OrganizersComponent,
    HeroComponent,
    DevfestHeroComponent,
    TeamComponent,
    FaqComponent,
    GoogleProductsComponent,
    KeepInTouchComponent,
  ],
  template: `
    <div class="mt-20 w-full">
      <div class="bg-[#f2f3f5] w-full">
        <div class="md:container md:mx-auto md:px-4 ">
          <app-banner></app-banner>
        </div>
      </div>
      <div class="w-full">
        <div class="md:container md:mx-auto md:p-4">
          <app-devfest-hero></app-devfest-hero>
        </div>
      </div>
      <div class="w-full">
        <div class="md:container md:mx-auto md:px-4">
          <app-team></app-team>
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
          <!-- <div class="md:container md:mx-auto md:px-4">
        <app-welcome />
      </div>
      <div class="md:container md:mx-auto md:px-4">
        <app-organizers></app-organizers>
      </div>
      <div class="md:container md:mx-auto md:px-4">
        <app-about-us></app-about-us>
      </div> -->
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class HomePageComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({
      name: 'title',
      content: 'Google Developers Group Siliguri',
    });
    this.title.setTitle('Google Developers Group Siliguri');
  }
}
