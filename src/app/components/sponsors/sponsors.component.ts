import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { DataService, Sponsors } from 'src/app/services/data.service';
import { ComingSoonCardComponent } from '../coming-soon-card/coming-soon-card.component';
import { PartnerCardComponent } from '../partner-card/partner-card.component';
import { SectionHeadingComponent } from '../ui/section-heading/section-heading';

interface SponsorTier {
  label: string;
  chip: string;
  sponsors: Sponsors[];
}

@Component({
  selector: 'app-sponsors',
  imports: [AsyncPipe, PartnerCardComponent, ComingSoonCardComponent, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-container py-10 md:py-14">
      <app-section-heading eyebrow="Made possible by" title="Sponsors" />
      @if (tiers$ | async; as tiers) {
        @if (tiers.length) {
          <div class="flex flex-col gap-12">
            @for (tier of tiers; track tier.label) {
              <div class="flex flex-col gap-5">
                <h3 class="flex items-center gap-3 text-headline-sm font-medium text-on-surface">
                  <span class="h-3 w-3 rounded-full" [class]="tier.chip" aria-hidden="true"></span>
                  {{ tier.label }}
                </h3>
                <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  @for (sponsor of tier.sponsors; track sponsor.sponsorName) {
                    <app-partner-card [name]="sponsor.sponsorName" [icon]="sponsor.icon" [link]="sponsor.socialMediaLink" />
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <app-coming-soon-card hint="Sponsors will be announced soon." />
        }
      }
    </section>
  `,
})
export class SponsorsComponent {
  protected readonly tiers$ = inject(DataService)
    .getAllSponsors()
    .pipe(
      map((result): SponsorTier[] => {
        if (!result?.enabled) {
          return [];
        }
        const tiers: SponsorTier[] = [
          { label: 'Platinum', chip: 'bg-g-blue', sponsors: result.platinum ?? [] },
          { label: 'Gold', chip: 'bg-brand-yellow', sponsors: result.gold ?? [] },
          { label: 'Silver', chip: 'bg-outline', sponsors: result.silver ?? [] },
        ];
        return tiers.filter((tier) => tier.sponsors.length > 0);
      })
    );
}
