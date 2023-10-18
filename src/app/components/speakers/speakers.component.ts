import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakerCardComponent } from '../speaker-card/speaker-card.component';
import { ComingSoonCardComponent } from '../coming-soon-card/coming-soon-card.component';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule, SpeakerCardComponent, ComingSoonCardComponent, MemberCardComponent],
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent {
  speakersDetails = [
    {
      yourName: 'Rushabh Vasa',
      designation: 'Cloud', 
      description: 'Co-Founder @Agrahyah Technologies',
      yourLinkedinUrl: 'https://www.linkedin.com/in/rushabhvasa/',
      yourTwitterUrl: '',
      yourGithubUrl: '',
      provideYourPicture: '../../../../assets/images/speakers/Rushabh Vasa.webp',
    },
    {
      yourName: 'Aayush Arora',
      designation: 'Startup',
      description: 'Founder @FilterPixel',
      yourLinkedinUrl: 'https://www.linkedin.com/in/angularboy/',
      yourTwitterUrl: '',
      yourGithubUrl: '',
      provideYourPicture: '../../../../assets/images/speakers/Aayush Arora.webp',
    },
    {
      yourName: 'Pawan Kumar',
      designation: 'App', 
      description: 'Founder @Codepur',
      yourLinkedinUrl: 'https://www.linkedin.com/in/imthepk/',
      yourTwitterUrl: '',
      yourGithubUrl: '',
      provideYourPicture: '../../../../assets/images/speakers/Pawan Kumar.webp',
    },
    {
      yourName: 'Ankit Sharma',
      designation: 'Web',
      description: 'Senior Software Engineer @Cisco',
      yourLinkedinUrl: 'https://www.linkedin.com/in/ankitsharma-007/',
      yourTwitterUrl: '',
      yourGithubUrl: '',
      provideYourPicture: '../../../../assets/images/speakers/Ankit Sharma.webp',
    },
  ]
}
