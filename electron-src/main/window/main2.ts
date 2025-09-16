import { BrowserWindow } from 'electron';
import { isDev } from '../util.js';
import * as path from 'path';

export let main2: BrowserWindow | null = null;
export function createMain2Window() {
    main2 = new BrowserWindow({
        width: 1280,
        height: 1000,
        webPreferences: {
            devTools: true,
            preload: path.join(import.meta.dirname, '../../preload/preload.js'),
        },
    });

    if (isDev) {
        main2.loadURL('http://localhost:3000');
    } else {
        main2.loadFile(path.join(process.resourcesPath, 'renderer', 'index.html'));
    }
}
