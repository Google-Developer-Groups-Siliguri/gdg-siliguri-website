import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-devfest-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devfest-hero.component.html',
  styleUrls: ['./devfest-hero.component.css'],
})
export class DevfestHeroComponent implements OnInit {
  ngOnInit(): void {}

  countdownDate = new Date('november 05, 2023 00:00:00').getTime();
  remainingDays: number | undefined;
  remainingHours: number | undefined;
  remainingMinutes: number | undefined;
  remainingSeconds: number | undefined;

  x = setInterval(() => {
    var now = new Date().getTime();
    var remainingTime = this.countdownDate - now;
    this.remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    this.remainingHours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.remainingMinutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    this.remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  });
}
