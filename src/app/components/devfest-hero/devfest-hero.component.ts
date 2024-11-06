import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getDocument, getWindow } from 'ssr-window';

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
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      register();
      setInterval(() => {
        var now = new Date().getTime();
        var remainingTime = this.countdownDate - now;
        this.remainingDays =
          remainingTime > 0
            ? Math.floor(remainingTime / (1000 * 60 * 60 * 24))
            : 0;
        this.remainingHours =
          remainingTime > 0
            ? Math.floor(
                (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              )
            : 0;
        this.remainingMinutes =
          remainingTime > 0
            ? Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
            : 0;
        this.remainingSeconds =
          remainingTime > 0
            ? Math.floor((remainingTime % (1000 * 60)) / 1000)
            : 0;
      });
    }
  }

  countdownDate = new Date('november 04, 2023 08:00:00').getTime();
  remainingDays: number | undefined;
  remainingHours: number | undefined;
  remainingMinutes: number | undefined;
  remainingSeconds: number | undefined;

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
