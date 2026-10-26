import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = 'dist/gdg-siliguri-website';
const browserDir = join(distDir, 'browser');
const siteUrl = (process.env['SITE_URL'] || 'https://gdgsiliguri.com').replace(/\/+$/, '');
const EXCLUDED = [/^\/preview(\/|$)/];

function pageFile(route: string): string {
  return join(browserDir, route.replace(/^\/+/, ''), 'index.html');
}

function canonicalOf(html: string): string | null {
  const tag = html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0];
  return tag?.match(/href="([^"]+)"/)?.[1] ?? null;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function sitemapUrls(routes: string[], read: (route: string) => string | null): string[] {
  const urls = new Set<string>();
  for (const route of routes) {
    if (EXCLUDED.some((pattern) => pattern.test(route))) {
      continue;
    }
    const html = read(route);
    if (html === null || /http-equiv="refresh"/i.test(html) || /name="robots"[^>]*noindex/i.test(html)) {
      continue;
    }
    const canonical = canonicalOf(html);
    urls.add(canonical ?? (route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`));
  }
  return [...urls].sort();
}

function main(): void {
  const manifest = JSON.parse(readFileSync(join(distDir, 'prerendered-routes.json'), 'utf8')) as {
    routes: Record<string, unknown>;
  };
  const urls = sitemapUrls(Object.keys(manifest.routes), (route) => {
    const file = pageFile(route);
    return existsSync(file) ? readFileSync(file, 'utf8') : null;
  });
  const body = urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n');
  writeFileSync(
    join(browserDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  );
  const robots = join(browserDir, 'robots.txt');
  if (existsSync(robots)) {
    writeFileSync(
      robots,
      readFileSync(robots, 'utf8').replace(/^Sitemap: .*$/m, `Sitemap: ${siteUrl}/sitemap.xml`)
    );
  }
  console.log(`wrote ${urls.length} urls to ${join(browserDir, 'sitemap.xml')}`);
}

main();
