import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommingSoonComponent],
  template: `
    <div class="mt-20 min-h-[70vh] md:container md:mx-auto md:px-4 px-[1.5rem]">
      <app-comming-soon></app-comming-soon>
      <!-- <div class="container flex flex-col">
        <h1 class="text-[#4387F6] font-sans font-semibold text-7xl py-4">
          Book your seat
        </h1>
        <p class="py-4 font-sans text-3xl font-normal text-black">
          Book your ticket to DevFest’23 at Royal Sarovar Portico, Siliguri and
          experience the community like no other.
        </p>
        <a
          href="https://www.commudle.com/communities/google-developers-group-siliguri/events/devfest-siliguri-2023"
          target="_blank"
          rel="noopener noreferrer"
          type="button"
          class="text-white text-center bg-[#4387F6] hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-48 py-3"
        >
          Get Ticket
        </a>
        <p class="font-sans text-4xl font-semibold text-black pt-14">
          Points to note 🎯
        </p>
        <ul
          class="py-4 font-sans text-xl text-black list-disc md:text-3xl ps-10"
        >
          <li>
            Each ticket is valid for ONE admission only. If you are bringing a
            guest, they’ll need their own ticket.
          </li>
          <li>Tickets are non-refundable.</li>
          <li>
            You have to show your ticket to the volunteers and make sure your
            entry.
          </li>
          <li>
            You can’t copy ticket from others because each tickets have their
            specific QR code.
          </li>
          <li>Those who will get their tickets only they will attend .</li>
          <li>
            It’s important to us that everyone who attends Devfest 2023 Siliguri
            is treated equally, respected, and protected. By attending, you
            agree to abide by our Terms.
          </li>
        </ul>

        <p class="font-sans text-4xl font-semibold text-black pt-14">
          Perks 🚀
        </p>
        <ul
          class="py-4 font-sans text-xl text-black list-disc md:text-3xl ps-10"
        >
          <li>Hands on workshops🎈</li>
          <li>Interaction with the community 🙌</li>
          <li>Learn, Enjoy and Participate 🏆</li>
          <li>Grow your knowledge 📈</li>
          <li>Learn to optimise your resources 📚</li>
          <li>Exposure your idea 💡</li>
          <li>Test your competence 🎯</li>
        </ul>
      </div> -->
    </div>
  `,
  styles: ``,
})
export class TicketsComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({
      name: 'title',
      content: 'Tickets | Devfest Siliguri 2023',
    });
    this.title.setTitle('Tickets | Devfest Siliguri 2023');
  }
}
