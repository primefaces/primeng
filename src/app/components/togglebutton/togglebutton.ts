import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, NgModule, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonChangeEvent } from './togglebutton.interface';

type ToggleButtonIconPosition = 'left' | 'right';

export const TOGGLEBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true
};

@Component({
    selector: 'p-toggleButton',
    template: `
        <div
            [ngClass]="{ 'p-button p-togglebutton p-component': true, 'p-button-icon-only': onIcon && offIcon && !hasOnLabel && !hasOffLabel, 'p-highlight': checked, 'p-disabled': disabled }"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="toggle($event)"
            (keydown.enter)="toggle($event)"
            [attr.tabindex]="disabled ? null : '0'"
            role="checkbox"
            [attr.aria-checked]="checked"
            pRipple
        >
            <span *ngIf="onIcon || offIcon" [class]="checked ? this.onIcon : this.offIcon" [ngClass]="{ 'p-button-icon': true, 'p-button-icon-left': iconPos === 'left', 'p-button-icon-right': iconPos === 'right' }"></span>
            <span class="p-button-label" *ngIf="onLabel || offLabel">{{ checked ? (hasOnLabel ? onLabel : '') : hasOffLabel ? offLabel : '' }}</span>
        </div>
    `,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../button/button.css'],
    host: {
        class: 'p-element'
    }
})
export class ToggleButton implements ControlValueAccessor {
    /**
     * Label for the on state.
     * @group Props
     */
    @Input() onLabel: string | undefined;
    /**
     * Label for the off state.
     * @group Props
     */
    @Input() offLabel: string | undefined;
    /**
     * Icon for the on state.
     * @group Props
     */
    @Input() onIcon: string | undefined;
    /**
     * Icon for the off state.
     * @group Props
     */
    @Input() offIcon: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input() disabled: boolean | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: any;
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: number | undefined;
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPos: 'left' | 'right' = 'left';
    /**
     * Callback to invoke on value change.
     * @param {ToggleButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<ToggleButtonChangeEvent> = new EventEmitter<ToggleButtonChangeEvent>();

    checked: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(public cd: ChangeDetectorRef) {}

    toggle(event: Event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });

            this.cd.markForCheck();
        }
    }

    onBlur() {
        this.onModelTouched();
    }

    writeValue(value: any): void {
        this.checked = value;
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

    get hasOnLabel(): boolean {
        return (this.onLabel && this.onLabel.length > 0) as boolean;
    }

    get hasOffLabel(): boolean {
        return (this.onLabel && this.onLabel.length > 0) as boolean;
    }
}

@NgModule({
    imports: [CommonModule, RippleModule],
    exports: [ToggleButton],
    declarations: [ToggleButton]
})
export class ToggleButtonModule {}
