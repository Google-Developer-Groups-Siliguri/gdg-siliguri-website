import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DataService, EventData } from 'src/app/services/data.service';

@Component({
  selector: 'app-devfest',
  templateUrl: './devfest.component.html',
  styleUrls: ['./devfest.component.css'],
})
export class DevfestComponent {
  eventData$: Observable<EventData>;
  constructor(
    private meta: Meta,
    private title: Title,
    private firebaseService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Home | Devfest Siliguri 2023',
    });
    this.title.setTitle('Home | Devfest Siliguri 2023');
    this.eventData$ = this.firebaseService.getEventData();
  }
}
