import { BrowserWindow, session } from 'electron';
import { downloadYomitan, extractYomitan } from '../extension/yomitan.js';

export let yomitanWindow: BrowserWindow;

export async function createYomitanWindow() {
    const zipPath = await downloadYomitan();
    const extensionPath = await extractYomitan(zipPath);

    // Load unpacked extension

    yomitanWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: true,
    });
    // await session.defaultSession.clearCache();
    await session.defaultSession.clearStorageData({ storages: ['serviceworkers'] });

    const ext = await session.defaultSession.loadExtension(extensionPath);

    // Open the extension's options/settings page
    // Chrome extensions expose an options page in their manifest
    const optionsPage = `chrome-extension://${ext.id}/settings.html`;
    yomitanWindow.loadURL(optionsPage);
}
