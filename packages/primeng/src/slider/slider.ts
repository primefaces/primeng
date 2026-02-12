import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, forwardRef, HostListener, inject, InjectionToken, input, NgModule, numberAttribute, output, Provider, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { addClass, getWindowScrollLeft, getWindowScrollTop, isRTL, removeClass } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import type { SliderChangeEvent, SliderOrientation, SliderPassThrough, SliderSlideEndEvent } from 'primeng/types/slider';
import { SliderStyle } from './style/sliderstyle';

const SLIDER_INSTANCE = new InjectionToken<Slider>('SLIDER_INSTANCE');

export const SLIDER_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Slider),
    multi: true
};
/**
 * Slider is a component to provide input with a drag handle.
 * @group Components
 */
@Component({
    selector: 'p-slider',
    standalone: true,
    imports: [AutoFocus, SharedModule, BindModule],
    template: `
        <span [class]="cx('range')" [style]="sx('range')" [attr.data-pc-section]="'range'" [attr.data-p]="dataP()" [pBind]="ptm('range')"></span>
        @if (!range()) {
            <span
                #sliderHandle
                [class]="cx('handle')"
                [style]="sx('handle')"
                (touchstart)="onDragStart($event)"
                (touchmove)="onDrag($event)"
                (touchend)="onDragEnd($event)"
                (mousedown)="onMouseDown($event)"
                (keydown)="onKeyDown($event)"
                [attr.tabindex]="$tabindex()"
                role="slider"
                [attr.aria-valuemin]="min()"
                [attr.aria-valuenow]="value()"
                [attr.aria-valuemax]="max()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-orientation]="orientation()"
                [attr.data-pc-section]="'handle'"
                [pAutoFocus]="autofocus()"
                [pBind]="ptm('handle')"
                [attr.data-p]="dataP()"
            ></span>
        }
        @if (range()) {
            <span
                #sliderHandleStart
                [class]="cn(cx('handle'), handleIndex == 0 && 'p-slider-handle-active')"
                [style]="sx('startHandler')"
                (keydown)="onKeyDown($event, 0)"
                (mousedown)="onMouseDown($event, 0)"
                (touchstart)="onDragStart($event, 0)"
                (touchmove)="onDrag($event)"
                (touchend)="onDragEnd($event)"
                [attr.tabindex]="$tabindex()"
                role="slider"
                [attr.aria-valuemin]="min()"
                [attr.aria-valuenow]="ariaValueStart()"
                [attr.aria-valuemax]="max()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-orientation]="orientation()"
                [attr.data-pc-section]="'startHandler'"
                [pAutoFocus]="autofocus()"
                [pBind]="ptm('startHandler')"
                [attr.data-p]="dataP()"
            ></span>
            <span
                #sliderHandleEnd
                [class]="cn(cx('handle'), handleIndex == 1 && 'p-slider-handle-active')"
                [style]="sx('endHandler')"
                (keydown)="onKeyDown($event, 1)"
                (mousedown)="onMouseDown($event, 1)"
                (touchstart)="onDragStart($event, 1)"
                (touchmove)="onDrag($event)"
                (touchend)="onDragEnd($event)"
                [attr.tabindex]="$tabindex()"
                role="slider"
                [attr.aria-valuemin]="min()"
                [attr.aria-valuenow]="ariaValueEnd()"
                [attr.aria-valuemax]="max()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-orientation]="orientation()"
                [attr.data-pc-section]="'endHandler'"
                [pBind]="ptm('endHandler')"
                [attr.data-p]="dataP()"
            ></span>
        }
    `,
    providers: [SLIDER_VALUE_ACCESSOR, SliderStyle, { provide: SLIDER_INSTANCE, useExisting: Slider }, { provide: PARENT_INSTANCE, useExisting: Slider }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.data-pc-name]': "'slider'",
        '[attr.data-pc-section]': "'root'",
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP()',
        '[attr.data-p-sliding]': 'false'
    },
    hostDirectives: [Bind]
})
export class Slider extends BaseEditableHolder<SliderPassThrough> {
    componentName = 'Slider';

