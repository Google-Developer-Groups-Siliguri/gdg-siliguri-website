import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommunityPartners } from 'src/app/services/data.service';

const FIRST_ROW_SIZE = 6;

@Component({
  selector: 'app-partner-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-col gap-2.5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]',
  },
  template: `
    @for (row of rows(); track $index) {
      <div
        class="flex w-max gap-2.5 pr-2.5 [animation:marq_linear_infinite] hover:[animation-play-state:paused]"
        [style.animation-duration.s]="row.duration"
        [style.animation-direction]="row.reverse ? 'reverse' : 'normal'"
      >
        @for (partner of row.partners; track $index) {
          <a
            [href]="partner.socialMediaLink"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-none items-center gap-3 rounded-full bg-srf-2 py-2 pl-2 pr-[22px] no-underline"
          >
            <img
              [src]="partner.icon"
              alt=""
              loading="lazy"
              class="h-11 w-11 rounded-[22px] bg-white object-cover"
            />
            <span class="whitespace-nowrap font-manrope text-sm font-semibold text-on-srf">{{
              partner.communityName
            }}</span>
          </a>
        }
      </div>
    }
  `,
})
export class PartnerMarqueeComponent {
  readonly partners = input.required<CommunityPartners[]>();

  protected readonly rows = computed(() => {
    const all = this.partners();
    const first = all.slice(0, FIRST_ROW_SIZE);
    const second = all.slice(FIRST_ROW_SIZE);
    return [
      { partners: [...first, ...first], duration: 40, reverse: false },
      { partners: [...second, ...second], duration: 34, reverse: true },
    ].filter((row) => row.partners.length);
  });
}
