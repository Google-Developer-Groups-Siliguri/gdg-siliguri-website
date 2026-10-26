export const FIXTURES: Record<string, () => Promise<unknown>> = {
  'bundles/home': () => import('./home.json').then((m) => m.default),
  'bundles/editions': () => import('./editions.json').then((m) => m.default),
  'bundles/edition-2026': () => import('./edition-2026.json').then((m) => m.default),
  'bundles/edition-2025': () => import('./edition-2025.json').then((m) => m.default),
};
