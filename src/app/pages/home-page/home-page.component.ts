import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({
      name: 'title',
      content: 'Google Developers Group Siliguri',
    });
    this.title.setTitle('Google Developers Group Siliguri');
  }
}
