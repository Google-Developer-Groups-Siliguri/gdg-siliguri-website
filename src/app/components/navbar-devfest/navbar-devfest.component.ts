import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class NavbarDevfestComponent {
  @ViewChild('navbardefault') block: ElementRef | undefined;

  routes = [
    { path: 'home', name: 'Home' },
    { path: 'schedule', name: 'Schedule' },
    { path: 'tickets', name: 'Tickets' },
    { path: 'team', name: 'Team' },
    { path: 'contact', name: 'Contact Us' },
  ];

  toggleClass() {
    const element = this.block?.nativeElement;
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  }
}
