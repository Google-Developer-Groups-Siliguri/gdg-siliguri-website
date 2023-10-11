import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerCardComponent } from '../speaker-card/speaker-card.component';
import { ComingSoonCardComponent } from '../coming-soon-card/coming-soon-card.component';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule, SpeakerCardComponent, ComingSoonCardComponent],
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent {

}
