import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DataService, Schedule } from 'src/app/services/data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  scheduleData: Schedule[] = [];
  constructor(
    private meta: Meta,
    private title: Title,
    private $firebaseDataService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Schedule | Devfest Siliguri 2023',
    });
    this.title.setTitle('Schedule | Devfest Siliguri 2023');

    this.getScheduleList();
  }

  getScheduleList() {
    const subscription$ = this.$firebaseDataService
      .getAllSchedules()
      .subscribe({
        next: (result) => {
          if (result) {
            this.scheduleData = result;
            subscription$.unsubscribe();
          }
        },
        error: (err) => console.error(err),
      });
  }

  mockData = true;

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
