import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DevfestLayoutComponent } from './layout/devfest-layout/devfest-layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () =>
  //         import('./pages/home-page/home-page.module').then(
  //           (m) => m.HomePageModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: '',
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
