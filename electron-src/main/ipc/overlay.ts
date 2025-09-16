import { overlayWindow } from '../window/overlay.js';
import { on } from './_util.js';

export function registerOverlayIPC() {
    on('overlay:open', () => {
        overlayWindow.open();
    });

    on('overlay:minimize', () => {
        overlayWindow.win?.minimize();
    });
}
