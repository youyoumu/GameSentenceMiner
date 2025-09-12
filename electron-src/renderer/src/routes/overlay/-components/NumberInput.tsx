import { IconArrowDown, IconArrowUp } from '@tabler/icons-solidjs';
import * as numberInput from '@zag-js/number-input';
import { normalizeProps, useMachine } from '@zag-js/solid';
import { createEffect, createMemo, createSignal, createUniqueId } from 'solid-js';

export function NumberInput(props: {
  initialValue?: number;
  onValueChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  const [value, setValue] = createSignal(props.initialValue?.toString() ?? '1');
  const service = useMachine(numberInput.machine, {
    id: createUniqueId(),
    step: props.step ?? 1,
    min: props.min ?? 1,
    max: props.max ?? 100,
    get value() {
      return value();
    },
    onValueChange(details) {
      setValue(details.value);
    },
  });

  const api = createMemo(() => numberInput.connect(service, normalizeProps));

  createEffect(() => {
    props.onValueChange?.(parseFloat(value()));
  });

  return (
    <div
      {...api().getRootProps()}
      class="flex gap-2 items-center"
    >
      {/* <label {...api().getLabelProps()}>Font Size:</label> */}

      <input
        {...api().getInputProps()}
        class="border h-6 w-8 flex text-center justify-center text-xs"
      />
      <div class="flex flex-col">
        <button {...api().getIncrementTriggerProps()}>
          <IconArrowUp class="size-4 cursor-pointer" />
        </button>
        <button {...api().getDecrementTriggerProps()}>
          <IconArrowDown class="size-4 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
