import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { DataService } from 'src/app/services/data.service';
import { splitCommunityEvents } from 'src/app/shared/content';
import { toDevfestEdition } from 'src/app/shared/devfest-edition';

type Filter = 'All' | 'Upcoming' | 'Past';

const FILTERS: Filter[] = ['All', 'Upcoming', 'Past'];
const PAST_SHAPES = ['cookie9', 'clover4', 'arch', 'cookie6'];

@Component({
  selector: 'app-events-page',
  imports: [RevealDirective, RouterLink, ScrollWeightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="wrap flex flex-col gap-[clamp(56px,7vw,96px)] pb-10 pt-[clamp(40px,7vw,88px)]"
    >
      <div class="flex flex-wrap items-end justify-between gap-7">
        <h1 appScrollWeight appReveal="0" class="display-lg">
          Every<br /><b class="font-black text-pri">event</b>
        </h1>
        <div appReveal="1" role="group" aria-label="Filter events" class="flex gap-1">
          @for (f of filters; track f; let first = $first, last = $last) {
            @let on = filter() === f;
            <button
              type="button"
              (click)="filter.set(f)"
              [attr.aria-pressed]="on"
              class="h-[52px] cursor-pointer border-0 px-[22px] font-manrope text-[15px] font-bold transition-[border-radius,background-color,color] duration-[500ms,400ms,400ms] ease-emph"
              [style.border-radius]="
                on ? '26px' : first ? '26px 8px 8px 26px' : last ? '8px 26px 26px 8px' : '8px'
              "
              [style.background]="on ? 'var(--pri)' : 'var(--srf-3)'"
              [style.color]="on ? 'var(--on-pri)' : 'var(--on-srf)'"
            >
              {{ f }}
            </button>
          }
        </div>
      </div>

      @if (filter() !== 'Past') {
        <section class="flex flex-col gap-5">
          <span class="eyebrow">UPCOMING</span>
          @if (edition()?.isUpcoming) {
            <a
              appReveal="0"
              routerLink="/devfest"
              class="t-lift flex cursor-pointer flex-wrap items-center gap-x-7 gap-y-4 rounded-[40px] bg-pri-c p-[clamp(20px,3vw,28px)] text-on-pri-c no-underline hover:text-on-pri-c hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,.5)] hover:[translate:0_-4px]"
            >
              <div class="flex w-[140px] items-baseline gap-2.5">
                <b class="font-manrope text-[64px] font-black leading-[.8] tracking-[-.06em]">{{
                  edition()?.day
                }}</b
                ><span class="font-manrope text-[13px] font-extrabold tracking-[.16em]">{{
                  edition()?.month?.toUpperCase()
                }}</span>
              </div>
              <div class="flex min-w-0 flex-[1_1_280px] flex-col gap-1.5">
                <b
                  class="font-urbanist text-[clamp(22px,2.4vw,30px)] font-extrabold leading-[1.1]"
                  >{{ edition()?.name }}</b
                >
                <span class="font-manrope text-sm font-medium"
                  >Flagship conference · {{ edition()?.venue || 'Venue to be announced' }}</span
                >
              </div>
              <span
                class="ms grid h-[52px] w-[52px] place-items-center rounded-[26px] bg-pri text-2xl text-on-pri"
                >arrow_forward</span
              >
            </a>
          }
          <div class="flex flex-col">
            @for (m of events().upcoming; track m.title + m.at; let i = $index) {
              <a
                [appReveal]="i"
                [href]="m.url || null"
                target="_blank"
                rel="noopener noreferrer"
                class="flex cursor-pointer flex-wrap items-center gap-x-7 gap-y-4 border-t border-solid border-out-v px-2 py-6 text-on-srf no-underline transition-[translate] duration-[600ms] ease-bounce hover:text-on-srf hover:[translate:12px_0]"
              >
                <div class="flex w-[140px] items-baseline gap-2.5">
                  <b class="font-manrope text-[64px] font-black leading-[.8] tracking-[-.06em]">{{
                    m.day
                  }}</b
                  ><span class="font-manrope text-[13px] font-extrabold tracking-[.16em] text-pri">{{
                    m.mon
                  }}</span>
                </div>
                <div class="flex min-w-0 flex-[1_1_280px] flex-col gap-1.5">
                  <b
                    class="font-urbanist text-[clamp(20px,2.2vw,26px)] font-bold leading-[1.15] tracking-[-.01em]"
                    >{{ m.title }}</b
                  >
                  @if (m.where) {
                    <span class="font-manrope text-sm font-medium text-on-srf-v">{{ m.where }}</span>
                  }
                </div>
                <span
                  class="grid h-9 place-items-center rounded-[18px] bg-sec-c px-4 font-manrope text-[13px] font-bold text-on-sec-c"
                  >{{ m.tag }}</span
                >
              </a>
            } @empty {
              <p
                class="m-0 border-t border-solid border-out-v px-2 py-6 font-manrope text-[15px] font-medium text-on-srf-v"
              >
                More meetups are on the way.
                <a [href]="joinUrl()">Join the community</a> to hear about them first.
              </p>
            }
          </div>
        </section>
      }

      @if (filter() !== 'Upcoming') {
        <section class="flex flex-col gap-5">
          @if (events().earlier.length) {
            <span class="eyebrow">PAST MEETUPS</span>
            <div class="mb-10 flex flex-col">
              @for (m of events().earlier; track m.title + m.at; let i = $index) {
                <div
                  [appReveal]="i"
                  class="flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-solid border-out-v px-2 py-6"
                >
                  <div class="flex w-[140px] items-baseline gap-2.5">
                    <b
                      class="font-manrope text-[64px] font-black leading-[.8] tracking-[-.06em] text-on-srf-v"
                      >{{ m.day }}</b
                    ><span class="font-manrope text-[13px] font-extrabold tracking-[.16em]">{{
                      m.mon
                    }}</span>
                  </div>
                  <b
                    class="min-w-0 flex-[1_1_280px] font-urbanist text-[clamp(20px,2.2vw,26px)] font-bold leading-[1.15] tracking-[-.01em]"
                    >{{ m.title }}</b
                  >
                  <span
                    class="grid h-9 place-items-center rounded-[18px] border border-solid border-out px-4 font-manrope text-[13px] font-bold"
                    >{{ m.tag }}</span
                  >
                </div>
              }
            </div>
          }
          @if (pastDevfests().length) {
          <span class="eyebrow">PAST DEVFESTS</span>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-5">
            @for (e of pastDevfests(); track e.year; let i = $index) {
              <div [appReveal]="i" class="flex flex-col gap-3.5">
                <div
                  class="relative flex aspect-square w-full flex-col items-center justify-center gap-1.5 transition-[scale] duration-[800ms] ease-bounce hover:[scale:1.04]"
                  [style.clip-path]="'var(--s-' + e.shape + ')'"
                  [style.background]="i === 0 ? 'var(--pri-c)' : 'var(--srf-3)'"
                  [style.color]="i === 0 ? 'var(--on-pri-c)' : 'var(--on-srf)'"
                >
                  <b class="font-manrope text-[clamp(64px,7vw,88px)] font-black leading-none tracking-[-.06em]">{{
                    e.year
                  }}</b>
                  @if (e.note) {
                    <span class="font-mono text-xs font-medium opacity-75">{{ e.note }}</span>
                  }
                </div>
                <div class="px-2">
                  <b class="font-urbanist text-xl font-extrabold">DevFest {{ e.year }}</b>
                  @if (e.highlight) {
                    <span class="font-manrope text-sm font-medium text-on-srf-v">
                      · {{ e.highlight }}</span
                    >
                  }
                </div>
              </div>
            }
          </div>
          }
          @if (!events().earlier.length && !pastDevfests().length) {
            <p class="m-0 font-manrope text-[15px] font-medium text-on-srf-v">
              Past events will show up here.
            </p>
          }
        </section>
      }
    </main>
  `,
})
export class EventsPageComponent {
  private readonly data = inject(DataService);

  protected readonly filters = FILTERS;
  protected readonly filter = signal<Filter>('All');

  private readonly eventsResult = toSignal(this.data.getCommunityEventsData());
  private readonly eventData = toSignal(this.data.getEventData());
  private readonly speakersResult = toSignal(this.data.getAllSpeakers());
  private readonly scheduleResult = toSignal(this.data.getAllSchedules());
  private readonly pastDevfestsResult = toSignal(this.data.getPastDevfests());

  protected readonly joinUrl = computed(
    () => this.eventData()?.communityJoinLink || 'https://gdg.community.dev/gdg-siliguri/'
  );

  protected readonly events = computed(() => {
    const r = this.eventsResult();
    return splitCommunityEvents(r?.enabled ? r.data : [], Date.now());
  });

  protected readonly edition = computed(() =>
    toDevfestEdition(this.eventData(), this.scheduleResult()?.data ?? [], Date.now())
  );

  protected readonly pastDevfests = computed(() => {
    const ed = this.edition();
    const speakers = this.speakersResult()?.data?.length ?? 0;
    const sessions = this.scheduleResult()?.data?.length ?? 0;
    const latest =
      ed && !ed.isUpcoming
        ? [
            {
              year: ed.year,
              highlight: ed.venue,
              note: [speakers && `${speakers} speakers`, sessions && `${sessions} sessions`]
                .filter(Boolean)
                .join(' · '),
            },
          ]
        : [];
    const r = this.pastDevfestsResult();
    const archive = (r?.enabled ? r.data : []).filter(
      (p) => p.year !== ed?.year && p.year !== undefined
    );
    return [...latest, ...archive]
      .sort((a, b) => Number(b.year) - Number(a.year))
      .map((p, i) => ({ ...p, shape: PAST_SHAPES[i % PAST_SHAPES.length] }));
  });

  constructor() {
    inject(Title).setTitle('Events | GDG Siliguri');
    inject(Meta).updateTag({
      name: 'description',
      content: 'Upcoming meetups, workshops and DevFest Siliguri, plus every past GDG Siliguri event.',
    });
  }
}
