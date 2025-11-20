import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [NgOptimizedImage, RouterModule]
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbarContainer', { read: ElementRef }) navbarContainer!: ElementRef<HTMLElement>;
  @ViewChild('navbarBtn', { read: ElementRef }) navbarBtn!: ElementRef<HTMLElement>;

  buttonTitle = 'Devfest Siliguri';
  options!: CollapseOptions;
  collapse!: CollapseInterface;

  routes = [
    { path: '/', name: 'Home', exact: true },
    { path: 'blogs', name: 'Blogs', exact: false },
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
