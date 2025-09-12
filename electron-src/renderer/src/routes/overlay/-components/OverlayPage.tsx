import { createEffect, createSignal, Show } from 'solid-js';
import * as colorPicker from '@zag-js/color-picker';
import { ColorPicker } from './ColorPicker';
import { IconSettings } from '@tabler/icons-solidjs';
import './overlay.css';
import { cn } from '#/lib/utils/cn';

export function OverlayPage() {
  const [showSettings, setShowSettings] = createSignal(false);

  const defaultWindowColor = colorPicker.parse('#ffffff');
  const defaultBackgroundColor = colorPicker.parse('#000000');
  const defaultTextColor = colorPicker.parse('#ffffff');

  const [windowColor, setWindowColor] = createSignal(colorPicker.parse('#ffffff'));
  const [backgroundColor, setBackgroundColor] = createSignal(colorPicker.parse('#000000'));
  const [textColor, setTextColor] = createSignal(colorPicker.parse('#ffffff'));

  // guard to make sure the color is not fully transparent
  createEffect(() => {
    if (windowColor().getChannelValue('alpha') === 0) {
      setWindowColor(defaultWindowColor);
    }
    if (backgroundColor().getChannelValue('alpha') === 0) {
      setBackgroundColor(defaultBackgroundColor);
    }
    if (textColor().getChannelValue('alpha') === 0) {
      setTextColor(defaultTextColor);
    }
  });

  return (
    <div
      class={cn(
        'h-svh w-full border',
        'hover:[&_#settings]:opacity-100',
        'hover:[&_#gear]:opacity-100',
      )}
      style={{
        'border-color': windowColor().toString('rgba'),
      }}
    >
      <div
        class="h-4 w-full bg-white draggable cursor-pointer"
        style={{ 'background-color': windowColor().toString('rgba') }}
      ></div>

      <div
        class="overflow-hidden relative w-full h-[calc(100%-16px)]"
        style={{
          'background-color': backgroundColor().toString('rgba'),
        }}
      >
        <div
          id="settings"
          class={cn('flex justify-end bg-base-100 p-2 gap-4 opacity-0 text-sm', {
            hidden: !showSettings(),
          })}
        >
          <div class="flex gap-2 items-center">
            <ColorPicker
              initialColor={textColor()}
              onValueChange={(value) => {
                setTextColor(value);
              }}
              classNames={{
                root: 'size-6 border',
              }}
            />
            Text
          </div>

          <div class="flex gap-2 items-center">
            <ColorPicker
              initialColor={backgroundColor()}
              onValueChange={(value) => {
                setBackgroundColor(value);
              }}
              classNames={{
                root: 'size-6 border',
              }}
            />
            Background
          </div>
          <div class="flex gap-2 items-center">
            <ColorPicker
              initialColor={windowColor()}
              onValueChange={(value) => {
                setWindowColor(value);
              }}
              classNames={{
                root: 'size-6 border',
              }}
            />
            Window
          </div>
        </div>

        <p
          style={{
            color: textColor().toString('rgba'),
          }}
        >
          asdf lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        </p>
      </div>

      <IconSettings
        id="gear"
        class="absolute bottom-3 right-3 size-6 cursor-pointer opacity-0"
        style={{
          color: windowColor().toString('rgba'),
        }}
        onClick={() => {
          setShowSettings(!showSettings());
        }}
      />

      <div
        class="absolute bottom-0 right-0 size-4 border-r-4 border-b-4"
        style={{
          'border-color': windowColor().toString('rgba'),
        }}
      ></div>
    </div>
  );
}
