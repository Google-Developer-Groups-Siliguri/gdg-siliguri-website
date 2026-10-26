import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { clampDescription, SeoService } from './seo.service';

describe('SeoService', () => {
  let seo: SeoService;
  let doc: Document;

  const content = (selector: string) => doc.head.querySelector(selector)?.getAttribute('content');
  const count = (selector: string) => doc.head.querySelectorAll(selector).length;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    seo = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    doc.head
      .querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], #page-json-ld')
      .forEach((el) => el.remove());
  });

  it('sets title, description, Open Graph, Twitter and canonical tags', () => {
    seo.update({
      title: 'DevFest Siliguri 2026',
      description: 'A day of talks.',
      path: '/devfest',
      image: 'https://ik.imagekit.io/x/banner.png?tr=w-1200,h-630',
    });
    expect(TestBed.inject(Title).getTitle()).toBe('DevFest Siliguri 2026');
    expect(content('meta[name="description"]')).toBe('A day of talks.');
    expect(content('meta[property="og:title"]')).toBe('DevFest Siliguri 2026');
    expect(content('meta[property="og:type"]')).toBe('website');
    expect(content('meta[property="og:url"]')).toMatch(/\/devfest$/);
    expect(content('meta[property="og:image"]')).toBe('https://ik.imagekit.io/x/banner.png?tr=w-1200,h-630');
    expect(content('meta[name="twitter:card"]')).toBe('summary_large_image');
    expect(doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(/\/devfest$/);
  });

  it('updates tags instead of adding duplicates', () => {
    seo.update({ title: 'A', description: 'first', path: '/' });
    seo.update({ title: 'B', description: 'second', path: '/team' });
    expect(count('meta[property="og:title"]')).toBe(1);
    expect(count('meta[name="description"]')).toBe(1);
    expect(count('link[rel="canonical"]')).toBe(1);
    expect(content('meta[property="og:title"]')).toBe('B');
    expect(content('meta[property="og:image"]')).toMatch(/\/assets\/icons\/icon-512x512\.png$/);
  });

  it('writes escaped JSON-LD and removes it on pages without any', () => {
    seo.update({
      title: 'Home',
      description: 'x',
      path: '/',
      jsonLd: { '@type': 'Organization', name: '</script><b>' },
    });
    const script = doc.head.querySelector('#page-json-ld');
    expect(script?.getAttribute('type')).toBe('application/ld+json');
    expect(script?.textContent).not.toContain('</script>');
    expect(JSON.parse(script?.textContent ?? '{}').name).toBe('</script><b>');
    seo.update({ title: 'Team', description: 'x', path: '/team' });
    expect(doc.head.querySelector('#page-json-ld')).toBeNull();
  });

  it('builds absolute URLs', () => {
    expect(seo.absoluteUrl('/')).toMatch(/^https?:\/\/[^/]+\/$/);
    expect(seo.absoluteUrl('team/')).toMatch(/[^/]\/team$/);
    expect(seo.absoluteUrl('https://example.com/a')).toBe('https://example.com/a');
  });

  it('clamps descriptions to 160 characters on a word boundary', () => {
    const long = 'word '.repeat(60);
    const clamped = clampDescription(long);
    expect(clamped.length).toBeLessThanOrEqual(160);
    expect(clamped.endsWith('…')).toBeTrue();
    expect(clampDescription('  short   text ')).toBe('short text');
  });
});
