import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: object | null;
}

export const SITE_NAME = 'GDG Siliguri';
export const DESCRIPTION_LIMIT = 160;
export const DEFAULT_IMAGE_PATH = '/assets/icons/icon-512x512.png';
const JSON_LD_ID = 'page-json-ld';

export function clampDescription(text: string, limit = DESCRIPTION_LIMIT): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= limit) {
    return flat;
  }
  const cut = flat.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '')}…`;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly siteUrl = (environment.siteUrl || 'https://gdgsiliguri.com').replace(/\/+$/, '');

  absoluteUrl(path: string): string {
    if (/^https?:\/\//.test(path)) {
      return path;
    }
    const clean = `/${path.replace(/^\/+/, '')}`;
    return clean === '/' ? `${this.siteUrl}/` : `${this.siteUrl}${clean.replace(/\/+$/, '')}`;
  }

  update(page: PageMeta): void {
    const description = clampDescription(page.description);
    const url = this.absoluteUrl(page.path);
    const image = this.absoluteUrl(page.image || DEFAULT_IMAGE_PATH);
    this.title.setTitle(page.title);
    this.setName('description', description);
    this.setProperty('og:title', page.title);
    this.setProperty('og:description', description);
    this.setProperty('og:type', page.type ?? 'website');
    this.setProperty('og:url', url);
    this.setProperty('og:image', image);
    this.setProperty('og:site_name', SITE_NAME);
    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', page.title);
    this.setName('twitter:description', description);
    this.setName('twitter:image', image);
    this.setCanonical(url);
    this.setJsonLd(page.jsonLd ?? null);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name='${name}'`);
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property='${property}'`);
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: object | null): void {
    const head = this.document.head;
    const existing = head.querySelector(`script#${JSON_LD_ID}`);
    if (!data) {
      existing?.remove();
      return;
    }
    const script = existing ?? this.document.createElement('script');
    script.setAttribute('id', JSON_LD_ID);
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    if (!existing) {
      head.appendChild(script);
    }
  }
}
