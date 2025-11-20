import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BlogPost } from 'src/app/services/data.service';
import { BlogCardComponent } from '../../components/blog-card.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs-page',
  imports: [CommonModule, BlogCardComponent, PageHeaderComponent],
  template: `
    <div class="mt-20 w-full min-h-[70vh] max-w-screen-2xl mx-auto p-4">
      <app-page-header
        title="Blogs"
        subtitle="Read our latest articles and stories from the community!"
      ></app-page-header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @if (blogs.length > 0) {
          @for (blog of blogs; track blog.id) {
            <app-blog-card [blog]="blog"></app-blog-card>
          }
        } @else {
          <p class="text-center col-span-full text-gray-500">
            No blogs available at the moment. Check back soon!
          </p>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsPageComponent {
  private route = inject(ActivatedRoute);
  private meta = inject(Meta);
  private title = inject(Title);

  blogs: BlogPost[];

  constructor() {
    this.meta.addTag({
      name: 'title',
      content: 'Blogs | GDG Siliguri',
    });
    this.title.setTitle('Blogs | GDG Siliguri');
    this.blogs = this.route.snapshot.data['data'] as BlogPost[];
  }
}
