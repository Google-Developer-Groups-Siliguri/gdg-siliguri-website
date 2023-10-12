import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({ name: 'title', content: 'Devfest Siliguri 2023' });
    this.title.setTitle('Schedule | Devfest Siliguri 2023');
  }

  mockData = true

  day1 = [
    {
      startTime: '10:45 AM',
      endTime: '11:15 AM',
      topic: 'Introduction',
      speaker: 'Speaker Name',
    },
    {
      startTime: '10:45 AM',
      endTime: '11:15 AM',
      topic: 'Roadmap for Android Developers and getting started with Kotlin',
      speaker: 'Speaker Name',
    },
    {
      startTime: '10:45 AM',
      endTime: '11:15 AM',
      topic:
        'Roadmap for ML professionals and building end to end pipelines using ML',
      speaker: 'Speaker Name',
    },
    {
      startTime: '10:45 AM',
      endTime: '11:15 AM',
      topic: 'Introduction',
      speaker: 'Speaker Name',
    },
    {
      startTime: '10:45 AM',
      endTime: '11:15 AM',
      topic: 'Roadmap for Android Developers and getting started with Kotlin',
      speaker: 'Speaker Name',
    },
    {
      startTime: '10:45 AM',
      endTime: '11:15 AM',
      topic:
        'Roadmap for ML professionals and building end to end pipelines using ML',
      speaker: 'Speaker Name',
    },
  ];
}
