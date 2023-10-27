import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DataService, Members } from 'src/app/services/data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  organizersDetails: Members[] = [];
  organizers: Members[] = [];
  volunteers: Members[] = [];
  constructor(
    private meta: Meta,
    private title: Title,
    private $firebaseDataService: DataService
  ) {
    this.getSpeakersList();
    this.meta.addTag({
      name: 'title',
      content: 'Team | Devfest Siliguri 2023',
    });
    this.title.setTitle('Team | Devfest Siliguri 2023');
  }

  ngOnInit(): void {}

  getSpeakersList() {
    const subscription$ = this.$firebaseDataService.getAllTeams().subscribe({
      next: (result) => {
        if (result.length > 0) {
          this.organizersDetails = result;
          this.organizers = this.organizersDetails.filter(
            (member) => member.designation === 'Organizer'
          );
          this.volunteers = this.organizersDetails.filter(
            (member) => member.designation === 'Volunteer'
          );
          subscription$.unsubscribe();
        }
      },
      error: (err) => console.error(err),
    });
  }
}
