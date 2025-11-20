import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, EventData, Members, Sponsors } from '../services/data.service';
import { forkJoin } from 'rxjs';

export interface DevfestData {
  eventData: EventData;
  speakers: { enabled: boolean; data: Members[] };
  sponsors: {
    enabled: boolean;
    gold: Sponsors[];
    platinum: Sponsors[];
    silver: Sponsors[];
  };
}

export const devfestResolver: ResolveFn<DevfestData> = () => {
  const dataService = inject(DataService);

  return forkJoin({
    eventData: dataService.getEventData(),
    speakers: dataService.getAllSpeakers(),
    sponsors: dataService.getAllSponsors(),
  });
};
