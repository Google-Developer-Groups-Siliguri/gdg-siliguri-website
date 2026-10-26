import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env['SMOKE_PORT'] || 4417);

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `node scripts/serve-dist.mjs dist/gdg-siliguri-website/browser ${port}`,
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: !process.env['CI'],
  },
});
