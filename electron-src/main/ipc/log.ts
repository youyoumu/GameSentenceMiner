import { main2Window } from '../window/main2.js';
import { Sender } from './_util.js';

export const logIPC = new Sender(() => main2Window.win);
