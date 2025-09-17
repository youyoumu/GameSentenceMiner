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
        this.win?.loadURL(env.RENDERER_URL);
    }
}

export const main2Window = new Main2Window();
