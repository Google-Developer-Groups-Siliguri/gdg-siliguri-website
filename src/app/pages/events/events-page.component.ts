import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
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
      @if (events().length) {
        <app-community-events-list [eventsList]="events()" />
      } @else {
        <app-comming-soon message="New events are on the way" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent {
  private meta = inject(Meta);
  private title = inject(Title);

  protected readonly events = toSignal(
    inject(DataService)
      .getCommunityEventsData()
      .pipe(map((result) => (result?.enabled ? result.data : []))),
    { initialValue: [] }
  );

  constructor() {
    this.meta.addTag({
      name: 'title',
      content: 'Events | GDG Siliguri',
    });
    this.title.setTitle('Events | GDG Siliguri');
  }
}
