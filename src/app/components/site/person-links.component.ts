import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonLink } from 'src/app/shared/view-models';

@Component({
  selector: 'app-person-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    @if (links().length) {
      <ul class="m-0 flex list-none flex-wrap gap-1.5 p-0" [attr.aria-label]="name() + ' online'">
        @for (link of links(); track link.url) {
          <li>
            <a
              [href]="link.url"
              [title]="link.label"
              [attr.aria-label]="name() + ' on ' + link.label"
              target="_blank"
              rel="noopener noreferrer"
              class="grid h-9 w-9 place-items-center rounded-[18px] bg-[color-mix(in_srgb,currentColor_12%,transparent)] text-inherit no-underline hover:text-inherit transition-[background-color,border-radius,scale] duration-300 ease-spring hover:rounded-xl hover:bg-[color-mix(in_srgb,currentColor_22%,transparent)] hover:[scale:1.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              <span
                aria-hidden="true"
                class="block h-[18px] w-[18px] bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                [style.mask-image]="'url(' + link.icon + ')'"
                [style.-webkit-mask-image]="'url(' + link.icon + ')'"
              ></span>
            </a>
          </li>
        }
      </ul>
    }
  `,
})
export class PersonLinksComponent {
  readonly links = input.required<PersonLink[]>();
  readonly name = input.required<string>();
}
