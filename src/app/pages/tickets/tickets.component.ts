import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({ name: 'title', content: 'Devfest Siliguri 2023' });
    this.title.setTitle('Tickets | Devfest Siliguri 2023');
  }
}
