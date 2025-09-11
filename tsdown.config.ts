import { defineConfig } from 'tsdown';
import fs from 'fs';
import path from 'path';

const lockFile = path.resolve('.tsdown.lock');

export default defineConfig({
    entry: 'electron-src/main/main.ts',
    unbundle: true,
    outDir: 'dist/main',
    skipNodeModulesBundle: true,
    treeshake: false,
    hooks: {
        'build:prepare': () => {
            fs.writeFileSync(lockFile, '');
            console.log('Created lock file');
        },
        'build:done': async () => {
            // simulate long build time
            // await new Promise((resolve) => setTimeout(resolve, 5000));
            if (fs.existsSync(lockFile)) {
                fs.unlinkSync(lockFile);
                console.log('Removed lock file');
            }
        },
    },
});
