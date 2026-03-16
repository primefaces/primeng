import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, NgModule, output, Provider, signal, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind } from 'primeng/bind';
import { ColorChannel, ColorInstance, ColorSpace, getDefault2DAxes, HSBColor, HSLColor, OKLCHColor, parseColor, RGBColor } from './color-manager';
import { InputColorArea } from './inputcolor-area';
import { InputColorAreaBackground } from './inputcolor-area-background';
import { InputColorAreaThumb } from './inputcolor-area-thumb';
import { InputColorEyeDropper } from './inputcolor-eyedropper';
import { InputColorInput } from './inputcolor-input';
import { InputColorSlider } from './inputcolor-slider';
import { InputColorSliderThumb } from './inputcolor-slider-thumb';
import { InputColorSliderTrack } from './inputcolor-slider-track';
import { InputColorSwatch } from './inputcolor-swatch';
import { InputColorSwatchBackground } from './inputcolor-swatch-background';
import { InputColorTransparencyGrid } from './inputcolor-transparency-grid';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';
import { InputColorStyle } from './style/inputcolorstyle';

export const INPUT_COLOR_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputColor),
    multi: true
};

/**
 * InputColor is a composable color picker component.
 * @group Components
 */
@Component({
    selector: 'p-inputcolor',
    standalone: true,
    imports: [SharedModule],
    template: `<ng-content></ng-content>`,
    providers: [INPUT_COLOR_VALUE_ACCESSOR, InputColorStyle, { provide: INPUT_COLOR_INSTANCE, useExisting: InputColor }, { provide: PARENT_INSTANCE, useExisting: InputColor }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.data-pc-name]': "'inputcolor'",
        '[attr.data-pc-section]': "'root'",
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class InputColor extends BaseEditableHolder {
    componentName = 'InputColor';

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(InputColorStyle);

    /**
     * Color format/space used internally.
     * @group Props
     */
    format = input<ColorSpace>('hsba');

    /**
     * Default color value.
     * @group Props
     */
    defaultValue = input<string | ColorInstance | null>(null);

    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = input<boolean>(false);

    /**
     * Computed disabled state
     */
    $disabled = computed(() => this.disabled());

    /**
     * Callback on value change (during interaction).
     * @group Emits
     */
    onValueChange = output<{ color: ColorInstance; originalEvent?: Event }>();

    /**
     * Callback when interaction ends (mouseup/touchend/keyup).
     * @group Emits
     */
    onValueChangeEnd = output<{ color: ColorInstance; originalEvent?: Event }>();

    // Internal color state
    _color = signal<ColorInstance | null>(null);

    // Computed color - resolved from internal state or default
    $color = computed<ColorInstance>(() => {
        return this._color() || parseColor(this.defaultValue() as any) || (parseColor('#ff0000') as ColorInstance).toFormat(this.format());
    });

    // Computed 2D axes based on format
    $axes = computed(() => getDefault2DAxes(this.format()));

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Update color and emit changes
     */
    updateColor(color: ColorInstance, event?: Event, isEnd: boolean = false) {
        this._color.set(color);

        const outputValue = color.toString(this.format());
        this.onModelChange(outputValue);
        this.writeModelValue(outputValue);

        this.onValueChange.emit({ color, originalEvent: event });

        if (isEnd) {
            this.onValueChangeEnd.emit({ color, originalEvent: event });
            this.onModelTouched();
        }
    }

    /**
     * Set a specific channel value
     */
    setChannelValue(channel: ColorChannel, value: number, event?: Event, isEnd: boolean = false) {
        const color = this.toChannelNativeFormat(this.$color(), channel);
        const newColor = color.setChannelValue(channel, value);
        this.updateColor(newColor, event, isEnd);
    }

    writeControlValue(value: any) {
        if (value) {
            const current = this._color();
            if (current && current.toString(this.format()) === value) {
                return;
            }
            const parsed = parseColor(value);
            if (parsed) {
                this._color.set(parsed.toFormat(this.format()));
            }
        } else {
            this._color.set(null);
        }
    }

    toChannelNativeFormat(color: ColorInstance, channel: ColorChannel): ColorInstance {
        // If the current color natively supports this channel, don't convert
        if (color instanceof HSBColor && (channel === 'hue' || channel === 'saturation' || channel === 'brightness')) return color;
        if (color instanceof HSLColor && (channel === 'hue' || channel === 'saturation' || channel === 'lightness')) return color;
        if (color instanceof RGBColor && (channel === 'red' || channel === 'green' || channel === 'blue')) return color;
        if (color instanceof OKLCHColor && (channel === 'oklchLightness' || channel === 'oklchChroma' || channel === 'oklchHue')) return color;

        // Otherwise convert to the appropriate format
        switch (channel) {
            case 'hue':
            case 'saturation':
            case 'brightness':
                return color.toHSB();
            case 'lightness':
                return color.toHSL();
            case 'red':
            case 'green':
            case 'blue':
                return color.toRGB();
            case 'oklchLightness':
            case 'oklchChroma':
            case 'oklchHue':
                return color.toOKLCH();
            case 'alpha':
            default:
                return color;
        }
    }
}

@NgModule({
    imports: [
        InputColor,
        InputColorArea,
        InputColorAreaThumb,
        InputColorAreaBackground,
        InputColorSlider,
        InputColorSliderThumb,
        InputColorSliderTrack,
        InputColorSwatch,
        InputColorSwatchBackground,
        InputColorTransparencyGrid,
        InputColorInput,
        InputColorEyeDropper,
        SharedModule
    ],
    exports: [
        InputColor,
        InputColorArea,
        InputColorAreaThumb,
        InputColorAreaBackground,
        InputColorSlider,
        InputColorSliderThumb,
        InputColorSliderTrack,
        InputColorSwatch,
        InputColorSwatchBackground,
        InputColorTransparencyGrid,
        InputColorInput,
        InputColorEyeDropper,
        SharedModule
    ]
})
export class InputColorModule {}
