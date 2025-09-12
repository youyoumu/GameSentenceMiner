import * as z from 'zod';

const simple = z.object({
    input: z.tuple([]),
    output: z.void(),
});

export const overlayIPC = z.object({
    'overlay:open': simple,
    'overlay:minimize': simple,
});
export const overlayIPCChannels = overlayIPC.keyof();

export type OverlayIPC = z.infer<typeof overlayIPC>;
export type OverlayIPCChannels = z.infer<typeof overlayIPCChannels>;
