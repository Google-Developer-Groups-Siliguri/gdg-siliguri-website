import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddressMapComponent } from '../address-map/address-map.component';
import { SectionHeadingComponent } from '../ui/section-heading/section-heading';

@Component({
  selector: 'app-contact-map',
  imports: [AddressMapComponent, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="venue" class="page-container scroll-mt-24 py-10 md:py-14">
      <app-section-heading eyebrow="Where it happens" title="Venue" />
      <div class="grid gap-4 lg:grid-cols-2">
        <div class="flex flex-col gap-4">
          <div class="flex items-start gap-4 rounded-m3-xl bg-g-red-container p-5 text-on-g-red-container">
            <span class="material-symbols-rounded icon-filled mt-0.5" aria-hidden="true">location_on</span>
            <div>
              <p class="text-title-md font-bold">Royal Sarovar Portico</p>
              <p class="text-body-md">Sevoke Rd, Ward 42, Siliguri, West Bengal</p>
            </div>
          </div>
          <app-address-map class="flex-1" />
        </div>
        <img
          src="assets/images/Royal.webp"
          class="h-full min-h-72 w-full rounded-m3-xl object-cover"
          alt="Royal Sarovar Portico, Siliguri"
          loading="lazy"
        />
      </div>
    </section>
  `,
})
export class ContactMapComponent {}
