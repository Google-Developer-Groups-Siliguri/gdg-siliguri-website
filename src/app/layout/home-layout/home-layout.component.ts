
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
    selector: 'app-home-layout',
    imports: [FooterComponent, NavbarComponent, RouterOutlet],
    template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLayoutComponent {}
