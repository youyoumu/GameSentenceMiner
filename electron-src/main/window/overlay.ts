import { BrowserWindow } from 'electron';
import { isDev } from '../util.js';
import * as path from 'path';

export let overlayWindow: BrowserWindow;

export function createOverlayWindow() {
    overlayWindow = new BrowserWindow({
        width: 800, // adjust to your VN text area
        height: 200,
        frame: false, // no title bar
        transparent: true, // allow transparency
        alwaysOnTop: true, // stays above VN
        skipTaskbar: true, // don’t show in taskbar
        focusable: false, // prevent stealing focus
        webPreferences: {},
        show: false,
    });

    overlayWindow.setIgnoreMouseEvents(false); // set true if you want clicks to pass through

    if (isDev) {
        overlayWindow.loadURL('http://localhost:3000/overlay');
    } else {
        // TODO: make sure this even works
        overlayWindow.loadFile(path.join(process.resourcesPath, 'renderer', 'index.html'), {
            hash: '/overlay',
        });
    }
}
