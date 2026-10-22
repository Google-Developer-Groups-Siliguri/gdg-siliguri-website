import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { M3ShapeComponent } from '../ui/m3-shape/m3-shape';

@Component({
  selector: 'app-comming-soon',
  imports: [M3ShapeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section class="relative isolate overflow-hidden rounded-m3-2xl bg-surface-container-low px-6 py-14 text-center md:py-20">
      <app-m3-shape
        shape="very-sunny"
        class="absolute -left-10 -top-10 -z-10 w-40 animate-spin-slow text-g-yellow-container md:w-56"
      />
      <app-m3-shape shape="clover4" class="absolute -bottom-12 -right-8 -z-10 w-36 text-g-blue-container md:w-48" />
      <h2 class="mx-auto max-w-2xl text-headline-md font-medium text-on-surface md:text-display-sm">{{ message() }}</h2>
      <p class="mx-auto mt-3 max-w-xl text-body-lg text-on-surface-variant">
        Check back soon — or follow #GDGSiliguri for the announcement.
      </p>
    </section>
  `,
})
export class CommingSoonComponent {
  readonly message = input('DevFest Siliguri is coming soon');
}
