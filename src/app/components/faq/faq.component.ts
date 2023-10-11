import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  data = [
    {
      question: 'What is Devfest',
      ans: 'GDG DevFests are large-scale community-run events that can offer speaker sessions across Google product areas, all-day hack-a-thons, or both. It is a platform for developers, entrepreneurs, and tech enthusiasts to come together and get inspired by the latest technologies',
    },
    {
      question: 'Who is GDG',
      ans: 'Google Developer Groups(GDG) are a group of local developers who are interested in Google products and APIs. We host various technical events for developers ranging from keynote sessions to hackathons. Our main aim is to learn more and keep growing',
    },
    {
      question: 'Where can I find updates related to Devfest Siliguri',
      ans: 'You can follow us on our Social Media links which you can find below - https://linktr.ee/gdgsiliguri',
    },
  ];
}
