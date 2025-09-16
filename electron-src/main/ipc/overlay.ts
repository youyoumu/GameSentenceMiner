import { overlayWindow } from '../window/overlay.js';
import { IPC } from './_util.js';

class OverlayIPC extends IPC<'overlay'> {
    constructor() {
        super({
            prefix: 'overlay',
            win: () => overlayWindow.win,
        });
    }

    register() {
        this.on('overlay:open', () => {
            overlayWindow.open();
        });

        this.on('overlay:minimize', () => {
            overlayWindow.win?.minimize();
        });
    }
}

export const overlayIPC = new OverlayIPC();
