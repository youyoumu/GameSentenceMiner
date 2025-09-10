import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: 'electron-src/main/main.ts',
    unbundle: true,
    outDir: 'dist/main',
    skipNodeModulesBundle: true,
    treeshake: false,
});
