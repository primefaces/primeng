import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { TimesIcon } from 'primeng/icons/times';
import { Nullable } from 'primeng/ts-helpers';
import { ChipsAddEvent, ChipsRemoveEvent, ChipsClickEvent } from './chips.interface';

export const CHIPS_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Chips),
    multi: true
};
/**
 * Chips groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-chips',
    template: `
        <div [ngClass]="'p-chips p-component'" [ngStyle]="style" [class]="styleClass" (click)="onClick()">
            <ul [ngClass]="{ 'p-inputtext p-chips-multiple-container': true, 'p-focus': focus, 'p-disabled': disabled }">
                <li #token *ngFor="let item of value; let i = index" class="p-chips-token" (click)="onItemClick($event, item)">
                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                    <span *ngIf="!itemTemplate" class="p-chips-token-label">{{ field ? resolveFieldData(item, field) : item }}</span>
                    <ng-container *ngIf="!disabled">
                        <TimesCircleIcon [styleClass]="'p-chips-token-icon'" *ngIf="!removeTokenIconTemplate" (click)="removeItem($event, i)" />
                        <span *ngIf="removeTokenIconTemplate" class="p-chips-token-icon" (click)="removeItem($event, i)">
                            <ng-template *ngTemplateOutlet="removeTokenIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </li>
                <li class="p-chips-input-token" [ngClass]="{ 'p-chips-clearable': showClear && !disabled }">
                    <input
                        #inputtext
                        type="text"
                        [attr.id]="inputId"
                        [attr.placeholder]="value && value.length ? null : placeholder"
                        [attr.tabindex]="tabindex"
                        (keydown)="onKeydown($event)"
                        (input)="onInput()"
                        (paste)="onPaste($event)"
                        [attr.aria-labelledby]="ariaLabelledBy"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        [disabled]="disabled"
                        [ngStyle]="inputStyle"
                        [class]="inputStyleClass"
                    />
                </li>
                <li *ngIf="value != null && filled && !disabled && showClear">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-chips-clear-icon'" (click)="clear()" />
                    <span *ngIf="clearIconTemplate" class="p-chips-clear-icon" (click)="clear()">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </li>
            </ul>
        </div>
    `,
    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focus',
        '[class.p-chips-clearable]': 'showClear'
    },
    providers: [CHIPS_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./chips.css']
})
export class Chips implements AfterContentInit, ControlValueAccessor {
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input() disabled: boolean | undefined;
    /**
     * Name of the property to display on a chip.
     * @group Props
     */
    @Input() field: string | undefined;
    /**
     * Advisory information to display on input.
     * @group Props
     */
    @Input() placeholder: string | undefined;
    /**
     * Maximum number of entries allowed.
     * @group Props
     */
    @Input() max: number | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: number | undefined;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    @Input() inputId: string | undefined;
    /**
     * Whether to allow duplicate values or not.
     * @group Props
     */
    @Input() allowDuplicate: boolean = true;
    /**
     * Inline style of the input field.
     * @group Props
     */
    @Input() inputStyle: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the input field.
     * @group Props
     */
    @Input() inputStyleClass: string | undefined;
    /**
     * Whether to add an item on tab key press.
     * @group Props
     */
    @Input() addOnTab: boolean | undefined;
    /**
     * Whether to add an item when the input loses focus.
     * @group Props
     */
    @Input() addOnBlur: boolean | undefined;
    /**
     * Separator char to add an item when pressed in addition to the enter key.
     * @group Props
     */
    @Input() separator: string | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    @Input() showClear: boolean = false;
    /**
     * Callback to invoke on chip add.
     * @param {ChipsAddEvent} event - Custom chip add event.
     * @group Emits
     */
    @Output() onAdd: EventEmitter<ChipsAddEvent> = new EventEmitter<ChipsAddEvent>();
    /**
     * Callback to invoke on chip remove.
     * @param {ChipsRemoveEvent} event - Custom chip remove event.
     * @group Emits
     */
    @Output() onRemove: EventEmitter<ChipsRemoveEvent> = new EventEmitter<ChipsRemoveEvent>();
    /**
     * Callback to invoke on focus of input field.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke on blur of input field.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke on chip clicked.
     * @param {ChipsClickEvent} event - Custom chip click event.
     * @group Emits
     */
    @Output() onChipClick: EventEmitter<ChipsClickEvent> = new EventEmitter<ChipsClickEvent>();
    /**
     * Callback to invoke on clear token clicked.
     * @group Emits
     */
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('inputtext') inputViewChild!: ElementRef;

    @ContentChildren(PrimeTemplate) templates!: QueryList<any>;

    public itemTemplate: Nullable<TemplateRef<any>>;

    removeTokenIconTemplate: Nullable<TemplateRef<any>>;

    clearIconTemplate: Nullable<TemplateRef<any>>;

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    valueChanged: Nullable<boolean>;

    focus: Nullable<boolean>;

    filled: Nullable<boolean>;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'removetokenicon':
                    this.removeTokenIconTemplate = item.template;
                    break;

                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });

        this.updateFilledState();
    }

    onClick() {
        this.inputViewChild?.nativeElement.focus();
    }

    onInput() {
        this.updateFilledState();
    }

    onPaste(event: any) {
        if (!this.disabled) {
            if (this.separator) {
                let pastedData = (event.clipboardData || (this.document.defaultView as any)['clipboardData']).getData('Text');
                pastedData.split(this.separator).forEach((val: any) => {
                    this.addItem(event, val, true);
                });
                this.inputViewChild.nativeElement.value = '';
            }

            this.updateFilledState();
        }
    }

    updateFilledState() {
        if (!this.value || this.value.length === 0) {
            this.filled = this.inputViewChild && this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '';
        } else {
            this.filled = true;
        }
    }

    onItemClick(event: Event, item: any) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    }

    writeValue(value: any): void {
        this.value = value;
        this.updateMaxedOut();
        this.updateFilledState();
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

    resolveFieldData(data: any, field: string): any {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            } else {
                let fields: string[] = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        } else {
            return null;
        }
    }

    onInputFocus(event: FocusEvent) {
        this.focus = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event: FocusEvent) {
        this.focus = false;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value, false);
        }
        this.onModelTouched();
        this.onBlur.emit(event);
    }

    removeItem(event: Event, index: number): void {
        if (this.disabled) {
            return;
        }

        let removedItem = this.value[index];
        this.value = this.value.filter((val: any, i: number) => i != index);
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateFilledState();
        this.updateMaxedOut();
    }

    addItem(event: Event, item: string, preventDefault: boolean): void {
        this.value = this.value || [];
        if (item && item.trim().length) {
            if (this.allowDuplicate || this.value.indexOf(item) === -1) {
                this.value = [...this.value, item];
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
        this.updateFilledState();
        this.updateMaxedOut();
        this.inputViewChild.nativeElement.value = '';

        if (preventDefault) {
            event.preventDefault();
        }
    }

    clear() {
        this.value = null;
        this.updateFilledState();
        this.onModelChange(this.value);
        this.onClear.emit();
    }

    onKeydown(event: KeyboardEvent): void {
        switch (event.which) {
            //backspace
            case 8:
                if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = [...this.value];
                    let removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                    this.updateFilledState();
                }
                break;

            //enter
            case 13:
                this.addItem(event, this.inputViewChild.nativeElement.value, true);
                break;

            case 9:
                if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                    this.addItem(event, this.inputViewChild.nativeElement.value, true);
                }
                break;

            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                } else if (this.separator) {
                    if (this.separator === event.key || event.key.match(this.separator)) {
                        this.addItem(event, this.inputViewChild.nativeElement.value, true);
                    }
                }
                break;
        }
    }

    updateMaxedOut(): void {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.max && this.value && this.max === this.value.length) {
                // Calling `blur` is necessary because firefox does not call `onfocus` events
                // for disabled inputs, unlike chromium browsers.
                this.inputViewChild.nativeElement.blur();
                this.inputViewChild.nativeElement.disabled = true;
            } else {
                if (this.disabled) {
                    this.inputViewChild.nativeElement.blur();
                }

                this.inputViewChild.nativeElement.disabled = this.disabled || false;
            }
        }
    }
}

@NgModule({
    imports: [CommonModule, InputTextModule, SharedModule, TimesCircleIcon, TimesIcon],
    exports: [Chips, InputTextModule, SharedModule],
    declarations: [Chips]
})
export class ChipsModule {}
