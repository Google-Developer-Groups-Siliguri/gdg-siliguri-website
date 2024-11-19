import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({
      name: 'title',
      content: 'Contact Us | Devfest Siliguri 2024',
    });
    this.title.setTitle('Contact Us | Devfest Siliguri 2024');
  }
}
