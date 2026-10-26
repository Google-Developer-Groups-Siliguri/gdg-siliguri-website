import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, ResolveFn, Router, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
import { SiteContentService } from '../services/site-content.service';
import { ContentPage } from '../shared/view-models';

export const modulePageResolver: ResolveFn<ContentPage> = (route) => {
  const toHome = new RedirectCommand(inject(Router).parseUrl('/'));
  const content = inject(SiteContentService);
  const id = route.paramMap.get('moduleId');
  const page = id
    ? content
        .modulePage(id)
        .pipe(map((view): ContentPage | null => (view ? { kind: 'module', page: view } : null)))
    : content.contentPage(`/${route.paramMap.get('modulePath') ?? ''}`);
  return page.pipe(map((view) => view ?? toHome));
};

export const contentPageMatch: CanMatchFn = (_route, segments: UrlSegment[]) => {
  const path = `/${segments.map((s) => s.path).join('/')}`;
  return inject(SiteContentService)
    .contentPage(path)
    .pipe(map((view) => !!view));
};

export const moduleIdParams = () =>
  inject(SiteContentService)
    .modulePageParams()
    .pipe(map(({ ids }) => ids.map((moduleId) => ({ moduleId }))));

export const modulePathParams = () =>
  inject(SiteContentService)
    .modulePageParams()
    .pipe(map(({ paths }) => paths.map((modulePath) => ({ modulePath }))));
