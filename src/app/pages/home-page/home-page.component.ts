import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeroComponent } from 'src/app/components/hero.component';
import { OrganizersComponent } from 'src/app/components/organizers.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { GoogleProductsComponent } from '../../components/google-products/google-products.component';
import { KeepInTouchComponent } from '../../components/keep-in-touch/keep-in-touch.component';

@Component({
  selector: 'app-home-page',
  imports: [
    OrganizersComponent,
    HeroComponent,
    FaqComponent,
    GoogleProductsComponent,
    KeepInTouchComponent,
  ],
  template: `
    <app-hero />
    <app-organizers />
    <app-faq />
    <app-google-products />
    <app-keep-in-touch />
  `,
})
export class HomePageComponent {
  constructor(
    private meta: Meta,
    private title: Title
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Google Developers Group Siliguri',
    });
    this.title.setTitle('Google Developers Group Siliguri');
  }
}
