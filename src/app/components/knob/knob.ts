import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, forwardRef, ChangeDetectorRef, ElementRef, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const KNOB_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Knob),
    multi: true
};

@Component({
    selector: 'p-knob',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
        <svg viewBox="0 0 100 100" [style.width]="size + 'px'" [style.height]="size + 'px'" (click)="onClick($event)" (mousedown)="onMouseDown($event)" (mouseup)="onMouseUp($event)"
            (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)">
            <path [attr.d]="rangePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="rangeColor" class="p-knob-range"></path>
            <path [attr.d]="valuePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="valueColor" class="p-knob-value"></path>
            <text *ngIf="showValue" [attr.x]="50" [attr.y]="57" text-anchor="middle" [attr.fill]="textColor" class="p-knob-text" [attr.name]="name">{{valueToDisplay()}}</text>
        </svg>
        </div>
    `,
    providers: [KNOB_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./knob.css'],
    host: {
        'class': 'p-element'
    }
})
export class Knob {

    @Input() styleClass: string;

    @Input() style: any;

    @Input() severity: string;

    @Input() valueColor: string = "var(--primary-color, Black)";

    @Input() rangeColor: string = "var(--surface-d, LightGray)";

    @Input() textColor: string = "var(--text-color-secondary, Black)";

    @Input() valueTemplate: string = "{value}";

    @Input() name: string;

    @Input() size: number = 100;

    @Input() step: number = 1;

    @Input() min: number = 0;

    @Input() max: number = 100;

    @Input() strokeWidth: number = 14;

    @Input() disabled: boolean;

    @Input() showValue: boolean = true;

    @Input() readonly: boolean = false;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    radius: number = 40;

    midX: number = 50;

    midY: number = 50;

    minRadians: number = 4 * Math.PI / 3;

    maxRadians: number = -Math.PI / 3;

    value: number = null;

    windowMouseMoveListener: any;

    windowMouseUpListener: any;

    windowTouchMoveListener: any;

    windowTouchEndListener: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(private cd: ChangeDetectorRef, private el: ElementRef) { }

    mapRange(x, inMin, inMax, outMin, outMax) {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    onClick(event) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
        }
    }

    updateValue(offsetX, offsetY) {
        let dx = offsetX - this.size / 2;
        let dy =  this.size / 2 - offsetY;
        let angle = Math.atan2(dy, dx);
        let start = -Math.PI / 2 - Math.PI / 6;
        this.updateModel(angle, start);
    }

    updateModel(angle, start) {
        let mappedValue;
        if (angle > this.maxRadians)
            mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min, this.max);
        else if (angle < start)
            mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.min, this.max);
        else
            return;

        let newValue = Math.round((mappedValue - this.min) / this.step) * this.step + this.min;
        this.value = newValue;
        this.onModelChange(this.value);
        this.onChange.emit(this.value);
    }

    onMouseDown(event) {
        if (!this.disabled && !this.readonly) {
            this.windowMouseMoveListener = this.onMouseMove.bind(this)
            this.windowMouseUpListener = this.onMouseUp.bind(this)
            window.addEventListener('mousemove', this.windowMouseMoveListener);
            window.addEventListener('mouseup', this.windowMouseUpListener);
            event.preventDefault();
        }
    }

    onMouseUp(event) {
        if (!this.disabled && !this.readonly) {
            window.removeEventListener('mousemove', this.windowMouseMoveListener);
            window.removeEventListener('mouseup', this.windowMouseUpListener);
            this.windowMouseUpListener = null;
            this.windowMouseMoveListener = null;
            event.preventDefault();
        }
    }

    onTouchStart(event) {
        if (!this.disabled && !this.readonly) {
            this.windowTouchMoveListener = this.onTouchMove.bind(this);
            this.windowTouchEndListener = this.onTouchEnd.bind(this);
            window.addEventListener('touchmove', this.windowTouchMoveListener);
            window.addEventListener('touchend', this.windowTouchEndListener);
            event.preventDefault();
        }
    }

    onTouchEnd(event) {
        if (!this.disabled && !this.readonly) {
            window.removeEventListener('touchmove', this.windowTouchMoveListener);
            window.removeEventListener('touchend', this.windowTouchEndListener);
            this.windowTouchMoveListener = null;
            this.windowTouchEndListener = null;
            event.preventDefault();
        }
    }

    onMouseMove(event) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
            event.preventDefault();
        }
    }

    onTouchMove(event) {
        if (!this.disabled && !this.readonly && event.touches.length == 1) {
            const rect = this.el.nativeElement.children[0].getBoundingClientRect();
            const touch = event.targetTouches.item(0);
            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;
            this.updateValue(offsetX, offsetY);
        }
    }

    writeValue(value: any) : void {
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
        if (this.min > 0 && this.max > 0)
            return this.mapRange(this.min, this.min, this.max, this.minRadians, this.maxRadians);
        else
            return this.mapRange(0, this.min, this.max, this.minRadians, this.maxRadians);
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
        return this.valueTemplate.replace("{value}", this._value.toString());
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
export class KnobModule { }
