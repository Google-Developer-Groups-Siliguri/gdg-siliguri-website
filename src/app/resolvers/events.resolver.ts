import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, Events } from '../services/data.service';

export const eventsResolver: ResolveFn<{ enabled: boolean; data: Events[] }> = () => {
  const dataService = inject(DataService);
  return dataService.getCommunityEventsData();
};
