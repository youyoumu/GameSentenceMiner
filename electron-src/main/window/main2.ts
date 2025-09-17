import { isDev } from '../util.js';
import * as path from 'path';
import { AppWindow } from './_util.js';
import preload from '#preload/preload';

class Main2Window extends AppWindow {
    constructor() {
        super({
            width: 1280,
            height: 1000,
            webPreferences: {
                preload,
            },
        });
    }

    create() {
        super.create();
        if (isDev) {
            this.win?.loadURL('http://localhost:3000');
        } else {
            this.win?.loadFile(path.join(process.resourcesPath, 'renderer', 'index.html'));
        }
    }
}

export const main2Window = new Main2Window();
