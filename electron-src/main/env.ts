import { createEnv } from '@t3-oss/env-core';
import z from 'zod';
import 'dotenv/config';

export const env = createEnv({
    server: {
        GSM_AUTOLAUNCH: z.stringbool().default(true),
        ROARR_LOG: z.stringbool(),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});
