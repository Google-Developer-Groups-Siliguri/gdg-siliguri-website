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
  hasImage: boolean = false;
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
}
