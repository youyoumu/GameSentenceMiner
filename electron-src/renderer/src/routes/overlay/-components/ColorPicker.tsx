import { cn } from '#/lib/utils/cn';
import * as colorPicker from '@zag-js/color-picker';
import { normalizeProps, useMachine } from '@zag-js/solid';
import { createEffect, createMemo, createSignal, createUniqueId } from 'solid-js';

export function ColorPicker(props: {
  onValueChange: (value: colorPicker.Color) => void;
  initialColor: colorPicker.Color;
  classNames: {
    root: string;
  };
}) {
  const [value, setValue] = createSignal(props.initialColor);
  const service = useMachine(colorPicker.machine, {
    id: createUniqueId(),
    defaultValue: colorPicker.parse('hsl(0, 100%, 50%)'),
    get value() {
      return value();
    },
    onValueChange(details) {
      if (details.value.getChannelValue('alpha') === 0) {
        return;
      }
      setValue(details.value);
    },
  });

  createEffect(() => {
    props.onValueChange(value());
  });

  const api = createMemo(() => colorPicker.connect(service, normalizeProps));

  return (
    <div
      {...api().getRootProps()}
      class={cn(props.classNames.root)}
    >
      {/* <label {...api().getLabelProps()}>{api().valueAsString}</label> */}

      <input {...api().getHiddenInputProps()} />

      <div
        {...api().getControlProps()}
        class="size-full"
      >
        <button
          {...api().getTriggerProps()}
          class="size-full cursor-pointer"
        >
          <div
            {...api().getTransparencyGridProps({ size: '10px' })}
            class="size-full"
          />
          <div
            {...api().getSwatchProps({ value: api().value })}
            class="size-full"
          />
        </button>
        {/* <input {...api().getChannelInputProps({ channel: 'hex' })} /> */}
        {/* <input {...api().getChannelInputProps({ channel: 'alpha' })} /> */}
      </div>

      <div {...api().getPositionerProps()}>
        <div
          {...api().getContentProps()}
          class="p-2 bg-base-100"
        >
          <div
            {...api().getAreaProps()}
            class="w-48 h-24"
          >
            <div
              {...api().getAreaBackgroundProps()}
              class="size-full"
            />
            <div
              {...api().getAreaThumbProps()}
              class="size-4 rounded-full border-2"
            />
          </div>

          <div
            {...api().getChannelSliderProps({ channel: 'hue' })}
            class="h-4 w-48"
          >
            <div
              {...api().getChannelSliderTrackProps({ channel: 'hue' })}
              class="size-full"
            />
            <div
              {...api().getChannelSliderThumbProps({ channel: 'hue' })}
              class="w-2 h-full -translate-y-1/2 -translate-x-1/2 border-2"
            />
          </div>

          <div
            {...api().getChannelSliderProps({ channel: 'alpha' })}
            class="h-4 w-48"
          >
            <div {...api().getTransparencyGridProps({ size: '12px' })} />
            <div
              {...api().getChannelSliderTrackProps({ channel: 'alpha' })}
              class="size-full"
            />
            <div
              {...api().getChannelSliderThumbProps({ channel: 'alpha' })}
              class="w-2 h-full -translate-y-1/2 -translate-x-1/2 border-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
