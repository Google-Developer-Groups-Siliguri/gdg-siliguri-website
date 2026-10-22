import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Schedule } from 'src/app/services/data.service';

const DOT_COLORS = ['bg-brand-blue', 'bg-brand-red', 'bg-brand-yellow', 'bg-brand-green'];

@Component({
  selector: 'app-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <ol class="relative flex flex-col gap-3">
      @for (session of day(); track $index; let i = $index, last = $last) {
        <li class="grid grid-cols-[4.5rem_1.5rem_1fr] gap-x-2 md:grid-cols-[8rem_2rem_1fr] md:gap-x-4">
          <div class="pt-5 text-right">
            <p class="text-title-sm font-bold text-on-surface md:text-title-lg md:font-medium">{{ session.startTime }}</p>
            <p class="text-body-sm text-on-surface-variant md:text-body-md">
              {{ session.endTime }} {{ session.timeZone }}
            </p>
          </div>

          <div class="relative flex justify-center" aria-hidden="true">
            @if (!last) {
              <span class="absolute bottom-[-0.75rem] top-7 w-0.5 bg-outline-variant"></span>
            }
            <span class="relative mt-6 h-4 w-4 rounded-full ring-4 ring-surface" [class]="dotColor(i)"></span>
          </div>

          <div class="flex flex-col gap-3 rounded-m3-lg bg-surface-container-low p-4 md:p-5">
            <h3 class="text-title-md font-medium text-on-surface md:text-title-lg">{{ session.title }}</h3>
            @if (session.subTitle) {
              <div class="flex items-center gap-3">
                @if (session.image) {
                  <img
                    [src]="session.image"
                    alt=""
                    class="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
                    loading="lazy"
                  />
                }
                <p class="text-body-md text-on-surface-variant md:text-body-lg">{{ session.subTitle }}</p>
              </div>
            }
          </div>
        </li>
      }
    </ol>
  `,
})
export class TimelineComponent {
  readonly day = input.required<Schedule[]>();

  protected dotColor(index: number): string {
    return DOT_COLORS[index % DOT_COLORS.length];
  }
}
