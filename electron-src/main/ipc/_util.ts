import { BrowserWindow, ipcMain } from 'electron';
import { IPC, IPCChannel } from '../../preload/preload.js';

export function on<K extends IPCChannel>(
    channel: K,
    listener: (event: Electron.IpcMainEvent, ...args: IPC[K]['input']) => IPC[K]['output'],
) {
    ipcMain.on(channel, (event, ...args) => listener(event, ...(args as IPC[K]['input'])));
}

export class Sender {
    #win: () => BrowserWindow | null;
    constructor(win: () => BrowserWindow | null) {
        this.#win = win;
    }

    send<K extends IPCChannel>(channel: K, payload: IPC[K]['output']) {
        this.#win()?.webContents.send(channel, payload);
    }
}
