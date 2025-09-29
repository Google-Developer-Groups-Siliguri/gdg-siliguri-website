import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-timeline',
    imports: [],
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  @Input() day: any;
  @Input() hasImage: any;
}
