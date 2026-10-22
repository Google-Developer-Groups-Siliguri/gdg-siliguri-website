import { AsyncPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject, input } from '@angular/core';
import { Observable, interval, map, of, startWith } from 'rxjs';
import { EventData } from 'src/app/services/data.service';

interface CountdownTile {
  value: number;
  label: string;
  container: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

const TILE_COLORS = [
  'bg-g-blue-container text-on-g-blue-container',
  'bg-g-red-container text-on-g-red-container',
  'bg-g-yellow-container text-on-g-yellow-container',
  'bg-g-green-container text-on-g-green-container',
];

function countdownTiles(remaining: number): CountdownTile[] {
  const clamped = Math.max(remaining, 0);
  const values: [number, string][] = [
    [Math.floor(clamped / DAY_MS), 'Days'],
    [Math.floor((clamped % DAY_MS) / HOUR_MS), 'Hours'],
    [Math.floor((clamped % HOUR_MS) / MINUTE_MS), 'Minutes'],
    [Math.floor((clamped % MINUTE_MS) / 1000), 'Seconds'],
  ];
  return values.map(([value, label], i) => ({ value, label, container: TILE_COLORS[i] }));
}

@Component({
  selector: 'app-devfest-hero',
  imports: [AsyncPipe, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-container flex flex-col gap-10 pt-6 md:pt-10">
      <div class="animate-rise-in rounded-m3-2xl bg-g-yellow-container p-3 text-on-g-yellow-container md:p-6">
        <img
          [src]="eventData().bannerImages.large"
          alt="DevFest Siliguri 2025"
          width="1200"
          height="630"
          class="h-auto w-full rounded-m3-xl-inc"
        />
        <div class="flex flex-col items-center gap-5 px-2 pb-4 pt-6 text-center md:px-10 md:pb-6 md:pt-8">
          <p class="max-w-4xl text-body-lg md:text-title-lg md:font-normal">{{ eventData().bannerDescription }}</p>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <span class="m3-chip border-on-g-yellow-container/30 text-on-g-yellow-container">
              <span class="material-symbols-rounded !text-lg" aria-hidden="true">calendar_month</span>
              {{ eventData().eventDateTime | date: 'mediumDate' }}
            </span>
            <a href="#venue" class="m3-chip m3-state h-auto min-h-8 py-1 text-left border-on-g-yellow-container/30 text-on-g-yellow-container">
              <span class="material-symbols-rounded !text-lg" aria-hidden="true">location_on</span>
              {{ eventData().eventVenue.name || 'Royal Sarovar Portico, Siliguri' }}
            </a>
          </div>
          <a
            [href]="eventData().eventTicketURL"
            target="_blank"
            rel="noopener noreferrer"
            class="m3-btn m3-btn-md m3-btn-filled"
          >
            Grab your tickets
            <span class="material-symbols-rounded" aria-hidden="true">confirmation_number</span>
          </a>
        </div>
      </div>

      <div class="flex flex-col gap-5">
        <h2 class="text-center text-headline-md font-medium text-on-surface md:text-display-sm">Countdown to DevFest</h2>
        <div class="grid grid-cols-4 gap-2 md:gap-4">
          @for (tile of tiles$ | async; track tile.label) {
            <div class="flex flex-col items-center justify-center rounded-m3-xl py-4 md:py-8" [class]="tile.container">
              <span class="text-headline-md font-medium tabular-nums md:text-[3.5rem] md:leading-[4rem]">{{ tile.value }}</span>
              <span class="text-label-md font-bold uppercase tracking-wider md:text-title-sm">{{ tile.label }}</span>
            </div>
          }
        </div>
      </div>

      @if (eventData().bannerImages.aisummit) {
        <div class="mx-auto w-full max-w-xl rounded-m3-xl bg-white p-6">
          <img
            [src]="eventData().bannerImages.aisummit"
            alt="AI Impact Summit"
            width="600"
            height="400"
            class="h-auto w-full"
          />
        </div>
      }
    </section>
  `,
})
export class DevfestHeroComponent implements OnInit {
  readonly eventData = input.required<EventData>();

  protected tiles$!: Observable<CountdownTile[]>;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit(): void {
    const target = new Date(this.eventData().eventDateTime).getTime();
    this.tiles$ = this.isBrowser
      ? interval(1000).pipe(
          startWith(0),
          map(() => countdownTiles(target - Date.now()))
        )
      : of(countdownTiles(0));
  }
}
