import z from 'zod';

export const logIPC = z.object({
    'log:send': z.object({
        input: z.tuple([]),
        output: z.object({
            context: z.record(z.string(), z.string()),
            message: z.string(),
            sequence: z.string(),
            time: z.number(),
            version: z.string(),
        }),
    }),
});
