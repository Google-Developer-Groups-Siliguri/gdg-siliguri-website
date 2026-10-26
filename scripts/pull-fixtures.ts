import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { decodeDocument, FsDocument } from '../src/app/services/firestore-rest';

const host = process.env['FIRESTORE_EMULATOR_HOST'] || '127.0.0.1:8080';
const projectId = process.env['FIRESTORE_PROJECT_ID'] || 'demo-gdg-siliguri';
const baseUrl = `http://${host}/v1/projects/${projectId}/databases/(default)/documents`;
const outDir = 'src/app/generated/fixtures';

async function readBundle(id: string): Promise<Record<string, unknown>> {
  const res = await fetch(`${baseUrl}/bundles/${id}`);
  if (!res.ok) {
    throw new Error(`GET bundles/${id} failed with ${res.status}`);
  }
  return decodeDocument<Record<string, unknown>>((await res.json()) as FsDocument);
}

async function main(): Promise<void> {
  const editions = (await readBundle('editions')) as { items: { year: number }[] };
  const ids = ['home', 'editions', ...editions.items.map((item) => `edition-${item.year}`)];
  mkdirSync(outDir, { recursive: true });
  for (const id of ids) {
    const bundle = id === 'editions' ? editions : await readBundle(id);
    writeFileSync(join(outDir, `${id}.json`), `${JSON.stringify(bundle, null, 2)}\n`);
  }
  const entries = ids
    .map((id) => `  'bundles/${id}': () => import('./${id}.json').then((m) => m.default),`)
    .join('\n');
  writeFileSync(
    join(outDir, 'index.ts'),
    `export const FIXTURES: Record<string, () => Promise<unknown>> = {\n${entries}\n};\n`
  );
  console.log(`wrote ${ids.length} bundles from ${baseUrl} to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
