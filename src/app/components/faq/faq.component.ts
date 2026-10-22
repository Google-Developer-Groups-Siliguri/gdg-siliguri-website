import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataService, FAQ } from 'src/app/services/data.service';
import { SectionHeadingComponent } from '../ui/section-heading/section-heading';

export type FaqSource = 'community' | 'devfest';

@Component({
  selector: 'app-faq',
  imports: [SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    @if (faqs().length) {
      <section class="page-container grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <app-section-heading
          class="!mb-0 lg:sticky lg:top-24 lg:self-start"
          eyebrow="Good to know"
          title="Frequently asked questions"
        />
        <ul class="flex flex-col gap-1">
          @for (item of faqs(); track item.question; let i = $index, first = $first, last = $last) {
            <li
              class="overflow-hidden transition-[border-radius,background-color,margin] duration-spatial ease-spatial"
              [class]="itemShape(i, first, last)"
            >
              <h3>
                <button
                  type="button"
                  [id]="idPrefix() + '-q-' + i"
                  class="m3-state flex w-full items-center gap-4 px-5 py-4 text-left text-title-md text-on-surface md:px-6 md:py-5 md:text-title-lg"
                  [class.font-bold]="isOpen(i)"
                  [attr.aria-expanded]="isOpen(i)"
                  [attr.aria-controls]="idPrefix() + '-a-' + i"
                  (click)="toggle(i)"
                >
                  <span class="flex-1">{{ item.question }}</span>
                  <span
                    class="material-symbols-rounded flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-spatial ease-spatial"
                    [class]="isOpen(i) ? 'rotate-180 bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'"
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>
              </h3>
              <div
                [id]="idPrefix() + '-a-' + i"
                role="region"
                [attr.aria-labelledby]="idPrefix() + '-q-' + i"
                class="grid transition-[grid-template-rows] duration-spatial ease-emphasized"
                [class]="isOpen(i) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                [attr.inert]="isOpen(i) ? null : ''"
              >
                <div class="overflow-hidden">
                  <p class="px-5 pb-5 pr-16 text-body-lg text-on-surface-variant md:px-6 md:pb-6 md:pr-20">
                    {{ item.answer }}
                  </p>
                </div>
              </div>
            </li>
          }
        </ul>
      </section>
    }
  `,
})
export class FaqComponent implements OnInit {
  readonly source = input<FaqSource>('community');

  protected readonly faqs = signal<FAQ[]>([]);
  protected readonly openIndex = signal<number | null>(0);

  private readonly dataService = inject(DataService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const faqs$ =
      this.source() === 'devfest' ? this.dataService.getAllFAQS() : this.dataService.getAllGDGFAQS();
    faqs$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => this.faqs.set(result?.enabled ? result.data : []));
  }

  protected idPrefix(): string {
    return `faq-${this.source()}`;
  }

  protected isOpen(index: number): boolean {
    return this.openIndex() === index;
  }

  protected toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }

  protected itemShape(index: number, first: boolean, last: boolean): string {
    if (this.isOpen(index)) {
      return `rounded-m3-xl bg-surface-container-high ${first ? '' : 'mt-2'} ${last ? '' : 'mb-2'}`;
    }
    const corners = [first ? 'rounded-t-m3-xl' : 'rounded-t-m3-xs', last ? 'rounded-b-m3-xl' : 'rounded-b-m3-xs'];
    return `${corners.join(' ')} bg-surface-container-low`;
  }
}
