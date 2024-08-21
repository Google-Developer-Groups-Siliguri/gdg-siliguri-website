import { Component } from '@angular/core';

@Component({
  selector: 'app-devfest-layout',
  template: `
    <app-navbar-devfest></app-navbar-devfest>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
export class DevfestLayoutComponent {}
