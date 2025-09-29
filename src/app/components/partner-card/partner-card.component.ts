import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-partner-card',
    imports: [NgOptimizedImage],
    templateUrl: './partner-card.component.html',
    styleUrls: ['./partner-card.component.css']
})
export class PartnerCardComponent {
  @Input() item = {
    communityName: '',
    icon: '',
    socialMediaLink: '',
  };
}
