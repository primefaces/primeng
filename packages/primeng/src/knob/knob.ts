import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, inject, InjectionToken, input, NgModule, numberAttribute, output, Provider, signal, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { $dt } from '@primeuix/styled';
import { SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { BaseEditableHolder } from 'primeng/baseeditableholder';
import { Bind, BindModule } from 'primeng/bind';
import { VoidListener } from 'primeng/ts-helpers';
import { KnobPassThrough } from 'primeng/types/knob';
import { KnobStyle } from './style/knobstyle';

const KNOB_INSTANCE = new InjectionToken<Knob>('KNOB_INSTANCE');

export const KNOB_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Knob),
    multi: true
};
/**
 * Knob is a form component to define number inputs with a dial.
 * @group Components
 */
@Component({
    selector: 'p-knob',
    standalone: true,
    imports: [SharedModule, BindModule],
    template: `
        <svg
            viewBox="0 0 100 100"
            role="slider"
            [style.width]="svgSize()"
            [style.height]="svgSize()"
            (click)="onClick($event)"
            (keydown)="onKeyDown($event)"
            (mousedown)="onMouseDown($event)"
            (mouseup)="onMouseUp($event)"
            (touchstart)="onTouchStart($event)"
            (touchend)="onTouchEnd($event)"
            [attr.aria-valuemin]="min()"
            [attr.aria-valuemax]="max()"
            [attr.required]="attrRequired()"
            [attr.aria-valuenow]="_value()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-label]="ariaLabel()"
            [attr.tabindex]="attrTabindex()"
            [pBind]="ptm('svg')"
        >
            <path [attr.d]="rangePath()" [attr.stroke-width]="strokeWidth()" [attr.stroke]="rangeColor()" [class]="cx('range')" [pBind]="ptm('range')"></path>
            <path [attr.d]="valuePath()" [attr.stroke-width]="strokeWidth()" [attr.stroke]="valueColor()" [class]="cx('value')" [pBind]="ptm('value')"></path>
            @if (showValue()) {
                <text [attr.x]="50" [attr.y]="57" text-anchor="middle" [attr.fill]="textColor()" [class]="cx('text')" [attr.name]="name()" [pBind]="ptm('text')">
                    {{ valueToDisplay() }}
                </text>
            }
        </svg>
    `,
    providers: [KNOB_VALUE_ACCESSOR, KnobStyle, { provide: KNOB_INSTANCE, useExisting: Knob }, { provide: PARENT_INSTANCE, useExisting: Knob }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class Knob extends BaseEditableHolder<KnobPassThrough> {
    componentName = 'Knob';

    $pcKnob: Knob | undefined = inject(KNOB_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * Background of the value.
     * @group Props
     */
    valueColor = input($dt('knob.value.background').variable);
    /**
     * Background color of the range.
     * @group Props
     */
    rangeColor = input($dt('knob.range.background').variable);
    /**
     * Color of the value text.
     * @group Props
     */
    textColor = input($dt('knob.text.color').variable);
    /**
     * Template string of the value.
     * @group Props
     */
    valueTemplate = input('{value}');
    /**
     * Size of the component in pixels.
     * @group Props
     */
    size = input(100, { transform: numberAttribute });
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
     * Step factor to increment/decrement the value.
     * @group Props
     */
    step = input(1, { transform: numberAttribute });
    /**
     * Width of the knob stroke.
     * @group Props
     */
    strokeWidth = input(14, { transform: numberAttribute });
    /**
     * Whether the show the value inside the knob.
     * @group Props
     */
    showValue = input(true, { transform: booleanAttribute });
    /**
     * When present, it specifies that the component value cannot be edited.
     * @group Props
     */
    readonly = input(false, { transform: booleanAttribute });
    /**
     * Callback to invoke on value change.
     * @param {number} value - New value.
     * @group Emits
     */
    onChange = output<number>();

    radius: number = 40;

    midX: number = 50;

    midY: number = 50;

    minRadians: number = (4 * Math.PI) / 3;

    maxRadians: number = -Math.PI / 3;

    value = signal<number>(0);

    windowMouseMoveListener: VoidListener;

    windowMouseUpListener: VoidListener;

    windowTouchMoveListener: VoidListener;

    windowTouchEndListener: VoidListener;

    _componentStyle = inject(KnobStyle);

    attrTabindex = computed(() => (this.readonly() || this.$disabled() ? -1 : this.tabindex()));

    attrRequired = computed(() => (this.required() ? '' : undefined));

    svgSize = computed(() => this.size() + 'px');

    _value = computed(() => (this.value() != null ? this.value() : this.min()));

    mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number) {
        return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    onClick(event: MouseEvent) {
        if (!this.$disabled() && !this.readonly()) {
            this.updateValue(event.offsetX, event.offsetY);
        }
    }

    updateValue(offsetX: number, offsetY: number) {
        let dx = offsetX - this.size() / 2;
        let dy = this.size() / 2 - offsetY;
        let angle = Math.atan2(dy, dx);
        let start = -Math.PI / 2 - Math.PI / 6;
        this.updateModel(angle, start);
    }

    updateModel(angle: number, start: number) {
        let mappedValue;
        if (angle > this.maxRadians) mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min(), this.max());
        else if (angle < start) mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.min(), this.max());
        else return;

        let newValue = Math.round((mappedValue - this.min()) / this.step()) * this.step() + this.min();

        this.value.set(newValue);
        this.writeModelValue(this.value());
        this.onModelChange(this.value());
        this.onChange.emit(this.value());
    }

    onMouseDown(event: MouseEvent) {
        if (!this.$disabled() && !this.readonly()) {
            const window = this.document.defaultView || 'window';
            this.windowMouseMoveListener = this.renderer.listen(window, 'mousemove', this.onMouseMove.bind(this));
            this.windowMouseUpListener = this.renderer.listen(window, 'mouseup', this.onMouseUp.bind(this));
            event.preventDefault();
        }
    }

    onMouseUp(event: MouseEvent) {
        if (!this.$disabled() && !this.readonly()) {
            if (this.windowMouseMoveListener) {
                this.windowMouseMoveListener();
                this.windowMouseUpListener = null;
            }

            if (this.windowMouseUpListener) {
                this.windowMouseUpListener();
                this.windowMouseMoveListener = null;
            }
            event.preventDefault();
        }
    }

    onTouchStart(event: TouchEvent) {
        if (!this.$disabled() && !this.readonly()) {
            const window = this.document.defaultView || 'window';
            this.windowTouchMoveListener = this.renderer.listen(window, 'touchmove', this.onTouchMove.bind(this));
            this.windowTouchEndListener = this.renderer.listen(window, 'touchend', this.onTouchEnd.bind(this));
            event.preventDefault();
        }
    }

    onTouchEnd(event: TouchEvent) {
        if (!this.$disabled() && !this.readonly()) {
            if (this.windowTouchMoveListener) {
                this.windowTouchMoveListener();
            }
            if (this.windowTouchEndListener) {
                this.windowTouchEndListener();
            }
            this.windowTouchMoveListener = null;
            this.windowTouchEndListener = null;
            event.preventDefault();
        }
    }

    onMouseMove(event: MouseEvent) {
        if (!this.$disabled() && !this.readonly()) {
            this.updateValue(event.offsetX, event.offsetY);
            event.preventDefault();
        }
    }

    onTouchMove(event: Event) {
        if (!this.$disabled() && !this.readonly() && event instanceof TouchEvent && event.touches.length === 1) {
            const rect = this.el.nativeElement.children[0].getBoundingClientRect();
            const touch = event.targetTouches.item(0);
            if (touch) {
                const offsetX = touch.clientX - rect.left;
                const offsetY = touch.clientY - rect.top;
                this.updateValue(offsetX, offsetY);
            }
        }
    }

    updateModelValue(newValue: number) {
        if (newValue > this.max()) this.value.set(this.max());
        else if (newValue < this.min()) this.value.set(this.min());
        else this.value.set(newValue);

        this.writeModelValue(this.value());
        this.onModelChange(this.value());
        this.onChange.emit(this.value());
    }

    onKeyDown(event: KeyboardEvent) {
        if (!this.$disabled() && !this.readonly()) {
            switch (event.code) {
                case 'ArrowRight':

                case 'ArrowUp': {
                    event.preventDefault();
                    this.updateModelValue(this._value() + 1);
                    break;
                }

                case 'ArrowLeft':

                case 'ArrowDown': {
                    event.preventDefault();
                    this.updateModelValue(this._value() - 1);
                    break;
                }

                case 'Home': {
                    event.preventDefault();
                    this.updateModelValue(this.min());

                    break;
                }

                case 'End': {
                    event.preventDefault();
                    this.updateModelValue(this.max());
                    break;
                }

                case 'PageUp': {
                    event.preventDefault();
                    this.updateModelValue(this._value() + 10);
                    break;
                }

                case 'PageDown': {
                    event.preventDefault();
                    this.updateModelValue(this._value() - 10);
                    break;
                }
            }
        }
    }

    rangePath() {
        return `M ${this.minX()} ${this.minY()} A ${this.radius} ${this.radius} 0 1 1 ${this.maxX()} ${this.maxY()}`;
    }

    valuePath() {
        return `M ${this.zeroX()} ${this.zeroY()} A ${this.radius} ${this.radius} 0 ${this.largeArc()} ${this.sweep()} ${this.valueX()} ${this.valueY()}`;
    }

    zeroRadians() {
        if (this.min() > 0 && this.max() > 0) return this.mapRange(this.min(), this.min(), this.max(), this.minRadians, this.maxRadians);
        else return this.mapRange(0, this.min(), this.max(), this.minRadians, this.maxRadians);
    }

    valueRadians() {
        return this.mapRange(this._value(), this.min(), this.max(), this.minRadians, this.maxRadians);
    }

    minX() {
        return this.midX + Math.cos(this.minRadians) * this.radius;
    }

    minY() {
        return this.midY - Math.sin(this.minRadians) * this.radius;
    }

    maxX() {
        return this.midX + Math.cos(this.maxRadians) * this.radius;
    }

    maxY() {
        return this.midY - Math.sin(this.maxRadians) * this.radius;
    }

    zeroX() {
        return this.midX + Math.cos(this.zeroRadians()) * this.radius;
    }

    zeroY() {
        return this.midY - Math.sin(this.zeroRadians()) * this.radius;
    }

    valueX() {
        return this.midX + Math.cos(this.valueRadians()) * this.radius;
    }

    valueY() {
        return this.midY - Math.sin(this.valueRadians()) * this.radius;
    }

    largeArc() {
        return Math.abs(this.zeroRadians() - this.valueRadians()) < Math.PI ? 0 : 1;
    }

    sweep() {
        return this.valueRadians() > this.zeroRadians() ? 0 : 1;
    }

    valueToDisplay() {
        return this.valueTemplate().replace('{value}', this._value().toString());
    }

    /**
     * @override
     *
     * @see {@link BaseEditableHolder.writeControlValue}
     * Writes the value to the control.
     */
    writeControlValue(value: any, setModelValue: (value: any) => void) {
        this.value.set(value);
        setModelValue(this.value());
    }
}

@NgModule({
    imports: [Knob, SharedModule],
    exports: [Knob, SharedModule]
})
export class KnobModule {}
