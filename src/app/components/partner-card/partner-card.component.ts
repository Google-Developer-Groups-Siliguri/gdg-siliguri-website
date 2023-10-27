import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-partner-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './partner-card.component.html',
  styleUrls: ['./partner-card.component.css'],
})
export class PartnerCardComponent {
  @Input() item = {
    communityName: '',
    icon: '',
    socialMediaLink: '',
  };
}
