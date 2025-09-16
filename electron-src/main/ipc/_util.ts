import { BrowserWindow, ipcMain } from 'electron';
import {
    IPCFromMain,
    IPCFromMainChannel,
    IPCFromRenderer,
    IPCFromRendererChannel,
} from '../../preload/preload.js';

export function on<K extends IPCFromRendererChannel>(
    channel: K,
    listener: (
        event: Electron.IpcMainEvent,
        ...args: IPCFromRenderer[K]['input']
    ) => IPCFromRenderer[K]['output'],
) {
    ipcMain.on(channel, (event, ...args) =>
        listener(event, ...(args as IPCFromRenderer[K]['input'])),
    );
}

export class Sender {
    #win: () => BrowserWindow | null;
    constructor(win: () => BrowserWindow | null) {
        this.#win = win;
    }

    send<K extends IPCFromMainChannel>(channel: K, payload: IPCFromMain[K]['output']) {
        this.#win()?.webContents.send(channel, payload);
    }
}
