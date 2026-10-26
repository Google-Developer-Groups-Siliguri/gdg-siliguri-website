import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeoService } from 'src/app/services/seo.service';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { SiteContentService } from 'src/app/services/site-content.service';
import { DEFAULT_EMAIL, DEFAULT_JOIN_URL } from 'src/app/shared/content';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, ScrollWeightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="wrap flex flex-col gap-[clamp(56px,7vw,96px)] pb-10 pt-[clamp(40px,7vw,88px)]"
    >
      <div class="flex flex-wrap items-center gap-10">
        <div class="flex min-w-0 flex-[2_1_520px] flex-col gap-7">
          <h1
            appScrollWeight
            appReveal="0"
            class="m-0 font-urbanist text-[clamp(48px,8vw,120px)] font-extralight leading-[.86] tracking-[-.055em]"
          >
            Google Developers Group, <b class="font-black text-pri">Siliguri</b>
          </h1>
          <p
            appReveal="1"
            class="m-0 font-urbanist text-[clamp(22px,2.6vw,34px)] font-light leading-[1.15] tracking-[-.02em]"
          >
            Of the Developers, By the Developers, For the Developers
          </p>
        </div>
        <div appReveal="2" class="grid flex-[1_1_260px] place-items-center">
          <div
            class="grid aspect-square w-[min(100%,320px)] place-items-center bg-white transition-[scale] duration-700 ease-spring [clip-path:var(--s-cookie9)] hover:[scale:1.05]"
          >
            <img src="assets/images/gdg.png" alt="GDG Siliguri logo" class="w-[72%]" />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <p
          appReveal="0"
          class="m-0 flex-[1_1_380px] rounded-[48px_12px_48px_48px] bg-srf-2 p-[clamp(24px,3vw,40px)] font-manrope text-[17px] leading-[1.65]"
        >
          Google Developer Group Siliguri is a Siliguri community-run meetup for developers
          interested in resources and technology from Google Developers. We try to engage student
          developers, fresh graduates and professionals through our hack events &amp; meetups.
        </p>
        <p
          appReveal="1"
          class="m-0 flex-[1_1_380px] rounded-[12px_48px_48px_48px] bg-srf-2 p-[clamp(24px,3vw,40px)] font-manrope text-[17px] leading-[1.65]"
        >
          The motive is to create a local ecosystem of programmers &amp; hackers in and around
          Siliguri. The technology awareness is main goal for first few years of the group. To put
          it in a nutshell, we are a community that organises tech talks, workshops, bootcamps,
          Google flagship events where programmers meet to discuss and work with several Google
          developer resources and products.
        </p>
      </div>

      <div
        appReveal="0"
        class="flex flex-wrap items-center justify-between gap-7 rounded-[clamp(40px,6vw,72px)] bg-pri-c p-[clamp(32px,5vw,64px)] max-sm:p-6 text-on-pri-c"
      >
        <div class="flex flex-[1_1_400px] flex-col gap-5">
          <h2 class="display-md">Say <b class="!font-black">hello</b></h2>
          <div role="group" class="flex flex-wrap gap-1 max-sm:flex-col">
            <a
              [href]="joinUrl()"
              class="t-press flex h-[60px] items-center rounded-[30px_10px_10px_30px] max-sm:justify-center max-sm:rounded-[30px_30px_10px_10px] bg-pri px-7 font-urbanist text-[17px] font-extrabold text-on-pri no-underline hover:rounded-[30px] hover:text-on-pri"
              >Contact Us</a
            >
            <a
              [href]="'mailto:' + email()"
              class="t-press flex h-[60px] items-center gap-2 rounded-[10px_30px_30px_10px] max-sm:h-auto max-sm:min-h-[60px] max-sm:justify-center max-sm:rounded-[10px_10px_30px_30px] max-sm:px-4 max-sm:py-3 max-sm:text-center max-sm:text-[15px] bg-srf-0 px-6 font-manrope text-base font-bold text-on-srf no-underline hover:rounded-[30px] hover:text-on-srf"
              ><span class="ms text-xl">mail</span>Questions? please email us</a
            >
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          @for (social of socials(); track social.url) {
            <a
              [href]="social.url"
              [attr.aria-label]="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="social-dot h-[60px] w-[60px]"
              ><img [src]="social.icon" alt="" class="h-6"
            /></a>
          }
        </div>
      </div>
    </main>
  `,
})
export class AboutComponent {
  private readonly site = toSignal(inject(SiteContentService).site());

  protected readonly joinUrl = computed(() => this.site()?.joinUrl || DEFAULT_JOIN_URL);
  protected readonly email = computed(() => this.site()?.email || DEFAULT_EMAIL);
  protected readonly socials = computed(() => this.site()?.socials ?? []);

  constructor() {
    inject(SeoService).update({
      title: 'About · GDG Siliguri',
      description:
        'Google Developer Group Siliguri is a community-run meetup for developers in North Bengal and Sikkim.',
      path: '/about',
    });
  }
}
