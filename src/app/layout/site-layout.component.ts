import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { AppInstallSheetComponent } from '../components/site/app-install-sheet.component';
import { SiteFooterComponent } from '../components/site/site-footer.component';
import { SiteHeaderComponent, navItems } from '../components/site/site-header.component';
import { SiteContentService } from '../services/site-content.service';
import { DEFAULT_EMAIL, DEFAULT_JOIN_URL } from '../shared/content';

@Component({
  selector: 'app-site-layout',
  imports: [AppInstallSheetComponent, RouterOutlet, SiteFooterComponent, SiteHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-site-header [joinUrl]="joinUrl()" [nav]="nav()" />
    <router-outlet />
    <app-site-footer [socials]="socials()" [email]="email()" [nav]="nav()" />
    <app-install-sheet [enabled]="isHome()" />
  `,
})
export class SiteLayoutComponent {
  private readonly router = inject(Router);
  private readonly site = toSignal(inject(SiteContentService).site());

  protected readonly joinUrl = computed(() => this.site()?.joinUrl || DEFAULT_JOIN_URL);
  protected readonly email = computed(() => this.site()?.email || DEFAULT_EMAIL);
  protected readonly socials = computed(() => this.site()?.socials ?? []);
  protected readonly nav = computed(() => {
    const site = this.site();
    return navItems(site?.devfestYear ?? '', site?.sections);
  });

  protected readonly isHome = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split(/[?#]/)[0] === '/')
    ),
    { initialValue: this.router.url === '/' }
  );
}
