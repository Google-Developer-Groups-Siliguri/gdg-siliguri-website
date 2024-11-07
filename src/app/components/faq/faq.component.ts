import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDocument } from 'ssr-window';
import {
  Accordion,
  AccordionInterface,
  AccordionItem,
  AccordionOptions,
} from 'flowbite';
import { Observable } from 'rxjs';
import { DataService, FAQ } from 'src/app/services/data.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent implements AfterViewInit {
  accordion: AccordionInterface | undefined;
  accordionItems: AccordionItem[] = [];
  options: AccordionOptions = {};
  faqData$: Observable<{ enabled: boolean; data: FAQ[] }>;
  @ViewChildren('accordionexampleheading1') items!: QueryList<ElementRef>;

  constructor(private firebaseService: DataService) {
    this.faqData$ = this.firebaseService.getAllFAQS();
  }
  /*
   * accordionItems: array of accordion item objects
   * options: optional
   */

  ngAfterViewInit(): void {
    // options with default values
    const elements = this.items.toArray();
    elements.forEach((element: ElementRef, index) => {
      const accordionItem = {
        id: `accordion-example-heading-${index + 1}`,
        triggerEl: element?.nativeElement! as HTMLElement,
        targetEl: getDocument().querySelector(
          `#accordion-example-body-${index + 1}`
        )! as HTMLElement,
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
