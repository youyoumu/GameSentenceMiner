import { log } from '../logger.js';
import { yomitanWindow } from '../window/yomitan.js';
import { on } from './_util.js';

export function registerYomitanIPC() {
    on('yomitan:open', () => {
        log.info('Opening Yomitan');
        yomitanWindow.show();
    });

    on('yomitan:minimize', () => {
        yomitanWindow.minimize();
    });
}
