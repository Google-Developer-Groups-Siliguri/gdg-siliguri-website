import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { M3ShapeComponent } from './ui/m3-shape/m3-shape';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, RouterLink, M3ShapeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block overflow-x-clip' },
  template: `
    <section class="page-container grid items-center gap-12 pb-8 pt-6 md:pt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div class="flex animate-rise-in flex-col items-start gap-6">
        <span class="m3-chip bg-surface-container-low">
          <span class="flex gap-1" aria-hidden="true">
            <span class="h-2 w-2 rounded-full bg-brand-blue"></span>
            <span class="h-2 w-2 rounded-full bg-brand-red"></span>
            <span class="h-2 w-2 rounded-full bg-brand-yellow"></span>
            <span class="h-2 w-2 rounded-full bg-brand-green"></span>
          </span>
          North Bengal &amp; Sikkim
        </span>

        <h1 class="text-[2.75rem] font-medium leading-[1.08] tracking-tight text-on-surface sm:text-display-lg lg:text-[4rem] lg:leading-[1.05]">
          <span class="text-g-blue">Learn</span>,
          <span class="text-g-red">build</span> and
          <span class="text-g-green">grow</span> with developers near you
        </h1>

        <p class="max-w-xl text-body-lg text-on-surface-variant md:text-title-lg md:font-normal">
          {{ description }}
        </p>

        <div class="flex flex-wrap gap-3 pt-2">
          <a routerLink="/blogs" class="m3-btn m3-btn-md m3-btn-outlined">Read our blogs</a>
          <a routerLink="/devfest" class="m3-btn m3-btn-md m3-btn-filled">
            Explore DevFest
            <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-md lg:max-w-none">
        <app-m3-shape
          shape="cookie9"
          class="absolute -left-6 -top-8 w-28 animate-spin-slow text-brand-yellow md:w-36"
        />
        <app-m3-shape
          shape="clover4"
          class="absolute -bottom-8 -right-4 w-32 animate-spin-slow text-brand-green [animation-direction:reverse] md:w-40"
        />
        <app-m3-shape shape="circle" class="absolute -right-5 top-10 w-12 text-brand-red md:-right-7 md:w-16" />
        <app-m3-shape shape="pill" class="absolute -left-8 bottom-10 w-20 rotate-[-30deg] text-brand-blue md:-left-12 md:w-28" />

        <div class="relative rounded-m3-2xl bg-white p-8 shadow-elevation-1 md:p-12">
          <img
            ngSrc="assets/images/gdg-logo.webp"
            width="991"
            height="788"
            priority
            class="h-auto w-full"
            alt="GDG Siliguri logo illustrated with Siliguri's toy train, momos, mountains and the Coronation Bridge"
          />
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly description =
    'GDG Siliguri is a community of student and professional developers. We run tech talks, hackathons, codelabs and workshops to empower the local tech community.';
}
