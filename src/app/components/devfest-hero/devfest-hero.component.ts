import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-devfest-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devfest-hero.component.html',
  styleUrls: ['./devfest-hero.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DevfestHeroComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      register();
      setInterval(() => {
        var now = new Date().getTime();
        var remainingTime = this.countdownDate - now;
        this.remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        this.remainingHours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.remainingMinutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.remainingSeconds = Math.floor(
          (remainingTime % (1000 * 60)) / 1000
        );
      });
    }
  }

  countdownDate = new Date('november 04, 2023 08:00:00').getTime();
  remainingDays: number | undefined;
  remainingHours: number | undefined;
  remainingMinutes: number | undefined;
  remainingSeconds: number | undefined;
}
