import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberCardComponent {
  @Input() item: {
    yourName: string;
    designation: string;
    provideYourPicture: string;
    yourLinkedinUrl: string;
    yourTwitterUrl: string;
    yourGithubUrl: string;
  } = {
    yourName: '',
    designation: '',
    provideYourPicture: '',
    yourLinkedinUrl: '',
    yourTwitterUrl: '',
    yourGithubUrl: '',
  };
}
