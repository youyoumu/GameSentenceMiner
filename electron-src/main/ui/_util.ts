import { ipcMain } from 'electron';
import { IPCFromRenderer, IPCFromRendererChannel } from '../../preload/preload.js';

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
