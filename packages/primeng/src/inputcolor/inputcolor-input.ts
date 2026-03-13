import { computed, Directive, effect, inject, input } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { ColorChannel, ColorInputChannel, ColorSliderChannel, getChannelRange, getInputChannelValue, parseColor } from './color-manager';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';
import { InputColorInputStyle } from './style/inputcolorinputstyle';

@Directive({
    selector: '[pInputColorInput]',
    standalone: true,
    host: {
        '[class]': "cx('root')",
        '[attr.data-channel]': 'channel()',
        '(input)': 'onInput($event)',
        '(blur)': 'onBlur($event)',
        '(keydown.enter)': 'onEnter($event)'
    },
    providers: [InputColorInputStyle, { provide: PARENT_INSTANCE, useExisting: InputColorInput }]
})
export class InputColorInput extends BaseComponent {
    componentName = 'InputColorInput';

    _componentStyle = inject(InputColorInputStyle);

    $pc = inject(INPUT_COLOR_INSTANCE);

    /**
     * The color channel this input controls.
     * @group Props
     */
    channel = input.required<ColorInputChannel>();

    /**
     * The input type attribute.
     * @group Props
     */
    type = input<string>();

    $inputType = computed(() => {
        const t = this.type();
        if (t) return t;
        const ch = this.channel();
        return ch === 'hex' || ch === 'css' ? 'text' : 'number';
    });

    $displayValue = computed(() => {
        const ch = this.channel();
        const color = this.$pc.$color();
        const format = this.$pc.format();
        return getInputChannelValue(color, ch, format);
    });

    private pendingValue: string | null = null;

    constructor() {
        super();

        effect(() => {
            this.el.nativeElement.type = this.$inputType();
        });

        effect(() => {
            this.el.nativeElement.value = String(this.$displayValue() ?? '');
        });
    }

    onInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.pendingValue = target.value;
    }

    onBlur(event: FocusEvent) {
        this.commitValue(event);
    }

    onEnter(event: KeyboardEvent) {
        this.commitValue(event);
    }

    private commitValue(event: Event) {
        if (this.pendingValue === null) return;

        const ch = this.channel();
        const value = this.pendingValue;
        this.pendingValue = null;

        if (ch === 'hex') {
            const hex = value.startsWith('#') ? value : `#${value}`;
            const parsed = parseColor(hex);
            if (parsed) {
                this.$pc.updateColor(parsed, event, true);
            }
        } else if (ch === 'css') {
            const parsed = parseColor(value);
            if (parsed) {
                this.$pc.updateColor(parsed, event, true);
            }
        } else {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
                const range = getChannelRange(ch as ColorSliderChannel);
                const clamped = Math.max(range.minValue, Math.min(range.maxValue, numValue));
                this.$pc.setChannelValue(ch as ColorChannel, clamped, event, true);
            }
        }
    }
}
