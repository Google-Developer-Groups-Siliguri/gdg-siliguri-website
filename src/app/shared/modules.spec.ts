import blogExample from '../generated/examples/blog.json';
import moduleShowcaseExample from '../generated/examples/module-showcase.json';
import modulesExample from '../generated/examples/modules.json';
import showcaseExample from '../generated/examples/showcase.json';
import homeFixture from '../generated/fixtures/home.json';
import type { BlogDoc, HomeBundle, ModuleDoc, ShowcaseDoc } from '../services/bundle-types';
import { resolveMarkers } from '../services/firestore-rest.testing';
import { renderMarkdown } from './markdown';
import {
  findPageModule,
  modulePageParams,
  modulePath,
  showcasePath,
  toBlogPosts,
  toModuleView,
  toModuleViews,
  toPageLinks,
  toShowcaseCards,
} from './modules';

const modules = modulesExample as unknown as ModuleDoc[];
const site = (homeFixture as unknown as HomeBundle).site;
const showcase: ShowcaseDoc[] = [
  { ...(resolveMarkers(showcaseExample) as ShowcaseDoc), id: 'krishimitra' },
  {
    id: 'other-year',
    title: 'Old project',
    summary: 'From 2025',
    team: [{ name: 'Someone' }],
    edition: 2025,
    featured: false,
    order: 20,
  },
];
const blogs: BlogDoc[] = [
  { ...(resolveMarkers(blogExample) as BlogDoc), id: 'getting-started-with-gemini-in-flutter' },
];
const sources = { showcase, blogs };

describe('module mappers', () => {
  it('maps the module-showcase example to a page at /showcase', () => {
    const module = { ...(resolveMarkers(moduleShowcaseExample) as ModuleDoc), id: 'project-showcase' };
    const view = toModuleView(module, sources);
    expect(view?.path).toBe('/showcase');
    expect(view?.showcase.map((s) => s.title)).toEqual(['KrishiMitra']);
    expect(showcasePath(site, [module])).toBe('/showcase');
  });

  it('maps showcase cards without personal data beyond names', () => {
    const [card] = toShowcaseCards(showcase);
    expect(card).toEqual(
      jasmine.objectContaining({
        title: 'KrishiMitra',
        team: ['Priya Sharma', 'Rahul Das'],
        repo: 'https://github.com/priya/krishimitra',
        demo: 'https://krishimitra.web.app',
        tags: ['Gemini', 'Flutter', 'Firebase'],
        edition: 2026,
      })
    );
    expect(card.images[0].alt).toBe('KrishiMitra home screen');
    expect(JSON.stringify(card)).not.toContain('github.com/priya"');
  });

  it('sorts items and maps links, gallery, cards and rich text', () => {
    const links = toModuleView(modules[1], sources);
    expect(links?.links.map((l) => l.label)).toEqual(['Docs', 'Codelabs']);
    const gallery = toModuleView(modules[2], sources);
    expect(gallery?.gallery.map((g) => g.image.alt)).toEqual(['Keynote hall', '']);
    const cards = toModuleView(modules[3], sources);
    expect(cards?.cards[0]).toEqual(
      jasmine.objectContaining({ title: 'AI', tags: ['AI'], url: 'https://ai.google.dev/' })
    );
    const rich = toModuleView(modules[4], sources);
    expect(rich?.body).toContain('# Be kind');
    expect(rich?.path).toBe('/m/code-of-conduct');
  });

  it('skips disabled modules and unknown types', () => {
    expect(toModuleView(modules[5], sources)).toBeNull();
    expect(toModuleView(modules[6], sources)).toBeNull();
    expect(toModuleViews(modules, sources, 'homeSection').map((m) => m.id)).toEqual([
      'gallery-2025',
    ]);
    expect(toModuleViews(modules, sources, 'devfestSection', 2026).map((m) => m.id)).toEqual([
      'tracks',
    ]);
    expect(toModuleViews(modules, sources, 'devfestSection', 2025)).toEqual([]);
  });

  it('filters showcase and blog sources', () => {
    const module = { ...modules[0], source: { kind: 'showcase' as const, featuredOnly: true } };
    expect(toModuleView(module, sources)?.showcase.map((s) => s.id)).toEqual(['krishimitra']);
    const blogModule: ModuleDoc = {
      ...modules[0],
      id: 'posts',
      type: 'blogs',
      source: { kind: 'blogs', tag: 'flutter', limit: 3 },
    };
    expect(toModuleView(blogModule, sources)?.blogs.map((b) => b.slug)).toEqual([
      'getting-started-with-gemini-in-flutter',
    ]);
    expect(
      toModuleView({ ...blogModule, source: { kind: 'blogs', tag: 'kotlin' } }, sources)?.blogs
    ).toEqual([]);
  });

  it('builds page links, prerender params and finds page modules', () => {
    expect(toPageLinks(site, modules)).toEqual([
      { path: '/resources', label: 'Resources' },
      { path: '/m/code-of-conduct', label: 'Code of conduct' },
      { path: '/showcase', label: 'Community Projects' },
    ]);
    expect(modulePageParams(site, modules)).toEqual({
      ids: ['project-showcase', 'resources', 'code-of-conduct'],
      paths: ['showcase', 'resources'],
    });
    expect(findPageModule(modules, '/resources')?.id).toBe('resources');
    expect(findPageModule(modules, 'code-of-conduct')?.id).toBe('code-of-conduct');
    expect(findPageModule(modules, '/gallery-2025')).toBeUndefined();
  });

  it('adds a showcase link when the site section is on without a module', () => {
    const on = { ...site, sections: { ...site.sections, showcase: true } };
    expect(toPageLinks(on, [])).toEqual([{ path: '/showcase', label: 'Showcase' }]);
    expect(toPageLinks(site, [])).toEqual([]);
  });

  it('falls back to /m/:id for unsafe page paths', () => {
    expect(modulePath({ id: 'x', placement: { ...modules[1].placement, web: { slot: 'page', order: 1, path: '//evil.com' } } })).toBe('/m/x');
    expect(modulePath({ id: 'x', placement: { ...modules[1].placement, web: { slot: 'homeSection', order: 1 } } })).toBe('');
  });

  it('maps blogs', () => {
    expect(toBlogPosts(blogs)[0]).toEqual(
      jasmine.objectContaining({
        title: 'Getting started with Gemini in Flutter',
        readTimeInMinutes: 6,
        publishedAt: '2026-09-30T12:30:00.000Z',
      })
    );
  });
});

describe('renderMarkdown', () => {
  it('renders CommonMark', () => {
    const html = renderMarkdown('# Title\n\nSome **bold** [link](https://example.com).');
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('href="https://example.com"');
  });

  it('drops raw HTML and scripts', () => {
    const html = renderMarkdown(
      'Hi <script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[x](javascript:alert(1))'
    );
    expect(html).not.toContain('<script');
    expect(html).not.toContain('onerror');
    expect(html).not.toContain('javascript:');
  });
});
