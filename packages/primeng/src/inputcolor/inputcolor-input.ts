import { booleanAttribute, computed, Directive, effect, inject, input } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { InputText } from 'primeng/inputtext';
import { ColorChannel, ColorInputChannel, ColorSliderChannel, getChannelRange, getInputChannelValue, parseColor } from './color-manager';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';

@Directive({
    selector: '[pInputColorInput]',
    standalone: true,
    host: {
        '[attr.disabled]': '$disabled() || null',
        '[attr.data-channel]': 'channel()',
        '(input)': 'onInput($event)',
        '(blur)': 'onBlur($event)',
        '(keydown.enter)': 'onEnter($event)'
    },
    providers: [{ provide: PARENT_INSTANCE, useExisting: InputColorInput }],
    hostDirectives: [
        {
            directive: InputText,
            inputs: ['pSize', 'fluid', 'variant', 'invalid']
        }
    ]
})
export class InputColorInput extends BaseComponent {
    componentName = 'InputColorInput';

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

    /**
     * When present, it specifies that the input should be disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });

    $disabled = computed(() => this.disabled() || this.$pc.$disabled());

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
            const el = this.el.nativeElement;
            const ch = this.channel();
            if (ch !== 'hex' && ch !== 'css') {
                const range = getChannelRange(ch as ColorSliderChannel);
                el.min = String(range.minValue);
                el.max = String(range.maxValue);
                el.step = String(range.step);
            }
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
