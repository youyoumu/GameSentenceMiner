import { createEnv } from '@t3-oss/env-core';
import z from 'zod';
import 'dotenv/config';
import { join } from 'path';

const constant = {
    PRELOAD_PATH: join(import.meta.dirname, '../preload', 'preload.js'),
    RENDERER_PATH: join(import.meta.dirname, '../renderer'),
};

export const env = {
    ...createEnv({
        server: {
            GSM_AUTOLAUNCH: z.stringbool().default(true),
            ROARR_LOG: z.stringbool(),
        },
        runtimeEnv: process.env,
        emptyStringAsUndefined: true,
    }),
    ...constant,
} as const;
