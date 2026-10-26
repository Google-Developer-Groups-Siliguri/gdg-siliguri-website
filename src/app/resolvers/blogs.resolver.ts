import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SiteContentService } from '../services/site-content.service';
import { BlogPost } from '../shared/view-models';

export const blogsResolver: ResolveFn<BlogPost[]> = () => inject(SiteContentService).blogs();
