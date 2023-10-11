import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import day1Data from "./day1.json"

interface Day1 {
  startTime: String;
  endTime: String;
  topic: String;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent {

day1 : Day1[] = day1Data;
}
