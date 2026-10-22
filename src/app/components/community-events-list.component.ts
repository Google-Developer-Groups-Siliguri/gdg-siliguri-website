import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Events } from '../services/data.service';

@Component({
  selector: 'app-community-events-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <ul class="flex flex-col gap-4">
      @for (event of eventsList(); track event.id || $index) {
        <li class="flex flex-col gap-5 rounded-m3-xl bg-surface-container-low p-4 md:flex-row md:items-center md:p-5">
          <img
            [src]="event.thumbnail"
            [alt]="event.name"
            loading="lazy"
            class="aspect-video w-full rounded-m3-lg object-cover md:w-56"
          />
          <div class="flex flex-1 flex-col gap-2">
            <h3 class="text-title-lg font-medium text-on-surface">{{ event.name }}</h3>
            <p class="text-body-md text-on-surface-variant">{{ event.tagline }}</p>
          </div>
          @if (event.registrationLink) {
            <a
              [href]="event.registrationLink"
              target="_blank"
              rel="noopener noreferrer"
              class="m3-btn m3-btn-tonal self-start md:self-center"
            >
              Learn more
              <span class="material-symbols-rounded" aria-hidden="true">north_east</span>
            </a>
          }
        </li>
      }
    </ul>
  `,
})
export class CommunityEventsListComponent {
  readonly eventsList = input.required<Events[]>();
}
