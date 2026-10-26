import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeoService } from 'src/app/services/seo.service';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { SiteContentService } from 'src/app/services/site-content.service';
import { ik, srcset } from 'src/app/shared/image';

const VOLUNTEER_SHAPES = ['cookie9', 'clover4', 'arch', 'cookie6', 'pentagon', 'sunny'];

@Component({
  selector: 'app-team',
  imports: [RevealDirective, ScrollWeightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="wrap flex flex-col gap-[clamp(56px,7vw,96px)] pb-10 pt-[clamp(40px,7vw,88px)]"
    >
      <div class="flex flex-wrap items-end justify-between gap-6">
        <h1 appScrollWeight appReveal="0" class="display-lg">
          The<br /><b class="font-black text-pri">crew</b>
        </h1>
        @if (members().length) {
          <p
            appReveal="1"
            class="m-0 max-w-[380px] font-manrope text-base leading-[1.6] text-on-srf-v"
          >
            {{ organizers().length }} organizers and {{ volunteers().length }} volunteers who run
            GDG Siliguri and DevFest.
          </p>
        }
      </div>

      @if (organizers().length) {
        <section class="flex flex-col gap-5">
          <span class="eyebrow">ORGANIZERS</span>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-4">
            @for (m of organizers(); track m.name; let i = $index) {
              <div
                [appReveal]="i"
                class="group t-lift relative aspect-[4/5] overflow-hidden rounded-[38px] bg-srf-3 hover:shadow-[0_28px_48px_-26px_rgba(0,0,0,.55)] hover:[translate:0_-8px]"
              >
                <img
                  [src]="ik(m.photo.url, { w: 640, h: 800, fit: 'face' })"
                  [attr.srcset]="srcset(m.photo.url, [320, 480, 640], { fit: 'face', aspect: 0.8 }) || null"
                  sizes="(min-width: 600px) 320px, 100vw"
                  [alt]="m.photo.alt"
                  [attr.width]="m.photo.width ?? null"
                  [attr.height]="m.photo.height ?? null"
                  loading="lazy"
                  class="absolute inset-0 h-full w-full object-cover transition-[scale] duration-[1400ms] ease-emph group-hover:[scale:1.07]"
                />
                <span
                  class="absolute left-3.5 top-3.5 grid h-[30px] place-items-center rounded-[15px] bg-[#FFE7A5] px-3 font-manrope text-xs font-extrabold text-[#4A3500]"
                  >Organizer</span
                >
                <div
                  class="absolute inset-x-2.5 bottom-2.5 flex flex-col gap-1.5 rounded-[28px] bg-[color-mix(in_srgb,var(--srf)_72%,transparent)] px-[18px] py-4 [-webkit-backdrop-filter:blur(18px)_saturate(1.6)] [backdrop-filter:blur(18px)_saturate(1.6)]"
                >
                  <div class="font-urbanist text-[26px] font-light leading-none tracking-[-.02em]">
                    {{ m.first }} <b class="font-extrabold">{{ m.last }}</b>
                  </div>
                  <span class="font-manrope text-[13px] font-medium text-on-srf-v">{{
                    m.desc
                  }}</span>
                  <div class="mt-1 flex gap-1">
                    @for (link of m.links; track link.url) {
                      <a
                        [href]="link.url"
                        [title]="link.label"
                        [attr.aria-label]="m.name + ' on ' + link.label"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="box-border grid h-8 min-w-[32px] place-items-center rounded-2xl bg-srf-4 px-2.5 font-manrope text-xs font-extrabold text-on-srf no-underline transition-[background-color] duration-300 hover:bg-pri-c hover:text-on-pri-c"
                        >{{ link.short }}</a
                      >
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </section>
      }

      @if (volunteers().length) {
        <section class="flex flex-col gap-5">
          <span class="eyebrow">VOLUNTEERS</span>
          <div
            class="grid grid-cols-[repeat(auto-fill,minmax(min(42%,180px),1fr))] gap-x-4 gap-y-7"
          >
            @for (m of volunteers(); track m.name; let i = $index) {
              <a
                [appReveal]="i % 5"
                [href]="m.links[0]?.url || null"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex flex-col items-center gap-3 text-center text-on-srf no-underline hover:text-on-srf"
              >
                <div
                  class="relative aspect-square w-full overflow-hidden bg-srf-3"
                  [style.clip-path]="'var(--s-' + shapes[i % shapes.length] + ')'"
                >
                  <img
                    [src]="ik(m.photo.url, { w: 400, h: 400, fit: 'face' })"
                    [attr.srcset]="srcset(m.photo.url, [200, 400], { fit: 'face', aspect: 1 }) || null"
                    sizes="200px"
                    [alt]="m.photo.alt"
                    [attr.width]="m.photo.width ?? null"
                    [attr.height]="m.photo.height ?? null"
                    loading="lazy"
                    class="t-zoom absolute inset-0 h-full w-full object-cover group-hover:[scale:1.1]"
                  />
                </div>
                <div class="flex flex-col gap-[3px]">
                  <b class="font-urbanist text-lg font-extrabold leading-[1.2]">{{ m.name }}</b>
                  <span class="font-manrope text-xs font-medium text-on-srf-v">{{ m.desc }}</span>
                </div>
              </a>
            }
          </div>
        </section>
      }
    </main>
  `,
})
export class TeamComponent {
  protected readonly shapes = VOLUNTEER_SHAPES;

  protected readonly ik = ik;
  protected readonly srcset = srcset;

  protected readonly members = toSignal(inject(SiteContentService).team(), { initialValue: [] });
  protected readonly organizers = computed(() =>
    this.members().filter((m) => m.role === 'organizer')
  );
  protected readonly volunteers = computed(() =>
    this.members().filter((m) => m.role === 'volunteer')
  );

  constructor() {
    inject(SeoService).update({
      title: 'Team · GDG Siliguri',
      description: 'Meet the organizers and volunteers who run GDG Siliguri and DevFest Siliguri.',
      path: '/team',
    });
  }
}
