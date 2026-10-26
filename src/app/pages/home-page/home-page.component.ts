import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FaqAccordionComponent } from 'src/app/components/site/faq-accordion.component';
import { HeroIllustrationComponent } from 'src/app/components/site/hero-illustration.component';
import { PartnerMarqueeComponent } from 'src/app/components/site/partner-marquee.component';
import { injectCountdown } from 'src/app/motion/countdown';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { SiteContentService } from 'src/app/services/site-content.service';
import { DEFAULT_JOIN_URL, splitEventRows, splitName } from 'src/app/shared/content';
import { ik } from 'src/app/shared/image';

const CARD_RADII = ['56px 56px 56px 14px', '56px 14px 56px 56px', '14px 56px 56px 56px'];
const TESTIMONIAL_COLORS = [
  { bg: 'var(--ter-c)', fg: 'var(--on-ter-c)' },
  { bg: 'var(--srf-3)', fg: 'var(--on-srf)' },
  { bg: 'var(--pri-c)', fg: 'var(--on-pri-c)' },
];
const TIER_DOTS: Partial<Record<string, string>> = {
  platinum: '#4285F4',
  gold: '#F9AB00',
  silver: '#9AA0A6',
  bronze: '#B87333',
  community: '#34A853',
  venue: '#EA4335',
  media: '#A142F4',
};
const WHAT_WE_DO = [
  { title: 'Tech talks', shape: 'cookie9', color: 'var(--pri)' },
  { title: 'Hackathons', shape: 'sunny', color: 'var(--ter)' },
  { title: 'Codelabs', shape: 'clover4', color: 'var(--sec)' },
  { title: 'Workshops', shape: 'arch', color: 'var(--pri)' },
];

