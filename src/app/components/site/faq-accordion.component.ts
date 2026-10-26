import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';
import { FaqView } from 'src/app/shared/view-models';

@Component({
  selector: 'app-faq-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex min-w-0 flex-[2_1_520px] flex-col gap-1.5' },
  template: `
    @for (faq of items(); track faq.question; let i = $index) {
      @let isOpen = open() === i;
      <div
        class="transition-[border-radius,background-color,color] duration-[600ms,500ms,500ms] ease-emph"
        [style.border-radius]="isOpen ? '44px 12px 44px 44px' : '36px'"
        [style.background]="isOpen ? 'var(--pri-c)' : 'var(--srf-2)'"
        [style.color]="isOpen ? 'var(--on-pri-c)' : 'var(--on-srf)'"
      >
        <button
          type="button"
          [attr.aria-expanded]="isOpen"
          (click)="open.set(isOpen ? -1 : i)"
          class="flex min-h-[72px] w-full cursor-pointer items-center gap-4 border-0 bg-transparent py-4 pl-[clamp(20px,3vw,28px)] pr-4 text-left font-urbanist text-[clamp(17px,1.6vw,19px)] font-bold leading-[1.3] text-inherit"
        >
          <span class="flex-1">{{ faq.question }}</span>
          <span
            class="ms grid h-11 w-11 flex-none place-items-center rounded-[22px] text-2xl transition-[rotate,background-color] duration-[600ms,400ms] ease-spring"
            [style.background]="isOpen ? 'var(--pri)' : 'var(--srf-4)'"
            [style.rotate]="isOpen ? '135deg' : '0deg'"
            aria-hidden="true"
            >add</span
          >
        </button>
        <div
          class="grid transition-[grid-template-rows] duration-[600ms] ease-emph"
          [style.grid-template-rows]="isOpen ? '1fr' : '0fr'"
        >
          <div class="overflow-hidden">
            <p
              class="m-0 max-w-[680px] px-[clamp(20px,3vw,28px)] pb-[26px] font-manrope text-base leading-[1.6]"
            >
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    }
  `,
})
export class FaqAccordionComponent {
  readonly items = input.required<FaqView[]>();
  readonly initiallyOpen = input(-1);

  protected readonly open = linkedSignal(() => this.initiallyOpen());
}
