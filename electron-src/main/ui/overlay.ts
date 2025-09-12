import { ipcMain } from 'electron';
import { overlayWindow } from '../window/overlay.js';
import { OverlayIPC, OverlayIPCChannels } from '../../preload/ipc/overlay.js';

function on<K extends OverlayIPCChannels>(
    channel: K,
    listener: (
        event: Electron.IpcMainEvent,
        ...args: OverlayIPC[K]['input']
    ) => OverlayIPC[K]['output'],
) {
    ipcMain.on(channel, (event, ...args) => listener(event, ...(args as OverlayIPC[K]['input'])));
}

export function registerOverlayIPC() {
    on('overlay:open', () => {
        overlayWindow.show();
    });

    on('overlay:minimize', () => {
        overlayWindow.minimize();
    });
}
