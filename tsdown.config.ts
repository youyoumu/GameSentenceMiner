import { defineConfig } from 'tsdown';
import fs from 'fs';
import path from 'path';

function makeLock(name: string) {
  const file = path.resolve(`.tsdown.lock.${name}`);
  return {
    prepare: () => {
      fs.writeFileSync(file, '');
      console.log(`Created ${file}`);
    },
    done: () => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Removed ${file}`);
      }
    },
  };
}

export default defineConfig([
  {
    entry: ['electron-src/main/main.ts', 'electron-src/main/extension/yomitan-shim.ts'],
    outDir: 'dist/main',
    unbundle: true,
    skipNodeModulesBundle: true,
    treeshake: false,
    hooks: {
      'build:prepare': makeLock('main').prepare,
      'build:done': makeLock('main').done,
    },
  },
  {
    entry: ['electron-src/preload/preload.ts'],
    outDir: 'dist/preload',
    external: ['electron'],
    noExternal: ['zod'],
    treeshake: true,
    format: 'cjs',
    outExtensions: () => ({
      js: '.js',
    }),
    hooks: {
      'build:prepare': makeLock('preload').prepare,
      'build:done': makeLock('preload').done,
    },
  },
]);
