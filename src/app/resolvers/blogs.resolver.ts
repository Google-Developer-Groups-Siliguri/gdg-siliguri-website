import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataService, BlogPost } from '../services/data.service';

export const blogsResolver: ResolveFn<BlogPost[]> = () => {
  const dataService = inject(DataService);
  return dataService.getHashnodeBlogs();
};
