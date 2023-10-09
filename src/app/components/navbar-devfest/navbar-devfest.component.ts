import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-navbar-devfest',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './navbar-devfest.component.html',
  styleUrls: ['./navbar-devfest.component.css'],
})
export class NavbarDevfestComponent {}
