import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GdgLogoComponent } from '../ui/gdg-logo/gdg-logo';
import { SOCIAL_LINKS } from '../../shared/social-links';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, GdgLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="mt-24 rounded-t-m3-2xl bg-surface-container">
      <div class="page-container grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr] md:py-16">
        <div class="flex flex-col items-start gap-4">
          <a routerLink="/" class="rounded-full py-1" aria-label="GDG Siliguri home">
            <app-gdg-logo />
          </a>
          <p class="max-w-sm text-body-lg text-on-surface-variant">
            A community of student and professional developers across North Bengal and Sikkim.
          </p>
          <a
            href="https://developers.google.com/community-guidelines"
            target="_blank"
            rel="noopener noreferrer"
            class="m3-link text-body-lg"
          >
            Community guidelines
          </a>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" class="mb-4 text-title-sm font-bold text-on-surface">Explore</h2>
          <ul class="flex flex-col gap-1">
            @for (link of exploreLinks; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  class="m3-btn m3-btn-text -ml-3 text-body-lg text-on-surface-variant"
                >
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <nav aria-labelledby="footer-follow">
          <h2 id="footer-follow" class="mb-4 text-title-sm font-bold text-on-surface">Follow us</h2>
          <ul class="flex flex-col gap-1">
            @for (social of socialLinks; track social.url) {
              <li>
                <a
                  [href]="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="m3-btn m3-btn-text -ml-3 text-body-lg text-on-surface-variant"
                >
                  {{ social.label }}
                </a>
              </li>
            }
          </ul>
        </nav>
      </div>

      <div class="page-container flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant py-6 text-body-md text-on-surface-variant">
        <p>© {{ year }} GDG Siliguri</p>
        <p class="inline-flex items-center gap-2">
          Curated with community love
          <span class="flex gap-1" aria-hidden="true">
            <span class="h-2 w-2 rounded-full bg-brand-blue"></span>
            <span class="h-2 w-2 rounded-full bg-brand-red"></span>
            <span class="h-2 w-2 rounded-full bg-brand-yellow"></span>
            <span class="h-2 w-2 rounded-full bg-brand-green"></span>
          </span>
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly exploreLinks = [
    { path: '/', label: 'Home' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/devfest', label: 'DevFest Siliguri' },
    { path: '/devfest/contact', label: 'Contact' },
  ];
}
