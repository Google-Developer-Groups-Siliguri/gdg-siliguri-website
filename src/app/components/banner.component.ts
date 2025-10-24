import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-12 p-4">
      <div class="col-span-12 flex flex-col justify-center items-center">
        <img
          [src]="bannerImage()"
          alt="devfest2025"
          width="1520"
          height="180"
          class="w-full mb-3"
        />
        <a
          [href]="ticketUrl()"
          target="_blank"
          rel="noopener noreferrer"
          type="button"
          class=" inline-block text-white bg-[#7c4dff] hover:bg-blue-800 focus:outline-none font-medium rounded-full md:text-xl px-3 py-2 md:px-6 md:py-4 my-3 text-center mr-3 md:mr-0"
        >
          Grab Your Tickets!
        </a>
      </div>
    </div>
  `,
  styles: ``,
})
export class BannerComponent {
  ticketUrl = input.required<string>();
  bannerImage = input.required<string>();
}
