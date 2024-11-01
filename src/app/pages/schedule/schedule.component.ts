import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';
import { DataService, Schedule } from 'src/app/services/data.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [TimelineComponent, CommingSoonComponent],
  template: `
    <div class="mt-20 min-h-[70vh] max-w-screen-2xl mx-auto">
      <!-- <div class="mx-[1.5rem]">
        <h1
          class="text-[50px] lg:text-[70px] leading-tight tracking-wide font-bold text-[black]"
        >
          Schedule
        </h1>
        <h3 class="text-[25px] text-gray-500">
          Check out the schedule below and don't forget to mark your calendar so
          that you don't miss out on any sessions.
        </h3>
        <br />
        <div class="mb-4 border-b border-blue-200 dark:border-blue-700">
          <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="schedule"
            data-tabs-toggle="#schedule"
            role="tablist"
          >
            <li class="mr-2" role="presentation">
              <button
                class="inline-block p-4 border-b-2 rounded-t-lg text-blue-600 border-blue-300 dark:hover:text-blue-300 text-[20px]"
                id="day1"
                data-tabs-target="#day1"
                type="button"
                role="tab"
                aria-controls="day1"
                aria-selected="false"
              >
                Day 1
              </button>
            </li>
          </ul>
        </div>
        <app-timeline [day]="scheduleData" [hasImage]="hasImage"></app-timeline>
      </div> -->
      <app-comming-soon></app-comming-soon>
    </div>
  `,
  styles: ``,
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
