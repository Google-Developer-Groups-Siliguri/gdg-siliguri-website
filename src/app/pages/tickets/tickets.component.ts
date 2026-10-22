import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { DataService, EventData } from 'src/app/services/data.service';

@Component({
  selector: 'app-tickets',
  imports: [AsyncPipe, PageHeaderComponent],
  template: `
    @if (eventData$ | async; as data) {
      <app-page-header
        eyebrow="DevFest Siliguri"
        title="Book your seat"
        [subtitle]="subtitle(data)"
      />
      <div class="page-container flex flex-col gap-10">
        <a
          [href]="data.eventTicketURL"
          target="_blank"
          rel="noopener noreferrer"
          class="m3-btn m3-btn-md m3-btn-filled self-start"
        >
          Grab your tickets
          <span class="material-symbols-rounded" aria-hidden="true">confirmation_number</span>
        </a>

        <div class="grid gap-4 md:grid-cols-2">
          @if (data.pointsToNote.enabled) {
            <section class="rounded-m3-xl bg-g-red-container p-6 text-on-g-red-container md:p-8">
              <h2 class="mb-5 flex items-center gap-3 text-headline-sm font-medium">
                <span class="material-symbols-rounded icon-filled" aria-hidden="true">info</span>
                Points to note
              </h2>
              <ul class="flex flex-col gap-3">
                @for (point of data.pointsToNote.data; track $index) {
                  <li class="flex gap-3 text-body-lg">
                    <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true"></span>
                    {{ point }}
                  </li>
                }
              </ul>
            </section>
          }
          @if (data.perks.enabled) {
            <section class="rounded-m3-xl bg-g-green-container p-6 text-on-g-green-container md:p-8">
              <h2 class="mb-5 flex items-center gap-3 text-headline-sm font-medium">
                <span class="material-symbols-rounded icon-filled" aria-hidden="true">celebration</span>
                Perks
              </h2>
              <ul class="flex flex-col gap-3">
                @for (perk of data.perks.data; track $index) {
                  <li class="flex gap-3 text-body-lg">
                    <span class="material-symbols-rounded !text-xl" aria-hidden="true">check_circle</span>
                    {{ perk }}
                  </li>
                }
              </ul>
            </section>
          }
        </div>
      </div>
    }
  `,
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
      content: `Tickets | Devfest Siliguri 2025`,
    });
    this.title.setTitle(`Tickets | Devfest Siliguri 2025`);
    this.eventData$ = this.firebaseService.getEventData();
  }

  protected subtitle(data: EventData): string {
    const shortYear = new Date(data.eventDateTime).getFullYear().toString().slice(-2);
    return `Book your ticket to DevFest '${shortYear} at ${data.eventVenue.name} and experience the community like no other.`;
  }
}
