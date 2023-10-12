import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-devfest',
  templateUrl: './devfest.component.html',
  styleUrls: ['./devfest.component.css'],
})
export class DevfestComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({ name: 'title', content: 'Devfest Siliguri 2023' });
    this.title.setTitle('Home | Devfest Siliguri 2023');
  }
}
