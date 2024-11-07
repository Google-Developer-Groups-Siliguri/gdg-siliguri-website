import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <div class="grid grid-cols-12 gap-5 overflow-hidden mx-[1.5rem] mb-[2rem]">
      <div class="col-span-12">
        <div class="hidden w-full bg-cover md:p-4 md:block">
          <picture>
            <source
              media="(min-width:1024px)"
              srcset="assets/images/gdg-slg.webp"
            />
            <!-- <source
          media="(min-width:768px)"
          srcset="assets/images/new-banner.webp"
        /> -->
            <img
              src="assets/images/gdg-slg.webp"
              alt="Devfest 2023"
              style="width: auto"
              class="w-full h-full rounded-2xl md:rounded-3xl"
            />
          </picture>
        </div>
      </div>
      <div class="col-span-12 md:col-span-12">
        <div class="grid w-full grid-cols-12 gap-x-5 place-items-center">
          <div class="col-span-12 mb-5 md:col-span-3 md:mb-0">
            <div class="">
              <img
                src="assets/images/gdg-logo.webp"
                class=""
                alt="devfest-siliguri"
              />
            </div>
          </div>
          <div class="col-span-12 md:col-span-9">
            <p class="font-medium text-gray-400 md:text-xl">
              {{ title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [],
})
export class HeroComponent {
  title =
    'GDG Siliguri is based out of Siliguri and handles the geographic region of North Bengal and Sikkim. We are a group consisting of both student and professional developers and we conduct a lot of events to empower the local tech community. These include tech talks, hackathons, codelabs, workshops and more.';
}
