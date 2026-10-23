import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, EventData, FAQ } from '../services/data.service';
import { combineLatest } from 'rxjs';

export interface HomeData {
  eventData: EventData;
  faqs: { enabled: boolean; data: FAQ[] };
}

export const homeResolver: ResolveFn<HomeData> = () => {
  const dataService = inject(DataService);

  return combineLatest({
    eventData: dataService.getEventData(),
    faqs: dataService.getAllGDGFAQS(),
  });
};
