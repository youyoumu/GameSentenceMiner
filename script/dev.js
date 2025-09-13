import concurrently from 'concurrently';

concurrently([
    {
        command: 'tsdown --watch electron-src/main --watch electron-src/preload',
        name: 'tsdown',
    },
    {
        command: 'pnpm run dev:renderer',
        name: 'vite',
    },
    {
        command: 'nodemon --watch dist/main/main.js --exec pnpm run start:main',
        name: 'electron',
    },
]);
