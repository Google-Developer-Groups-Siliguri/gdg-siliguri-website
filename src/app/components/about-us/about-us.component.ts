import { HostListener, Component } from '@angular/core';
import { getWindow } from 'ssr-window';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  public screenWidth: number = 0;
  public screenHeight: number = 0;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = getWindow().innerWidth;
    this.screenHeight = getWindow().innerHeight;
  }
  constructor() {
    this.getScreenSize();
  }
}
