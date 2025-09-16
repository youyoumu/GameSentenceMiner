import { main2Window } from '../window/main2.js';
import { IPC } from './_util.js';

class LogIPC extends IPC<'log'> {
    constructor() {
        super({
            prefix: 'log',
            win: () => main2Window.win,
        });
    }
}

export const logIPC = new LogIPC();
