import { ipcMain } from 'electron';
import { IPC, IPCChannel } from '../../preload/preload.js';

export function on<K extends IPCChannel>(
    channel: K,
    listener: (event: Electron.IpcMainEvent, ...args: IPC[K]['input']) => IPC[K]['output'],
) {
    ipcMain.on(channel, (event, ...args) => listener(event, ...(args as IPC[K]['input'])));
}
