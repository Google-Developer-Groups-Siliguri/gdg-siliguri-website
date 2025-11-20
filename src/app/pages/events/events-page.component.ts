import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Events } from 'src/app/services/data.service';
import { CommunityEventsListComponent } from '../../components/community-events-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-events-page',
    imports: [CommunityEventsListComponent],
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
        @if(communityEventData.enabled){
          <app-community-events-list
            [eventsList]="communityEventData.data"
          ></app-community-events-list>
        }
      </div>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsPageComponent {
  private route = inject(ActivatedRoute);
  private meta = inject(Meta);
  private title = inject(Title);

  communityEventData: { enabled: boolean; data: Events[] };

  constructor() {
    this.meta.addTag({
      name: 'title',
      content: 'Events | GDG Siliguri',
    });
    this.title.setTitle('Events | GDG Siliguri');
    this.communityEventData = this.route.snapshot.data['data'] as { enabled: boolean; data: Events[] };
  }
}
