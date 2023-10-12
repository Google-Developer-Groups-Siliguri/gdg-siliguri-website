import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDocument } from 'ssr-window';
import {
  Accordion,
  AccordionInterface,
  AccordionItem,
  AccordionOptions,
} from 'flowbite';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements AfterViewInit {
  accordion: AccordionInterface | undefined;
  accordionItems: AccordionItem[] = [];
  options: AccordionOptions = {};
  @ViewChildren('accordionexampleheading1') items!: QueryList<ElementRef>;

  data = [
    {
      question: 'What is Devfest',
      ans: 'GDG DevFests are large-scale community-run events that can offer speaker sessions across Google product areas, all-day hack-a-thons, or both. It is a platform for developers, entrepreneurs, and tech enthusiasts to come together and get inspired by the latest technologies',
    },
    {
      question: 'Who is GDG',
      ans: 'Google Developer Groups(GDG) are a group of local developers who are interested in Google products and APIs. We host various technical events for developers ranging from keynote sessions to hackathons. Our main aim is to learn more and keep growing',
    },
    {
      question: 'Where can I find updates related to Devfest Siliguri',
      ans: 'You can follow us on our Social Media links which you can find below - https://linktr.ee/gdgsiliguri',
    },
  ];

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
