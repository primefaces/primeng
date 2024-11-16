import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, forwardRef, HostBinding, inject, Input, NgModule, numberAttribute, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { Ripple } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { ToggleButtonStyle } from './style/togglebuttonstyle';
import { ToggleButtonChangeEvent } from './togglebutton.interface';

export const TOGGLEBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true
};
/**
 * ToggleButton is used to select a boolean value using a button.
 * @group Components
 */
@Component({
    selector: 'p-toggleButton, p-togglebutton, p-toggle-button',
    standalone: true,
    imports: [Ripple, AutoFocus, CommonModule, SharedModule],
    template: `
        <button
            pRipple
            type="button"
            [ngClass]="cx('root')"
            [class]="styleClass"
            [tabindex]="tabindex"
            [disabled]="disabled"
            (click)="toggle($event)"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-pressed]="checked"
            [attr.data-p-checked]="active"
            [attr.data-p-disabled]="disabled"
        >
            <span [ngClass]="cx('content')">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: checked }"></ng-container>
                @if (!contentTemplate) {
                    @if (!iconTemplate) {
                        @if (onIcon || offIcon) {
                            <span
                                [class]="checked ? this.onIcon : this.offIcon"
                                [ngClass]="{
                                    'p-togglebutton-icon': true,
                                    'p-togglebutton-icon-left': iconPos === 'left',
                                    'p-togglebutton-icon-right': iconPos === 'right'
                                }"
                                [attr.data-pc-section]="'icon'"
                            ></span>
                        }
                    } @else {
                        <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: checked }"></ng-container>
                    }
                    @if (onLabel || offLabel) {
                        <span [ngClass]="cx('label')" [attr.data-pc-section]="'label'">{{ checked ? (hasOnLabel ? onLabel : '') : hasOffLabel ? offLabel : '' }}</span>
                    }
                }
            </span>
        </button>
    `,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButtonStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButton extends BaseComponent implements ControlValueAccessor {
    /**
     * Label for the on state.
     * @group Props
     */
    @Input() onLabel: string = 'Yes';
    /**
     * Label for the off state.
     * @group Props
     */
    @Input() offLabel: string = 'No';
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
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
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
    @HostBinding('class') get hostClass() {
        return this.styleClass || '';
    }
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined = 0;
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input() size: 'large' | 'small';
    /**
     * Position of the icon.
     * @group Props
     */
    @Input() iconPos: 'left' | 'right' = 'left';
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Whether selection can not be cleared.
     * @group Props
     */
    @Input() allowEmpty: boolean | undefined;
    /**
     * Callback to invoke on value change.
     * @param {ToggleButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<ToggleButtonChangeEvent> = new EventEmitter<ToggleButtonChangeEvent>();
    /**
     * Custom icon template.
     * @group Templates
     */
    @ContentChild('icon') iconTemplate: Nullable<TemplateRef<any>>;
    /**
     * Custom content template.
     * @group Templates
     */
    @ContentChild('content') contentTemplate: Nullable<TemplateRef<any>>;

    checked: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    _componentStyle = inject(ToggleButtonStyle);

    toggle(event: Event) {
        if (!this.disabled && !(this.allowEmpty === false && this.checked)) {
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

    onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'Enter':
                this.toggle(event);
                event.preventDefault();
                break;
            case 'Space':
                this.toggle(event);
                event.preventDefault();
                break;
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

    get active() {
        return this.checked === true;
    }
}

@NgModule({
    imports: [ToggleButton, SharedModule],
    exports: [ToggleButton, SharedModule]
})
export class ToggleButtonModule {}
