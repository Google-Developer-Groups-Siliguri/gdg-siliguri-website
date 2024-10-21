import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DevfestLayoutComponent } from './layout/devfest-layout/devfest-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/devfest/devfest.module').then((m) => m.DevfestModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./pages/schedule/schedule.module').then(
            (m) => m.ScheduleModule
          ),
      },
      {
        path: 'team',
        loadChildren: () =>
          import('./pages/team/team.module').then((m) => m.TeamModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact/contact.module').then((m) => m.ContactModule),
      },
    ],
  },
  {
    path: 'devfest',
    component: DevfestLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/devfest/devfest.module').then((m) => m.DevfestModule),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('./pages/schedule/schedule.module').then(
            (m) => m.ScheduleModule
          ),
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./pages/tickets/tickets.module').then((m) => m.TicketsModule),
      },
      {
        path: 'team',
        loadChildren: () =>
          import('./pages/team/team.module').then((m) => m.TeamModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact/contact.module').then((m) => m.ContactModule),
      },
    ],
  },
];
