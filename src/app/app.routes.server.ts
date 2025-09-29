import { RenderMode, ServerRoute } from '@angular/ssr';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'events',
    renderMode: RenderMode.Prerender,
  },
  // {
  //   path: 'events/:eventId',
  //   renderMode: RenderMode.Prerender,
  //   async getPrerenderParams() {
  //     // You'll need to inject your data service here
  //     // const dataService = inject(YourDataService);
  //     // const eventIds = await dataService.getEventIds();
  //     // return eventIds.map(eventId => ({ eventId }));

  //     // Placeholder return - replace with actual event IDs
  //     return [
  //       { eventId: '1' },
  //       { eventId: '2' },
  //       { eventId: '3' },
  //     ];
  //   },
  // },
  {
    path: 'devfest',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'devfest/schedule',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'devfest/tickets',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'devfest/team',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'devfest/contact',
    renderMode: RenderMode.Prerender,
  },
];
