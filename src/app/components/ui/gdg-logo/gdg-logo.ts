import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gdg-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex items-center gap-3' },
  template: `
    <svg viewBox="0 0 64 32" class="h-7 w-auto shrink-0" aria-hidden="true">
      <rect x="4" y="9.5" width="22" height="9" rx="4.5" fill="#EA4335" transform="rotate(-35 8.5 14)" />
      <rect x="4" y="13.5" width="22" height="9" rx="4.5" fill="#4285F4" transform="rotate(35 8.5 18)" />
      <rect x="38" y="9.5" width="22" height="9" rx="4.5" fill="#34A853" transform="rotate(35 55.5 14)" />
      <rect x="38" y="13.5" width="22" height="9" rx="4.5" fill="#FBBC04" transform="rotate(-35 55.5 18)" />
    </svg>
    <span class="whitespace-nowrap text-title-lg font-medium text-on-surface-variant">
      GDG <span class="text-on-surface">{{ city() }}</span>
    </span>
  `,
})
export class GdgLogoComponent {
  readonly city = input('Siliguri');
}
