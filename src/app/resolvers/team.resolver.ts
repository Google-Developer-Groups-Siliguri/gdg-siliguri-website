import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, Members } from '../services/data.service';

export const teamResolver: ResolveFn<{ enabled: boolean; data: Members[] }> = () => {
  const dataService = inject(DataService);
  return dataService.getAllTeams();
};
