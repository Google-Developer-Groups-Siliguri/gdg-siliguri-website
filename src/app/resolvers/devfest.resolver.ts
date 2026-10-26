import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { SiteContentService } from '../services/site-content.service';
import { DevfestView } from '../shared/view-models';

export const devfestResolver: ResolveFn<DevfestView> = () => inject(SiteContentService).devfest();

export const devfestYearResolver: ResolveFn<DevfestView> = (route) => {
  const content = inject(SiteContentService);
  const toActive = new RedirectCommand(inject(Router).parseUrl('/devfest'));
  const year = Number(route.paramMap.get('year'));
  return content.archiveYears().pipe(
    switchMap((years) => (years.includes(year) ? content.devfest(year) : of(toActive)))
  );
};

export const archiveYearParams = () => {
  const content = inject(SiteContentService);
  return content.archiveYears().pipe(map((years) => years.map((year) => ({ year: String(year) }))));
};
