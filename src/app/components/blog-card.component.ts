import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BlogPost } from '../services/data.service';

@Component({
  selector: 'app-blog-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <a
      [href]="blog().url"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex h-full flex-col overflow-hidden rounded-m3-xl bg-surface-container-low transition-colors duration-effects ease-effects hover:bg-surface-container"
    >
      <div class="p-2 pb-0">
        <div class="aspect-[1.91/1] overflow-hidden rounded-m3-lg-inc bg-surface-container-high">
          @if (blog().coverImage.url) {
            <img
              [src]="blog().coverImage.url"
              [alt]="blog().title"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-spatial-slow ease-spatial-slow group-hover:scale-105"
            />
          }
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-3 p-5">
        <h3 class="line-clamp-2 text-title-lg font-medium text-on-surface">{{ blog().title }}</h3>
        <p class="line-clamp-3 text-body-md text-on-surface-variant">{{ blog().brief }}</p>
        <div class="mt-auto flex items-center gap-3 pt-2 text-body-sm text-on-surface-variant">
          <img [src]="blog().author.profilePicture" [alt]="blog().author.name" class="h-8 w-8 rounded-full bg-surface-container-high" />
          <div class="flex flex-1 flex-col">
            <span class="text-label-lg font-medium text-on-surface">{{ blog().author.name }}</span>
            <span>{{ formattedDate() }}</span>
          </div>
          <span class="m3-chip h-7 px-3 text-label-md">{{ blog().readTimeInMinutes }} min read</span>
        </div>
      </div>
    </a>
  `,
})
export class BlogCardComponent {
  blog = input.required<BlogPost>();

  formattedDate = computed(() =>
    new Date(this.blog().publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );
}
