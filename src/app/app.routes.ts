import { Routes } from '@angular/router';
import { SiteLayoutComponent } from './layout/site-layout.component';
import { aboutResolver } from './resolvers/about.resolver';
import { blogsResolver } from './resolvers/blogs.resolver';
import { devfestResolver } from './resolvers/devfest.resolver';
import { eventsResolver } from './resolvers/events.resolver';
import { homeResolver } from './resolvers/home.resolver';
import { teamResolver } from './resolvers/team.resolver';

export const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
        resolve: { data: homeResolver },
      },
      {
        path: 'devfest',
        loadComponent: () =>
          import('./pages/devfest/devfest.component').then((m) => m.DevfestComponent),
        resolve: { data: devfestResolver },
      },
      {
        path: 'events',
        loadComponent: () =>
          import('./pages/events/events-page.component').then((m) => m.EventsPageComponent),
        resolve: { data: eventsResolver },
      },
      {
        path: 'team',
        loadComponent: () => import('./pages/team/team.component').then((m) => m.TeamComponent),
        resolve: { data: teamResolver },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
        resolve: { data: aboutResolver },
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./pages/blogs/blogs-page.component').then((m) => m.BlogsPageComponent),
        resolve: { data: blogsResolver },
      },
      { path: 'devfest/schedule', redirectTo: 'devfest' },
      { path: 'devfest/tickets', redirectTo: 'devfest' },
      { path: 'devfest/team', redirectTo: 'team' },
      { path: 'devfest/contact', redirectTo: 'about' },
      { path: '**', redirectTo: '' },
    ],
  },
];
