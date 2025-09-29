import { Component, Input } from '@angular/core';
import { Events } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-community-events-list',
    // Add any necessary imports like CommonModule if required:
    imports: [CommonModule],
    template: `
    <div class="flex flex-col gap-4">
      <div
        *ngFor="let item of eventsList; trackBy: trackByFn"
        class="flex flex-col md:flex-row items-start border p-4 rounded-2xl bg-white shadow hover:shadow-lg transition-shadow duration-300 w-full"
      >
        <!-- Thumbnail Image -->
        <div class="w-full md:w-2/12">
          <img
            [src]="item.thumbnail"
            [alt]="item.name"
            class="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <!-- Event Details -->
        <div class="w-full md:w-2/3 mt-4 md:mt-0 md:pl-6">
          <p class="text-2xl font-bold">{{ item.name }}</p>
          <p class="mt-2 text-gray-500 text-sm">{{ item.tagline }}</p>
          <!-- Additional details like date or location can be added here -->
          <div class="mt-3">
            <button
              class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white rounded-3xl"
            >
              <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-3xl group-hover:bg-opacity-0"
              >
                Learn More
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [
    /* Include component-specific styles here if needed */
    ]
})
export class CommunityEventsListComponent {
  @Input({ required: true }) eventsList!: Events[];

  // A trackBy function for ngFor (using a unique id if available)
  trackByFn(index: number, item: Events): number | string {
    return item.id || index;
  }
}
