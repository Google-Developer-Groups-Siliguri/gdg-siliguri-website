import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerCardComponent } from '../speaker-card/speaker-card.component';
import { ComingSoonCardComponent } from '../coming-soon-card/coming-soon-card.component';
import { MemberCardComponent } from '../member-card/member-card.component';
import { DataService, Members } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [
    CommonModule,
    SpeakerCardComponent,
    ComingSoonCardComponent,
    MemberCardComponent,
  ],
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css'],
})
export class SpeakersComponent {
  speakersDetails$: Observable<{ enabled: boolean; data: Members[] }>;
  constructor(private $firebaseDataService: DataService) {
    this.speakersDetails$ = this.$firebaseDataService.getAllSpeakers();
  }
}
