import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  PLATFORM_ID,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { GdgLogoComponent } from '../ui/gdg-logo/gdg-logo';

export interface NavLink {
  path: string;
  label: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, GdgLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <header
      class="fixed inset-x-0 top-0 z-30 transition-colors duration-effects-slow ease-effects-slow"
      [class.bg-surface]="!scrolled() && !menuOpen()"
      [class.bg-surface-container]="scrolled() || menuOpen()"
    >
      <nav class="page-container flex h-16 items-center gap-2" aria-label="Main">
        <a [routerLink]="homePath()" class="mr-auto rounded-full py-1" aria-label="GDG Siliguri home">
          <app-gdg-logo />
        </a>

        <ul class="hidden items-center gap-1 md:flex">
          @for (link of links(); track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="!bg-secondary-container !text-on-secondary-container font-bold"
                [routerLinkActiveOptions]="{ exact: link.exact ?? false }"
                class="m3-btn text-on-surface-variant"
              >
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <button
          type="button"
          class="m3-icon-btn"
          (click)="theme.toggle()"
          [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
        >
          <span class="material-symbols-rounded" aria-hidden="true">
            {{ theme.theme() === 'dark' ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>

        @if (cta(); as cta) {
          <a [routerLink]="cta.path" class="m3-btn m3-btn-filled hidden sm:inline-flex">
            {{ cta.label }}
          </a>
        }

        <button
          type="button"
          class="m3-icon-btn md:hidden"
          (click)="menuOpen.set(!menuOpen())"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="mobile-menu"
          [attr.aria-label]="menuOpen() ? 'Close menu' : 'Open menu'"
        >
          <span class="material-symbols-rounded" aria-hidden="true">
            {{ menuOpen() ? 'close' : 'menu' }}
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        class="grid transition-[grid-template-rows] duration-spatial ease-emphasized md:hidden"
        [class.grid-rows-[1fr]]="menuOpen()"
        [class.grid-rows-[0fr]]="!menuOpen()"
        [attr.inert]="menuOpen() ? null : ''"
      >
        <div class="overflow-hidden">
          <ul class="page-container flex flex-col gap-1 pb-4">
            @for (link of links(); track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  routerLinkActive="!bg-secondary-container !text-on-secondary-container font-bold"
                  [routerLinkActiveOptions]="{ exact: link.exact ?? false }"
                  class="m3-btn m3-btn-md w-full justify-start text-on-surface-variant"
                >
                  {{ link.label }}
                </a>
              </li>
            }
            @if (cta(); as cta) {
              <li class="pt-2 sm:hidden">
                <a [routerLink]="cta.path" class="m3-btn m3-btn-md m3-btn-filled w-full">
                  {{ cta.label }}
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </header>
    <div class="h-16" aria-hidden="true"></div>
  `,
})
export class NavbarComponent {
  readonly links = input.required<NavLink[]>();
  readonly cta = input<NavLink>();
  readonly homePath = input('/');

  protected readonly theme = inject(ThemeService);
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  protected onScroll(): void {
    if (this.isBrowser) {
      this.scrolled.set(window.scrollY > 8);
    }
  }
}
