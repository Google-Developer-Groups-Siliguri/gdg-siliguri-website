import { isDevMode } from '@angular/core';
import type {
  BlogDoc,
  ModuleDoc,
  ModuleItemDoc,
  ShowcaseDoc,
  SiteInfo,
} from '../services/bundle-types';
import { toImage } from './image';
import {
  BlogPost,
  CardItem,
  GalleryItem,
  LinkItem,
  ModuleKind,
  ModuleView,
  PageLink,
  ShowcaseCard,
} from './view-models';

export const DEFAULT_SHOWCASE_PATH = '/showcase';
export const HOME_MODULE_ITEM_LIMIT = 6;
const DEFAULT_AUTHOR_PHOTO = 'assets/images/gdg.png';
const MODULE_KINDS: ModuleKind[] = ['cards', 'gallery', 'links', 'richText', 'showcase', 'blogs'];
const SAFE_PATH = /^\/[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isModuleKind(type: string): type is ModuleKind {
  return (MODULE_KINDS as string[]).includes(type);
}

export function toBlogPosts(blogs: BlogDoc[]): BlogPost[] {
  return blogs.map((b) => ({
    id: b.id,
    title: b.title,
    brief: b.brief,
    slug: b.id,
    coverImage: { url: b.cover?.url ?? '' },
    publishedAt: b.publishedAt,
    author: {
      name: b.author?.name || 'GDG Siliguri',
      profilePicture: b.author?.photoUrl || DEFAULT_AUTHOR_PHOTO,
    },
    readTimeInMinutes: b.readMinutes ?? 1,
    url: b.url,
  }));
}

export function toShowcaseCards(items: ShowcaseDoc[]): ShowcaseCard[] {
  return items.map((s) => ({
    id: s.id,
    title: s.title,
    summary: s.summary,
    body: s.body ?? '',
    tags: s.tags ?? [],
    team: (s.team ?? []).map((member) => member.name),
    repo: s.links?.repo ?? '',
    demo: s.links?.demo ?? '',
    video: s.links?.video ?? '',
    images: (s.images ?? []).map((image) => toImage(image, s.title)),
    edition: s.edition ?? null,
  }));
}

export function modulePath(module: Pick<ModuleDoc, 'id' | 'placement'>): string {
  if (module.placement?.web?.slot !== 'page') {
    return '';
  }
  const path = module.placement.web.path?.trim().replace(/\/+$/, '') ?? '';
  return SAFE_PATH.test(path) ? path : `/m/${module.id}`;
}

function isCard(item: ModuleItemDoc): item is Extract<ModuleItemDoc, { title: string }> {
  return 'title' in item && typeof item.title === 'string';
}

function isLink(item: ModuleItemDoc): item is Extract<ModuleItemDoc, { label: string }> {
  return 'label' in item && typeof item.label === 'string' && typeof item.url === 'string';
}

function isGallery(item: ModuleItemDoc): item is Extract<ModuleItemDoc, { caption?: string }> {
  return 'image' in item && !!item.image?.url && !('title' in item);
}

function toCards(items: ModuleItemDoc[]): CardItem[] {
  return items.filter(isCard).map((item) => ({
    title: item.title,
    body: item.body ?? '',
    image: item.image?.url ? toImage(item.image, '') : null,
    url: item.url ?? '',
    tags: item.tags ?? [],
  }));
}

function toGallery(items: ModuleItemDoc[]): GalleryItem[] {
  return items.filter(isGallery).map((item) => ({
    image: toImage(item.image, item.caption ?? ''),
    caption: item.caption ?? '',
  }));
}

function toLinks(items: ModuleItemDoc[]): LinkItem[] {
  return items.filter(isLink).map((item) => ({
    label: item.label,
    url: item.url,
    description: item.description ?? '',
    icon: item.icon ?? '',
  }));
}

export interface ModuleSources {
  showcase: ShowcaseDoc[];
  blogs: BlogDoc[];
}

function showcaseFor(module: ModuleDoc, showcase: ShowcaseDoc[]): ShowcaseCard[] {
  if (module.source.kind !== 'showcase') {
    return [];
  }
  const { edition, featuredOnly, limit } = module.source;
  const items = showcase.filter(
    (s) => (edition === undefined || s.edition === edition) && (!featuredOnly || s.featured)
  );
  return toShowcaseCards(limit ? items.slice(0, limit) : items);
}

function blogsFor(module: ModuleDoc, blogs: BlogDoc[]): BlogPost[] {
  if (module.source.kind !== 'blogs') {
    return [];
  }
  const { tag, limit } = module.source;
  const items = tag ? blogs.filter((b) => b.tags?.includes(tag)) : blogs;
  return toBlogPosts(limit ? items.slice(0, limit) : items);
}

export function toModuleView(module: ModuleDoc, sources: ModuleSources): ModuleView | null {
  if (!isModuleKind(module.type)) {
    if (isDevMode()) {
      console.warn(`Skipping module ${module.id} with unknown type ${module.type}`);
    }
    return null;
  }
  if (!module.enabled) {
    return null;
  }
  const items = [...(module.items ?? [])].sort((a, b) => a.order - b.order);
  return {
    id: module.id,
    type: module.type,
    title: module.title,
    subtitle: module.subtitle ?? '',
    icon: module.icon ?? '',
    slot: module.placement?.web?.slot ?? 'none',
    order: module.placement?.web?.order ?? 0,
    path: modulePath(module),
    edition: module.edition ?? null,
    body: module.type === 'richText' && module.source.kind === 'inline' ? module.source.body : '',
    cards: module.type === 'cards' ? toCards(items) : [],
    gallery: module.type === 'gallery' ? toGallery(items) : [],
    links: module.type === 'links' ? toLinks(items) : [],
    showcase: module.type === 'showcase' ? showcaseFor(module, sources.showcase) : [],
    blogs: module.type === 'blogs' ? blogsFor(module, sources.blogs) : [],
  };
}

export function toModuleViews(
  modules: ModuleDoc[],
  sources: ModuleSources,
  slot: string,
  edition?: number
): ModuleView[] {
  return modules
    .filter((m) => m.placement?.web?.slot === slot)
    .filter((m) => edition === undefined || m.edition === edition)
    .map((m) => toModuleView(m, sources))
    .filter((m): m is ModuleView => !!m)
    .sort((a, b) => a.order - b.order);
}

export function findPageModule(modules: ModuleDoc[], key: string): ModuleDoc | undefined {
  return modules.find(
    (m) => m.enabled && m.placement?.web?.slot === 'page' && (m.id === key || modulePath(m) === key)
  );
}

export function showcasePageModule(modules: ModuleDoc[]): ModuleDoc | undefined {
  return modules.find(
    (m) => m.enabled && m.type === 'showcase' && m.placement?.web?.slot === 'page'
  );
}

export function showcasePath(site: SiteInfo, modules: ModuleDoc[]): string {
  const module = showcasePageModule(modules);
  if (module) {
    return modulePath(module);
  }
  return site.sections?.showcase ? DEFAULT_SHOWCASE_PATH : '';
}

export function toPageLinks(site: SiteInfo | undefined, modules: ModuleDoc[]): PageLink[] {
  const pages = modules
    .filter((m) => m.enabled && isModuleKind(m.type) && m.placement?.web?.slot === 'page')
    .sort((a, b) => a.placement.web.order - b.placement.web.order)
    .map((m) => ({ path: modulePath(m), label: m.title }));
  const showcase = site ? showcasePath(site, modules) : '';
  return showcase && !pages.some((p) => p.path === showcase)
    ? [...pages, { path: showcase, label: 'Showcase' }]
    : pages;
}

export function modulePageParams(
  site: SiteInfo,
  modules: ModuleDoc[]
): { ids: string[]; paths: string[] } {
  const pages = modules.filter(
    (m) => m.enabled && isModuleKind(m.type) && m.placement?.web?.slot === 'page'
  );
  const paths = new Set(
    [...pages.map((m) => modulePath(m)), showcasePath(site, modules)].filter(
      (path) => !!path && !path.startsWith('/m/')
    )
  );
  return {
    ids: pages.map((m) => m.id),
    paths: [...paths].map((path) => path.slice(1)),
  };
}
