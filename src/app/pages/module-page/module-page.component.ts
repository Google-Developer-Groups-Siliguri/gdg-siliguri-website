import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
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
    const page = this.page();
    const heading =
      page?.kind === 'showcase' ? page.showcase.title : page?.kind === 'module' ? page.page.module.title : '';
    const summary =
      page?.kind === 'showcase'
        ? page.showcase.subtitle
        : page?.kind === 'module'
          ? page.page.module.subtitle
          : '';
    inject(Title).setTitle(`${heading} · GDG Siliguri`);
    inject(Meta).updateTag({ name: 'description', content: summary || heading });
  }
}
