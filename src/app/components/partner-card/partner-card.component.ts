import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-partner-card',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <a
      [href]="link()"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex h-full flex-col items-center gap-4 rounded-m3-xl bg-surface-container-low p-5 text-center transition-colors duration-effects ease-effects hover:bg-surface-container"
      [attr.aria-label]="'Visit ' + name()"
    >
      <span
        class="flex aspect-square w-full max-w-[10rem] items-center justify-center overflow-hidden rounded-full bg-white p-3 transition-[border-radius] duration-spatial ease-spatial group-hover:rounded-m3-xl"
      >
        <img [ngSrc]="icon()" width="200" height="200" class="h-full w-full rounded-full object-contain" [alt]="name() + ' logo'" />
      </span>
      <span class="text-title-md font-medium text-on-surface">{{ name() }}</span>
      <span class="m3-btn m3-btn-tonal mt-auto">
        Learn more
        <span class="material-symbols-rounded" aria-hidden="true">north_east</span>
      </span>
    </a>
  `,
})
export class PartnerCardComponent {
  readonly name = input.required<string>();
  readonly icon = input.required<string>();
  readonly link = input.required<string>();
}
