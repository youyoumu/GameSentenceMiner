import concurrently from 'concurrently';

concurrently(
    [
        {
            command:
                'NODE_ENV=development tsdown --watch electron-src/main --watch electron-src/preload',
            name: 'TS',
        },
        {
            command: 'pnpm run dev:renderer',
            name: 'VI',
        },
        {
            command: 'nodemon --watch dist/main/main.js --exec pnpm run start:main',
            name: 'EL',
        },
    ],
    {
        prefixColors: ['bgMagenta.black.bold', 'bgBlue.black.bold', 'bgGreen.black.bold'],
        killOthersOn: ['success', 'failure'],
    },
);
