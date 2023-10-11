import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() item:{name: string, designation: string, role: string, image: string}={name: '', designation: '', role: '', image: ''}
}
