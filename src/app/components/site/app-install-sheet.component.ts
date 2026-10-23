import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

const SEEN_KEY = 'gdgsg-app-sheet';
const PLAY_STORE_URL = 'https://play.google.com/store/search?q=GDG%20Siliguri&c=apps';
const OPEN_DELAY_MS = 700;

@Component({
  selector: 'app-install-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (enabled() && narrow()) {
      <div
        (click)="dismiss()"
        class="fixed inset-0 z-40 bg-black/50 transition-opacity duration-500"
        [style.opacity]="open() ? 1 : 0"
        [style.pointer-events]="open() ? 'auto' : 'none'"
      ></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Get the GDG Siliguri app"
        class="fixed inset-x-0 bottom-0 z-[41] box-border flex flex-col items-center gap-5 rounded-t-[36px] bg-srf-2 px-5 pb-[calc(24px+env(safe-area-inset-bottom))] pt-3 text-center text-on-srf transition-[translate] duration-700 ease-emph"
        [style.translate]="open() ? '0 0' : '0 110%'"
      >
        <span class="h-1 w-9 rounded-sm bg-out"></span>
        <div class="mt-1 grid h-[88px] w-[88px] place-items-center bg-white [clip-path:var(--s-cookie9)]">
          <img src="assets/images/gdg.png" alt="" class="h-[76px] w-[76px]" />
        </div>
        <div class="flex flex-col gap-2">
          <b class="font-urbanist text-[32px] font-light leading-none tracking-[-.03em]"
            >Get the <b class="font-extrabold">GDG Siliguri</b> app</b
          >
          <span class="font-manrope text-[15px] font-medium leading-normal text-on-srf-v"
            >Events, tickets and DevFest updates on your phone.</span
          >
        </div>
        <div class="flex w-full max-w-[420px] flex-col gap-1">
          <a
            [href]="playStoreUrl"
            (click)="dismiss()"
            class="flex h-[60px] items-center justify-center gap-2.5 rounded-[30px_30px_10px_10px] bg-pri font-urbanist text-[17px] font-extrabold text-on-pri no-underline transition-[border-radius,scale] duration-500 ease-emph hover:text-on-pri active:rounded-[30px] active:[scale:.97]"
            ><span class="ms text-[22px]">shop</span>Download on Google Play</a
          >
          <button
            type="button"
            (click)="dismiss()"
            class="h-[60px] cursor-pointer rounded-[10px_10px_30px_30px] border-0 bg-srf-4 font-urbanist text-[17px] font-extrabold text-on-srf transition-[border-radius,scale] duration-500 ease-emph active:rounded-[30px] active:[scale:.97]"
          >
            Continue in browser
          </button>
        </div>
      </div>
    }
  `,
})
export class AppInstallSheetComponent {
  readonly enabled = input.required<boolean>();

  protected readonly playStoreUrl = PLAY_STORE_URL;
  protected readonly narrow = signal(false);
  protected readonly open = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const query = matchMedia('(max-width: 899px)');
      const sync = () => this.narrow.set(query.matches);
      sync();
      query.addEventListener('change', sync);
      const timer = this.hasBeenSeen()
        ? undefined
        : setTimeout(() => this.open.set(true), OPEN_DELAY_MS);
      destroyRef.onDestroy(() => {
        query.removeEventListener('change', sync);
        clearTimeout(timer);
      });
    });
  }

  protected dismiss(): void {
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {}
    this.open.set(false);
  }

  private hasBeenSeen(): boolean {
    try {
      return localStorage.getItem(SEEN_KEY) === '1';
    } catch {
      return false;
    }
  }
}
