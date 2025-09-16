import { app } from 'electron';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';
import type { ReadableStream } from 'stream/web';
import StreamZip from 'node-stream-zip';

//TODO: logging

export const yomitanPath = path.join(app.getPath('userData'), 'extension', 'yomitan');

export async function downloadYomitan() {
    const apiUrl = 'https://api.github.com/repos/themoeway/yomitan/releases/latest';
    const res = await fetch(apiUrl);
    const release = (await res.json()) as {
        assets: { browser_download_url: string; name: string }[];
    };

    const asset = release.assets.find((a) => a.name.includes('yomitan-chrome.zip'));
    if (!asset) throw new Error('Chrome zip not found in release');

    const extensionPath = path.join(app.getPath('userData'), 'extension');
    const zipPath = path.join(extensionPath, 'yomitan.zip');
    fs.mkdirSync(extensionPath, { recursive: true });

    const resp = await fetch(asset.browser_download_url);

    if (resp.body === null) throw new Error('Response body is null');
    await writeFile(zipPath, Readable.fromWeb(resp.body as ReadableStream));

    return zipPath;
}

export async function extractYomitan(zipPath: string) {
    // Ensure directory exists
    fs.mkdirSync(yomitanPath, { recursive: true });

    const zip = new StreamZip.async({ file: zipPath });
    try {
        const count = await zip.extract(null, yomitanPath);
        console.log(`Extracted ${count} entries to ${yomitanPath}`);
    } finally {
        await zip.close();
    }

    //shim some yomitan files
    const targets = [path.join(yomitanPath, 'js', 'data', 'permissions-util.js')];
    for (const target of targets) {
        try {
            shimFile(target, path.join(import.meta.dirname, './yomitan-shim.js'));
            console.log(`Shimmed: ${target}`);
        } catch (err) {
            console.error(`Failed to shim ${target}:`, err);
        }
    }

    return yomitanPath;
}

function shimFile(targetPath: string, shimPath: string) {
    // Read shim file
    const shim = fs.readFileSync(shimPath, 'utf-8');

    // Read original file
    const original = fs.readFileSync(targetPath, 'utf-8');

    // Prepend shim + original
    const combined = shim + '\n' + original;

    // Overwrite target file
    fs.writeFileSync(targetPath, combined, 'utf-8');
}
