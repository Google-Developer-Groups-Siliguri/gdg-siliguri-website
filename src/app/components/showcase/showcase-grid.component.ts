import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ik, srcset } from 'src/app/shared/image';
import { ShowcaseCard } from 'src/app/shared/view-models';
import { MarkdownComponent } from '../markdown.component';

@Component({
  selector: 'app-showcase-grid',
  imports: [MarkdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4">
      @for (item of items(); track item.id) {
        <article
          class="t-lift flex flex-col gap-4 rounded-[36px_36px_36px_10px] bg-srf-2 p-3 text-on-srf hover:rounded-[36px] hover:bg-srf-3"
        >
          <button
            type="button"
            (click)="open(item)"
            [attr.aria-label]="'Open ' + item.title"
            class="aspect-video w-full cursor-pointer overflow-hidden rounded-[28px] border-0 bg-srf-3 p-0"
          >
            @if (item.images[0]; as image) {
              <img
                [src]="ik(image.url, { w: 640, h: 360, fit: 'cover' })"
                [attr.srcset]="srcset(image.url, [320, 640, 960], { fit: 'cover', aspect: 16 / 9 }) || null"
                sizes="(min-width: 700px) 400px, 100vw"
                [alt]="image.alt"
                [attr.width]="image.width ?? 640"
                [attr.height]="image.height ?? 360"
                loading="lazy"
                class="h-full w-full object-cover"
              />
            }
          </button>
          <div class="flex flex-1 flex-col gap-3 px-3 pb-3">
            <h3 class="m-0 font-urbanist text-[22px] font-bold leading-[1.2]">{{ item.title }}</h3>
            <p class="m-0 font-manrope text-sm leading-[1.55] text-on-srf-v">{{ item.summary }}</p>
            @if (item.tags.length) {
              <div class="flex flex-wrap gap-1.5">
                @for (tag of item.tags; track tag) {
                  <span
                    class="flex h-7 items-center rounded-[14px] bg-srf-4 px-3 font-manrope text-xs font-bold"
                    >{{ tag }}</span
                  >
                }
              </div>
            }
            @if (item.team.length) {
              <span class="font-manrope text-[13px] font-semibold text-on-srf-v">{{
                item.team.join(', ')
              }}</span>
            }
            <div class="mt-auto flex flex-wrap gap-1 pt-1">
              @if (item.repo) {
                <a [href]="item.repo" target="_blank" rel="noopener noreferrer" class="pill-btn"
                  >Code<span class="ms">arrow_outward</span></a
                >
              }
              @if (item.demo) {
                <a [href]="item.demo" target="_blank" rel="noopener noreferrer" class="pill-btn"
                  >Demo<span class="ms">arrow_outward</span></a
                >
              }
            </div>
          </div>
        </article>
      }
    </div>

    <dialog
      #dialog
      (close)="selected.set(null)"
      [attr.aria-label]="selected()?.title ?? 'Project'"
      class="max-h-[90vh] w-[min(92vw,760px)] overflow-auto rounded-[40px] border-0 bg-srf-2 p-0 text-on-srf backdrop:bg-black/60"
    >
      @if (selected(); as item) {
        <div class="flex flex-col gap-5 p-[clamp(20px,3vw,32px)]">
          <div class="flex items-start justify-between gap-4">
            <h3 class="m-0 font-urbanist text-[28px] font-extrabold leading-[1.1]">
              {{ item.title }}
            </h3>
            <button
              type="button"
              (click)="close()"
              aria-label="Close"
              class="ms h-12 w-12 flex-none cursor-pointer rounded-3xl border-0 bg-srf-4 text-2xl text-on-srf"
            >
              close
            </button>
          </div>
          @if (slide(); as image) {
            <div class="relative">
              <img
                [src]="ik(image.url, { w: 1280, h: 720, fit: 'cover' })"
                [alt]="image.alt"
                [attr.width]="image.width ?? 1280"
                [attr.height]="image.height ?? 720"
                class="aspect-video w-full rounded-[28px] object-cover"
              />
              @if (item.images.length > 1) {
                <div class="absolute inset-x-3 bottom-3 flex justify-between">
                  <button
                    type="button"
                    (click)="step(-1)"
                    aria-label="Previous image"
                    class="ms h-11 w-11 cursor-pointer rounded-[22px] border-0 bg-srf-0 text-xl text-on-srf"
                  >
                    arrow_back
                  </button>
                  <button
                    type="button"
                    (click)="step(1)"
                    aria-label="Next image"
                    class="ms h-11 w-11 cursor-pointer rounded-[22px] border-0 bg-srf-0 text-xl text-on-srf"
                  >
                    arrow_forward
                  </button>
                </div>
              }
            </div>
          }
          <p class="m-0 font-manrope text-base font-medium leading-[1.55]">{{ item.summary }}</p>
          @if (item.body) {
            <app-markdown [source]="item.body" />
          }
          @if (item.team.length) {
            <span class="font-manrope text-sm font-semibold text-on-srf-v"
              >Built by {{ item.team.join(', ') }}</span
            >
          }
        </div>
      }
    </dialog>
  `,
})
export class ShowcaseGridComponent {
  readonly items = input.required<ShowcaseCard[]>();

  protected readonly ik = ik;
  protected readonly srcset = srcset;
  protected readonly selected = signal<ShowcaseCard | null>(null);
  private readonly index = signal(0);
  protected readonly slide = computed(() => {
    const images = this.selected()?.images ?? [];
    return images.length ? images[this.index() % images.length] : null;
  });

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  protected open(item: ShowcaseCard): void {
    this.selected.set(item);
    this.index.set(0);
    this.dialog()?.nativeElement.showModal();
  }

  protected close(): void {
    this.dialog()?.nativeElement.close();
  }

  protected step(direction: number): void {
    const count = this.selected()?.images.length ?? 1;
    this.index.set((this.index() + direction + count) % count);
  }
}
