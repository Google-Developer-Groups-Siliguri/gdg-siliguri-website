import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeoService } from 'src/app/services/seo.service';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { SiteContentService } from 'src/app/services/site-content.service';
import { BlogPost } from 'src/app/shared/view-models';
import { BlogCardComponent } from '../../components/blog-card.component';

@Component({
  selector: 'app-blogs-page',
  imports: [BlogCardComponent, RevealDirective, ScrollWeightDirective],
  template: `
    <main
      class="wrap flex flex-col gap-[clamp(56px,7vw,96px)] pb-10 pt-[clamp(40px,7vw,88px)]"
    >
      <div class="flex flex-wrap items-end justify-between gap-6">
        <h1 appScrollWeight appReveal="0" class="display-lg">
          From the<br /><b class="font-black text-pri">blog</b>
        </h1>
        <p
          appReveal="1"
          class="m-0 max-w-[380px] font-manrope text-base leading-[1.6] text-on-srf-v"
        >
          Articles and stories from the GDG Siliguri community.
        </p>
      </div>
      @if (blogs().length > 0) {
        <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-4">
          @for (blog of blogs(); track blog.id; let i = $index) {
            <app-blog-card [appReveal]="i % 3" [blog]="blog" />
          }
        </div>
        @if (canLoadMore()) {
          <button
            type="button"
            (click)="loadMore()"
            [disabled]="loading()"
            class="pill-btn cursor-pointer self-center border-0"
          >
            {{ loading() ? 'Loading…' : 'Load more' }}
          </button>
        }
      } @else {
        <p
          class="m-0 rounded-[36px] bg-srf-2 p-10 text-center font-manrope text-base text-on-srf-v"
        >
          No blogs available at the moment. Check back soon!
        </p>
      }
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsPageComponent {
  private readonly content = inject(SiteContentService);
  private readonly view = toSignal(this.content.blogs());
  private readonly more = signal<BlogPost[]>([]);
  private readonly nextToken = signal<string | undefined>(undefined);
  private readonly exhausted = signal(false);
  protected readonly loading = signal(false);

  protected readonly blogs = computed(() => {
    const seen = new Set<string>();
    return [...(this.view()?.posts ?? []), ...this.more()].filter(
      (post) => !seen.has(post.id) && !!seen.add(post.id)
    );
  });
  protected readonly canLoadMore = computed(() => !!this.view()?.pageable && !this.exhausted());

  protected loadMore(): void {
    this.loading.set(true);
    const before = this.blogs().length;
    this.content.blogsPage(this.nextToken()).subscribe({
      next: ({ posts, next }) => {
        this.more.set([...this.more(), ...posts]);
        this.nextToken.set(next);
        this.exhausted.set(!next);
        this.loading.set(false);
        if (next && this.blogs().length === before) {
          this.loadMore();
        }
      },
      error: () => {
        this.loading.set(false);
        this.exhausted.set(true);
      },
    });
  }

  constructor() {
    inject(SeoService).update({
      title: 'Blog · GDG Siliguri',
      description: 'Articles and stories from the GDG Siliguri community.',
      path: '/blogs',
    });
  }
}
