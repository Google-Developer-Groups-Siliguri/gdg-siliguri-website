import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SiteContentService } from '../services/site-content.service';
import { SiteView } from '../shared/view-models';

export const aboutResolver: ResolveFn<SiteView> = () => inject(SiteContentService).site();
