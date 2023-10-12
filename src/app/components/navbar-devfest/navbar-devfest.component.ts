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
    { path: '/devfest', name: 'Home', exact: true },
    { path: 'schedule', name: 'Schedule', exact: false },
    { path: 'tickets', name: 'Tickets', exact: false },
    { path: 'team', name: 'Team', exact: false },
    { path: 'contact', name: 'Contact Us', exact: false },
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
