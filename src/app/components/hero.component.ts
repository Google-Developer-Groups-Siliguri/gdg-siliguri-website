import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <div class="flex gap-x-4 p-2">
      <div
        class="flex flex-auto items-center justify-center md:w-1/4 w-4/12 min-h-[10rem] md:min-h-[12rem] lg:min-h-[24rem] border border-black rounded-xl"
      >
        <img
          src="assets/images/logos/gdg_logo_full.svg"
          class="gdg-logo w-full p-2 h-full"
          fetchpriority="high"
          alt=""
        />
      </div>
      <div class="flex justify-items-center items-center md:w-3/4 w-8/12">
        <img
          src="assets/images/io8.webp"
          class="w-full h-full border border-black rounded-xl md:object-cover object-fill"
          alt=""
          fetchpriority="high"
        />
      </div>
    </div>
    <div class="flex flex-col lg:flex-row md:flex-row gap-x-5 gap-y-5 p-2">
      <div
        class="flex flex-auto lg:w-2/5 md:w-1/5 min-h-[15rem] md:min-h-[12rem] lg:min-h-[24rem]"
      >
        <img
          src="assets/images/ioposter.webp"
          class="w-full border border-black rounded-xl object-cover"
          alt=""
          fetchpriority="high"
        />
      </div>
      <div class="flex flex-auto lg:w-3/5 md:w-3/5 h-52 lg:h-96">
        <img
          src="assets/images/io6.webp"
          class="w-full lg:h-full border border-black rounded-xl object-cover"
          alt=""
          fetchpriority="high"
        />
      </div>
    </div>
  `,
  styles: `
    @media screen and (min-width:1024px) {
        .gdg-logo{
            width: 250px;
            height: 240px;
        }
    }
  `,
  standalone: true,
  imports: [NgOptimizedImage],
})
export class HeroComponent {}
