import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { combineLatest } from 'rxjs';
import { DataService } from '../services/data.service';

export const eventsResolver: ResolveFn<unknown> = () => {
  const data = inject(DataService);
  return combineLatest([
    data.getCommunityEventsData(),
    data.getEventData(),
    data.getAllSpeakers(),
    data.getAllSchedules(),
    data.getPastDevfests(),
  ]);
};
