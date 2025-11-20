import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, EventData } from '../services/data.service';

export const ticketsResolver: ResolveFn<EventData> = () => {
  const dataService = inject(DataService);
  return dataService.getEventData();
};
