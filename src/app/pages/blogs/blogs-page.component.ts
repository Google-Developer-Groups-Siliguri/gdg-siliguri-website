import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BlogPost, DataService } from 'src/app/services/data.service';
import { BlogCardComponent } from '../../components/blog-card.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@Component({
  selector: 'app-blogs-page',
  imports: [AsyncPipe, CommonModule, BlogCardComponent, PageHeaderComponent],
  template: `
    <div class="mt-20 w-full min-h-[70vh] max-w-screen-2xl mx-auto p-4">
      <app-page-header
        title="Blogs"
        subtitle="Read our latest articles and stories from the community!"
      ></app-page-header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @if (blogs$ | async; as blogs) { @if (blogs.length > 0) { @for (blog of
        blogs; track blog.id) {
        <app-blog-card [blog]="blog"></app-blog-card>
        } } @else {
        <p class="text-center col-span-full text-gray-500">
          No blogs available at the moment. Check back soon!
        </p>
        } } @else {
        <div class="col-span-full flex justify-center items-center py-20">
          <div class="animate-pulse text-gray-400">Loading blogs...</div>
        </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsPageComponent {
  blogs$: Observable<BlogPost[]>;

  constructor(
    private meta: Meta,
    private title: Title,
    private dataService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Blogs | GDG Siliguri',
    });
    this.title.setTitle('Blogs | GDG Siliguri');
    this.blogs$ = this.dataService.getHashnodeBlogs();
  }
}
