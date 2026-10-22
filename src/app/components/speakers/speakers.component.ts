import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ComingSoonCardComponent } from '../coming-soon-card/coming-soon-card.component';
import { MemberCardComponent } from '../member-card/member-card.component';
import { SectionHeadingComponent } from '../ui/section-heading/section-heading';

@Component({
  selector: 'app-speakers',
  imports: [AsyncPipe, ComingSoonCardComponent, MemberCardComponent, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-container py-10 md:py-14">
      <app-section-heading eyebrow="On stage" title="Speakers" />
      @if (speakers$ | async; as speakers) {
        @if (speakers.enabled && speakers.data.length) {
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            @for (speaker of speakers.data; track speaker.name; let i = $index) {
              <app-member-card [item]="speaker" [index]="i" />
            }
          </div>
        } @else {
          <app-coming-soon-card hint="Our speaker line-up is being finalised." />
        }
      } @else {
        <app-coming-soon-card hint="Our speaker line-up is being finalised." />
      }
    </section>
  `,
})
export class SpeakersComponent {
  protected readonly speakers$ = inject(DataService).getAllSpeakers();
}
