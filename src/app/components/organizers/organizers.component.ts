import { Component } from '@angular/core';

@Component({
  selector: 'app-organizers',
  standalone: true,
  template: `
    <div
      class="container flex flex-col justify-center items-center md:mb-12 mb-0"
    >
      <h1
        class="text-red-600 font-['Samarkan'] text-3xl p-3 dark:text-white lg:text-6xl"
      >
        organizers
      </h1>
      <div class="flex px-4 md:px-0 h-[11rem] md:h-72 container justify-center">
        <img
          class="object-top object-cover w-full rounded-xl relative inset-y-0 top-0"
          src="assets/images/organizers.jpg"
          alt="organizers"
          fetchPriority="low"
          loading="lazy"
        />
      </div>
    </div>
  `,
})
export class OrganizersComponent {}
