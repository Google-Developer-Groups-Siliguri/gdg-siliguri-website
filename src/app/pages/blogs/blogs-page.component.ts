import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { SiteContentService } from 'src/app/services/site-content.service';
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
  protected readonly blogs = toSignal(inject(SiteContentService).blogs(), {
    initialValue: [],
  });

  constructor() {
    inject(Title).setTitle('Blogs | GDG Siliguri');
    inject(Meta).updateTag({
      name: 'description',
      content: 'Articles and stories from the GDG Siliguri community.',
    });
  }
}
