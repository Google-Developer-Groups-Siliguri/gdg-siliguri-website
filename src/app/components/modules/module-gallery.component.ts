import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ik } from 'src/app/shared/image';
import { GalleryItem } from 'src/app/shared/view-models';

@Component({
  selector: 'app-module-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="columns-[260px] gap-3">
      @for (item of items(); track $index; let i = $index) {
        <button
          type="button"
          (click)="open(i)"
          [attr.aria-label]="item.caption || item.image.alt || 'Open photo'"
          class="mb-3 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-[28px] border-0 bg-srf-3 p-0"
        >
          <img
            [src]="ik(item.image.url, { w: 560 })"
            [alt]="item.image.alt"
            [attr.width]="item.image.width ?? null"
            [attr.height]="item.image.height ?? null"
            loading="lazy"
            class="block h-auto w-full"
          />
        </button>
      }
    </div>
    <dialog
      #dialog
      aria-label="Photo"
      class="max-h-[92vh] w-[min(94vw,1100px)] rounded-[32px] border-0 bg-srf-2 p-3 text-on-srf backdrop:bg-black/70"
    >
      @if (items()[current()]; as item) {
        <figure class="m-0 flex flex-col gap-3">
          <img
            [src]="ik(item.image.url, { w: 1600 })"
            [alt]="item.image.alt"
            class="max-h-[76vh] w-full rounded-[24px] object-contain"
          />
          <figcaption class="flex items-center justify-between gap-3 px-2 font-manrope text-sm">
            <span>{{ item.caption }}</span>
            <span class="flex gap-1">
              <button
                type="button"
                (click)="step(-1)"
                aria-label="Previous photo"
                class="ms h-11 w-11 cursor-pointer rounded-[22px] border-0 bg-srf-4 text-xl text-on-srf"
              >
                arrow_back
              </button>
              <button
                type="button"
                (click)="step(1)"
                aria-label="Next photo"
                class="ms h-11 w-11 cursor-pointer rounded-[22px] border-0 bg-srf-4 text-xl text-on-srf"
              >
                arrow_forward
              </button>
              <button
                type="button"
                (click)="dialog.close()"
                aria-label="Close"
                class="ms h-11 w-11 cursor-pointer rounded-[22px] border-0 bg-srf-4 text-xl text-on-srf"
              >
                close
              </button>
            </span>
          </figcaption>
        </figure>
      }
    </dialog>
  `,
})
export class ModuleGalleryComponent {
  readonly items = input.required<GalleryItem[]>();

  protected readonly ik = ik;
  protected readonly current = signal(0);
  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  protected open(index: number): void {
    this.current.set(index);
    this.dialogRef()?.nativeElement.showModal();
  }

  protected step(direction: number): void {
    const count = this.items().length || 1;
    this.current.set((this.current() + direction + count) % count);
  }
}
