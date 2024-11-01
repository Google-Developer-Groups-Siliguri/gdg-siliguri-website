import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarDevfestComponent } from 'src/app/components/navbar-devfest/navbar-devfest.component';

@Component({
  selector: 'app-devfest-layout',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NavbarDevfestComponent,
    RouterOutlet,
  ],
  template: `
    <app-navbar-devfest></app-navbar-devfest>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
export class DevfestLayoutComponent {}
