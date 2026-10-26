import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SiteContentService } from '../services/site-content.service';
import { HomeView } from '../shared/view-models';

export const homeResolver: ResolveFn<HomeView> = () => inject(SiteContentService).home();
