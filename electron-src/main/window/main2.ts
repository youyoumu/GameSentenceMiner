import { BrowserWindow } from 'electron';
import { isDev } from '../util.js';
import * as path from 'path';

export function createMain2Window() {
    const win = new BrowserWindow({
        width: 1280,
        height: 1000,
        webPreferences: {
            devTools: true,
        },
    });

    if (isDev) {
        win.loadURL('http://localhost:3000');
    } else {
        win.loadFile(path.join(process.resourcesPath, 'renderer', 'index.html'));
    }
}
