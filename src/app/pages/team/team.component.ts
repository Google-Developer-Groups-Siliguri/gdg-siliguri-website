import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  organizerDetails=[
    {name:'Debajit Mallick', designation:'Software Engineer @P360 solutions', role: 'Organizer', image: ''},
    {name:'Debajit Mallick', designation:'Software Engineer @P360 solutions', role: 'Organizer', image: ''},
    {name:'Debajit Mallick', designation:'Software Engineer @P360 solutions', role: 'Organizer', image: ''},
  ]

  volunteerDetails=[
    {name:'Sankalan Dasgupta', designation:'Software Engineer @P360 solutions', role: 'Volunteer', image: ''},
    {name:'Sankalan Dasgupta', designation:'Software Engineer @P360 solutions', role: 'Volunteer', image: ''},
    {name:'Sankalan Dasgupta', designation:'Software Engineer @P360 solutions', role: 'Volunteer', image: ''},
    {name:'Sankalan Dasgupta', designation:'Software Engineer @P360 solutions', role: 'Volunteer', image: ''},
  ]
}
