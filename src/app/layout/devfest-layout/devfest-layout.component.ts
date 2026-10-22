import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarComponent, NavLink } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-devfest-layout',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  template: `
    <app-navbar [links]="links" [cta]="cta" homePath="/"></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevfestLayoutComponent {
  protected readonly links: NavLink[] = [
    { path: '/devfest', label: 'DevFest', exact: true },
    { path: '/devfest/schedule', label: 'Schedule' },
    { path: '/devfest/team', label: 'Team' },
    { path: '/devfest/contact', label: 'Contact' },
    { path: '/blogs', label: 'Blogs' },
  ];
  protected readonly cta: NavLink = { path: '/devfest/tickets', label: 'Get tickets' };
}
