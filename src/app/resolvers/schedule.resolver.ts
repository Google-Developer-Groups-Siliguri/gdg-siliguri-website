import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, Schedule } from '../services/data.service';

export const scheduleResolver: ResolveFn<{ enabled: boolean; data: Schedule[] }> = () => {
  const dataService = inject(DataService);
  return dataService.getAllSchedules();
};
