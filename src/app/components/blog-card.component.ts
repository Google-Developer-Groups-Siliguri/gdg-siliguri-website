import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BlogPost } from '../shared/view-models';

@Component({
  selector: 'app-blog-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <a
      [href]="blog().url"
      target="_blank"
      rel="noopener noreferrer"
      class="group t-lift flex h-full flex-col gap-4 rounded-[36px_36px_36px_10px] bg-srf-2 p-3 text-on-srf no-underline hover:rounded-[36px] hover:bg-srf-3 hover:text-on-srf hover:shadow-[0_24px_40px_-24px_rgba(0,0,0,.45)] hover:[translate:0_-6px]"
    >
      <div class="aspect-[1.91/1] overflow-hidden rounded-[28px] bg-srf-3">
        @if (blog().coverImage.url) {
          <img
            [src]="blog().coverImage.url"
            [alt]="blog().title"
            loading="lazy"
            class="t-zoom h-full w-full object-cover group-hover:[scale:1.06]"
          />
        }
      </div>
      <div class="flex flex-1 flex-col gap-3 px-3 pb-3">
        <b class="line-clamp-2 font-urbanist text-[22px] font-bold leading-[1.2] tracking-[-.01em]">{{
          blog().title
        }}</b>
        <p class="m-0 line-clamp-3 font-manrope text-sm leading-[1.55] text-on-srf-v">
          {{ blog().brief }}
        </p>
        <div class="mt-auto flex items-center gap-3 pt-2 font-manrope text-xs text-on-srf-v">
          <img
            [src]="blog().author.profilePicture"
            [alt]="blog().author.name"
            class="h-8 w-8 bg-srf-3 [clip-path:var(--s-cookie9)]"
          />
          <div class="flex flex-1 flex-col">
            <span class="text-sm font-bold text-on-srf">{{ blog().author.name }}</span>
            <span>{{ formattedDate() }}</span>
          </div>
          <span
            class="grid h-8 place-items-center rounded-2xl border border-solid border-out px-3 font-bold"
            >{{ blog().readTimeInMinutes }} min read</span
          >
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
