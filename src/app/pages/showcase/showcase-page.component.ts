import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { ShowcaseGridComponent } from 'src/app/components/showcase/showcase-grid.component';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { SiteContentService } from 'src/app/services/site-content.service';
import { ShowcaseView } from 'src/app/shared/view-models';

@Component({
  selector: 'app-showcase-page',
  imports: [RevealDirective, ScrollWeightDirective, ShowcaseGridComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="wrap flex flex-col gap-[clamp(40px,6vw,72px)] pb-10 pt-[clamp(40px,7vw,88px)]"
    >
      <div class="flex flex-wrap items-end justify-between gap-6">
        <h1 appScrollWeight appReveal="0" class="display-lg">{{ view().title }}</h1>
        <p
          appReveal="1"
          class="m-0 max-w-[380px] font-manrope text-base leading-[1.6] text-on-srf-v"
        >
          {{ view().subtitle }}
        </p>
      </div>
      @if (years().length > 1) {
        <div role="group" aria-label="Filter by year" class="flex flex-wrap gap-1">
          @for (y of years(); track y) {
            @let on = year() === y;
            <button
              type="button"
              (click)="year.set(y)"
              [attr.aria-pressed]="on"
              class="h-11 cursor-pointer rounded-[22px] border-0 px-5 font-manrope text-sm font-bold"
              [style.background]="on ? 'var(--pri)' : 'var(--srf-3)'"
              [style.color]="on ? 'var(--on-pri)' : 'var(--on-srf)'"
            >
              {{ y }}
            </button>
          }
        </div>
      }
      <h2 class="sr-only">Projects from {{ year() }}</h2>
      @if (items().length) {
        <app-showcase-grid [items]="items()" />
      } @else {
        <p
          class="m-0 rounded-[36px] bg-srf-2 p-10 text-center font-manrope text-base text-on-srf-v"
        >
          Projects from {{ year() }} will show up here.
        </p>
      }
    </main>
  `,
})
export class ShowcasePageComponent {
  private readonly content = inject(SiteContentService);

  readonly view = input.required<ShowcaseView>();

  protected readonly years = computed(() => this.view().years);
  protected readonly year = linkedSignal(() => this.view().year);

  private readonly loaded = toSignal(
    toObservable(this.year).pipe(
      switchMap((year) =>
        year === this.view().year ? of(this.view().items) : this.content.showcaseItems(year)
      )
    )
  );
  protected readonly items = computed(() => this.loaded() ?? this.view().items);
}