    $pcSlider: Slider | undefined = inject(SLIDER_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    _componentStyle = inject(SliderStyle);

    /**
     * When enabled, displays an animation on click of the slider bar.
     * @group Props
     */
    animate = input(undefined, { transform: booleanAttribute });
    /**
     * Mininum boundary value.
     * @group Props
     */
    min = input(0, { transform: numberAttribute });
    /**
     * Maximum boundary value.
     * @group Props
     */
    max = input(100, { transform: numberAttribute });
    /**
     * Orientation of the slider.
     * @group Props
     */
    orientation = input<SliderOrientation>('horizontal');
    /**
     * Step factor to increment/decrement the value.
     * @group Props
     */
    step = input(undefined, { transform: numberAttribute });
    /**
     * When specified, allows two boundary values to be picked.
     * @group Props
     */
    range = input(undefined, { transform: booleanAttribute });
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus = input(false, { transform: booleanAttribute });
    /**
     * Callback to invoke on value change.
     * @param {SliderChangeEvent} event - Custom value change event.
     * @group Emits
     */
    onChange = output<SliderChangeEvent>();
    /**
     * Callback to invoke when slide ended.
     * @param {SliderSlideEndEvent} event - Custom slide end event.
     * @group Emits
     */
    onSlideEnd = output<SliderSlideEndEvent>();

    sliderHandle = viewChild<ElementRef>('sliderHandle');

    sliderHandleStart = viewChild<ElementRef>('sliderHandleStart');

    sliderHandleEnd = viewChild<ElementRef>('sliderHandleEnd');

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    value = signal<Nullable<number>>(null);

    values = signal<Nullable<number[]>>(null);

    handleValue = signal<Nullable<number>>(null);

    handleValues = signal<number[]>([]);

    diff = signal<Nullable<number>>(null);

    offset = signal<Nullable<number>>(null);

    dragging = signal<boolean>(false);

    public dragListener: VoidListener;

    public mouseupListener: VoidListener;

    public initX: Nullable<number>;

    public initY: Nullable<number>;

    public barWidth: Nullable<number>;

    public barHeight: Nullable<number>;

    public sliderHandleClick: Nullable<boolean>;

    public handleIndex: number = 0;

    public startHandleValue: any;

    public startx: Nullable<number>;

    public starty: Nullable<number>;

    @HostListener('click', ['$event'])
    onHostClick(event: MouseEvent) {
        this.onBarClick(event);
    }

    onMouseDown(event: Event, index?: number) {
        if (this.$disabled()) {
            return;
        }

        this.dragging.set(true);
        this.updateDomData();
        this.sliderHandleClick = true;
        if (this.range() && this.handleValues() && this.handleValues()[0] === this.max()) {
            this.handleIndex = 0;
        } else {
            (this.handleIndex as any) = index;
        }

        this.bindDragListeners();
        (event.target as HTMLInputElement).focus();
        event.preventDefault();

        if (this.animate()) {
            removeClass(this.el.nativeElement, 'p-slider-animate');
        }
    }

    onDragStart(event: TouchEvent, index?: number) {
        if (this.$disabled()) {
            return;
        }

        this.el.nativeElement.setAttribute('data-p-sliding', true);

        var touchobj = event.changedTouches[0];
        this.startHandleValue = this.range() ? this.handleValues()[index as number] : this.handleValue();
        this.dragging.set(true);
        if (this.range() && this.handleValues() && this.handleValues()[0] === this.max()) {
            this.handleIndex = 0;
        } else {
            this.handleIndex = index as number;
        }

        if (this.isHorizontal()) {
            this.startx = parseInt((touchobj as any).clientX, 10);
            this.barWidth = this.el.nativeElement.offsetWidth;
        } else {
            this.starty = parseInt((touchobj as any).clientY, 10);
            this.barHeight = this.el.nativeElement.offsetHeight;
        }

        if (this.animate()) {
            removeClass(this.el.nativeElement, 'p-slider-animate');
        }

        event.preventDefault();
    }

    onDrag(event: TouchEvent) {
        if (this.$disabled()) {
            return;
        }

        var touchobj = event.changedTouches[0],
            handleValue = 0;

        if (this.isHorizontal()) {
            handleValue = Math.floor(((parseInt((touchobj as any).clientX, 10) - (this.startx as number)) * 100) / (this.barWidth as number)) + this.startHandleValue;
        } else {
            handleValue = Math.floor((((this.starty as number) - parseInt((touchobj as any).clientY, 10)) * 100) / (this.barHeight as number)) + this.startHandleValue;
        }

        this.setValueFromHandle(event, handleValue);

        event.preventDefault();
    }

    onDragEnd(event: TouchEvent) {
        if (this.$disabled()) {
            return;
        }

        this.dragging.set(false);
        this.el.nativeElement.setAttribute('data-p-sliding', false);

        if (this.range()) this.onSlideEnd.emit({ originalEvent: event, values: this.values() as number[] });
        else this.onSlideEnd.emit({ originalEvent: event, value: this.value() as number });

        if (this.animate()) {
            addClass(this.el.nativeElement, 'p-slider-animate');
        }

        event.preventDefault();
    }

    onBarClick(event: Event) {
        if (this.$disabled()) {
            return;
        }

        if (!this.sliderHandleClick) {
            this.updateDomData();
            this.handleChange(event);

            if (this.range()) this.onSlideEnd.emit({ originalEvent: event, values: this.values() as number[] });
            else this.onSlideEnd.emit({ originalEvent: event, value: this.value() as number });
        }

        this.sliderHandleClick = false;
    }

    onKeyDown(event: any, index?) {
        this.handleIndex = index;

        switch (event.code) {
            case 'ArrowDown':
            case 'ArrowLeft':
                this.decrementValue(event, index);
                event.preventDefault();
                break;

            case 'ArrowUp':
            case 'ArrowRight':
                this.incrementValue(event, index);
                event.preventDefault();
                break;

            case 'PageDown':
                this.decrementValue(event, index, true);
                event.preventDefault();
                break;

            case 'PageUp':
                this.incrementValue(event, index, true);
                event.preventDefault();
                break;

            case 'Home':
                this.updateValue(this.min(), event);
                event.preventDefault();
                break;

            case 'End':
                this.updateValue(this.max(), event);
                event.preventDefault();
                break;

            default:
                break;
        }
    }

    decrementValue(event, index, pageKey = false) {
        let newValue;
        const step = this.step();

        if (this.range()) {
            if (step) newValue = (this.values()?.[index] ?? 0) - step;
            else newValue = (this.values()?.[index] ?? 0) - 1;
        } else {
            if (step) newValue = this.value()! - step;
            else if (!step && pageKey) newValue = this.value()! - 10;
            else newValue = this.value()! - 1;
        }

        this.updateValue(newValue, event);
        event.preventDefault();
    }

    incrementValue(event, index, pageKey = false) {
        let newValue;
        const step = this.step();

        if (this.range()) {
            if (step) newValue = (this.values()?.[index] ?? 0) + step;
            else newValue = (this.values()?.[index] ?? 0) + 1;
        } else {
            if (step) newValue = this.value()! + step;
            else if (!step && pageKey) newValue = this.value()! + 10;
            else newValue = this.value()! + 1;
        }

        this.updateValue(newValue, event);
        event.preventDefault();
    }

    handleChange(event: Event) {
        let handleValue = this.calculateHandleValue(event);
        this.setValueFromHandle(event, handleValue);
    }

    bindDragListeners() {
        if (isPlatformBrowser(this.platformId)) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

            if (!this.dragListener) {
                this.dragListener = this.renderer.listen(documentTarget, 'mousemove', (event) => {
                    if (this.dragging()) {
                        this.el.nativeElement.setAttribute('data-p-sliding', true);
                        this.handleChange(event);
                    }
                });
            }

            if (!this.mouseupListener) {
                this.mouseupListener = this.renderer.listen(documentTarget, 'mouseup', (event) => {
                    if (this.dragging()) {
                        this.dragging.set(false);
                        this.el.nativeElement.setAttribute('data-p-sliding', false);

                        if (this.range()) this.onSlideEnd.emit({ originalEvent: event, values: this.values() as number[] });
                        else this.onSlideEnd.emit({ originalEvent: event, value: this.value() as number });

                        if (this.animate()) {
                            addClass(this.el.nativeElement, 'p-slider-animate');
                        }
                    }
                });
            }
        }
    }

