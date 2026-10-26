import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FaqAccordionComponent } from 'src/app/components/site/faq-accordion.component';
import { PartnerMarqueeComponent } from 'src/app/components/site/partner-marquee.component';
import { injectCountdown } from 'src/app/motion/countdown';
import { ParallaxDirective } from 'src/app/motion/parallax.directive';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { ShapeLoaderDirective } from 'src/app/motion/shape-loader.directive';
import { SiteContentService } from 'src/app/services/site-content.service';
import { safeMapsEmbedUrl } from 'src/app/shared/content';
import { ik, srcset } from 'src/app/shared/image';

const LEAF_RADII = ['40px 12px 40px 12px', '12px 40px 12px 40px'];

@Component({
  selector: 'app-devfest',
  imports: [
    FaqAccordionComponent,
    ParallaxDirective,
    PartnerMarqueeComponent,
    RevealDirective,
    RouterLink,
    ScrollWeightDirective,
    ShapeLoaderDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="flex flex-col gap-[clamp(72px,10vw,136px)] pb-10">
      @if (edition(); as ed) {
        <section
          class="wrap flex flex-wrap items-center gap-[clamp(32px,5vw,56px)] pt-[clamp(40px,7vw,88px)]"
        >
          <div class="relative z-[1] flex min-w-0 flex-[1_1_520px] flex-col gap-7">
            <div
              appReveal="0"
              class="flex items-center gap-2.5 font-manrope text-[13px] font-bold tracking-[.14em] text-pri"
            >
              @if (ed.isUpcoming) {
                <span
                  class="h-2 w-2 rounded bg-current [animation:pulse_1.6s_ease-in-out_infinite]"
                ></span>
              }
              DEVFEST {{ ed.year }} · {{ ed.weekday.slice(0, 3).toUpperCase() }} {{ ed.day }}
              {{ ed.month.toUpperCase() }} · {{ ed.startLabel }} {{ ed.zoneLabel }}
            </div>
            <h1
              appScrollWeight
              appReveal="1"
              class="m-0 font-urbanist text-[clamp(72px,13vw,184px)] font-extralight leading-[.82] tracking-[-.06em]"
            >
              Dev<b class="font-black text-pri">Fest</b><br />Siliguri
            </h1>
            @if (ed.isUpcoming) {
              <div appReveal="2" role="group" aria-label="Time left" class="flex flex-wrap gap-1 max-sm:flex-nowrap">
                <div
                  class="box-border flex h-[clamp(72px,8vw,88px)] items-center gap-1.5 rounded-[44px_10px_10px_44px] max-sm:flex-[1.5_1_0%] max-sm:min-w-0 max-sm:justify-center max-sm:px-2 bg-pri-c px-[clamp(16px,2vw,24px)] text-on-pri-c"
                >
                  <b
                    class="font-manrope text-[clamp(38px,4.4vw,52px)] font-black leading-none tracking-[-.04em] tabular-nums"
                    >{{ countdown().days }}</b
                  ><span class="font-manrope text-sm font-bold">days</span>
                </div>
                @for (unit of hms(); track unit.label) {
                  <div
                    class="box-border flex h-[clamp(72px,8vw,88px)] items-center gap-1 rounded-[10px] max-sm:flex-[1_1_0%] max-sm:min-w-0 max-sm:justify-center max-sm:px-2 bg-srf-3 px-[clamp(14px,1.6vw,20px)]"
                  >
                    <b
                      class="font-manrope text-[clamp(28px,3vw,36px)] font-extrabold leading-none tabular-nums"
                      >{{ unit.value }}</b
                    ><span class="font-manrope text-[13px] font-semibold text-on-srf-v">{{
                      unit.label
                    }}</span>
                  </div>
                }
                <div
                  class="box-border flex h-[clamp(72px,8vw,88px)] items-center gap-1 rounded-[10px_44px_44px_10px] max-sm:flex-[1_1_0%] max-sm:min-w-0 max-sm:justify-center max-sm:px-2 bg-ter-c px-[clamp(14px,1.6vw,22px)] text-on-ter-c"
                >
                  <b
                    class="font-manrope text-[clamp(28px,3vw,36px)] font-extrabold leading-none tabular-nums"
                    >{{ countdown().seconds }}</b
                  ><span class="font-manrope text-[13px] font-semibold">s</span>
                </div>
              </div>
            } @else {
              <div
                appReveal="2"
                class="flex h-[clamp(72px,8vw,88px)] items-center gap-3 self-start rounded-[44px] bg-pri-c px-[clamp(20px,2.4vw,32px)] text-on-pri-c"
              >
                <span class="h-6 w-6 flex-none bg-pri [clip-path:var(--s-sunny)]"></span>
                <b class="font-urbanist text-[clamp(20px,2.2vw,28px)] font-extrabold"
                  >That's a wrap. See you at the next one!</b
                >
              </div>
            }
            <div appReveal="3" role="group" class="flex flex-wrap gap-1">
              @if (ed.registrationOpen) {
                <a
                  [href]="ed.ticketUrl"
                  class="t-press flex h-16 items-center gap-2.5 rounded-[32px_10px_10px_32px] bg-pri px-[30px] font-urbanist text-lg font-extrabold text-on-pri no-underline hover:rounded-[32px] hover:text-on-pri"
                  ><span class="ms text-[22px]">confirmation_number</span>Get your ticket</a
                >
              } @else if (schedule().length) {
                <a
                  routerLink="."
                  fragment="schedule"
                  class="t-press flex h-16 items-center gap-2.5 bg-pri px-[30px] font-urbanist text-lg font-extrabold text-on-pri no-underline hover:rounded-[32px] hover:text-on-pri"
                  [class]="ed.isUpcoming ? 'rounded-[32px_10px_10px_32px]' : 'rounded-[32px]'"
                  >See the schedule<span class="ms text-[22px]">arrow_forward</span></a
                >
              }
              @if (ed.isUpcoming) {
                <a
                  [href]="ed.calendarUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Add to calendar"
                  title="Add to calendar"
                  class="ms t-press grid h-16 w-[72px] place-items-center rounded-[10px_32px_32px_10px] bg-srf-3 text-2xl text-on-srf no-underline hover:rounded-[32px] hover:bg-srf-4 hover:text-on-srf"
                  >event_upcoming</a
                >
              }
            </div>
          </div>
          <div class="relative h-[clamp(360px,44vw,520px)] min-w-0 flex-[1_1_360px]">
            <div
              [appParallax]="-0.04"
              class="absolute right-0 top-0 flex aspect-square w-[min(100%,480px)] flex-col items-center justify-center bg-pri-c text-on-pri-c [clip-path:var(--s-cookie9)]"
            >
              <span
                class="font-manrope text-[clamp(12px,1.2vw,16px)] font-extrabold tracking-[.24em]"
                >{{ ed.weekday.toUpperCase() }}</span
              >
              <b
                class="font-manrope text-[clamp(110px,14vw,200px)] font-black leading-[.8] tracking-[-.07em]"
                >{{ ed.day }}</b
              >
              <span
                class="font-urbanist text-[clamp(34px,4.4vw,60px)] font-light leading-none tracking-[-.02em]"
                >{{ ed.month }} <b class="font-extrabold">{{ ed.year }}</b></span
              >
            </div>
            <a
              appReveal="4"
              [href]="ed.mapsUrl || null"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute bottom-0 left-0 box-border flex w-[min(100%,320px)] flex-col gap-1 rounded-[32px_32px_32px_10px] bg-srf-3 px-6 py-5 text-on-srf no-underline shadow-[0_16px_36px_-18px_rgba(0,0,0,.5)] hover:text-on-srf"
            >
              <span class="font-manrope text-[11px] font-bold tracking-[.14em] text-on-srf-v"
                >WHERE</span
              >
              <b class="font-urbanist text-xl font-extrabold">{{
                ed.venue || 'Venue to be announced'
              }}</b>
              <span class="font-manrope text-[13px] font-medium text-on-srf-v"
                >Siliguri · {{ ed.hoursLabel }}</span
              >
            </a>
          </div>
        </section>

        @if (ed.theme || ed.summary || ed.stack.length || lineupNotice()) {
          <section class="wrap flex flex-wrap gap-3">
            @if (ed.theme || ed.summary || ed.stack.length) {
              <div
                appReveal="0"
                class="box-border flex min-w-0 flex-[2_1_520px] flex-col gap-[22px] rounded-[56px_14px_56px_56px] bg-srf-2 p-[clamp(28px,4vw,48px)]"
              >
                <span class="font-manrope text-xs font-bold tracking-[.14em] text-pri">{{
                  ed.theme ? "THIS YEAR'S THEME" : 'ABOUT DEVFEST ' + ed.year
                }}</span>
                @if (ed.theme) {
                  <h2
                    class="m-0 font-urbanist text-[clamp(32px,4vw,56px)] font-light leading-[.95] tracking-[-.035em]"
                  >
                    {{ themeParts().lead }} <b class="font-extrabold">{{ themeParts().rest }}</b>
                  </h2>
                }
                @if (ed.summary) {
                  <p
                    class="m-0 font-manrope leading-[1.6]"
                    [class]="ed.theme ? 'text-[15px] text-on-srf-v' : 'text-[clamp(17px,1.6vw,20px)]'"
                  >
                    {{ ed.summary }}
                  </p>
                }
                @if (ed.stack.length) {
                  <div class="flex flex-wrap gap-1.5">
                    @for (tech of ed.stack; track tech) {
                      <span
                        class="flex h-[38px] items-center rounded-[19px] border border-solid border-out px-4 font-manrope text-sm font-semibold transition-[background-color,border-color,translate] duration-[400ms,400ms,500ms] ease-spring hover:border-transparent hover:bg-srf-4 hover:[translate:0_-2px]"
                        >{{ tech }}</span
                      >
                    }
                  </div>
                }
              </div>
            }
            @if (lineupNotice(); as notice) {
              <div
                appReveal="1"
                class="box-border flex min-w-0 flex-[1_1_280px] flex-col justify-between gap-7 rounded-[14px_56px_56px_56px] bg-pri-c p-[clamp(28px,4vw,40px)] text-on-pri-c"
              >
                <div
                  [appShapeLoader]="['cookie9', 'clover4', 'sunny', 'cookie6', 'pentagon']"
                  class="h-20 w-20 bg-pri"
                ></div>
                <div class="flex flex-col gap-2">
                  <b class="font-urbanist text-[28px] font-extrabold leading-[1.1]">{{ notice }}</b>
                  <span class="font-manrope text-[15px] leading-[1.55]"
                    >We'll post the {{ ed.year }} lineup here as soon as it's ready.</span
                  >
                </div>
              </div>
            }
          </section>
        }
      }

      @if (schedule().length) {
        <section id="schedule" class="wrap flex flex-wrap items-start gap-[clamp(32px,5vw,72px)]">
          <div class="top-[110px] flex min-w-0 flex-[1_1_300px] flex-col gap-6 min-[900px]:sticky">
            <h2
              appReveal="0"
              class="m-0 font-urbanist text-[clamp(44px,6vw,88px)] font-extralight leading-[.88] tracking-[-.05em]"
            >
              {{ recap().year }}, <b class="font-extrabold">hour by hour</b>
            </h2>
            <p appReveal="1" class="m-0 font-manrope text-[15px] leading-[1.6] text-on-srf-v">
              {{ scheduleIntro() }}
              @if (perks().length) {
                Perks for every attendee:
              }
            </p>
            @if (perks().length) {
              <div appReveal="2" class="flex flex-wrap gap-1.5">
                @for (perk of perks(); track perk) {
                  <span
                    class="flex h-9 items-center rounded-[18px] bg-srf-2 px-3.5 font-manrope text-[13px] font-semibold"
                    >{{ perk }}</span
                  >
                }
              </div>
            }
          </div>
          <div
            class="relative flex min-w-0 flex-[2_1_520px] flex-col gap-2 pl-[clamp(28px,3vw,36px)]"
          >
            <div class="absolute bottom-6 left-[11px] top-6 w-0.5 bg-out-v"></div>
            @for (slot of schedule(); track $index) {
              <div appReveal="0" class="relative">
                <span
                  class="absolute left-[calc(-1*clamp(28px,3vw,36px))] top-[22px] h-6 w-6 [clip-path:var(--s-cookie6)]"
                  [style.background]="slot.isTalk ? 'var(--pri)' : 'var(--out-v)'"
                ></span>
                @if (slot.isTalk) {
                  <div
                    class="flex flex-wrap items-center gap-x-5 gap-y-3 bg-srf-2 px-[clamp(18px,2vw,24px)] py-[clamp(16px,2vw,20px)] transition-[border-radius,background-color,translate] duration-[700ms,400ms,700ms] ease-emph hover:!rounded-[28px] hover:bg-srf-3 hover:[translate:6px_0]"
                    [style.border-radius]="slot.leaf"
                  >
                    <div class="flex flex-[0_0_96px] flex-col">
                      <b class="font-manrope text-[22px] font-extrabold text-pri">{{ slot.time }}</b>
                      <span class="font-manrope text-xs font-semibold text-on-srf-v"
                        >{{ slot.meridiem }} · {{ slot.mins }}</span
                      >
                    </div>
                    <div class="flex min-w-0 flex-[1_1_240px] flex-col gap-2.5">
                      <b
                        class="font-urbanist text-[clamp(17px,1.6vw,20px)] font-bold leading-[1.25]"
                        >{{ slot.title }}</b
                      >
                      <div class="flex flex-wrap items-center gap-2.5">
                        @for (person of slot.speakers; track person.name) {
                          @if (person.photo; as photo) {
                            <span
                              class="relative h-8 w-8 flex-none overflow-hidden [clip-path:var(--s-cookie9)]"
                              ><img
                                [src]="ik(photo.url, { w: 64, h: 64, fit: 'face' })"
                                alt=""
                                width="32"
                                height="32"
                                loading="lazy"
                                class="absolute inset-0 h-full w-full object-cover"
                            /></span>
                          }
                        }
                        @if (slot.speaker) {
                          <span class="font-manrope text-sm font-semibold text-on-srf-v">{{
                            slot.speaker
                          }}</span>
                        }
                        @if (slot.track; as track) {
                          <span
                            class="grid h-[26px] place-items-center rounded-[13px] px-2.5 font-manrope text-xs font-bold"
                            [style.background]="track.bg"
                            [style.color]="track.fg"
                            >{{ track.label }}</span
                          >
                        }
                      </div>
                    </div>
                  </div>
                } @else {
                  <div
                    class="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-3xl border-[1.5px] border-dashed border-out-v px-6 py-[18px]"
                  >
                    <b class="flex-[0_0_96px] font-manrope text-base font-extrabold text-on-srf-v">{{
                      slot.start
                    }}</b>
                    <span class="font-urbanist text-[17px] font-bold">{{ slot.title }}</span>
                    <span class="ml-auto font-manrope text-xs font-semibold text-on-srf-v">{{
                      slot.mins
                    }}</span>
                  </div>
                }
              </div>
            }
          </div>
        </section>
      }

      @if (speakers().length) {
        <section class="wrap flex flex-col gap-8">
          <h2
            appReveal="0"
            class="m-0 font-urbanist text-[clamp(44px,6vw,88px)] font-extralight leading-[.88] tracking-[-.05em]"
          >
            {{ recap().year }} <b class="font-extrabold">speakers</b>
          </h2>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,270px),1fr))] gap-4">
            @for (p of speakers(); track p.name; let i = $index) {
              <div
                [appReveal]="i % 4"
                class="group t-lift flex flex-col gap-[18px] rounded-[40px] px-3 pb-6 pt-3 hover:rounded-[28px] hover:shadow-[0_28px_48px_-26px_rgba(0,0,0,.55)] hover:[translate:0_-8px]"
                [style.background]="p.colors.bg"
                [style.color]="p.colors.fg"
              >
                <div
                  class="relative aspect-square w-full overflow-hidden bg-black/[.08]"
                  [style.clip-path]="'var(--s-' + p.shape + ')'"
                >
                  <img
                    [src]="ik(p.photo.url, { w: 540, h: 540, fit: 'face' })"
                    [attr.srcset]="srcset(p.photo.url, [270, 540], { fit: 'face', aspect: 1 }) || null"
                    sizes="270px"
                    [alt]="p.photo.alt"
                    [attr.width]="p.photo.width ?? null"
                    [attr.height]="p.photo.height ?? null"
                    loading="lazy"
                    class="t-zoom absolute inset-0 h-full w-full object-cover group-hover:[scale:1.08]"
                  />
                </div>
                <div class="flex flex-col gap-2.5 px-3">
                  <div
                    class="flex items-center justify-between font-manrope text-xs font-extrabold tracking-[.14em]"
                  >
                    <span>{{ p.track ? p.track + ' TRACK' : '' }}</span
                    ><span class="tracking-[.02em]">{{ p.time }}</span>
                  </div>
                  <div class="font-urbanist text-[30px] font-light leading-none tracking-[-.025em]">
                    {{ p.first }} <b class="font-extrabold">{{ p.last }}</b>
                  </div>
                  <span class="font-manrope text-[13px] font-medium leading-[1.4] opacity-80">{{
                    p.desc
                  }}</span>
                  @if (p.talk) {
                    <div
                      class="mt-1 border-t-[1.5px] border-solid border-[color-mix(in_srgb,currentColor_25%,transparent)] pt-3.5 font-urbanist text-base font-bold leading-[1.3]"
                    >
                      {{ p.talk }}
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </section>
      }

      @if (!schedule().length && perks().length) {
        <section class="wrap flex flex-wrap gap-10">
          <h2
            appReveal="0"
            class="m-0 flex-[1_1_300px] font-urbanist text-[clamp(44px,6vw,88px)] font-extralight leading-[.88] tracking-[-.05em]"
          >
            What you <b class="font-extrabold">get</b>
          </h2>
          <div appReveal="1" class="flex min-w-0 flex-[2_1_520px] flex-wrap content-start gap-1.5">
            @for (perk of perks(); track perk) {
              <span
                class="flex h-11 items-center rounded-[22px] bg-srf-2 px-[18px] font-manrope text-[15px] font-semibold"
                >{{ perk }}</span
              >
            }
          </div>
        </section>
      }

      @if (points().length) {
        <section class="wrap flex flex-wrap gap-10">
          <h2
            appReveal="0"
            class="m-0 flex-[1_1_300px] font-urbanist text-[clamp(44px,6vw,88px)] font-extralight leading-[.88] tracking-[-.05em]"
          >
            Points to <b class="font-extrabold">note</b>
          </h2>
          <ol class="m-0 flex min-w-0 flex-[2_1_520px] list-none flex-col p-0">
            @for (point of points(); track $index; let i = $index) {
              <li
                appReveal="0"
                class="flex gap-[clamp(16px,2vw,24px)] border-t border-solid border-out-v py-5"
              >
                <b
                  class="w-[52px] flex-none font-manrope text-[clamp(32px,3vw,40px)] font-black leading-[.9] tracking-[-.05em] text-pri"
                  >{{ (i + 1).toString().padStart(2, '0') }}</b
                >
                <span class="font-manrope text-[clamp(15px,1.4vw,17px)] font-medium leading-normal">{{
                  point
                }}</span>
              </li>
            }
          </ol>
        </section>
      }

      @if (sponsors().length) {
        <section class="wrap flex flex-col gap-8">
          <h2
            appReveal="0"
            class="m-0 font-urbanist text-[clamp(44px,6vw,88px)] font-extralight leading-[.88] tracking-[-.05em]"
          >
            {{ recap().year }} <b class="font-extrabold">sponsors</b>
          </h2>
          @for (group of sponsors(); track group.tier) {
            <div class="flex flex-col gap-4">
              <span class="eyebrow">{{ group.label.toUpperCase() }}</span>
              <div class="flex flex-wrap gap-3">
                @for (s of group.sponsors; track s.name; let i = $index) {
                  <a
                    [appReveal]="i % 4"
                    [href]="s.url || null"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="t-lift flex min-w-0 flex-[1_1_260px] items-center gap-4 rounded-[32px] bg-srf-2 py-2.5 pl-2.5 pr-5 text-on-srf no-underline hover:bg-srf-3 hover:text-on-srf hover:[translate:0_-4px]"
                  >
                    <img
                      [src]="ik(s.logo.url, { w: 160, h: 160, fit: 'contain' })"
                      [alt]="s.logo.alt"
                      [attr.width]="s.logo.width ?? 80"
                      [attr.height]="s.logo.height ?? 80"
                      loading="lazy"
                      class="h-20 w-20 flex-none rounded-[24px] bg-white object-contain p-2"
                    />
                    <div class="flex min-w-0 flex-1 flex-col gap-1">
                      <b class="font-urbanist text-lg font-extrabold">{{ s.name }}</b>
                      @if (s.host) {
                        <span class="font-manrope text-[13px] font-semibold text-on-srf-v">{{
                          s.host
                        }}</span>
                      }
                    </div>
                  </a>
                }
              </div>
            </div>
          }
        </section>
      }

      @if (partners().length) {
        <section class="flex flex-col gap-8">
          <h2
            appReveal="0"
            class="wrap m-0 font-urbanist text-[clamp(44px,6vw,88px)] font-extralight leading-[.88] tracking-[-.05em]"
          >
            Community <b class="font-extrabold">partners</b>
          </h2>
          <app-partner-marquee [partners]="partners()" />
        </section>
      }

      @if (venueEmbed(); as embed) {
        <section class="wrap flex flex-wrap items-center gap-10">
          <div class="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
            <h2
              appReveal="0"
              class="m-0 font-urbanist text-[clamp(44px,6vw,88px)] font-extralight leading-[.88] tracking-[-.05em]"
            >
              Getting <b class="font-extrabold">there</b>
            </h2>
            @if (edition()?.venue; as venue) {
              <p appReveal="1" class="m-0 font-manrope text-[15px] leading-[1.6] text-on-srf-v">
                {{ venue }}
              </p>
            }
            @if (edition()?.mapsUrl; as mapsUrl) {
              <a
                appReveal="2"
                [href]="mapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="pill-btn self-start"
                >Open in Maps<span class="ms">arrow_outward</span></a
              >
            }
          </div>
          <iframe
            appReveal="1"
            [src]="embed"
            [title]="'Map of ' + (edition()?.venue || 'the venue')"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
            class="aspect-[4/3] min-w-0 flex-[2_1_480px] rounded-[40px] border-0 bg-srf-2"
          ></iframe>
        </section>
      }

      @if (faqs().length) {
        <section class="wrap flex flex-wrap gap-10">
          <h2
            appReveal="0"
            class="m-0 flex-[1_1_300px] font-urbanist text-[clamp(44px,6vw,88px)] font-extralight leading-[.88] tracking-[-.05em]"
          >
            Good to <b class="font-extrabold">know</b>
          </h2>
          <app-faq-accordion [items]="faqs()" />
        </section>
      }
    </main>
  `,
})
export class DevfestComponent {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly ik = ik;
  protected readonly srcset = srcset;

  private readonly view = toSignal(inject(SiteContentService).devfest());

  protected readonly countdown = injectCountdown(() => this.edition()?.startsAt ?? 0);
  protected readonly hms = computed(() => [
    { label: 'h', value: this.countdown().hours },
    { label: 'm', value: this.countdown().minutes },
  ]);

  protected readonly edition = computed(() => this.view()?.edition ?? null);
  protected readonly themeParts = computed(() => {
    const theme = this.edition()?.theme ?? '';
    const split = theme.indexOf(':');
    return split < 0
      ? { lead: '', rest: theme }
      : { lead: theme.slice(0, split + 1), rest: theme.slice(split + 1).trim() };
  });
  protected readonly lineupNotice = computed(() => {
    const pending = this.view()?.pending;
    if (!this.edition()?.isUpcoming || !pending) {
      return '';
    }
    if (pending.schedule && pending.speakers) {
      return 'Speakers and schedule drop soon';
    }
    if (pending.speakers) {
      return 'Speakers drop soon';
    }
    return pending.schedule ? 'Schedule drops soon' : '';
  });

  protected readonly schedule = computed(() => {
    let talk = 0;
    return (this.view()?.schedule ?? []).map((slot) => ({
      ...slot,
      leaf: slot.isTalk ? LEAF_RADII[talk++ % 2] : '',
    }));
  });
  protected readonly recap = computed(
    () =>
      this.view()?.recap ?? {
        year: '',
        dateLabel: '',
        venue: '',
        firstStart: '',
        firstTitle: '',
        lastStart: '',
        lastTitle: '',
      }
  );
  protected readonly scheduleIntro = computed(() => {
    const r = this.recap();
    const verb = this.edition()?.isUpcoming ? 'runs' : 'ran';
    const where = r.venue ? ` at ${r.venue}` : '';
    return `How DevFest ${r.year} ${verb} on ${r.dateLabel}${where}, from ${r.firstTitle} at ${r.firstStart} to the ${r.lastTitle} at ${r.lastStart}.`;
  });
  protected readonly speakers = computed(() => this.view()?.speakers ?? []);
  protected readonly perks = computed(() => this.view()?.perks ?? []);
  protected readonly points = computed(() => this.view()?.notes ?? []);
  protected readonly faqs = computed(() => this.view()?.faqs ?? []);
  protected readonly sponsors = computed(() => this.view()?.sponsors ?? []);
  protected readonly partners = computed(() => this.view()?.partners ?? []);
  protected readonly venueEmbed = computed(() => {
    const url = safeMapsEmbedUrl(this.view()?.venueEmbedUrl ?? undefined);
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });

  constructor() {
    const title = inject(Title);
    const meta = inject(Meta);
    effect(() => {
      const ed = this.edition();
      const name = ed?.name ?? 'DevFest Siliguri';
      title.setTitle(`${name} | GDG Siliguri`);
      meta.updateTag({
        name: 'description',
        content: ed
          ? `${name} on ${ed.weekday} ${ed.dateLabel} ${ed.year}${ed.venue ? ` at ${ed.venue}` : ''}. Talks, codelabs and workshops by GDG Siliguri.`
          : 'DevFest Siliguri: talks, codelabs and workshops by GDG Siliguri.',
      });
    });
  }
}
