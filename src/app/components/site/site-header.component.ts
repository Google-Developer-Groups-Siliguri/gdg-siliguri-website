import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

export interface NavItem {
  path: string;
  label: string;
}

export function navItems(devfestYear: string): NavItem[] {
  return [
    { path: '/', label: 'Home' },
    { path: '/devfest', label: devfestYear ? `DevFest ${devfestYear}` : 'DevFest' },
    { path: '/events', label: 'Events' },
    { path: '/team', label: 'Crew' },
    { path: '/about', label: 'About' },
  ];
}

const TINT_SCROLL_RANGE = 80;

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'banner',
    class:
      'sticky top-3 z-20 mx-auto mt-3 block max-w-page box-border px-[var(--gutter-wide)]',
  },
  template: `
    <div
      class="flex h-16 items-center gap-2 rounded-[32px] px-2 [-webkit-backdrop-filter:blur(22px)_saturate(1.8)] [backdrop-filter:blur(22px)_saturate(1.8)]"
      [style.background]="'color-mix(in srgb, var(--srf-2) ' + tint() + '%, transparent)'"
      [style.box-shadow]="shadow()"
    >
      <a
        routerLink="/"
        aria-label="GDG Siliguri home"
        class="flex flex-none items-center gap-2.5 pr-2 text-on-srf no-underline hover:text-on-srf"
      >
        <span
          class="grid h-12 w-12 place-items-center bg-white transition-[scale] duration-[600ms] ease-spring [clip-path:var(--s-cookie9)] hover:[scale:1.08]"
        >
          <img src="assets/images/gdg.png" alt="" class="h-[42px] w-[42px]" />
        </span>
        <b class="whitespace-nowrap font-urbanist text-[19px] font-extrabold"
          >GDG <span class="font-light">Siliguri</span></b
        >
      </a>

      <nav class="hidden min-w-0 flex-1 justify-center gap-0.5 min-[900px]:flex">
        @for (item of nav(); track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="!bg-sec-c !text-on-sec-c"
            ariaCurrentWhenActive="page"
            [routerLinkActiveOptions]="{ exact: item.path === '/' }"
            class="flex h-11 flex-none items-center whitespace-nowrap rounded-[22px] px-[18px] font-manrope text-sm font-bold text-on-srf no-underline transition-[background-color,color,scale] duration-[400ms,400ms,500ms] ease-spring hover:bg-srf-3 hover:text-on-srf active:[scale:.95]"
            >{{ item.label }}</a
          >
        }
      </nav>
      <span class="flex-1 min-[900px]:hidden"></span>

      <button
        type="button"
        (click)="theme.toggle()"
        [attr.aria-label]="themeLabel()"
        [title]="themeLabel()"
        class="relative h-11 w-20 flex-none cursor-pointer overflow-hidden rounded-[22px] border-0 bg-srf-3 p-0 transition-[background-color] duration-[400ms]"
      >
        <span
          class="absolute top-1.5 h-8 w-8 transition-[left] duration-700 ease-spring"
          [style.left]="dark() ? '42px' : '6px'"
        >
          <span
            class="absolute inset-0 transition-[clip-path,background-color] duration-[700ms,500ms] ease-emph"
            [style.clip-path]="dark() ? 'var(--s-circle)' : 'var(--s-sunny)'"
            [style.background]="dark() ? '#E9ECF5' : '#F9AB00'"
          ></span>
          <span
            class="absolute h-6 w-6 rounded-xl bg-srf-3 transition-[top,right,background-color] duration-[700ms,700ms,400ms] ease-emph"
            [style.top]="dark() ? '-5px' : '-30px'"
            [style.right]="dark() ? '-7px' : '-30px'"
          ></span>
        </span>
        <span
          class="absolute top-[13px] h-1 w-1 rounded-sm bg-on-srf-v transition-[opacity,left] duration-[500ms,700ms] ease-emph"
          [style.left]="dark() ? '16px' : '28px'"
          [style.opacity]="dark() ? 1 : 0"
        ></span>
        <span
          class="absolute top-[26px] h-[3px] w-[3px] rounded-sm bg-on-srf-v transition-[opacity,left] duration-[600ms,700ms] ease-emph"
          [style.left]="dark() ? '26px' : '36px'"
          [style.opacity]="dark() ? 1 : 0"
        ></span>
      </button>

      <a
        [href]="joinUrl()"
        class="t-press hidden h-12 flex-none items-center rounded-3xl bg-pri px-[22px] font-urbanist text-[15px] font-extrabold text-on-pri no-underline hover:[scale:1.04] hover:text-on-pri active:[scale:.96] min-[900px]:flex"
        >Join</a
      >
      <button
        type="button"
        (click)="menuOpen.set(!menuOpen())"
        aria-label="Menu"
        [attr.aria-expanded]="menuOpen()"
        class="ms h-12 w-12 flex-none cursor-pointer rounded-3xl border-0 bg-pri text-2xl text-on-pri transition-[scale] duration-500 ease-spring active:[scale:.92] min-[900px]:hidden"
      >
        {{ menuOpen() ? 'close' : 'menu' }}
      </button>
    </div>

    @if (menuOpen()) {
      <div
        class="mt-2 flex flex-col gap-0.5 rounded-[32px] bg-srf-2 p-2 shadow-[0_24px_48px_-20px_rgba(0,0,0,.5)] min-[900px]:hidden"
      >
        @for (item of nav(); track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="!bg-sec-c !text-on-sec-c"
            [routerLinkActiveOptions]="{ exact: item.path === '/' }"
            class="flex h-14 items-center rounded-[28px] px-6 font-urbanist text-lg font-bold text-on-srf no-underline transition-[background-color] duration-300 hover:text-on-srf"
            >{{ item.label }}</a
          >
        }
        <a
          [href]="joinUrl()"
          class="mt-1.5 grid h-14 place-items-center rounded-[28px] bg-pri font-urbanist text-lg font-extrabold text-on-pri no-underline hover:text-on-pri"
          >Join GDG Siliguri</a
        >
      </div>
    }
  `,
})
export class SiteHeaderComponent {
  readonly joinUrl = input.required<string>();
  readonly nav = input.required<NavItem[]>();

  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);
  protected readonly dark = computed(() => this.theme.theme() === 'dark');
  protected readonly themeLabel = computed(() =>
    this.dark() ? 'Switch to light mode' : 'Switch to dark mode'
  );

  private readonly scrollProgress = signal(0);
  protected readonly tint = computed(() => 40 + this.scrollProgress() * 45);
  protected readonly shadow = computed(() => {
    const p = this.scrollProgress();
    return p > 0.05
      ? `0 0 0 1px color-mix(in srgb, var(--out-v) ${p * 100}%, transparent), 0 12px 32px -16px rgba(0,0,0,${p * 0.4})`
      : 'none';
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.menuOpen.set(false));

    afterNextRender(() => {
      let queued = false;
      const update = () => {
        queued = false;
        this.scrollProgress.set(Math.min(1, scrollY / TINT_SCROLL_RANGE));
      };
      const onScroll = () => {
        if (!queued) {
          queued = true;
          requestAnimationFrame(update);
        }
      };
      const wide = matchMedia('(min-width: 900px)');
      const closeOnWide = () => wide.matches && this.menuOpen.set(false);
      addEventListener('scroll', onScroll, { passive: true });
      wide.addEventListener('change', closeOnWide);
      update();
      destroyRef.onDestroy(() => {
        removeEventListener('scroll', onScroll);
        wide.removeEventListener('change', closeOnWide);
      });
    });
  }
}
