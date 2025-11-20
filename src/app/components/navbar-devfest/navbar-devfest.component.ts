import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';

@Component({
    selector: 'app-navbar-devfest',
    imports: [RouterModule, NgOptimizedImage],
    templateUrl: './navbar-devfest.component.html',
    styleUrls: ['./navbar-devfest.component.css']
})
export class NavbarDevfestComponent implements AfterViewInit {
  @ViewChild('navbarContainer', { read: ElementRef }) navbarContainer!: ElementRef<HTMLElement>;
  @ViewChild('navbarBtn', { read: ElementRef }) navbarBtn!: ElementRef<HTMLElement>;

  options!: CollapseOptions;
  collapse!: CollapseInterface;

  routes = [
    { path: '/devfest', name: 'Back to Home', exact: true },
    { path: 'schedule', name: 'Schedule', exact: false },
    { path: 'tickets', name: 'Tickets', exact: false },
    { path: 'team', name: 'Team', exact: false },
    { path: 'blogs', name: 'Blogs', exact: false },
    { path: 'contact', name: 'Contact Us', exact: false },
  ];

  ngAfterViewInit(): void {
    // set the target element that will be collapsed or expanded (eg. navbar menu)
    const $targetEl = this.navbarContainer?.nativeElement;
    // optionally set a trigger element (eg. a button, hamburger icon)
    const $triggerEl = this.navbarBtn?.nativeElement;

    if ($targetEl && $triggerEl) {
      this.options = {};
      this.collapse = new Collapse($targetEl, $triggerEl, this.options);
    }
  }

  collapseNavbarHandler() {
    if (this.collapse) {
      this.collapse.collapse();
    }
  }
}
