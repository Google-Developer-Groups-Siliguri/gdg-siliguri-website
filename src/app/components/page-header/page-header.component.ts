import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { M3ShapeComponent } from '../ui/m3-shape/m3-shape';

@Component({
  selector: 'app-page-header',
  imports: [M3ShapeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <header class="page-container relative flex items-end gap-8 pb-10 pt-8 md:pb-14 md:pt-16">
      <div class="flex max-w-3xl animate-rise-in flex-col gap-4">
        @if (eyebrow()) {
          <span class="text-label-lg font-bold uppercase tracking-[0.12em] text-primary">{{ eyebrow() }}</span>
        }
        <h1 class="text-display-md font-medium text-on-surface md:text-[4rem] md:leading-[1.1]">
          {{ title() }}
        </h1>
        @if (subtitle()) {
          <p class="text-body-lg text-on-surface-variant md:text-title-lg md:font-normal">{{ subtitle() }}</p>
        }
      </div>
      <div class="relative ml-auto hidden h-32 w-48 shrink-0 lg:block" aria-hidden="true">
        <app-m3-shape shape="cookie9" class="absolute right-24 top-0 w-24 animate-spin-slow text-brand-blue" />
        <app-m3-shape shape="flower" class="absolute bottom-0 right-6 w-20 text-brand-yellow" />
        <app-m3-shape shape="circle" class="absolute right-0 top-2 w-10 text-brand-red" />
      </div>
    </header>
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly eyebrow = input<string>();
}
