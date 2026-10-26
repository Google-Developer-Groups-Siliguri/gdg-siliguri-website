import { expect, test } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = 'dist/gdg-siliguri-website';
const manifest = JSON.parse(readFileSync(join(distDir, 'prerendered-routes.json'), 'utf8')) as {
  routes: Record<string, unknown>;
};

function isRedirectPage(route: string): boolean {
  const file = join(distDir, 'browser', route.replace(/^\/+/, ''), 'index.html');
  return existsSync(file) && /http-equiv="refresh"/i.test(readFileSync(file, 'utf8'));
}

const routes = Object.keys(manifest.routes).filter(
  (route) => !route.startsWith('/preview') && !isRedirectPage(route)
);

const REQUIRED_KEYS: Record<string, string[]> = {
  Organization: ['@context', 'name', 'url', 'sameAs'],
  Event: ['@context', 'name', 'startDate', 'endDate', 'eventAttendanceMode', 'location', 'organizer'],
};

function expectedJsonLdType(route: string): string | null {
  if (route === '/') {
    return 'Organization';
  }
  return /^\/devfest(\/\d{4})?$/.test(route) ? 'Event' : null;
}

test.beforeEach(async ({ context }) => {
  await context.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) =>
    route.request().resourceType() === 'document' ? route.abort() : route.fulfill({ status: 204 })
  );
});

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') {
        errors.push(message.text());
      }
    });

    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const type = expectedJsonLdType(route);
    if (type) {
      expect(blocks.length).toBe(1);
      const data = JSON.parse(blocks[0]) as Record<string, unknown>;
      expect(data['@type']).toBe(type);
      for (const key of REQUIRED_KEYS[type]) {
        expect(data[key], `${type}.${key}`).toBeTruthy();
      }
    } else {
      for (const block of blocks) {
        expect(() => JSON.parse(block)).not.toThrow();
      }
    }

    expect(errors).toEqual([]);
  });
}

test('the sitemap lists canonical pages only', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain('/devfest</loc>');
  expect(body).not.toContain('/devfest/schedule');
  expect(body).not.toContain('/preview');
});

test('robots.txt points at the sitemap', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/);
});
