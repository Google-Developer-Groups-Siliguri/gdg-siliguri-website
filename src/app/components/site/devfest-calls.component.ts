import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { CallCard } from 'src/app/shared/view-models';

const CALL_RADII = [
  '40px 40px 40px 12px',
  '40px 12px 40px 40px',
  '12px 40px 40px 40px',
  '40px 40px 12px 40px',
];

@Component({
  selector: 'app-devfest-calls',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-3">
      @for (call of calls(); track call.key; let i = $index) {
        @if (call.open) {
          <a
            [appReveal]="i % 4"
            [href]="call.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group t-lift box-border flex min-h-[260px] flex-col justify-between gap-7 bg-srf-2 p-6 text-on-srf no-underline hover:!rounded-[36px] hover:bg-srf-3 hover:text-on-srf hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,.45)] hover:[translate:0_-6px]"
            [style.border-radius]="radius(i)"
          >
            <div class="flex items-start justify-between gap-3">
              <span
                class="ms grid h-16 w-16 flex-none place-items-center bg-pri text-[28px] text-on-pri transition-[clip-path] duration-[800ms] ease-emph group-hover:![clip-path:var(--s-circle)]"
                [style.clip-path]="'var(--s-' + call.shape + ')'"
                >{{ call.icon }}</span
              >
              <span
                class="flex h-8 items-center gap-1.5 rounded-2xl bg-pri-c px-3.5 font-manrope text-xs font-extrabold text-on-pri-c"
                ><span
                  class="h-2 w-2 rounded bg-current [animation:pulse_1.6s_ease-in-out_infinite]"
                ></span
                >Open</span
              >
            </div>
            <div class="flex flex-col gap-2">
              <b
                class="font-urbanist text-[clamp(24px,2.2vw,28px)] font-light leading-[1.05] tracking-[-.02em]"
                >{{ call.lead }} <b class="font-extrabold">{{ call.rest }}</b></b
              >
              <span class="font-manrope text-sm leading-[1.5] text-on-srf-v">{{ call.body }}</span>
              <span
                class="mt-2 flex items-center gap-1.5 font-urbanist text-base font-extrabold text-pri"
                >Open the form<span
                  class="ms text-xl transition-[translate] duration-500 ease-spring group-hover:[translate:3px_-3px]"
                  >arrow_outward</span
                ></span
              >
            </div>
          </a>
        } @else {
          <div
            [appReveal]="i % 4"
            aria-disabled="true"
            class="box-border flex min-h-[260px] flex-col justify-between gap-7 border-[1.5px] border-dashed border-out-v p-6 text-on-srf-v"
            [style.border-radius]="radius(i)"
          >
            <div class="flex items-start justify-between gap-3">
              <span
                class="ms grid h-16 w-16 flex-none place-items-center bg-srf-3 text-[28px]"
                [style.clip-path]="'var(--s-' + call.shape + ')'"
                >{{ call.icon }}</span
              >
              <span
                class="grid h-8 place-items-center rounded-2xl border border-solid border-out px-3.5 font-manrope text-xs font-bold"
                >Closed</span
              >
            </div>
            <div class="flex flex-col gap-2">
              <b
                class="font-urbanist text-[clamp(24px,2.2vw,28px)] font-light leading-[1.05] tracking-[-.02em]"
                >{{ call.lead }} <b class="font-extrabold">{{ call.rest }}</b></b
              >
              <span class="font-manrope text-sm leading-[1.5]"
                >This form isn't taking responses right now.</span
              >
            </div>
          </div>
        }
      }
    </div>
  `,
})
export class DevfestCallsComponent {
  readonly calls = input.required<CallCard[]>();

  protected radius(index: number): string {
    return CALL_RADII[index % CALL_RADII.length];
  }
}
