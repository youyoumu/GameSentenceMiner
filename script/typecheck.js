import concurrently from 'concurrently';

concurrently(
    [
        {
            command: 'pnpm run typecheck:main',
            name: 'MA',
        },
        {
            command: 'pnpm run typecheck:preload',
            name: 'PR',
        },
        {
            command: 'pnpm run typecheck:renderer',
            name: 'RE',
        },
    ],
    {
        prefixColors: ['bgMagenta.black.bold', 'bgBlue.black.bold', 'bgGreen.black.bold'],
    },
);
