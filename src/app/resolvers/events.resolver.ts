import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SiteContentService } from '../services/site-content.service';
import { EventsView } from '../shared/view-models';

export const eventsResolver: ResolveFn<EventsView> = () => inject(SiteContentService).events();
