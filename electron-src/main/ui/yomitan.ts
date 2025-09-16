
import { yomitanWindow } from '../window/yomitan.js';
import { on } from './_util.js';

export function registerYomitanIPC() {
    on('yomitan:open', () => {
        yomitanWindow.show();
    });

    on('yomitan:minimize', () => {
        yomitanWindow.minimize();
    });
}
