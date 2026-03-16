import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ColorChannel, getChannelRange } from './color-manager';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';

@Component({
    selector: 'p-inputcolor-area-thumb',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '$pc.cx("areaThumb")',
        '[attr.role]': "'slider'",
        '[attr.tabindex]': '0',
        '[attr.aria-roledescription]': "'2d slider'",
        '[attr.aria-valuemin]': '$xMin()',
        '[attr.aria-valuemax]': '$xMax()',
        '[attr.aria-valuenow]': '$xValue()',
        '(keydown)': 'onKeyDown($event)'
    },
    providers: [{ provide: PARENT_INSTANCE, useExisting: InputColorAreaThumb }],
    hostDirectives: [Bind]
})
export class InputColorAreaThumb extends BaseComponent {
    componentName = 'InputColorAreaThumb';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    $xChannel = computed(() => this.$pc.$axes().xChannel);
    $yChannel = computed(() => this.$pc.$axes().yChannel);

    $xRange = computed(() => getChannelRange(this.$xChannel()));
    $yRange = computed(() => getChannelRange(this.$yChannel()));

    $xValue = computed(() => this.$pc.$color().getChannelValue(this.$xChannel() as ColorChannel));
    $yValue = computed(() => this.$pc.$color().getChannelValue(this.$yChannel() as ColorChannel));

    $xMin = computed(() => this.$xRange().minValue);
    $xMax = computed(() => this.$xRange().maxValue);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.$pc.$disabled()) return;

        const xCh = this.$xChannel();
        const yCh = this.$yChannel();
        const xRange = this.$xRange();
        const yRange = this.$yRange();

        let xVal = this.$xValue();
        let yVal = this.$yValue();
        let handled = false;

        switch (event.key) {
            case 'ArrowRight':
                xVal = Math.min(xVal + xRange.step, xRange.maxValue);
                handled = true;
                break;
            case 'ArrowLeft':
                xVal = Math.max(xVal - xRange.step, xRange.minValue);
                handled = true;
                break;
            case 'ArrowUp':
                yVal = Math.min(yVal + yRange.step, yRange.maxValue);
                handled = true;
                break;
            case 'ArrowDown':
                yVal = Math.max(yVal - yRange.step, yRange.minValue);
                handled = true;
                break;
            case 'PageUp':
                yVal = Math.min(yVal + yRange.pageStep, yRange.maxValue);
                handled = true;
                break;
            case 'PageDown':
                yVal = Math.max(yVal - yRange.pageStep, yRange.minValue);
                handled = true;
                break;
            case 'Home':
                xVal = xRange.minValue;
                handled = true;
                break;
            case 'End':
                xVal = xRange.maxValue;
                handled = true;
                break;
        }

        if (handled) {
            event.preventDefault();
            const nativeColor = this.$pc.toChannelNativeFormat(this.$pc.$color(), xCh as ColorChannel);
            let color = nativeColor.setChannelValue(xCh as ColorChannel, xVal);
            color = color.setChannelValue(yCh as ColorChannel, yVal);
            this.$pc.updateColor(color, event, true);
        }
    }
}
