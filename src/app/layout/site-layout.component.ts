import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { AppInstallSheetComponent } from '../components/site/app-install-sheet.component';
import { SiteFooterComponent } from '../components/site/site-footer.component';
import { SiteHeaderComponent, navItems } from '../components/site/site-header.component';
import { istDay, parseIstDate, toSocials } from '../shared/content';
import { DataService } from '../services/data.service';

const DEFAULT_JOIN_URL = 'https://gdg.community.dev/gdg-siliguri/';
const DEFAULT_EMAIL = 'gdgsiliguri@gmail.com';

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
  private readonly eventData = toSignal(inject(DataService).getEventData());

  protected readonly joinUrl = computed(
    () => this.eventData()?.communityJoinLink || DEFAULT_JOIN_URL
  );
  protected readonly email = computed(() => this.eventData()?.communityEmail || DEFAULT_EMAIL);
  protected readonly socials = computed(() => toSocials(this.eventData()?.socialMediaLinks));
  protected readonly nav = computed(() => {
    const at = parseIstDate(this.eventData()?.eventDateTime);
    return navItems(Number.isNaN(at) ? '' : istDay(at).year);
  });

  protected readonly isHome = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split(/[?#]/)[0] === '/')
    ),
    { initialValue: this.router.url === '/' }
  );
}
