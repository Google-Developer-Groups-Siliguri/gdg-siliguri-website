import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LinkItem } from 'src/app/shared/view-models';
import { iconOr } from './material-icons';

@Component({
  selector: 'app-module-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col' },
  template: `
    @for (link of items(); track link.url) {
      <a
        [href]="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-4 border-t border-solid border-out-v px-2 py-5 text-on-srf no-underline transition-[translate] duration-[600ms] ease-bounce hover:text-on-srf hover:[translate:8px_0]"
      >
        <span
          aria-hidden="true"
          class="ms grid h-12 w-12 flex-none place-items-center rounded-3xl bg-pri-c text-2xl text-on-pri-c"
          >{{ icon(link.icon) }}</span
        >
        <span class="flex min-w-0 flex-1 flex-col gap-1">
          <b class="font-urbanist text-xl font-bold">{{ link.label }}</b>
          @if (link.description) {
            <span class="font-manrope text-sm text-on-srf-v">{{ link.description }}</span>
          }
        </span>
      </a>
    }
  `,
})
export class ModuleLinksComponent {
  readonly items = input.required<LinkItem[]>();

  protected icon(name: string): string {
    return iconOr(name, 'arrow_outward');
  }
}