    unbindDragListeners() {
        if (this.dragListener) {
            this.dragListener();
            this.dragListener = null;
        }

        if (this.mouseupListener) {
            this.mouseupListener();
            this.mouseupListener = null;
        }
    }

    setValueFromHandle(event: Event, handleValue: any) {
        let newValue = this.getValueFromHandle(handleValue);

        if (this.range()) {
            if (this.step()) {
                this.handleStepChange(newValue, (this.values() as any)[this.handleIndex]);
            } else {
                this.handleValues.update((vals) => {
                    const newVals = [...vals];
                    newVals[this.handleIndex] = handleValue;
                    return newVals;
                });
                this.updateValue(newValue, event);
            }
        } else {
            if (this.step()) {
                this.handleStepChange(newValue, this.value() as any);
            } else {
                this.handleValue.set(handleValue);
                this.updateValue(newValue, event);
            }
        }
    }

    handleStepChange(newValue: number, oldValue: number) {
        let diff = newValue - oldValue;
        let val = oldValue;
        let _step = this.step() as number;

        if (diff < 0) {
            val = oldValue + Math.ceil(newValue / _step - oldValue / _step) * _step;
        } else if (diff > 0) {
            val = oldValue + Math.floor(newValue / _step - oldValue / _step) * _step;
        }

        this.updateValue(val);
        this.updateHandleValue();
    }

    isHorizontal = computed(() => this.orientation() === 'horizontal');

    isVertical = computed(() => this.orientation() === 'vertical');

    $tabindex = computed(() => (this.$disabled() ? null : this.tabindex()));

    ariaValueStart = computed(() => this.values()?.[0] ?? null);

    ariaValueEnd = computed(() => this.values()?.[1] ?? null);

