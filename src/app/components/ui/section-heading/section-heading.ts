import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mb-10 flex flex-col gap-3 md:mb-12' },
  template: `
    @if (eyebrow()) {
      <span class="text-label-lg font-bold uppercase tracking-[0.12em] text-primary">{{ eyebrow() }}</span>
    }
    <h2 class="text-display-sm font-medium text-on-surface md:text-display-md">{{ title() }}</h2>
    @if (description()) {
      <p class="max-w-2xl text-body-lg text-on-surface-variant md:text-title-lg md:font-normal">
        {{ description() }}
      </p>
    }
  `,
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly eyebrow = input<string>();
  readonly description = input<string>();
}
