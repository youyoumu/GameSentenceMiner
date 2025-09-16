import { main2 } from '../window/main2.js';
import { Sender } from './_util.js';

export const logIPC = new Sender(() => main2);
