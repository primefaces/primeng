import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ColorChannel, getAreaGradient, getChannelRange, snapValue } from './color-manager';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';
import { InputColorAreaStyle } from './style/inputcolorareastyle';

@Component({
    selector: 'p-inputcolor-area',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")',
        '[style.--area-gradient]': '$areaGradient()',
        '[style.--thumb-background]': '$thumbBackground()',
        '[style.--thumb-position-left]': '$thumbLeft()',
        '[style.--thumb-position-top]': '$thumbTop()',
        '(pointerdown)': 'onPointerDown($event)'
    },
    providers: [InputColorAreaStyle, { provide: PARENT_INSTANCE, useExisting: InputColorArea }],
    hostDirectives: [Bind]
})
export class InputColorArea extends BaseComponent {
    componentName = 'InputColorArea';

    _componentStyle = inject(InputColorAreaStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    $xChannel = computed(() => this.$pc.$axes().xChannel);
    $yChannel = computed(() => this.$pc.$axes().yChannel);

    $areaGradient = computed(() => {
        const color = this.$pc.$color();
        const xCh = this.$xChannel();
        const yCh = this.$yChannel();
        const format = this.$pc.format();
        return getAreaGradient(color, xCh, yCh, format);
    });

    $thumbBackground = computed(() => this.$pc.$color().toRgbString());

    $thumbLeft = computed(() => {
        const xCh = this.$xChannel();
        const range = getChannelRange(xCh);
        const value = this.$pc.$color().getChannelValue(xCh as ColorChannel);
        const pct = ((value - range.minValue) / (range.maxValue - range.minValue)) * 100;
        return `${pct}%`;
    });

    $thumbTop = computed(() => {
        const yCh = this.$yChannel();
        const range = getChannelRange(yCh);
        const value = this.$pc.$color().getChannelValue(yCh as ColorChannel);
        const pct = (1 - (value - range.minValue) / (range.maxValue - range.minValue)) * 100;
        return `${pct}%`;
    });

    private dragging = false;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onPointerDown(event: PointerEvent) {
        if (this.$pc.$disabled()) return;
        event.preventDefault();
        this.dragging = true;

        const el = this.el.nativeElement as HTMLElement;
        el.setPointerCapture(event.pointerId);

        this.updateFromPointer(event);

        const onMove = (e: PointerEvent) => {
            if (!this.dragging) return;
            e.preventDefault();
            this.updateFromPointer(e);
        };

        const cleanup = () => {
            this.dragging = false;
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerup', onUp);
            el.removeEventListener('pointercancel', onCancel);
            el.removeEventListener('lostpointercapture', onLostCapture);
        };

        const onUp = (e: PointerEvent) => {
            if (!this.dragging) return;
            this.updateFromPointer(e, true);
            cleanup();
        };

        const onCancel = () => {
            cleanup();
        };

        const onLostCapture = () => {
            cleanup();
        };

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerup', onUp);
        el.addEventListener('pointercancel', onCancel);
        el.addEventListener('lostpointercapture', onLostCapture);
    }

    private updateFromPointer(event: PointerEvent, isEnd: boolean = false) {
        const el = this.el.nativeElement as HTMLElement;
        const rect = el.getBoundingClientRect();

        const xPercent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const yPercent = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

        const xCh = this.$xChannel();
        const yCh = this.$yChannel();
        const xRange = getChannelRange(xCh);
        const yRange = getChannelRange(yCh);

        const xValue = snapValue(xRange.minValue + xPercent * (xRange.maxValue - xRange.minValue), xRange.minValue, xRange.maxValue, xRange.step);
        const yValue = snapValue(yRange.maxValue - yPercent * (yRange.maxValue - yRange.minValue), yRange.minValue, yRange.maxValue, yRange.step);

        const nativeColor = this.$pc.toChannelNativeFormat(this.$pc.$color(), xCh as ColorChannel);
        let color = nativeColor.setChannelValue(xCh as ColorChannel, xValue);
        color = color.setChannelValue(yCh as ColorChannel, yValue);

        this.$pc.updateColor(color, event, isEnd);
    }
}
