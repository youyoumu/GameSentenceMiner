import { createEffect, createSignal } from 'solid-js';

const daisyUIThemes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
  'caramellatte',
  'abyss',
  'silk',
];

export function RootPage() {
  const [themeIndex, setThemeIndex] = createSignal(0);
  createEffect(() => {
    document.body.setAttribute('data-theme', daisyUIThemes[themeIndex()]);
  });

  return (
    <div class="h-svh w-full bg-base-300">
      <div class="flex items-center justify-center gap-4 p-4">
        <button class="btn btn-primary">Hello World</button>
        <button class="btn btn-error">Hello World</button>
        <button class="btn btn-secondary">Hello World</button>
        <button
          class="btn btn-neutral"
          onClick={() => {
            setThemeIndex((i) => (i + 1) % daisyUIThemes.length);
          }}
        >
          Cycle theme
        </button>
        <button
          class="btn btn-neutral"
          onClick={() => {
            ipcRenderer.send('overlay:open');
          }}
        >
          Open Overlay
        </button>
        <button
          class="btn btn-neutral"
          onClick={() => {
            ipcRenderer.send('overlay:minimize');
          }}
        >
          Close Overlay
        </button>
        <button
          class="btn btn-neutral"
          onClick={() => {
            ipcRenderer.send('yomitan:open');
          }}
        >
          Open Yomitan
        </button>
      </div>
    </div>
  );
}
