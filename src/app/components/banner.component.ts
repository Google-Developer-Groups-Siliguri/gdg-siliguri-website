import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-12 p-4">
      <div class="col-span-1">
        <img
          src="assets/images/left-side-hero.png"
          alt="devfest2024"
          class="col-span-1"
        />
      </div>
      <div class="col-span-10 flex flex-col justify-center items-center">
        <img
          src="assets/images/header-banner.png"
          alt="devfest2024"
          width="1520"
          height="180"
          class="w-full mb-3"
        />
        <p class="text-center text-sm md:text-base">
          Dive deep into the latest trends and innovations through talks,
          workshops, and more. It's a day filled with learning, networking, and
          inspiring ideas
        </p>
        <a
          href="https://www.commudle.com/communities/google-developers-group-siliguri/events/devfest-siliguri-2023"
          target="_blank"
          rel="noopener noreferrer"
          type="button"
          class=" inline-block text-white bg-[#7c4dff] hover:bg-blue-800 focus:outline-none font-medium rounded-full md:text-xl px-3 py-2 md:px-6 md:py-4 my-3 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Grab Your Tickets!
        </a>
      </div>
      <div class="col-span-1 ">
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
export class BannerComponent {
  ticketUrl = input.required<string>();
}
