import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { DataService, EventData } from 'src/app/services/data.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommingSoonComponent, AsyncPipe],
  template: `
    <div class="mt-20 min-h-[70vh] md:container md:mx-auto md:px-4 px-[1.5rem]">
      <!-- <app-comming-soon></app-comming-soon> -->
      @if (eventData$ | async; as data) {
      <div class="container flex flex-col">
        <h1 class="text-gray-800 font-semibold text-7xl py-4">
          Book your seat
        </h1>
        <p class="py-4  text-3xl font-normal text-black">
          Book your ticket to DevFest’24 at {{ data.eventVenue.name }}, and
          experience the community like no other.
        </p>
        <!-- <a
          [href]="data.eventTicketURL"
          target="_blank"
          rel="noopener noreferrer"
          type="button"
          class=" inline-block text-white bg-[#7c4dff] hover:bg-blue-800 focus:outline-none font-medium rounded-full md:text-xl px-3 py-2 md:px-6 md:py-4 my-3 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 w-fit"
        >
          Grab Your Tickets!
        </a> -->
        <p class=" text-4xl font-semibold text-black pt-14">
          Points to note 🎯
        </p>
        @if (data.pointsToNote.enabled) {

        <ul class="py-4  text-xl text-black list-disc md:text-3xl ps-10">
          @for (item of data.pointsToNote.data; track $index) {
          <li>
            {{ item }}
          </li>
          }
        </ul>
        }

        <p class=" text-4xl font-semibold text-black pt-14">Perks 🚀</p>
        @if (data.perks.enabled) {
        <ul class="py-4  text-xl text-black list-disc md:text-3xl ps-10">
          @for (item of data.perks.data; track $index) {
          <li>
            {{ item }}
          </li>
          }
        </ul>
        }
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class TicketsComponent {
  eventData$: Observable<EventData>;

  constructor(
    private meta: Meta,
    private title: Title,
    private firebaseService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Tickets | Devfest Siliguri 2024',
    });
    this.title.setTitle('Tickets | Devfest Siliguri 2024');
    this.eventData$ = this.firebaseService.getEventData();
  }
}
