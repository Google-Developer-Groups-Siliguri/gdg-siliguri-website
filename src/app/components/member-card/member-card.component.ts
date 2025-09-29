import { Component, Input } from '@angular/core';

import { NgOptimizedImage } from '@angular/common';
import { Members } from 'src/app/services/data.service';
@Component({
    selector: 'app-member-card',
    imports: [NgOptimizedImage],
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() item: Members = {
    name: '',
    designation: '',
    description: '',
    profilePictureURL: '',
    linkedInURL: '',
    twitterURL: '',
    githubURL: '',
  };
}
