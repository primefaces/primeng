import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ColorChannel, getAreaGradient, getChannelRange, snapValue } from './color-manager';
import { INPUT_COLOR_INSTANCE } from './inputcolor.token';

@Component({
    selector: 'p-inputcolor-area',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '$pc.cx("area")',
        '[style.--area-gradient]': '$areaGradient()',
        '[style.--thumb-background]': '$thumbBackground()',
        '[style.--thumb-position-left]': '$thumbLeft()',
        '[style.--thumb-position-top]': '$thumbTop()',
        '(pointerdown)': 'onPointerDown($event)'
    },
    providers: [{ provide: PARENT_INSTANCE, useExisting: InputColorArea }],
    hostDirectives: [Bind]
})
export class InputColorArea extends BaseComponent implements OnDestroy {
    componentName = 'InputColorArea';

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

    $thumbBackground = computed(() => this.$pc.$color().setChannelValue('alpha', 1).toRgbString());

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
    private dragOffset = { x: 0, y: 0 };
    private cleanupDrag: (() => void) | null = null;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onPointerDown(event: PointerEvent) {
        if (this.$pc.$disabled()) return;
        event.preventDefault();
        this.dragging = true;

        const el = this.el.nativeElement as HTMLElement;
        el.setPointerCapture(event.pointerId);

        const thumb = (event.target as HTMLElement)?.closest('[data-pc-section="areathumb"], .p-inputcolor-area-thumb') as HTMLElement | null;
        if (thumb) {
            const thumbRect = thumb.getBoundingClientRect();
            this.dragOffset = {
                x: event.clientX - (thumbRect.left + thumbRect.width / 2),
                y: event.clientY - (thumbRect.top + thumbRect.height / 2)
            };
        } else {
            this.dragOffset = { x: 0, y: 0 };
        }

        this.updateFromPointer(event);

        const onMove = (e: PointerEvent) => {
            if (!this.dragging) return;
            e.preventDefault();
            this.updateFromPointer(e);
        };

        const cleanup = () => {
            this.dragging = false;
            this.cleanupDrag = null;
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerup', onUp);
            el.removeEventListener('pointercancel', onCancel);
            el.removeEventListener('lostpointercapture', onLostCapture);
        };

        this.cleanupDrag = cleanup;

        const onUp = (e: PointerEvent) => {
            if (!this.dragging) return;
            this.updateFromPointer(e, true);
            this.dragOffset = { x: 0, y: 0 };
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

    ngOnDestroy() {
        this.cleanupDrag?.();
    }

    private updateFromPointer(event: PointerEvent, isEnd: boolean = false) {
        const el = this.el.nativeElement as HTMLElement;
        const rect = el.getBoundingClientRect();

        const xPercent = Math.max(0, Math.min(1, (event.clientX - this.dragOffset.x - rect.left) / rect.width));
        const yPercent = Math.max(0, Math.min(1, (event.clientY - this.dragOffset.y - rect.top) / rect.height));

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
