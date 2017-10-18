import {NgModule,
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChildren,
  QueryList,
  TemplateRef,
  IterableDiffers,
  forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule, PrimeTemplate} from '../common/shared';
import {InputTextModule} from '../inputtext/inputtext';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const CHIPS_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Chips),
  multi: true
};

@Component({
    selector: 'p-chips',
    template: `
        <div [ngClass]="'ui-chips ui-widget'" [ngStyle]="style" [class]="styleClass">
            <ul [ngClass]="{'ui-inputtext ui-state-default ui-corner-all': true,
                            'ui-state-focus': focus,
                            'ui-state-disabled': disabled}"
                (click)="inputtext.focus()">
                <li #token *ngFor="let item of value; let i = index;" class="ui-chips-token ui-state-highlight ui-corner-all">
                    <span *ngIf="!disabled" class="ui-chips-token-icon fa fa-fw fa-close" (click)="removeItem($event,i)"></span>
                    <span *ngIf="!itemTemplate" class="ui-chips-token-label">{{field ? resolveFieldData(item,field) : item}}</span>
                    <ng-template *ngIf="itemTemplate" [pTemplateWrapper]="itemTemplate" [item]="item"></ng-template>
                </li>
                <li class="ui-chips-input-token">
                    <input #inputtext type="text"
                           [attr.id]="inputId"
                           [attr.placeholder]="placeholder"
                           [attr.tabindex]="tabindex"
                           [disabled]="maxedOut || disabled"
                           [ngStyle]="inputStyle"
                           [class]="inputStyleClass"
                           (keydown)="onKeydown($event, inputtext)"
                           (focus)="onInputFocus()"
                           (blur)="onInputBlur()">
                </li>
            </ul>
        </div>
    `,
    providers: [DomHandler, CHIPS_VALUE_ACCESSOR]
})
export class Chips implements AfterContentInit, ControlValueAccessor {

    @Input() style: any;

    @Input() styleClass: string;

    @Input() disabled: boolean;

    @Output() onAdd: EventEmitter<any> = new EventEmitter();

    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    @Input() field: string;

    @Input() placeholder: string;

    @Input() max: number;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() allowDuplicate = true;

    @Input() inputStyle: any;

    @Input() inputStyleClass: any;

    @Input() addOnTab: boolean;

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public itemTemplate: TemplateRef<any>;

    value: any;

    valueChanged: boolean;

    focus: boolean;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    constructor(public el: ElementRef, public domHandler: DomHandler) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    resolveFieldData(data: any, field: string): any {
        if (data && field) {
            if (field.indexOf('.') === -1) {
                return data[field];
            }else {
                const fields: string[] = field.split('.');
                let value = data;
                for (let i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }else {
            return null;
        }
    }

    onInputFocus() {
        this.focus = true;
        this.onFocus.emit();
    }

    onInputBlur() {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit();
    }

    removeItem(event: Event, index: number): void {
        if (this.disabled) {
            return;
        }

        const removedItem = this.value[index];
        this.value = this.value.filter((val, i) => i !== index);
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
    }

    addItem(event: Event, item: string): void {
        this.value = this.value || [];
        if (item && item.trim().length && (!this.max || this.max > item.length)) {
            if (this.allowDuplicate || !this.value.includes(item)) {
                this.value = [...this.value, item];
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
    }

    onKeydown(event: KeyboardEvent, inputEL: HTMLInputElement): void {
        switch (event.which) {
            // backspace
            case 8:
                if (inputEL.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = [...this.value];
                    const removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                }
            break;

            // enter
            case 13:
                this.addItem(event, inputEL.value);
                inputEL.value = '';

                event.preventDefault();
            break;

            case 9:
                if (this.addOnTab && inputEL.value !== '') {
                    this.addItem(event, inputEL.value);
                    inputEL.value = '';

                    event.preventDefault();
                }
            break;

            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                }
            break;
        }
    }

    get maxedOut(): boolean {
        return this.max && this.value && this.max === this.value.length;
    }
}

@NgModule({
    imports: [CommonModule, InputTextModule, SharedModule],
    exports: [Chips, InputTextModule, SharedModule],
    declarations: [Chips]
})
export class ChipsModule { }
