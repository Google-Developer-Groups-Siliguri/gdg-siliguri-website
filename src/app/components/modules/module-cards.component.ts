import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ik, srcset } from 'src/app/shared/image';
import { CardItem } from 'src/app/shared/view-models';
import { MarkdownComponent } from '../markdown.component';

@Component({
  selector: 'app-module-cards',
  imports: [MarkdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4' },
  template: `
    @for (card of items(); track $index) {
      <article class="flex flex-col gap-4 rounded-[36px_36px_36px_10px] bg-srf-2 p-3 text-on-srf">
        @if (card.image; as image) {
          <img
            [src]="ik(image.url, { w: 640, h: 360, fit: 'cover' })"
            [attr.srcset]="srcset(image.url, [320, 640], { fit: 'cover', aspect: 16 / 9 }) || null"
            sizes="(min-width: 700px) 360px, 100vw"
            [alt]="image.alt"
            [attr.width]="image.width ?? 640"
            [attr.height]="image.height ?? 360"
            loading="lazy"
            class="aspect-video w-full rounded-[28px] bg-srf-3 object-cover"
          />
        }
        <div class="flex flex-1 flex-col gap-3 px-3 pb-3">
          <h3 class="m-0 font-urbanist text-[22px] font-bold leading-[1.2]">{{ card.title }}</h3>
          @if (card.body) {
            <app-markdown [source]="card.body" class="text-on-srf-v" />
          }
          @if (card.tags.length) {
            <div class="flex flex-wrap gap-1.5">
              @for (tag of card.tags; track tag) {
                <span
                  class="flex h-7 items-center rounded-[14px] bg-srf-4 px-3 font-manrope text-xs font-bold"
                  >{{ tag }}</span
                >
              }
            </div>
          }
          @if (card.url) {
            <a
              [href]="card.url"
              target="_blank"
              rel="noopener noreferrer"
              class="pill-btn mt-auto self-start"
              >Open<span class="ms">arrow_outward</span></a
            >
          }
        </div>
      </article>
    }
  `,
})
export class ModuleCardsComponent {
  readonly items = input.required<CardItem[]>();

  protected readonly ik = ik;
  protected readonly srcset = srcset;
}
