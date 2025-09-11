import { contextBridge, ipcRenderer } from 'electron';
import { overlayIPC, OverlayIPC, overlayIPCChannels, OverlayIPCChannels } from './ipc/overlay.js';

export type IPC = OverlayIPC;
export type IPCChannel = OverlayIPCChannels;

const ipc = overlayIPC;
const ipcChannels = overlayIPCChannels;

export type IPCRenderer = {
    send: (channel: IPCChannel, ...args: IPC[IPCChannel]['input']) => void;
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
};

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer_);
