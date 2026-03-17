import { ChangeDetectionStrategy, Component, computed, inject, input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ColorChannel, ColorSliderChannel, getChannelRange, snapValue } from './color-manager';
import { INPUT_COLOR_INSTANCE, INPUT_COLOR_SLIDER_INSTANCE } from './inputcolor.token';

/**
 * InputColorSlider is a helper component for InputColor component.
 * @group Components
 */
@Component({
    selector: 'p-inputcolor-slider',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': '$pc.cx("slider")',
        '[class.p-inputcolor-slider-horizontal]': 'orientation() === "horizontal"',
        '[class.p-inputcolor-slider-vertical]': 'orientation() === "vertical"',
        '[attr.data-orientation]': 'orientation()',
        '(pointerdown)': 'onPointerDown($event)'
    },
    providers: [
        { provide: INPUT_COLOR_SLIDER_INSTANCE, useExisting: InputColorSlider },
        { provide: PARENT_INSTANCE, useExisting: InputColorSlider }
    ],
    hostDirectives: [Bind]
})
export class InputColorSlider extends BaseComponent implements OnDestroy {
    componentName = 'InputColorSlider';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pc = inject(INPUT_COLOR_INSTANCE);

    /**
     * The color channel this slider controls.
     * @group Props
     */
    channel = input<ColorSliderChannel>('hue');

    /**
     * Orientation of the slider.
     * @group Props
     */
    orientation = input<'horizontal' | 'vertical'>('horizontal');

    private dragging = false;
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
        const ch = this.channel();
        const range = getChannelRange(ch);

        let percent: number;
        if (this.orientation() === 'vertical') {
            percent = 1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        } else {
            percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        }

        const rawValue = range.minValue + percent * (range.maxValue - range.minValue);
        const value = snapValue(rawValue, range.minValue, range.maxValue, range.step);
        this.$pc.setChannelValue(ch as ColorChannel, value, event, isEnd);
    }
}
