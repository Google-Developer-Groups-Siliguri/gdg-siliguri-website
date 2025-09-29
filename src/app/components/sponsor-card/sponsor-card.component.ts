import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-sponsor-card',
    imports: [NgOptimizedImage],
    templateUrl: './sponsor-card.component.html',
    styleUrls: ['./sponsor-card.component.css']
})
export class SponsorCardComponent {
  @Input() item = {
    sponsorName: '',
    icon: '',
    socialMediaLink: '',
  };
}
