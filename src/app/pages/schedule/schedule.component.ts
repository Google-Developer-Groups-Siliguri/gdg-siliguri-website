import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';
import { DataService, Schedule } from 'src/app/services/data.service';

@Component({
  selector: 'app-schedule',
  imports: [TimelineComponent, CommingSoonComponent, PageHeaderComponent],
  template: `
    <app-page-header
      eyebrow="DevFest Siliguri"
      title="Schedule"
      subtitle="Mark your calendar so you don't miss any of the sessions."
    />
    <div class="page-container flex flex-col gap-8">
      <div role="tablist" aria-label="Event days" class="flex gap-2">
        <button type="button" role="tab" aria-selected="true" class="m3-btn bg-secondary-container font-bold text-on-secondary-container">
          <span class="material-symbols-rounded" aria-hidden="true">calendar_month</span>
          Day 1
        </button>
      </div>
      @if (scheduleData(); as data) {
        @if (data.enabled && data.data.length) {
          <app-timeline [day]="data.data" />
        } @else {
          <app-comming-soon message="The schedule is coming soon" />
        }
      } @else {
        <app-comming-soon message="The schedule is coming soon" />
      }
    </div>
  `,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private subscription?: Subscription;

  scheduleData = signal<{ enabled: boolean; data: Schedule[] } | null>(null);

  constructor(
    private meta: Meta,
    private title: Title,
    private $firebaseDataService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Schedule | Devfest Siliguri 2025',
    });
    this.title.setTitle('Schedule | Devfest Siliguri 2025');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.subscription = this.$firebaseDataService.getAllSchedules().subscribe({
        next: (data) => {
          this.scheduleData.set(data);
        },
        error: (error) => {
          console.error('Error loading schedule data:', error);
          this.scheduleData.set(null);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
