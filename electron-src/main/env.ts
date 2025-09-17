import { createEnv } from '@t3-oss/env-core';
import z from 'zod';
import 'dotenv/config';
import { join } from 'path';
import { isDev } from './util';

const validatedEnv = createEnv({
    server: {
        GSM_AUTOLAUNCH: z.stringbool().default(true),
        GSM_RENDERER_PORT: z
            .string()
            .default('3000')
            .transform((v) => parseInt(v)),
        ROARR_LOG: z.stringbool(),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});

const constant = {
    PRELOAD_PATH: join(import.meta.dirname, '../preload', 'preload.js'),
    RENDERER_PATH: join(import.meta.dirname, '../renderer'),
    RENDERER_URL: `http://localhost:${validatedEnv.GSM_RENDERER_PORT}`,
    DEV: isDev,
};

export const env = {
    ...validatedEnv,
    ...constant,
} as const;
