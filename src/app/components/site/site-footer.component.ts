import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialView } from 'src/app/shared/view-models';
import { NavItem } from './site-header.component';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'mt-[clamp(64px,8vw,120px)] block rounded-t-[clamp(40px,6vw,64px)] bg-srf-1 pb-8 pt-[clamp(40px,6vw,72px)]',
  },
  template: `
    <div class="wrap flex flex-col gap-12">
      <div class="flex flex-wrap items-start justify-between gap-10">
        <div
          class="font-urbanist text-[clamp(56px,9vw,128px)] font-extralight leading-[.82] tracking-[-.06em]"
        >
          GDG<br /><b class="font-black text-pri">Siliguri</b>
        </div>
        <div class="flex flex-wrap gap-14">
          <div class="flex flex-col gap-1">
            <span class="eyebrow mb-2 text-xs">SITE</span>
            @for (item of nav(); track item.path) {
              <a
                [routerLink]="item.path"
                class="py-1.5 font-manrope text-[15px] font-semibold text-on-srf no-underline transition-[translate,color] duration-[400ms,300ms] ease-spring hover:text-pri hover:[translate:4px_0]"
                >{{ item.label }}</a
              >
            }
          </div>
          <div class="flex flex-col gap-1">
            <span class="eyebrow mb-2 text-xs">FOLLOW</span>
            @for (social of socials(); track social.url) {
              <a
                [href]="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="py-1.5 font-manrope text-[15px] font-semibold text-on-srf no-underline transition-[translate,color] duration-[400ms,300ms] ease-spring hover:text-pri hover:[translate:4px_0]"
                >{{ social.name }}</a
              >
            }
          </div>
        </div>
      </div>
      <div
        class="flex flex-wrap justify-between gap-3 border-t border-solid border-out-v pt-6 font-manrope text-[13px] font-medium text-on-srf-v"
      >
        <span>Google Developer Groups · Siliguri · North Bengal &amp; Sikkim</span>
        <a [href]="'mailto:' + email()">{{ email() }}</a>
      </div>
    </div>
  `,
})
export class SiteFooterComponent {
  readonly socials = input.required<SocialView[]>();
  readonly email = input.required<string>();
  readonly nav = input.required<NavItem[]>();
}
