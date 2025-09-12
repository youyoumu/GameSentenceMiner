import type { IPCRenderer } from '../preload/preload.ts';

declare global {
  var ipcRenderer: IPCRenderer;
}
