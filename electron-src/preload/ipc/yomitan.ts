import z from 'zod';
import { simple } from './_util.js';

export const yomitanIPC = z.object({
    'yomitan:open': simple,
    'yomitan:minimize': simple,
});
