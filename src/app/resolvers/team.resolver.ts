import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SiteContentService } from '../services/site-content.service';
import { TeamMember } from '../shared/view-models';

export const teamResolver: ResolveFn<TeamMember[]> = () => inject(SiteContentService).team();
