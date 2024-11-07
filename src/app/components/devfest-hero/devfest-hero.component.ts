import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getDocument, getWindow } from 'ssr-window';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-devfest-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devfest-hero.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DevfestHeroComponent implements OnInit {
  title =
    'GDG Siliguri is based out of Siliguri and handles the geographic region of North Bengal and Sikkim. We are a group consisting of both student and professional developers and we conduct a lot of events to empower the local tech community. These include tech talks, hackathons, codelabs, workshops and more.';

  countdownDate = new Date('november 04, 2023 08:00:00').getTime();
  countdown$!: Observable<{
    remainingDays: number;
    remainingHours: number;
    remainingMinutes: number;
    remainingSeconds: number;
  }>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      register();
      this.countdown$ = interval(1000).pipe(
        map(() => {
          const now = new Date().getTime();
          const remainingTime = this.countdownDate - now;
          return {
            remainingDays:
              remainingTime > 0
                ? Math.floor(remainingTime / (1000 * 60 * 60 * 24))
                : 0,
            remainingHours:
              remainingTime > 0
                ? Math.floor(
                    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  )
                : 0,
            remainingMinutes:
              remainingTime > 0
                ? Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
                : 0,
            remainingSeconds:
              remainingTime > 0
                ? Math.floor((remainingTime % (1000 * 60)) / 1000)
                : 0,
          };
        })
      );
    }
  }

  scrollToSection(id: string) {
    var element = getDocument().getElementById(id)!;
    var headerOffset = 100;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.scrollY - headerOffset;

    getWindow().scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
