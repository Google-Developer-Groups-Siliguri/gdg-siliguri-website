import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-coming-soon-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="mx-auto flex max-w-xs flex-col items-center gap-3 rounded-m3-xl bg-surface-container-low px-6 py-10 text-center">
      <span class="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
        <span class="material-symbols-rounded" aria-hidden="true">schedule</span>
      </span>
      <h3 class="text-title-lg font-medium text-on-surface">Coming soon</h3>
      <p class="text-body-md text-on-surface-variant">{{ hint() }}</p>
    </div>
  `,
})
export class ComingSoonCardComponent {
  readonly hint = input('We will announce this shortly.');
}
