import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  template: `
    <img
      src="assets/images/header-banner.png"
      alt="devfest2024"
      width="1520"
      height="180"
    />
    <div class="grid grid-cols-12">
      <img
        src="assets/images/left-side-hero.png"
        alt="devfest2024"
        class="col-span-3"
      />
      <h1 class="col-span-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est saepe
        maxime recusandae facere, fugit ducimus omnis et numquam facilis sequi.
      </h1>
      <div class="col-span-3 ">
        <img
          src="assets/images/left-side-hero.png"
          alt="devfest2024"
          class="-scale-x-100 float-right"
        />
      </div>
    </div>
  `,
  styles: ``,
})
export class BannerComponent {}
