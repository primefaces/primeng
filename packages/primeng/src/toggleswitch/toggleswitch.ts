import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, inject, Input, NgModule, numberAttribute, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { ToggleSwitchStyle } from './style/toggleswitchstyle';
import { ToggleSwitchChangeEvent } from './toggleswitch.interface';

/**
 * Context interface for the handle template.
 * @property {boolean} checked - A flag indicating whether the input is checked.
 * @group Interface
 */
export interface ToggleSwitchHandleTemplateContext {
    checked: boolean;
}

export const TOGGLESWITCH_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitch),
    multi: true
};
/**
 * ToggleSwitch is used to select a boolean value.
 * @group Components
 */
@Component({
    selector: 'p-toggleswitch, p-toggleSwitch, p-toggle-switch',
    standalone: true,
    imports: [CommonModule, AutoFocus, SharedModule],
    template: `
        <div [ngClass]="cx('root')" [style]="sx('root')" [ngStyle]="style" [class]="styleClass" (click)="onClick($event)" [attr.data-pc-name]="'toggleswitch'" [attr.data-pc-section]="'root'">
            <input
                #input
                [attr.id]="inputId"
                type="checkbox"
                role="switch"
                [ngClass]="cx('input')"
                [checked]="checked()"
                [disabled]="disabled"
                [attr.aria-checked]="checked()"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-label]="ariaLabel"
                [attr.name]="name"
                [attr.tabindex]="tabindex"
                (focus)="onFocus()"
                (blur)="onBlur()"
                [attr.data-pc-section]="'hiddenInput'"
                [pAutoFocus]="autofocus"
            />
            <span [ngClass]="cx('slider')" [attr.data-pc-section]="'slider'">
                <div [ngClass]="cx('handle')">
                    @if (handleTemplate) {
                        <ng-container *ngTemplateOutlet="handleTemplate; context: { checked: checked() }" />
                    }
                </div>
            </span>
        </div>
    `,
    providers: [TOGGLESWITCH_VALUE_ACCESSOR, ToggleSwitchStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ToggleSwitch extends BaseComponent implements AfterContentInit {
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;
    /**
     * Identifier of the input element.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Name of the input element.
     * @group Props
     */
    @Input() name: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean | undefined;
    /**
     * Value in checked state.
     * @group Props
     */
    @Input() trueValue: any = true;
    /**
     * Value in unchecked state.
     * @group Props
     */
    @Input() falseValue: any = false;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autofocus: boolean | undefined;
    /**
     * Callback to invoke when the on value change.
     * @param {ToggleSwitchChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<ToggleSwitchChangeEvent> = new EventEmitter<ToggleSwitchChangeEvent>();

    @ViewChild('input') input!: ElementRef;
    /**
     * Callback to invoke when the on value change.
     * @type {TemplateRef<ToggleSwitchHandleTemplateContext>} context - Context of the template
     * @example
     * ```html
     * <ng-template #handle let-checked="checked"> </ng-template>
     * ```
     * @see {@link ToggleSwitchHandleTemplateContext}
     * @group Templates
     */
    @ContentChild('handle') handleTemplate: TemplateRef<any> | undefined;

    modelValue: any = false;

    focused: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    _componentStyle = inject(ToggleSwitchStyle);

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'handle':
                    this.handleTemplate = item.template;
                    break;
            }
        });
    }

    onClick(event: Event) {
        if (!this.disabled && !this.readonly) {
            this.modelValue = this.checked() ? this.falseValue : this.trueValue;

            this.onModelChange(this.modelValue);
            this.onChange.emit({
                originalEvent: event,
                checked: this.modelValue
            });

            this.input.nativeElement.focus();
        }
    }

    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
        this.onModelTouched();
    }

    writeValue(value: any): void {
        this.modelValue = value;
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

    checked() {
        return this.modelValue === this.trueValue;
    }
}

@NgModule({
    imports: [ToggleSwitch, SharedModule],
    exports: [ToggleSwitch, SharedModule]
})
export class ToggleSwitchModule {}
