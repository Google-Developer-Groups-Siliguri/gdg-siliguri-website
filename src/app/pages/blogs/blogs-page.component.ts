import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { DataService } from 'src/app/services/data.service';
import { BlogCardComponent } from '../../components/blog-card.component';

@Component({
  selector: 'app-blogs-page',
  imports: [BlogCardComponent, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="From the community"
      title="Blogs"
      subtitle="Read our latest articles and stories from the community."
    />
    <div class="page-container">
      @if (blogs().length > 0) {
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (blog of blogs(); track blog.id) {
            <app-blog-card [blog]="blog" />
          }
        </div>
      } @else {
        <p class="rounded-m3-xl bg-surface-container-low p-10 text-center text-body-lg text-on-surface-variant">
          No blogs available at the moment. Check back soon!
        </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsPageComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  protected readonly blogs = toSignal(inject(DataService).getHashnodeBlogs(), {
    initialValue: [],
  });

  constructor() {
    this.meta.addTag({
      name: 'title',
      content: 'Blogs | GDG Siliguri',
    });
    this.title.setTitle('Blogs | GDG Siliguri');
  }
}
