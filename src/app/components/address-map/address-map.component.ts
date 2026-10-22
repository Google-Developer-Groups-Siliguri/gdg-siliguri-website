import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-address-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block overflow-hidden rounded-m3-xl bg-surface-container' },
  template: `
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.687240890537!2d88.43764057601207!3d26.75435496687695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e44150e6d5341f%3A0x3e9ecf67ac12449c!2sROYAL%20SAROVAR%20PORTICO!5e0!3m2!1sen!2sin!4v1696924762817!5m2!1sen!2sin"
      title="Royal Sarovar Portico, Siliguri location"
      class="block h-80 w-full border-0 md:h-[26rem]"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  `,
})
export class AddressMapComponent {}
