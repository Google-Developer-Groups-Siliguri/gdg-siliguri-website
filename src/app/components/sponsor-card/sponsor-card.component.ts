import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sponsor-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './sponsor-card.component.html',
  styleUrls: ['./sponsor-card.component.css'],
})
export class SponsorCardComponent {
  @Input() item = {
    sponsorName: '',
    icon: '',
    socialMediaLink: '',
  };
}
