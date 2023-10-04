import { HostListener,Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  public screenWidth: number=0;
  public screenHeight: number=0;
  @HostListener("window:resize",["$event",])
  getScreenSize(){
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    console.log(this.screenWidth, this.screenHeight);
  }
  constructor() {
    this.getScreenSize();
  }
}
