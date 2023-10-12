import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  constructor(private meta: Meta, private title: Title) {
    this.meta.addTag({ name: 'title', content: 'Devfest Siliguri 2023' });
    this.title.setTitle('Team | Devfest Siliguri 2023');
  }

  organizerDetails = [
    {
      name: 'Debajit Mallick',
      designation: 'Software Engineer @P360 solutions',
      role: 'Organizer',
      image: '',
      linkedIn: 'https://www.linkedin.com/company/gdg-siliguri/',
      twitter: 'https://twitter.com/GDGSiliguri',
      github:
        'https://github.com/Google-Developer-Groups-Siliguri/gdg-siliguri-website',
    },
    {
      name: 'Debajit Mallick',
      designation: 'Software Engineer @P360 solutions',
      role: 'Organizer',
      image: '',
      linkedIn: 'https://www.linkedin.com/company/gdg-siliguri/',
      twitter: 'https://twitter.com/GDGSiliguri',
      github:
        'https://github.com/Google-Developer-Groups-Siliguri/gdg-siliguri-website',
    },
    {
      name: 'Debajit Mallick',
      designation: 'Software Engineer @P360 solutions',
      role: 'Organizer',
      image: '',
      linkedIn: 'https://www.linkedin.com/company/gdg-siliguri/',
      twitter: 'https://twitter.com/GDGSiliguri',
      github:
        'https://github.com/Google-Developer-Groups-Siliguri/gdg-siliguri-website',
    },
  ];

  volunteerDetails = [
    {
      name: 'Sankalan Dasgupta',
      designation: 'Software Engineer @P360 solutions',
      role: 'Volunteer',
      image: '',
      linkedIn: 'https://www.linkedin.com/company/gdg-siliguri/',
      twitter: 'https://twitter.com/GDGSiliguri',
      github:
        'https://github.com/Google-Developer-Groups-Siliguri/gdg-siliguri-website',
    },
    {
      name: 'Sankalan Dasgupta',
      designation: 'Software Engineer @P360 solutions',
      role: 'Volunteer',
      image: '',
      linkedIn: 'https://www.linkedin.com/company/gdg-siliguri/',
      twitter: 'https://twitter.com/GDGSiliguri',
      github:
        'https://github.com/Google-Developer-Groups-Siliguri/gdg-siliguri-website',
    },
    {
      name: 'Sankalan Dasgupta',
      designation: 'Software Engineer @P360 solutions',
      role: 'Volunteer',
      image: '',
      linkedIn: 'https://www.linkedin.com/company/gdg-siliguri/',
      twitter: 'https://twitter.com/GDGSiliguri',
      github:
        'https://github.com/Google-Developer-Groups-Siliguri/gdg-siliguri-website',
    },
    {
      name: 'Sankalan Dasgupta',
      designation: 'Software Engineer @P360 solutions',
      role: 'Volunteer',
      image: '',
      linkedIn: 'https://www.linkedin.com/company/gdg-siliguri/',
      twitter: 'https://twitter.com/GDGSiliguri',
      github:
        'https://github.com/Google-Developer-Groups-Siliguri/gdg-siliguri-website',
    },
  ];
}
