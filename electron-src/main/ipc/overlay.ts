import { overlayWindow } from '../window/overlay.js';
import { on } from '../ui/_util.js';

export function registerOverlayIPC() {
    on('overlay:open', () => {
        overlayWindow.show();
    });

    on('overlay:minimize', () => {
        overlayWindow.minimize();
    });
}
