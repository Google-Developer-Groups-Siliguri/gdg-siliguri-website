import { Component } from '@angular/core';

@Component({
  selector: 'app-comming-soon',
  standalone: true,
  imports: [],
  template: `
    <div>
      <section
        class="md:mx-[1.5rem] mx-[1.5rem] bg-gray-100 lg:p-10 p-6 rounded-2xl"
      >
        <div
          class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12"
        >
          <h1
            class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          >
            DevFest 2024 Siliguri is coming soon...
          </h1>
        </div>
      </section>
    </div>
  `,
  styles: ``,
})
export class CommingSoonComponent {}
