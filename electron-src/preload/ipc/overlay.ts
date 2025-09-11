import * as z from 'zod';

export const overlayIPC = z.object({
    'overlay:open': z.object({
        input: z.tuple([]),
        output: z.void(),
    }),
});
export const overlayIPCChannels = overlayIPC.keyof();

export type OverlayIPC = z.infer<typeof overlayIPC>;
export type OverlayIPCChannels = z.infer<typeof overlayIPCChannels>;
