import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SITE_NAME, SeoService } from 'src/app/services/seo.service';
import { ik } from 'src/app/shared/image';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ModuleHostComponent } from 'src/app/components/modules/module-host.component';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ScrollWeightDirective } from 'src/app/motion/scroll-weight.directive';
import { ContentPage } from 'src/app/shared/view-models';
import { ShowcasePageComponent } from '../showcase/showcase-page.component';

@Component({
  selector: 'app-module-page',
  imports: [ModuleHostComponent, RevealDirective, ScrollWeightDirective, ShowcasePageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showcase(); as view) {
      <app-showcase-page [view]="view" />
    } @else if (module(); as m) {
      <main
        class="wrap flex flex-col gap-[clamp(40px,6vw,72px)] pb-10 pt-[clamp(40px,7vw,88px)]"
      >
        <div class="flex flex-wrap items-end justify-between gap-6">
          <h1 appScrollWeight appReveal="0" class="display-lg">{{ m.title }}</h1>
          @if (m.subtitle) {
            <p
              appReveal="1"
              class="m-0 max-w-[380px] font-manrope text-base leading-[1.6] text-on-srf-v"
            >
              {{ m.subtitle }}
            </p>
          }
        </div>
        <h2 class="sr-only">{{ m.title }}</h2>
        <app-module-host [module]="m" />
      </main>
    }
  `,
})
export class ModulePageComponent {
  private readonly page = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['data'] as ContentPage))
  );

  protected readonly showcase = computed(() => {
    const page = this.page();
    return page?.kind === 'showcase' ? page.showcase : null;
  });
  protected readonly module = computed(() => {
    const page = this.page();
    return page?.kind === 'module' ? page.page.module : null;
  });

  constructor() {
    const seo = inject(SeoService);
    const route = inject(ActivatedRoute);
    const showcase = this.showcase();
    const module = this.module();
    const heading = showcase?.title ?? module?.title ?? SITE_NAME;
    const image = showcase?.items.find((item) => item.images.length)?.images[0]?.url;
    seo.update({
      title: showcase ? heading : `${heading} · ${SITE_NAME}`,
      description: (showcase?.subtitle ?? module?.subtitle) || heading,
      path: module?.path || `/${route.snapshot.url.map((s) => s.path).join('/')}`,
      image: image ? ik(image, { w: 1200, h: 630 }) : '',
    });
  }
}
