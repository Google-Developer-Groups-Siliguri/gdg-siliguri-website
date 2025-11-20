import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DevfestLayoutComponent } from './layout/devfest-layout/devfest-layout.component';
import { homeResolver } from './resolvers/home.resolver';
import { devfestResolver } from './resolvers/devfest.resolver';
import { blogsResolver } from './resolvers/blogs.resolver';
import { eventsResolver } from './resolvers/events.resolver';
import { scheduleResolver } from './resolvers/schedule.resolver';
import { teamResolver } from './resolvers/team.resolver';
import { ticketsResolver } from './resolvers/tickets.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then(
            (m) => m.HomePageComponent
          ),
        resolve: { data: homeResolver },
      },
      {
        path: 'events',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/events/events-page.component').then(
                (m) => m.EventsPageComponent
              ),
            resolve: { data: eventsResolver },
          },
          // {
          //   path: ':eventId',
          //   loadComponent: () =>
          //     import('./pages/events/event-details-page.component').then(
          //       (m) => m.EventDetailsPageComponent
          //     ),
          // },
        ],
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./pages/blogs/blogs-page.component').then(
            (m) => m.BlogsPageComponent
          ),
        resolve: { data: blogsResolver },
      },
    ],
  },
  {
    path: 'devfest',
    component: DevfestLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/devfest/devfest.component').then(
            (m) => m.DevfestComponent
          ),
        resolve: { data: devfestResolver },
      },
      {
        path: 'schedule',
        loadComponent: () =>
          import('./pages/schedule/schedule.component').then(
            (m) => m.ScheduleComponent
          ),
        resolve: { data: scheduleResolver },
      },
      {
        path: 'tickets',
        loadComponent: () =>
          import('./pages/tickets/tickets.component').then(
            (m) => m.TicketsComponent
          ),
        resolve: { data: ticketsResolver },
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./pages/team/team.component').then((m) => m.TeamComponent),
        resolve: { data: teamResolver },
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact/contact.module').then((m) => m.ContactModule),
      },
    ],
  },
];
