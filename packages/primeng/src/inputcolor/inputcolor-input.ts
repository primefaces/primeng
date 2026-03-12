import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { InputText } from 'primeng/inputtext';
import type { InputSize, InputVariant } from 'primeng/types/shared';
import { ColorChannel, ColorInputChannel, ColorSliderChannel, getChannelRange, getInputChannelValue, parseColor } from './color-manager';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';
import { InputColorInputStyle } from './style/inputcolorinputstyle';

@Component({
    selector: 'p-inputcolor-input',
    standalone: true,
    imports: [InputText],
    template: `<input
        pInputText
        [class]="cx('root')"
        [type]="$inputType()"
        [pSize]="pSize()"
        [variant]="variant()"
        [fluid]="fluid()"
        [invalid]="invalid()"
        [attr.data-channel]="channel()"
        [value]="$displayValue()"
        (input)="onInput($event)"
        (blur)="onBlur($event)"
        (keydown.enter)="onEnter($event)"
    />`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;'
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
     * Defines the size of the input.
     * @group Props
     */
    pSize = input<InputSize>();

    /**
     * Specifies the input variant.
     * @group Props
     */
    variant = input<InputVariant>();

    /**
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    fluid = input(undefined, { transform: booleanAttribute });

    /**
     * When present, it specifies that the component should have invalid state style.
     * @group Props
     */
    invalid = input(undefined, { transform: booleanAttribute });

    $inputType = computed(() => {
        const ch = this.channel();
        return ch === 'hex' || ch === 'css' ? 'text' : 'number';
    });

    $displayValue = computed(() => {
        const ch = this.channel();
        const color = this.$pc.$color();
        return getInputChannelValue(color, ch);
    });

    private pendingValue: string | null = null;

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
