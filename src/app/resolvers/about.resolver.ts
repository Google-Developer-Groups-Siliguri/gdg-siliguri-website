import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, EventData } from '../services/data.service';

export const aboutResolver: ResolveFn<EventData> = () => inject(DataService).getEventData();
