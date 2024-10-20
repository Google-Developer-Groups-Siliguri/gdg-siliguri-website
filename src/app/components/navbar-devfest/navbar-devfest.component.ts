import { AfterViewInit, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';
import { getDocument } from 'ssr-window';

@Component({
  selector: 'app-navbar-devfest',
  standalone: true,
  imports: [NgFor, RouterModule, NgOptimizedImage],
  templateUrl: './navbar-devfest.component.html',
  styleUrls: ['./navbar-devfest.component.css'],
})
export class NavbarDevfestComponent implements AfterViewInit {
  options!: CollapseOptions;
  collapse!: CollapseInterface;

  routes = [
    { path: '', name: 'Back to Home', exact: true },
    { path: 'schedule', name: 'Schedule', exact: false },
    { path: 'tickets', name: 'Tickets', exact: false },
    { path: 'team', name: 'Team', exact: false },
    { path: 'contact', name: 'Contact Us', exact: false },
  ];

  ngAfterViewInit(): void {
    // set the target element that will be collapsed or expanded (eg. navbar menu)
    const $targetEl = getDocument().getElementById(
      'navbar-container'!
    ) as HTMLElement;

    // optionally set a trigger element (eg. a button, hamburger icon)
    const $triggerEl = getDocument().getElementById(
      'navbar-btn'
    )! as HTMLElement;

    this.options = {};

    this.collapse = new Collapse($targetEl, $triggerEl, this.options);
  }

  collapseNavbarHandler() {
    this.collapse.collapse();
  }
}
