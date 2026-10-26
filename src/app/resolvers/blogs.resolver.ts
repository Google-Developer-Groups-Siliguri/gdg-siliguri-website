import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SiteContentService } from '../services/site-content.service';
import { BlogsView } from '../shared/view-models';

export const blogsResolver: ResolveFn<BlogsView> = () => inject(SiteContentService).blogs();
