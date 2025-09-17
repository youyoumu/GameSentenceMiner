import { AppWindow } from './_util.js';
import { env } from '#/env.js';

class Main2Window extends AppWindow {
    constructor() {
        super({
            width: 1280,
            height: 1000,
            webPreferences: {
                preload: env.PRELOAD_PATH,
            },
        });
    }

    create() {
        super.create();

        this.win?.loadURL('http://localhost:3000');
        // if (isDev) {
        //     this.win?.loadFile(indexHtml, {
        //         hash: '/',
        //     });
        //     this.win?.loadURL('http://localhost:3000');
        // } else {
        //     this.win?.loadFile(indexHtml);
        // }
    }
}

export const main2Window = new Main2Window();
