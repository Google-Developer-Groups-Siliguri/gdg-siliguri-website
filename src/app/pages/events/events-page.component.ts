import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { Events } from 'src/app/services/data.service';
import { CommunityEventsListComponent } from '../../components/community-events-list.component';

@Component({
  selector: 'app-events-page',
  imports: [CommunityEventsListComponent, PageHeaderComponent, CommingSoonComponent],
  template: `
    <app-page-header
      eyebrow="Community"
      title="Events"
      subtitle="Take a glance at our upcoming events and register."
    />
    <div class="page-container">
      @if (events.length) {
        <app-community-events-list [eventsList]="events" />
      } @else {
        <app-comming-soon message="New events are on the way" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent {
  private route = inject(ActivatedRoute);
  private meta = inject(Meta);
  private title = inject(Title);

  events: Events[];

  constructor() {
    this.meta.addTag({
      name: 'title',
      content: 'Events | GDG Siliguri',
    });
    this.title.setTitle('Events | GDG Siliguri');
    const result = this.route.snapshot.data['data'] as { enabled: boolean; data: Events[] } | null;
    this.events = result?.enabled ? result.data : [];
  }
}
