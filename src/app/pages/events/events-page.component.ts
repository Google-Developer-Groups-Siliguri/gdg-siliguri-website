import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { DataService, Events } from 'src/app/services/data.service';
import { CommunityEventsListComponent } from '../../components/community-events-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [CommunityEventsListComponent, AsyncPipe],
  template: `
    <div class="mt-20 w-full md:container p-4 mx-auto">
      <div class="mb-10">
        <h1
          class="text-[50px] lg:text-[70px] leading-tight tracking-wide font-bold text-gray-800 text-center"
        >
          Events
        </h1>
        <h2 class="text-xl text-[#9CA3AF] font-semibold mt-4 text-center">
          Take a glance at our upcoming events and register!
        </h2>
      </div>
      <div>
        @if (communityEventData$ | async; as data) { @if(data.enabled){
        <app-community-events-list
          [eventsList]="data.data"
        ></app-community-events-list>
        } }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent {
  communityEventData$: Observable<{ enabled: boolean; data: Events[] }>;
  hasImage: boolean = false;
  constructor(
    private meta: Meta,
    private title: Title,
    private $firebaseDataService: DataService
  ) {
    this.meta.addTag({
      name: 'title',
      content: 'Events | GDG Siliguri',
    });
    this.title.setTitle('Events | GDG Siliguri');
    this.communityEventData$ =
      this.$firebaseDataService.getCommunityEventsData();
  }
}
