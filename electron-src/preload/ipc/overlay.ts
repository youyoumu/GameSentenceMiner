import z from 'zod';
import { simple } from './_util.js';

export const overlayIPC = z.object({
    'overlay:open': simple,
    'overlay:minimize': simple,
});
