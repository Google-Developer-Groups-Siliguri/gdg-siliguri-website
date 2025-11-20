import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, EventData, FAQ } from '../services/data.service';
import { forkJoin } from 'rxjs';

export interface HomeData {
  eventData: EventData;
  faqs: { enabled: boolean; data: FAQ[] };
}

export const homeResolver: ResolveFn<HomeData> = () => {
  const dataService = inject(DataService);

  return forkJoin({
    eventData: dataService.getEventData(),
    faqs: dataService.getAllGDGFAQS(),
  });
};
