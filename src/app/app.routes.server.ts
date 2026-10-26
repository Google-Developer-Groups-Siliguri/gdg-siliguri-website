import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { firstValueFrom } from 'rxjs';
import { archiveYearParams } from './resolvers/devfest.resolver';
import { moduleIdParams, modulePathParams } from './resolvers/module-page.resolver';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'devfest/:year',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams: () => firstValueFrom(archiveYearParams()),
  },
  {
    path: 'm/:moduleId',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams: () => firstValueFrom(moduleIdParams()),
  },
  {
    path: ':modulePath',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams: () => firstValueFrom(modulePathParams()),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
