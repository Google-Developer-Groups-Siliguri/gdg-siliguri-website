import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModuleView } from 'src/app/shared/view-models';
import { BlogCardComponent } from '../blog-card.component';
import { MarkdownComponent } from '../markdown.component';
import { ShowcaseGridComponent } from '../showcase/showcase-grid.component';
import { ModuleCardsComponent } from './module-cards.component';
import { ModuleGalleryComponent } from './module-gallery.component';
import { ModuleLinksComponent } from './module-links.component';

@Component({
  selector: 'app-module-host',
  imports: [
    BlogCardComponent,
    MarkdownComponent,
    ModuleCardsComponent,
    ModuleGalleryComponent,
    ModuleLinksComponent,
    RouterLink,
    ShowcaseGridComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    @let m = module();
    @switch (m.type) {
      @case ('cards') {
        <app-module-cards [items]="limited(m.cards)" />
      }
      @case ('gallery') {
        <app-module-gallery [items]="limited(m.gallery)" />
      }
      @case ('links') {
        <app-module-links [items]="limited(m.links)" />
      }
      @case ('richText') {
        <app-markdown [source]="m.body" class="max-w-[760px] text-[17px]" />
      }
      @case ('showcase') {
        <app-showcase-grid [items]="limited(m.showcase)" />
      }
      @case ('blogs') {
        <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-4">
          @for (blog of limited(m.blogs); track blog.id) {
            <app-blog-card [blog]="blog" />
          }
        </div>
      }
    }
    @if (truncated() && m.path) {
      <a [routerLink]="m.path" class="pill-btn mt-6 inline-flex"
        >See all<span class="ms">chevron_right</span></a
      >
    }
  `,
})
export class ModuleHostComponent {
  readonly module = input.required<ModuleView>();
  readonly limit = input<number | null>(null);

  protected readonly truncated = computed(() => {
    const m = this.module();
    const limit = this.limit();
    const count = Math.max(
      m.cards.length,
      m.gallery.length,
      m.links.length,
      m.showcase.length,
      m.blogs.length
    );
    return limit !== null && count > limit;
  });

  protected limited<T>(items: T[]): T[] {
    const limit = this.limit();
    return limit === null ? items : items.slice(0, limit);
  }
}
