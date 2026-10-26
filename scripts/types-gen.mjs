import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { compileFromFile } from 'json-schema-to-typescript';

const schemaDir = 'src/app/generated/schema';
const outFile = 'src/app/generated/content.ts';

const files = (await readdir(schemaDir)).filter((f) => f.endsWith('.schema.json')).sort();
const parts = [];
for (const file of files) {
  parts.push(
    await compileFromFile(join(schemaDir, file), {
      bannerComment: '',
      additionalProperties: false,
      cwd: schemaDir,
      format: true,
      style: { singleQuote: true, printWidth: 100 },
    })
  );
}
await writeFile(outFile, parts.join('\n'));
console.log(`wrote ${files.length} schemas to ${outFile}`);
