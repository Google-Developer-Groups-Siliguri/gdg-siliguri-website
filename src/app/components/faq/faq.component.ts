import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDocument } from 'ssr-window';
import {
  Accordion,
  AccordionInterface,
  AccordionItem,
  AccordionOptions,
} from 'flowbite';
import { Observable, Subscription } from 'rxjs';
import { DataService, FAQ } from 'src/app/services/data.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (faqData; as data) { @if(data.enabled) {
    <div
      class="grid grid-cols-12 md:gap-10 gap-5 overflow-hidden mx-[1.5rem] mb-[2rem] bg-white lg:p-12 rounded-2xl md:p-5 p-3"
    >
      <div class="col-span-12 md:col-span-6">
        <h1
          class="lg:text-7xl md:text-5xl text-4xl font-[600] text-[#3c4043] text-center md:text-left"
        >
          Frequently asked questions
        </h1>
      </div>
      <div class="col-span-12 md:col-span-6">
        @for (item of data.data; track $index; let i=$index) {
        <h2 [id]="'accordion-example-heading-' + (i + 1)" #accordionItem>
          <button
            type="button"
            class="flex items-center justify-between w-full py-5 text-2xl font-semibold text-left text-gray-500 border-b border-gray-200 lg:text-3xl dark:border-gray-700 dark:text-gray-400"
            aria-expanded="false"
            [attr.aria-controls]="'accordion-example-body-' + (i + 1)"
          >
            <span>{{ item.question }}</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 lg:w-5 lg:h-5 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          [id]="'accordion-example-body-' + (i + 1)"
          class="hidden"
          [attr.aria-labelledby]="'accordion-example-heading-' + (i + 1)"
        >
          <div class="py-5 border-b border-gray-200 dark:border-gray-700">
            <p
              class="mb-2 text-base font-medium text-gray-500 dark:text-gray-400 lg:text-xl md:text-lg"
            >
              {{ item.answer }}
            </p>
          </div>
        </div>
        }
      </div>
    </div>
    } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent implements OnInit, OnDestroy {
  accordion: AccordionInterface | undefined;
  accordionItems: AccordionItem[] = [];
  options: AccordionOptions = {};
  faqData: { enabled: boolean; data: FAQ[] } | null = null;
  @ViewChildren('accordionItem') items!: QueryList<ElementRef>;
  private faqSubscription: Subscription | undefined;

  constructor(
    private firebaseService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.faqSubscription = this.firebaseService
      .getAllGDGFAQS()
      .subscribe((data) => {
        this.faqData = data;
        this.cd.detectChanges(); // Ensure the view is updated
        this.initializeAccordion();
      });
  }

  ngOnDestroy(): void {
    if (this.faqSubscription) {
      this.faqSubscription.unsubscribe();
    }
  }

  initializeAccordion() {
    const elements = this.items.toArray();
    elements.forEach((element: ElementRef, index) => {
      const accordionItem = {
        id: `accordion-example-heading-${index + 1}`,
        triggerEl: element.nativeElement as HTMLElement,
        targetEl: getDocument().querySelector(
          `#accordion-example-body-${index + 1}`
        ) as HTMLElement,
        active: false,
      };
      this.accordionItems.push(accordionItem);
    });
    this.options = {
      alwaysOpen: false,
      activeClasses: 'text-black dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400',
    };
    this.accordion = new Accordion(this.accordionItems, this.options);
  }
}
