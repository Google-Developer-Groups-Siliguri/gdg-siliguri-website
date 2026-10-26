import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SiteContentService } from '../services/site-content.service';
import { DevfestView } from '../shared/view-models';

export const devfestResolver: ResolveFn<DevfestView> = () => inject(SiteContentService).devfest();
