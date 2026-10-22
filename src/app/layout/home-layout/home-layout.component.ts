import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarComponent, NavLink } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-home-layout',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  template: `
    <app-navbar [links]="links" [cta]="cta"></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLayoutComponent {
  protected readonly links: NavLink[] = [
    { path: '/', label: 'Home', exact: true },
    { path: '/blogs', label: 'Blogs' },
  ];
  protected readonly cta: NavLink = { path: '/devfest', label: 'DevFest Siliguri' };
}
