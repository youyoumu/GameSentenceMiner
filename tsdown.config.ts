import { defineConfig } from 'tsdown';
import fs from 'fs';
import path from 'path';

function makeLock(name: string | undefined = undefined) {
  const file = name ? path.resolve(`.tsdown.lock.${name}`) : path.resolve(`.tsdown.lock`);
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

const copy: string[] = [];
if (process.env.NODE_ENV === 'development') copy.push('.env');

const preloadBuild = Promise.withResolvers<void>();

const preload = defineConfig({
  entry: ['electron-src/preload/preload.ts'],
  outDir: 'dist/preload',
  external: ['electron'],
  noExternal: ['zod'],
  treeshake: true,
  format: 'cjs',
  outExtensions: () => ({
    js: '.js',
  }),
  alias: {
    '#': path.resolve(import.meta.dirname, 'electron-src/main'),
  },
  hooks: {
    'build:prepare': async () => {
      makeLock().prepare();
    },
    'build:done': async () => {
      preloadBuild.resolve();
    },
  },
});

const main = defineConfig({
  entry: ['electron-src/main/main.ts', 'electron-src/main/extension/yomitan-shim.ts'],
  copy: copy,
  outDir: 'dist/main',
  unbundle: true,
  skipNodeModulesBundle: true,
  treeshake: false,
  hooks: {
    'build:prepare': async () => {
      await preloadBuild.promise;
    },
    'build:done': async () => {
      makeLock().done();
    },
  },
  alias: {
    '#': path.resolve(import.meta.dirname, 'electron-src/main'),
    '#preload': path.resolve(import.meta.dirname, 'electron-src/preload'),
    '#assets': path.resolve(import.meta.dirname, 'electron-src/assets'),
  },
  plugins: [
    {
      name: 'copy-preload',
      resolveId(source: string) {
        if (source === '#preload/preload') {
          return source;
        }
        return null;
      },
      load(id: string): string | null {
        if (id === '#preload/preload') {
          const refId = this.emitFile({
            type: 'asset',
            name: 'preload.js',
            source: fs.readFileSync(path.resolve('dist/preload/preload.js')),
          });

          return `
                  import { fileURLToPath } from "node:url";
                  export default fileURLToPath(import.meta.ROLLUP_FILE_URL_${refId});
                `;
        }
        return null;
      },
    },
  ],
});

export default [preload, main];
