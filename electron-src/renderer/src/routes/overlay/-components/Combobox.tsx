import { IconChevronDown } from '@tabler/icons-solidjs';
import * as combobox from '@zag-js/combobox';
import { normalizeProps, useMachine } from '@zag-js/solid';
import { createEffect, createMemo, createSignal, createUniqueId, For, Show } from 'solid-js';

export function Combobox(props: {
  comboboxData: {
    label: string;
    code: string;
  }[];
  initialValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const [value, setValue] = createSignal([props.initialValue ?? props.comboboxData[0].code]);
  const [options, setOptions] = createSignal(props.comboboxData);

  const collection = createMemo(() =>
    combobox.collection({
      items: options(),
      itemToValue: (item) => item.code,
      itemToString: (item) => item.label,
    }),
  );

  const service = useMachine(combobox.machine, {
    id: createUniqueId(),
    get collection() {
      return collection();
    },
    onOpenChange() {
      setOptions(props.comboboxData);
    },
    onInputValueChange({ inputValue }) {
      const filtered = props.comboboxData.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setOptions(filtered.length > 0 ? filtered : props.comboboxData);
    },
    get value() {
      return value();
    },
    onValueChange(details) {
      setValue(details.value);
    },
  });

  const api = createMemo(() => combobox.connect(service, normalizeProps));

  createEffect(() => {
    props.onValueChange?.(value()[0]);
  });

  return (
    <div>
      <div {...api().getRootProps()}>
        {/* <label {...api().getLabelProps()}>Select country</label> */}
        <div
          {...api().getControlProps()}
          class="flex gap-2 items-center"
        >
          <input
            {...api().getInputProps()}
            class="border text-xs h-6 w-32 px-1"
          />
          <button {...api().getTriggerProps()}>
            <IconChevronDown class="size-4 cursor-pointer" />
          </button>
        </div>
      </div>
      <div {...api().getPositionerProps()}>
        <Show when={options().length > 0}>
          <ul
            {...api().getContentProps()}
            class="bg-base-200 p-2 flex flex-col gap-1"
          >
            <For each={options()}>
              {(item) => (
                <li
                  {...api().getItemProps({ item })}
                  class="cursor-pointer hover:bg-base-300 p-1 text-sm"
                >
                  {item.label}
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </div>
  );
}
