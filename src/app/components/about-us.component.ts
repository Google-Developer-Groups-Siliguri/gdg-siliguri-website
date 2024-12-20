import { NgIf } from '@angular/common';
import { HostListener, Component } from '@angular/core';
import { getWindow } from 'ssr-window';
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgIf],
  template: `
    <div
      class="container flex flex-col justify-center items-center overflow-hidden"
    >
      <h1
        *ngIf="screenWidth < 768"
        class="text-red-600 font-['Samarkan'] text-3xl p-3 dark:text-white pt-6"
      >
        about-us
      </h1>
      <div class="grid grid-cols-12">
        <div class="col-span-12 md:col-span-4">
          <div class="flex items-center justify-center md:justify-start">
            <img
              class="float-left object-cover rounded-xl relative w-[13rem] md:w-96 aspect-square md:aspect-auto"
              src="assets/images/organizers.jpg"
              alt="organizers"
              fetchPriority="low"
              loading="lazy"
            />
          </div>
        </div>
        <div
          class="md:items-start md:flex md:flex-col col-span-12 md:col-span-8 items-center justify-center"
        >
          <h1
            *ngIf="screenWidth >= 768"
            class="text-red-600 font-['Samarkan'] text-3xl px-3 dark:text-white pt-6 lg:text-6xl"
          >
            about-us
          </h1>
          <p
            class="font-['ProductSans'] items-center font-normal text-md text-gray-900 dark:text-white lg:text-2xl m-4"
          >
            GDG Siliguri is a community group for college and university
            students interested in Google developer technologies. We're a
            non-profit organization, and we're open to all who are interested in
            learning and growing as developers.
          </p>
        </div>
        <!-- </div> -->
      </div>
    </div>
  `,
})
export class AboutUsComponent {
  public screenWidth: number = 0;
  public screenHeight: number = 0;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = getWindow().innerWidth;
    this.screenHeight = getWindow().innerHeight;
  }
  constructor() {
    this.getScreenSize();
  }
}
