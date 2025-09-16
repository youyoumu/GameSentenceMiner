import { BrowserWindow } from 'electron';

type BrowserWindowOptions = ConstructorParameters<typeof BrowserWindow>[0];
export class AppWindow {
    options: BrowserWindowOptions;
    win: BrowserWindow | undefined;

    constructor(options: BrowserWindowOptions) {
        this.options = options;
    }

    create() {
        this.win = new BrowserWindow(this.options);

        this.win.on('closed', () => {
            this.win = undefined;
        });
    }

    open() {
        if (!this.win || this.win.isDestroyed()) {
            this.create();
        }
        this.win?.show();
    }
}
