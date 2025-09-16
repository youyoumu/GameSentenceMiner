import { contextBridge, ipcRenderer } from 'electron';
import { overlayIPC } from './ipc/overlay.js';
import { yomitanIPC } from './ipc/yomitan.js';
import * as z from 'zod';
import { logIPC } from './ipc/log.js';

const ipc = z.object({
    ...overlayIPC.shape,
    ...yomitanIPC.shape,
    ...logIPC.shape,
});
const ipcChannels = ipc.keyof();

export type IPC = z.infer<typeof ipc>;
export type IPCChannel = z.infer<typeof ipcChannels>;

export type IPCRenderer = {
    send: (channel: IPCChannel, ...args: IPC[IPCChannel]['input']) => void;
    on: (channel: IPCChannel, callback: (payload: IPC[IPCChannel]['output']) => void) => void;
};
const ipcRenderer_: IPCRenderer = {
    send: (channel, ...args) => {
        //check if channel valid
        const channelResult = ipcChannels.safeParse(channel);
        if (channelResult.error) {
            console.error('Invalid channel', channelResult);
            return;
        }

        //check if args valid
        const argsResult = ipc.shape[channel].shape['input'].safeParse(args);
        if (argsResult.error) {
            console.error('Invalid args', argsResult);
            return;
        }

        ipcRenderer.send(channel, ...args);
    },
    on: (channel, callback) => {
        ipcRenderer.on(channel, (_, payload) => callback(payload));
    },
};

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer_);
