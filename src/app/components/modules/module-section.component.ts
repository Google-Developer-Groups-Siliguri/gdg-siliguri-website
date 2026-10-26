import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from 'src/app/motion/reveal.directive';
import { ModuleView } from 'src/app/shared/view-models';
import { ModuleHostComponent } from './module-host.component';

@Component({
  selector: 'app-module-section',
  imports: [ModuleHostComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'wrap flex flex-col gap-7' },
  template: `
    <div appReveal="0" class="flex flex-col gap-2">
      <h2 class="display-md">{{ module().title }}</h2>
      @if (module().subtitle) {
        <p class="m-0 font-manrope text-base leading-[1.6] text-on-srf-v">
          {{ module().subtitle }}
        </p>
      }
    </div>
    <app-module-host [module]="module()" [limit]="limit()" />
  `,
})
export class ModuleSectionComponent {
  readonly module = input.required<ModuleView>();
  readonly limit = input<number | null>(null);
}
