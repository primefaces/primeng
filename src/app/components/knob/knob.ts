import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, forwardRef, ChangeDetectorRef, ElementRef, Output, EventEmitter, Renderer2, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { VoidListener } from 'primeng/ts-helpers';

export const KNOB_VALUE_ACCESSOR: any = {
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
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <svg
                viewBox="0 0 100 100"
                [style.width]="size + 'px'"
                [style.height]="size + 'px'"
                (click)="onClick($event)"
                (mousedown)="onMouseDown($event)"
                (mouseup)="onMouseUp($event)"
                (touchstart)="onTouchStart($event)"
                (touchend)="onTouchEnd($event)"
            >
                <path [attr.d]="rangePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="rangeColor" class="p-knob-range"></path>
                <path [attr.d]="valuePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="valueColor" class="p-knob-value"></path>
                <text *ngIf="showValue" [attr.x]="50" [attr.y]="57" text-anchor="middle" [attr.fill]="textColor" class="p-knob-text" [attr.name]="name">{{ valueToDisplay() }}</text>
            </svg>
        </div>
    `,
    providers: [KNOB_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./knob.css'],
    host: {
        class: 'p-element'
    }
})
export class Knob {
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Background of the value.
     * @group Props
     */
    @Input() valueColor: string = 'var(--primary-color, Black)';
    /**
     * Background color of the range.
     * @group Props
     */
    @Input() rangeColor: string = 'var(--surface-border, LightGray)';
    /**
     * Color of the value text.
     * @group Props
     */
    @Input() textColor: string = 'var(--text-color-secondary, Black)';
    /**
     * Template string of the value.
     * @group Props
     */
    @Input() valueTemplate: string = '{value}';
    /**
     * Name of the input element.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * Size of the component in pixels.
     * @group Props
     */
    @Input() size: number = 100;
    /**
     * Step factor to increment/decrement the value.
     * @group Props
     */
    @Input() step: number = 1;
    /**
     * Mininum boundary value.
     * @group Props
     */
    @Input() min: number = 0;
    /**
     * Maximum boundary value.
     * @group Props
     */
    @Input() max: number = 100;
    /**
     * Width of the knob stroke.
     * @group Props
     */
    @Input() strokeWidth: number = 14;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input() disabled: boolean | undefined;
    /**
     * Whether the show the value inside the knob.
     * @group Props
     */
    @Input() showValue: boolean = true;
    /**
     * When present, it specifies that the component value cannot be edited.
     * @group Props
     */
    @Input() readonly: boolean = false;
    /**
     * Callback to invoke on value change.
     * @param {number} value - New value.
     * @group Emits
     */
    @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

    radius: number = 40;

    midX: number = 50;

    midY: number = 50;

    minRadians: number = (4 * Math.PI) / 3;

    maxRadians: number = -Math.PI / 3;

    value: number = 0;

    windowMouseMoveListener: VoidListener;

    windowMouseUpListener: VoidListener;

    windowTouchMoveListener: VoidListener;

    windowTouchEndListener: VoidListener;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private cd: ChangeDetectorRef, private el: ElementRef) {}

    mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number) {
        return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    onClick(event: MouseEvent) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
        }
    }

    updateValue(offsetX: number, offsetY: number) {
        let dx = offsetX - this.size / 2;
        let dy = this.size / 2 - offsetY;
        let angle = Math.atan2(dy, dx);
        let start = -Math.PI / 2 - Math.PI / 6;
        this.updateModel(angle, start);
    }

    updateModel(angle: number, start: number) {
        let mappedValue;
        if (angle > this.maxRadians) mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min, this.max);
        else if (angle < start) mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.min, this.max);
        else return;

        let newValue = Math.round((mappedValue - this.min) / this.step) * this.step + this.min;
        this.value = newValue;
        this.onModelChange(this.value);
        this.onChange.emit(this.value);
    }

    onMouseDown(event: MouseEvent) {
        if (!this.disabled && !this.readonly) {
            const window = this.document.defaultView || 'window';
            this.windowMouseMoveListener = this.renderer.listen(window, 'mousemove', this.onMouseMove.bind(this));
            this.windowMouseUpListener = this.renderer.listen(window, 'mouseup', this.onMouseUp.bind(this));
            event.preventDefault();
        }
    }

    onMouseUp(event: MouseEvent) {
        if (!this.disabled && !this.readonly) {
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
        if (!this.disabled && !this.readonly) {
            const window = this.document.defaultView || 'window';
            this.windowTouchMoveListener = this.renderer.listen(window, 'touchmove', this.onTouchMove.bind(this));
            this.windowTouchEndListener = this.renderer.listen(window, 'touchend', this.onTouchEnd.bind(this));
            event.preventDefault();
        }
    }

    onTouchEnd(event: TouchEvent) {
        if (!this.disabled && !this.readonly) {
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
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
            event.preventDefault();
        }
    }

    onTouchMove(event: Event) {
        if (!this.disabled && !this.readonly && event instanceof TouchEvent && event.touches.length === 1) {
            const rect = this.el.nativeElement.children[0].getBoundingClientRect();
            const touch = event.targetTouches.item(0);
            if (touch) {
                const offsetX = touch.clientX - rect.left;
                const offsetY = touch.clientY - rect.top;
                this.updateValue(offsetX, offsetY);
            }
        }
    }

    writeValue(value: any): void {
        this.value = value;
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }

    containerClass() {
        return {
            'p-knob p-component': true,
            'p-disabled': this.disabled
        };
    }

    rangePath() {
        return `M ${this.minX()} ${this.minY()} A ${this.radius} ${this.radius} 0 1 1 ${this.maxX()} ${this.maxY()}`;
    }

    valuePath() {
        return `M ${this.zeroX()} ${this.zeroY()} A ${this.radius} ${this.radius} 0 ${this.largeArc()} ${this.sweep()} ${this.valueX()} ${this.valueY()}`;
    }

    zeroRadians() {
        if (this.min > 0 && this.max > 0) return this.mapRange(this.min, this.min, this.max, this.minRadians, this.maxRadians);
        else return this.mapRange(0, this.min, this.max, this.minRadians, this.maxRadians);
    }

    valueRadians() {
        return this.mapRange(this._value, this.min, this.max, this.minRadians, this.maxRadians);
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
        return this.valueTemplate.replace('{value}', this._value.toString());
    }

    get _value(): number {
        return this.value != null ? this.value : this.min;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Knob],
    declarations: [Knob]
})
export class KnobModule {}
