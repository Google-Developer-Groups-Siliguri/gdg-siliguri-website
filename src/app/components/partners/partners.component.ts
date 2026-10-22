import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ComingSoonCardComponent } from '../coming-soon-card/coming-soon-card.component';
import { PartnerCardComponent } from '../partner-card/partner-card.component';
import { SectionHeadingComponent } from '../ui/section-heading/section-heading';

@Component({
  selector: 'app-partners',
  imports: [AsyncPipe, PartnerCardComponent, ComingSoonCardComponent, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-container py-10 md:py-14">
      <app-section-heading eyebrow="Better together" title="Community partners" />
      @if (partners$ | async; as partners) {
        @if (partners.enabled && partners.data.length) {
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            @for (partner of partners.data; track partner.communityName) {
              <app-partner-card [name]="partner.communityName" [icon]="partner.icon" [link]="partner.socialMediaLink" />
            }
          </div>
        } @else {
          <app-coming-soon-card hint="Partner communities will be announced soon." />
        }
      }
    </section>
  `,
})
export class PartnersComponent {
  protected readonly partners$ = inject(DataService).getAllCommunityPartners();
}
