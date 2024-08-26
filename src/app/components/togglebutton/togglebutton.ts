import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    inject,
    Input,
    NgModule,
    numberAttribute,
    Output,
    QueryList,
    TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonChangeEvent } from './togglebutton.interface';
import { Nullable } from 'primeng/ts-helpers';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { BaseComponent } from 'primeng/basecomponent';
import { ToggleButtonStyle } from './style/togglebuttonstyle';

type ToggleButtonIconPosition = 'left' | 'right';

export const TOGGLEBUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleButton),
    multi: true,
};
/**
 * ToggleButton is used to select a boolean value using a button.
 * @group Components
 */
@Component({
    selector: 'p-toggleButton',
    template: `
        <button
            [ngClass]="{
                'p-togglebutton p-component': true,
                'p-togglebutton-checked': checked,
                'p-disabled': disabled
            }"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="toggle($event)"
            (keydown)="onKeyDown($event)"
            [attr.tabindex]="disabled ? null : tabindex"
            role="switch"
            [attr.aria-checked]="checked"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-label]="ariaLabel"
            pRipple
            [attr.data-pc-name]="'togglebutton'"
            [attr.data-pc-section]="'root'"
            pAutoFocus
            [autofocus]="autofocus"
        >
            <span class="p-togglebutton-content">
                @if (!contentTemplate) { @if(iconTemplate) {
                <ng-container *ngTemplateOutlet="iconTemplate; context: { $implicit: checked }"></ng-container>
                }
                <span
                    *ngIf="onIcon || (offIcon && !iconTemplate)"
                    [class]="checked ? this.onIcon : this.offIcon"
                    [ngClass]="{
                        'p-togglebutton-icon': true,
                        'p-togglebutton-icon-left': iconPos === 'left',
                        'p-togglebutton-icon-right': iconPos === 'right'
                    }"
                    [attr.data-pc-section]="'icon'"
                ></span>
                <span class="p-togglebutton-label" *ngIf="onLabel || offLabel" [attr.data-pc-section]="'label'">{{
                    checked ? (hasOnLabel ? onLabel : '') : hasOffLabel ? offLabel : ''
                }}</span>
                } @if(contentTemplate) {
                <ng-container
                    *ngTemplateOutlet="
                        contentTemplate;
                        context: {
                            $implicit: checked,
                            label: checked ? (hasOnLabel ? onLabel : '') : hasOffLabel ? offLabel : ''
                        }
                    "
                ></ng-container>
                }
            </span>
        </button>
    `,
    providers: [TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButtonStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-element',
    },
})
export class ToggleButton extends BaseComponent implements ControlValueAccessor {
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
     * Callback to invoke on value change.
     * @param {ToggleButtonChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onChange: EventEmitter<ToggleButtonChangeEvent> = new EventEmitter<ToggleButtonChangeEvent>();

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    iconTemplate: Nullable<TemplateRef<any>>;

    contentTemplate: Nullable<TemplateRef<any>>;

    checked: boolean = false;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    _componentStyle = inject(ToggleButtonStyle);

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                default:
                    this.iconTemplate = item.template;
                    break;
            }
        });
    }

    toggle(event: Event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked,
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
}

@NgModule({
    imports: [CommonModule, RippleModule, SharedModule, AutoFocusModule],
    exports: [ToggleButton, SharedModule],
    declarations: [ToggleButton],
})
export class ToggleButtonModule {}
