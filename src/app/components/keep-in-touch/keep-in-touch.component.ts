import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SOCIAL_LINKS } from 'src/app/shared/social-links';
import { M3ShapeComponent } from '../ui/m3-shape/m3-shape';

@Component({
  selector: 'app-keep-in-touch',
  imports: [M3ShapeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-container py-8">
      <div class="relative isolate overflow-hidden rounded-m3-2xl bg-g-green-container px-6 py-12 text-on-g-green-container md:px-16 md:py-16">
        <app-m3-shape
          shape="very-sunny"
          class="absolute -right-16 -top-16 -z-10 w-64 animate-spin-slow text-g-green opacity-20 md:w-80"
        />
        <app-m3-shape shape="flower" class="absolute -bottom-12 right-40 -z-10 hidden w-32 text-g-green opacity-15 md:block" />

        <div class="flex max-w-2xl flex-col gap-4">
          <h2 class="text-headline-lg font-medium md:text-display-sm">Keep in touch with GDG Siliguri</h2>
          <p class="text-body-lg md:text-title-lg md:font-normal">
            Follow <span class="font-bold">#GDGSiliguri</span> for the latest announcements, events and community news.
          </p>
          <ul class="flex flex-wrap gap-2 pt-4">
            @for (social of socials; track social.url; let first = $first) {
              <li>
                <a
                  [href]="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="m3-btn m3-btn-md"
                  [class]="first ? 'bg-g-green text-on-g-green' : 'bg-surface-container-lowest/60 text-on-g-green-container'"
                >
                  {{ social.label }}
                  <span class="material-symbols-rounded" aria-hidden="true">north_east</span>
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class KeepInTouchComponent {
  protected readonly socials = SOCIAL_LINKS;
}
