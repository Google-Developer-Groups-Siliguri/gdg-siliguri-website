import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent {
  @Input() item: {
    yourName: string;
    designation: string;
    description: string;
    provideYourPicture: string;
    yourLinkedinUrl: string;
    yourTwitterUrl: string;
    yourGithubUrl: string;
  } = {
    yourName: '',
    designation: '',
    description: '',
    provideYourPicture: '',
    yourLinkedinUrl: '',
    yourTwitterUrl: '',
    yourGithubUrl: '',
  };
}
