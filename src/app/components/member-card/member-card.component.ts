import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Members } from 'src/app/services/data.service';
import { M3ShapeComponent, M3ShapeName, m3ShapeMask } from '../ui/m3-shape/m3-shape';

interface Accent {
  shape: M3ShapeName;
  backdrop: string;
  badge: string;
}

const ACCENTS: Accent[] = [
  { shape: 'cookie9', backdrop: 'text-g-blue-container', badge: 'bg-g-blue text-on-g-blue' },
  { shape: 'clover8', backdrop: 'text-g-red-container', badge: 'bg-g-red text-on-g-red' },
  { shape: 'sunny', backdrop: 'text-g-yellow-container', badge: 'bg-g-yellow text-on-g-yellow' },
  { shape: 'cookie6', backdrop: 'text-g-green-container', badge: 'bg-g-green text-on-g-green' },
];

const AVATAR_MASK = m3ShapeMask('cookie12');

@Component({
  selector: 'app-member-card',
  imports: [NgOptimizedImage, M3ShapeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <article
      class="group flex h-full flex-col items-center gap-3 rounded-m3-xl bg-surface-container-low px-6 pb-6 pt-8 text-center transition-colors duration-effects ease-effects hover:bg-surface-container"
    >
      <div class="relative mb-4 w-40">
        <app-m3-shape
          [shape]="accent().shape"
          class="absolute -inset-3 transition-transform duration-spatial ease-spatial group-hover:rotate-45 group-hover:scale-105"
          [class]="accent().backdrop"
        />
        <img
          [ngSrc]="item().profilePictureURL"
          width="160"
          height="160"
          class="shape-mask relative aspect-square w-full object-cover"
          [style.mask-image]="avatarMask"
          [style.-webkit-mask-image]="avatarMask"
          [alt]="item().name"
        />
        <span
          class="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-label-md font-bold"
          [class]="accent().badge"
        >
          {{ item().designation }}
        </span>
      </div>

      <h3 class="text-title-lg font-medium text-on-surface">{{ item().name }}</h3>
      @if (item().description) {
        <p class="text-body-md text-on-surface-variant">{{ item().description }}</p>
      }

      <div class="mt-auto flex gap-1 pt-2">
        @if (item().linkedInURL) {
          <a
            [href]="item().linkedInURL"
            target="_blank"
            rel="noopener noreferrer"
            class="m3-icon-btn"
            [attr.aria-label]="item().name + ' on LinkedIn'"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        }
        @if (item().twitterURL) {
          <a
            [href]="item().twitterURL"
            target="_blank"
            rel="noopener noreferrer"
            class="m3-icon-btn"
            [attr.aria-label]="item().name + ' on X'"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
            </svg>
          </a>
        }
        @if (item().githubURL) {
          <a
            [href]="item().githubURL"
            target="_blank"
            rel="noopener noreferrer"
            class="m3-icon-btn"
            [attr.aria-label]="item().name + ' on GitHub'"
          >
            <svg viewBox="0 0 16 16" class="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.6 0 8.03a8.03 8.03 0 0 0 5.47 7.62c.4.07.55-.17.55-.39l-.01-1.37c-2.23.49-2.7-1.08-2.7-1.08-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.72 1.23 1.88.87 2.33.67.07-.52.28-.87.51-1.08-1.78-.2-3.64-.89-3.64-3.97 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.83a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.83 2.2-.83.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.09-1.87 3.77-3.65 3.97.29.25.54.74.54 1.49l-.01 2.2c0 .22.15.47.55.39A8.03 8.03 0 0 0 16 8.03C16 3.6 12.42 0 8 0z" />
            </svg>
          </a>
        }
      </div>
    </article>
  `,
})
export class MemberCardComponent {
  readonly item = input.required<Members>();
  readonly index = input(0);

  protected readonly accent = computed(() => ACCENTS[this.index() % ACCENTS.length]);
  protected readonly avatarMask = AVATAR_MASK;
}
