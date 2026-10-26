# GdgSiliguriWebsite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Data sources

The site reads published content from Cloud Firestore over the REST API (no Firebase SDK). The source is picked at build time with `DATA_SOURCE`:

| `DATA_SOURCE` | Reads | Use it for |
|---|---|---|
| `firestore` (default) | `bundles/home`, `bundles/edition-{year}`, `bundles/editions` from project `devfest-siliguri` | Production builds |
| `rtdb` | The legacy Realtime Database (`apiBaseUrl`) | Rolling back during the migration |
| `fixture` | The committed bundles in `src/app/generated/fixtures/` | CI and offline builds |

Set `FIRESTORE_EMULATOR_HOST=127.0.0.1:8080` to build against the local emulator (project `demo-gdg-siliguri`). `npm start` uses the emulator by default.

Useful scripts:

- `npm run types:gen` regenerates `src/app/generated/content.ts` from the JSON Schemas in `src/app/generated/schema/` (copied from the admin repo's `schema/v2`).
- `npm run fixtures:pull` refreshes the fixtures from the emulator (read-only).
- `npm run test:tz` runs the unit tests in two time zones.
- `npm run test:smoke` runs the Playwright smoke test against `dist/` (build first).

## How content updates reach the site

1. An organiser publishes a section in the admin portal.
2. The admin writes the published docs and rebuilds the affected `bundles/*` docs in the same Firestore batch.
3. The admin then calls the Netlify build hook (`NETLIFY_BUILD_HOOK_URL` in the admin's environment).
4. Netlify runs `npm run build`, which prerenders every route from the bundles and writes `sitemap.xml`. A build fails if a bundle can't be read, so a broken publish never ships an empty site.
5. Visitors get the new static pages. After hydration each page fetches its bundle once more and swaps in newer data if the build is stale; if that request fails, the prerendered content stays.

To roll back the data layer, redeploy with `DATA_SOURCE=rtdb`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