@Component({
  selector: 'app-home-page',
  imports: [
    FaqAccordionComponent,
    HeroIllustrationComponent,
    PartnerMarqueeComponent,
    RevealDirective,
    RouterLink,
    ScrollWeightDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="flex flex-col gap-[clamp(72px,10vw,136px)] pb-10">
      <section
        class="wrap flex flex-wrap items-center gap-[clamp(32px,5vw,56px)] pt-[clamp(40px,7vw,88px)]"
      >
        <div class="relative z-[1] flex min-w-0 flex-[1_1_520px] flex-col gap-7">
          <div
            appReveal="0"
            class="flex items-center gap-2.5 font-manrope text-[13px] font-bold tracking-[.14em] text-pri"
          >
            <span class="h-4 w-4 flex-none bg-pri [clip-path:var(--s-sunny)]"></span>GOOGLE
            DEVELOPER GROUPS
          </div>
          <h1 appScrollWeight appReveal="1" class="display-xl">
            GDG<br /><b class="font-black text-pri">Siliguri</b>
          </h1>
          <p
            appReveal="2"
            class="m-0 max-w-[560px] font-urbanist text-[clamp(22px,2.6vw,34px)] font-light leading-[1.15] tracking-[-.02em]"
          >
            Of the <b class="font-extrabold">Developers</b>, By the
            <b class="font-extrabold">Developers</b>, For the
            <b class="font-extrabold">Developers</b>
          </p>
          <div appReveal="3" role="group" class="flex flex-wrap gap-1 max-sm:flex-col">
            <a
              [href]="joinUrl()"
              class="t-press flex h-16 items-center gap-2.5 rounded-[32px_10px_10px_32px] max-sm:justify-center max-sm:rounded-[32px_32px_10px_10px] bg-pri px-[30px] font-urbanist text-lg font-extrabold text-on-pri no-underline hover:rounded-[32px] hover:text-on-pri"
              ><span class="ms text-[22px]">group_add</span>Join the community</a
            >
            <a
              routerLink="/events"
              class="t-press flex h-16 items-center gap-2 rounded-[10px_32px_32px_10px] max-sm:justify-center max-sm:rounded-[10px_10px_32px_32px] bg-srf-3 px-7 font-urbanist text-lg font-extrabold text-on-srf no-underline hover:rounded-[32px] hover:bg-srf-4 hover:text-on-srf"
              >See events<span class="ms text-[22px]">arrow_forward</span></a
            >
          </div>
        </div>
        <app-hero-illustration />
      </section>

      @if (devfestCard(); as ed) {
        <section class="wrap-wide">
          <div
            appReveal="0"
            class="relative flex flex-wrap items-center gap-[clamp(28px,4vw,48px)] overflow-hidden rounded-[clamp(36px,5vw,64px)] bg-pri-c p-[clamp(28px,5vw,56px)] text-on-pri-c"
          >
            <div
              class="absolute -right-[120px] -top-[120px] h-[360px] w-[360px] bg-pri opacity-[.22] [clip-path:var(--s-cookie9)]"
            ></div>
            <div class="relative flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
              <span
                class="flex items-center gap-2 font-manrope text-xs font-bold tracking-[.14em]"
              >
                @if (ed.isUpcoming) {
                  <span
                    class="h-2 w-2 rounded bg-current [animation:pulse_1.6s_ease-in-out_infinite]"
                  ></span>
                }
                THE BIG ONE · {{ ed.weekday.slice(0, 3).toUpperCase() }} {{ ed.day }}
                {{ ed.month.toUpperCase() }} {{ ed.year }}
              </span>
              <h2
                class="m-0 font-urbanist text-[clamp(48px,6.4vw,96px)] font-extralight leading-[.86] tracking-[-.05em]"
              >
                Dev<b class="font-black">Fest</b> Siliguri <b class="font-black">{{ ed.year }}</b>
              </h2>
              @if (ed.theme || ed.summary) {
                <p class="m-0 max-w-[520px] font-manrope text-base font-medium leading-[1.55]">
                  {{ ed.theme || ed.summary }}
                </p>
              }
            </div>
            <div class="relative flex min-w-0 flex-[1_1_360px] flex-col gap-4">
              @if (ed.isUpcoming) {
                <div role="group" aria-label="Time left" class="grid grid-cols-4 gap-1">
                  @for (
                    unit of countdownUnits();
                    track unit.label;
                    let first = $first, last = $last
                  ) {
                    <div
                      class="flex flex-col items-center bg-srf-0 py-4 text-on-srf"
                      [style.border-radius]="
                        first ? '28px 8px 8px 28px' : last ? '8px 28px 28px 8px' : '8px'
                      "
                    >
                      <b
                        class="font-manrope text-[clamp(30px,3.4vw,44px)] font-black leading-none tabular-nums"
                        >{{ unit.value }}</b
                      >
                      <span class="font-manrope text-xs font-semibold text-on-srf-v">{{
                        unit.label
                      }}</span>
                    </div>
                  }
                </div>
              } @else {
                <div class="flex flex-col gap-1 rounded-[28px] bg-srf-0 px-6 py-5 text-on-srf">
                  <span class="font-manrope text-[11px] font-bold tracking-[.14em] text-on-srf-v"
                    >THAT'S A WRAP</span
                  >
                  <b class="font-urbanist text-xl font-extrabold"
                    >{{ ed.dateLabel }} {{ ed.year }}@if (ed.venue) {
                      · {{ ed.venue }}
                    }</b
                  >
                </div>
              }
              <div role="group" class="flex flex-wrap gap-1 max-sm:flex-col">
                @if (ed.registrationOpen) {
                  <a
                    [href]="ed.ticketUrl"
                    class="t-press flex h-[60px] flex-[1_1_200px] items-center justify-center gap-2.5 rounded-[30px_10px_10px_30px] max-sm:flex-none max-sm:rounded-[30px_30px_10px_10px] bg-pri px-6 font-urbanist text-[17px] font-extrabold text-on-pri no-underline hover:rounded-[30px] hover:text-on-pri"
                    ><span class="ms text-[22px]">confirmation_number</span>Get your ticket</a
                  >
                }
                <a
                  routerLink="/devfest"
                  class="t-press flex h-[60px] flex-[1_1_160px] max-sm:flex-none items-center justify-center gap-2 bg-srf-0 px-6 font-urbanist text-[17px] font-extrabold text-on-srf no-underline hover:rounded-[30px] hover:text-on-srf"
                  [class]="ed.registrationOpen ? 'rounded-[10px_30px_30px_10px] max-sm:rounded-[10px_10px_30px_30px]' : 'rounded-[30px]'"
                  >{{ ed.isUpcoming ? "What's on" : 'See how it went'
                  }}<span class="ms text-[22px]">arrow_forward</span></a
                >
              </div>
            </div>
          </div>
        </section>
      }

      <section class="wrap flex flex-wrap items-start gap-[clamp(32px,5vw,64px)]">
        <div class="flex min-w-0 flex-[1_1_360px] flex-col gap-[22px]">
          <h2 appReveal="0" class="display-md">What we <b>do</b></h2>
          <p appReveal="1" class="m-0 font-manrope text-base leading-[1.65] text-on-srf-v">
            {{ site()?.description }}
          </p>
          <a appReveal="2" routerLink="/about" class="pill-btn self-start"
            >About us<span class="ms">chevron_right</span></a
          >
        </div>
        <div
          class="grid min-w-0 flex-[1.3_1_460px] grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] gap-3"
        >
          @for (item of whatWeDo; track item.title; let i = $index) {
            <div
              [appReveal]="i"
              class="t-lift box-border flex aspect-[1.15] flex-col justify-between bg-srf-2 p-6 hover:bg-srf-3 hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,.45)] hover:[translate:0_-6px]"
              [style.border-radius]="radii[i % 3]"
            >
              <span
                class="h-14 w-14"
                [style.clip-path]="'var(--s-' + item.shape + ')'"
                [style.background]="item.color"
              ></span>
              <b
                class="font-urbanist text-[clamp(22px,2vw,28px)] font-extrabold leading-[1.05] tracking-[-.01em]"
                >{{ item.title }}</b
              >
            </div>
          }
        </div>
      </section>

      @if (meetupsShown()) {
        <section class="wrap flex flex-col gap-7">
          <div appReveal="0" class="flex flex-wrap items-end justify-between gap-4">
            <h2 class="display-md">Coming <b class="text-pri">up</b></h2>
            <a routerLink="/events" class="pill-btn"
              >All events<span class="ms">chevron_right</span></a
            >
          </div>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-3">
            @for (meetup of upcoming(); track meetup.title + meetup.at; let i = $index) {
              <a
                [appReveal]="i"
                [href]="meetup.url || null"
                target="_blank"
                rel="noopener noreferrer"
                class="t-lift flex cursor-pointer flex-col gap-7 rounded-[36px_36px_36px_10px] bg-srf-2 p-6 text-on-srf no-underline hover:rounded-[36px] hover:bg-srf-3 hover:text-on-srf hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,.45)] hover:[translate:0_-6px]"
              >
                <div class="flex items-start justify-between">
                  <div
                    class="flex h-[84px] w-[84px] flex-col items-center justify-center bg-pri text-on-pri [clip-path:var(--s-cookie6)]"
                  >
                    <b class="font-manrope text-[28px] font-extrabold leading-none">{{
                      meetup.day
                    }}</b>
                    <span class="font-manrope text-[11px] font-bold tracking-[.12em]">{{
                      meetup.mon
                    }}</span>
                  </div>
                  <span
                    class="grid h-8 place-items-center rounded-2xl border border-solid border-out px-3.5 font-manrope text-xs font-bold"
                    >{{ meetup.tag }}</span
                  >
                </div>
                <div class="flex flex-col gap-1.5">
                  <b class="font-urbanist text-[22px] font-bold leading-[1.2] tracking-[-.01em]">{{
                    meetup.title
                  }}</b>
                  @if (meetup.where) {
                    <span
                      class="flex items-center gap-1.5 font-manrope text-sm font-medium text-on-srf-v"
                      ><span class="ms text-lg">location_on</span>{{ meetup.where }}</span
                    >
                  }
                </div>
              </a>
            } @empty {
              @if (edition()?.isUpcoming) {
                <a
                  appReveal="0"
                  routerLink="/devfest"
                  class="t-lift flex cursor-pointer flex-col gap-7 rounded-[36px_36px_36px_10px] bg-srf-2 p-6 text-on-srf no-underline hover:rounded-[36px] hover:bg-srf-3 hover:text-on-srf hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,.45)] hover:[translate:0_-6px]"
                >
                  <div class="flex items-start justify-between">
                    <div
                      class="flex h-[84px] w-[84px] flex-col items-center justify-center bg-pri text-on-pri [clip-path:var(--s-cookie6)]"
                    >
                      <b class="font-manrope text-[28px] font-extrabold leading-none">{{
                        edition()?.day
                      }}</b>
                      <span class="font-manrope text-[11px] font-bold tracking-[.12em]">{{
                        edition()?.month?.toUpperCase()
                      }}</span>
                    </div>
                    <span
                      class="grid h-8 place-items-center rounded-2xl border border-solid border-out px-3.5 font-manrope text-xs font-bold"
                      >Conference</span
                    >
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <b class="font-urbanist text-[22px] font-bold leading-[1.2] tracking-[-.01em]">{{
                      edition()?.name
                    }}</b>
                    @if (edition()?.venue) {
                      <span
                        class="flex items-center gap-1.5 font-manrope text-sm font-medium text-on-srf-v"
                        ><span class="ms text-lg">location_on</span>{{ edition()?.venue }}</span
                      >
                    }
                  </div>
                </a>
              } @else {
                <a
                  appReveal="0"
                  [href]="joinUrl()"
                  class="t-lift flex flex-col gap-7 rounded-[36px_36px_36px_10px] bg-srf-2 p-6 text-on-srf no-underline hover:rounded-[36px] hover:bg-srf-3 hover:text-on-srf hover:[translate:0_-6px]"
                >
                  <span class="h-[84px] w-[84px] bg-pri [clip-path:var(--s-cookie6)]"></span>
                  <div class="flex flex-col gap-1.5">
                    <b class="font-urbanist text-[22px] font-bold leading-[1.2] tracking-[-.01em]"
                      >More meetups are on the way</b
                    >
                    <span class="font-manrope text-sm font-medium text-on-srf-v"
                      >Join the community to hear about them first.</span
                    >
                  </div>
                </a>
              }
            }
          </div>
        </section>
      }

      @if (testimonials().length) {
        <section class="flex flex-col gap-7">
          <div class="wrap flex flex-wrap items-end justify-between gap-4">
            <h2 appReveal="0" class="display-md">In their <b>words</b></h2>
            <div class="flex gap-1">
              <button
                type="button"
                (click)="scrollTestimonials(-1)"
                aria-label="Previous"
                class="ms h-14 w-14 cursor-pointer rounded-[28px_10px_10px_28px] border-0 bg-srf-3 text-2xl text-on-srf transition-[border-radius,background-color] duration-[500ms,400ms] ease-emph hover:rounded-[28px] hover:bg-srf-4"
              >
                arrow_back
              </button>
              <button
                type="button"
                (click)="scrollTestimonials(1)"
                aria-label="Next"
                class="ms h-14 w-14 cursor-pointer rounded-[10px_28px_28px_10px] border-0 bg-srf-3 text-2xl text-on-srf transition-[border-radius,background-color] duration-[500ms,400ms] ease-emph hover:rounded-[28px] hover:bg-srf-4"
              >
                arrow_forward
              </button>
            </div>
          </div>
          <div
            #testimonialTrack
            class="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-smooth pb-6 pt-2 [padding-inline:max(var(--gutter),calc((100vw_-_1280px)/2_+_var(--gutter)))] [scroll-padding-inline:max(var(--gutter),calc((100vw_-_1280px)/2_+_var(--gutter)))]"
          >
            @for (t of testimonials(); track t.name; let i = $index) {
              <div
                class="box-border flex w-[min(82vw,400px)] flex-none snap-start flex-col gap-4 p-[clamp(24px,3vw,36px)] transition-[border-radius,translate] duration-700 ease-emph hover:!rounded-[40px] hover:[translate:0_-6px]"
                [style.border-radius]="i % 2 ? '14px 56px 56px 56px' : '56px 14px 56px 56px'"
                [style.background]="testimonialColors[i % 3].bg"
                [style.color]="testimonialColors[i % 3].fg"
              >
                <span class="h-10 font-urbanist text-[88px] font-black leading-[.5]">“</span>
                <b
                  class="font-urbanist text-[clamp(20px,2vw,24px)] font-extrabold leading-[1.15] tracking-[-.01em]"
                  >{{ t.title }}</b
                >
                <span class="flex-1 font-manrope text-[15px] leading-[1.55]">{{ t.text }}</span>
                <span class="font-manrope text-sm font-bold"
                  >{{ t.name }} <span class="font-medium opacity-75">{{ t.event }}</span></span
                >
              </div>
            }
          </div>
        </section>
      }

      @if (gdgFaqs().length) {
        <section class="wrap flex flex-wrap gap-10">
          <h2 appReveal="0" class="display-md flex-[1_1_320px]">New <b>here?</b></h2>
          <app-faq-accordion [items]="gdgFaqs()" [initiallyOpen]="0" />
        </section>
      }

      @if (platinum() || others().length || partners().length) {
        <section class="flex flex-col gap-8">
          <div class="wrap flex flex-col gap-7">
            <h2 appReveal="0" class="display-md">Sponsors &amp; <b>partners</b></h2>
            <div class="flex flex-wrap gap-3">
              @if (platinum(); as plat) {
                <a
                  appReveal="0"
                  [href]="plat.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="t-lift box-border flex min-w-0 flex-[1.3_1_420px] flex-wrap items-center gap-[clamp(20px,3vw,32px)] rounded-[48px] bg-pri-c p-[clamp(20px,3vw,28px)] text-on-pri-c no-underline hover:rounded-[36px] hover:text-on-pri-c hover:[translate:0_-6px]"
                >
                  <div
                    role="img"
                    [attr.aria-label]="plat.name"
                    class="aspect-square w-[clamp(120px,14vw,168px)] flex-none bg-white bg-[length:118%] bg-center bg-no-repeat [clip-path:var(--s-cookie9)]"
                    [style.background-image]="'url(' + ik(plat.logo.url, { w: 336 }) + ')'"
                  ></div>
                  <div class="flex min-w-0 flex-[1_1_200px] flex-col gap-2.5">
                    <span
                      class="grid h-7 place-items-center self-start rounded-[14px] bg-pri px-3 font-manrope text-[11px] font-extrabold tracking-[.14em] text-on-pri"
                      >PLATINUM</span
                    >
                    <b
                      class="font-urbanist text-[clamp(30px,3.4vw,44px)] font-light leading-none tracking-[-.03em]"
                      >{{ plat.lead }} <b class="font-extrabold">{{ plat.rest }}</b></b
                    >
                    @if (plat.host) {
                    <span class="flex items-center gap-1.5 font-manrope text-sm font-semibold"
                      >{{ plat.host }}<span class="ms text-lg">arrow_outward</span></span
                    >
                    }
                  </div>
                </a>
              }
              <div class="flex min-w-0 flex-[1_1_300px] flex-col gap-2">
                @for (g of others(); track g.name; let i = $index, first = $first, last = $last) {
                  <a
                    [appReveal]="i + 1"
                    [href]="g.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-1 items-center gap-4 bg-srf-2 py-2.5 pl-2.5 pr-5 text-on-srf no-underline transition-[translate,background-color,border-radius] duration-[600ms,400ms,600ms] ease-bounce hover:!rounded-[36px] hover:bg-srf-3 hover:text-on-srf hover:[translate:6px_0]"
                    [style.border-radius]="
                      first && !last
                        ? '32px 32px 10px 10px'
                        : last && !first
                          ? '10px 10px 32px 32px'
                          : first && last
                            ? '32px'
                            : '10px'
                    "
                  >
                    <div
                      role="img"
                      [attr.aria-label]="g.name"
                      class="h-16 w-16 flex-none bg-white bg-[length:78%] bg-center bg-no-repeat [clip-path:var(--s-cookie6)]"
                      [style.background-image]="'url(' + ik(g.logo.url, { w: 128 }) + ')'"
                    ></div>
                    <div class="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <b class="font-urbanist text-lg font-extrabold">{{ g.name }}</b>
                      <span
                        class="flex items-center gap-1.5 font-manrope text-[11px] font-bold tracking-[.14em] text-on-srf-v"
                        ><span
                          class="h-2 w-2 rounded"
                          [style.background]="tierDots[g.tier] ?? 'var(--out)'"
                        ></span
                        >{{ g.tierLabel.toUpperCase() }}</span
                      >
                    </div>
                    <span class="ms text-xl text-on-srf-v">arrow_outward</span>
                  </a>
                }
              </div>
            </div>
            @if (partners().length) {
              <span class="eyebrow">COMMUNITY PARTNERS@if (edition(); as ed) { · DEVFEST {{ ed.year }}}</span>
            }
          </div>
          @if (partners().length) {
            <app-partner-marquee [partners]="partners()" />
          }
        </section>
      }

      <section class="wrap-wide">
        <div
          appReveal="0"
          class="box-border flex flex-wrap items-center justify-between gap-8 rounded-[clamp(40px,6vw,72px)] bg-srf-2 p-[clamp(32px,5vw,64px)]"
        >
          <div class="flex flex-[1_1_420px] flex-col gap-[22px]">
            <h2
              appScrollWeight
              class="m-0 font-urbanist text-[clamp(52px,8vw,120px)] font-extralight leading-[.86] tracking-[-.055em]"
            >
              Build with <b class="font-black text-pri">us</b>
            </h2>
            <p class="m-0 max-w-[480px] font-manrope text-base leading-[1.6] text-on-srf-v">
              Talks, hackathons, codelabs and workshops across North Bengal and Sikkim. Joining is
              free.
            </p>
            <div class="flex flex-wrap gap-2">
              @for (social of socials(); track social.url) {
                <a
                  [href]="social.url"
                  [attr.aria-label]="social.name"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-dot h-[52px] w-[52px]"
                  ><img [src]="social.icon" alt="" class="h-[22px]"
                /></a>
              }
            </div>
          </div>
          <a [href]="joinUrl()" class="flex-none no-underline">
            <span
              class="grid h-[clamp(160px,18vw,220px)] w-[clamp(160px,18vw,220px)] place-items-center bg-pri font-urbanist text-4xl font-black text-on-pri transition-[clip-path,scale] duration-[800ms,700ms] ease-emph [clip-path:var(--s-sunny)] hover:[clip-path:var(--s-circle)] hover:[scale:1.05]"
              >Join</span
            >
          </a>
        </div>
      </section>
    </main>
  `,
})
export class HomePageComponent {
  private readonly testimonialTrack = viewChild<ElementRef<HTMLElement>>('testimonialTrack');

  protected readonly radii = CARD_RADII;
  protected readonly whatWeDo = WHAT_WE_DO;
  protected readonly testimonialColors = TESTIMONIAL_COLORS;
  protected readonly tierDots = TIER_DOTS;
  protected readonly ik = ik;

  private readonly view = toSignal(inject(SiteContentService).home());

  protected readonly site = computed(() => this.view()?.site);
  protected readonly edition = computed(() => this.view()?.edition ?? null);
  protected readonly devfestCard = computed(() =>
    this.view()?.eventMode ? this.edition() : null
  );
  private readonly countdown = injectCountdown(() => this.edition()?.startsAt ?? 0);
  protected readonly countdownUnits = computed(() => {
    const c = this.countdown();
    return [
      { label: 'days', value: c.days },
      { label: 'hours', value: c.hours },
      { label: 'min', value: c.minutes },
      { label: 'sec', value: c.seconds },
    ];
  });

  protected readonly joinUrl = computed(() => this.site()?.joinUrl || DEFAULT_JOIN_URL);
  protected readonly socials = computed(() => this.site()?.socials ?? []);

  protected readonly gdgFaqs = computed(() => this.view()?.faqs ?? []);
  protected readonly testimonials = computed(() => this.view()?.testimonials ?? []);
  private readonly sponsors = computed(() =>
    (this.view()?.sponsors ?? []).flatMap((group) => group.sponsors)
  );
  protected readonly platinum = computed(() => {
    const top = this.sponsors().find((s) => s.tier === 'platinum');
    if (!top) {
      return null;
    }
    const { first, last } = splitName(top.name);
    return { ...top, lead: first, rest: last };
  });
  protected readonly others = computed(() => {
    const top = this.platinum();
    return this.sponsors().filter((s) => s.name !== top?.name || s.tier !== top?.tier);
  });
  protected readonly partners = computed(() => this.view()?.partners ?? []);
  protected readonly meetupsShown = computed(() => this.site()?.sections.events ?? true);
  protected readonly upcoming = computed(() =>
    splitEventRows(this.view()?.events ?? [], Date.now()).upcoming.slice(0, 3)
  );

  constructor() {
    inject(Title).setTitle('GDG Siliguri | Google Developer Groups Siliguri');
    inject(Meta).updateTag({
      name: 'description',
      content:
        'GDG Siliguri is the Google Developer Group for North Bengal and Sikkim: tech talks, hackathons, codelabs, workshops and DevFest Siliguri.',
    });
  }

  protected scrollTestimonials(direction: number): void {
    const el = this.testimonialTrack()?.nativeElement;
    el?.scrollBy({ left: direction * Math.min(414, el.clientWidth * 0.85), behavior: 'smooth' });
  }
}