    updateDomData() {
        let rect = this.el.nativeElement.getBoundingClientRect();
        this.initX = rect.left + getWindowScrollLeft();
        this.initY = rect.top + getWindowScrollTop();
        this.barWidth = this.el.nativeElement.offsetWidth;
        this.barHeight = this.el.nativeElement.offsetHeight;
    }

    calculateHandleValue(event: Event): number {
        if (this.isHorizontal()) {
            if (isRTL(this.el.nativeElement)) {
                return (((this.initX as number) + (this.barWidth as number) - (event as MouseEvent).pageX) * 100) / (this.barWidth as number);
            } else {
                return (((event as MouseEvent).pageX - (this.initX as number)) * 100) / (this.barWidth as number);
            }
        } else {
            return (((this.initY as number) + (this.barHeight as number) - (event as MouseEvent).pageY) * 100) / (this.barHeight as number);
        }
    }

    updateHandleValue() {
        const min = this.min();
        const max = this.max();

        if (this.range()) {
            const vals = this.values() as number[];
            this.handleValues.set([((vals[0] < min ? 0 : vals[0] - min) * 100) / (max - min), ((vals[1] > max ? 100 : vals[1] - min) * 100) / (max - min)]);
        } else {
            const val = this.value() as number;
            if (val < min) this.handleValue.set(0);
            else if (val > max) this.handleValue.set(100);
            else this.handleValue.set(((val - min) * 100) / (max - min));
        }

        if (this.step()) {
            this.updateDiffAndOffset();
        }
    }

    updateDiffAndOffset() {
        const vals = this.handleValues();
        this.diff.set(Math.abs(vals[0] - vals[1]));
        this.offset.set(Math.min(vals[0], vals[1]));
    }

    updateValue(val: number, event?: Event) {
        const min = this.min();
        const max = this.max();

        if (this.range()) {
            let value = val;
            const vals = this.values() as number[];

            if (this.handleIndex == 0) {
                if (value < min) {
                    value = min;
                    this.handleValues.update((v) => [0, v[1]]);
                } else if (value > vals[1]) {
                    if (value > max) {
                        value = max;
                        this.handleValues.update((v) => [100, v[1]]);
                    }
                }
                this.sliderHandleStart()?.nativeElement.focus();
            } else {
                if (value > max) {
                    value = max;
                    this.handleValues.update((v) => [v[0], 100]);
                    this.offset.set(100);
                } else if (value < min) {
                    value = min;
                    this.handleValues.update((v) => [v[0], 0]);
                } else if (value < vals[0]) {
                    this.offset.set(this.handleValues()[1]);
                }
                this.sliderHandleEnd()?.nativeElement.focus();
            }

            if (this.step()) {
                this.updateHandleValue();
            } else {
                this.updateDiffAndOffset();
            }

            this.values.update((v) => {
                const newVals = [...(v || [0, 0])];
                newVals[this.handleIndex] = this.getNormalizedValue(value);
                return newVals;
            });
            let newValues = [this.minVal(), this.maxVal()];
            this.onModelChange(newValues);
            this.onChange.emit({ event: event as Event, values: this.values() as number[] });
        } else {
            if (val < min) {
                val = min;
                this.handleValue.set(0);
            } else if (val > max) {
                val = max;
                this.handleValue.set(100);
            }

            this.value.set(this.getNormalizedValue(val));

            this.onModelChange(this.value());
            this.onChange.emit({ event: event as Event, value: this.value() as number });
            this.sliderHandle()?.nativeElement.focus();
        }
        this.updateHandleValue();
    }

    getValueFromHandle(handleValue: number): number {
        return (this.max() - this.min()) * (handleValue / 100) + this.min();
    }

    getDecimalsCount(value: number): number {
        if (value && Math.floor(value) !== value) return value.toString().split('.')[1].length || 0;
        return 0;
    }

    getNormalizedValue(val: number): number {
        let decimalsCount = this.getDecimalsCount(this.step() as number);
        if (decimalsCount > 0) {
            return +parseFloat(val.toString()).toFixed(decimalsCount);
        } else {
            return Math.floor(val);
        }
    }

    onDestroy() {
        this.unbindDragListeners();
    }

    minVal = computed(() => {
        const vals = this.values();
        return vals ? Math.min(vals[1], vals[0]) : 0;
    });

    maxVal = computed(() => {
        const vals = this.values();
        return vals ? Math.max(vals[1], vals[0]) : 0;
    });

    dataP = computed(() =>
        this.cn({
            [this.orientation() as string]: this.orientation()
        })
    );

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any) {
        if (this.range()) this.values.set(value || [0, 0]);
        else this.value.set(value || 0);

        this.updateHandleValue();
        this.updateDiffAndOffset();
    }
}

@NgModule({
    imports: [Slider, SharedModule],
    exports: [Slider, SharedModule]
})
export class SliderModule {}
