import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ColorChannel, getChannelRange } from './color-manager';
import { INPUT_COLOR_INSTANCE, INPUT_COLOR_SLIDER_INSTANCE } from './inputcolor.token';
import { InputColorSliderThumbStyle } from './style/inputcolorsliderthumbstyle';

@Component({
    selector: 'p-inputcolor-slider-thumb',
    standalone: true,
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[style.--slider-thumb-background]': '$thumbColor()',
        '[style.left]': '$isVertical() ? null : $thumbPosition()',
        '[style.top]': '$isVertical() ? $thumbPositionVertical() : null',
        '[style.translate]': '$isVertical() ? "0 -50%" : "-50% 0"',
        '[attr.role]': "'slider'",
        '[attr.tabindex]': '0',
        '[attr.aria-valuemin]': '$range().minValue',
        '[attr.aria-valuemax]': '$range().maxValue',
        '[attr.aria-valuenow]': '$value()',
        '(keydown)': 'onKeyDown($event)'
    },
    providers: [InputColorSliderThumbStyle, { provide: PARENT_INSTANCE, useExisting: InputColorSliderThumb }],
    hostDirectives: [Bind]
})
export class InputColorSliderThumb extends BaseComponent {
    componentName = 'InputColorSliderThumb';

    _componentStyle = inject(InputColorSliderThumbStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    private pcSlider = inject(INPUT_COLOR_SLIDER_INSTANCE);

    $channel = computed(() => this.pcSlider.channel());
    $isVertical = computed(() => this.pcSlider.orientation() === 'vertical');
    $range = computed(() => getChannelRange(this.$channel()));
    $value = computed(() => this.$pc.$color().getChannelValue(this.$channel() as ColorChannel));

    $thumbPosition = computed(() => {
        const range = this.$range();
        const value = this.$value();
        const pct = ((value - range.minValue) / (range.maxValue - range.minValue)) * 100;
        return `${pct}%`;
    });

    $thumbPositionVertical = computed(() => {
        const range = this.$range();
        const value = this.$value();
        const pct = 100 - ((value - range.minValue) / (range.maxValue - range.minValue)) * 100;
        return `${pct}%`;
    });

    $thumbColor = computed(() => this.$pc.$color().toRgbString());

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.$pc.$disabled()) return;

        const ch = this.$channel();
        const range = this.$range();
        let value = this.$value();
        let handled = false;

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                value = Math.min(value + range.step, range.maxValue);
                handled = true;
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                value = Math.max(value - range.step, range.minValue);
                handled = true;
                break;
            case 'PageUp':
                value = Math.min(value + range.pageStep, range.maxValue);
                handled = true;
                break;
            case 'PageDown':
                value = Math.max(value - range.pageStep, range.minValue);
                handled = true;
                break;
            case 'Home':
                value = range.minValue;
                handled = true;
                break;
            case 'End':
                value = range.maxValue;
                handled = true;
                break;
        }

        if (handled) {
            event.preventDefault();
            this.$pc.setChannelValue(ch as ColorChannel, value, event, true);
        }
    }
}
