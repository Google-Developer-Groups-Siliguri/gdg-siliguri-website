import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage, provideImgixLoader } from '@angular/common';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {}
