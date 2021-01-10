import {NgModule,Component,ElementRef,Input,Output,EventEmitter,AfterContentInit,ContentChildren,QueryList,TemplateRef,forwardRef,ViewChild,ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule,PrimeTemplate} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const CHIPS_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Chips),
  multi: true
};

@Component({
    selector: 'p-chips',
    template: `
        <div [ngClass]="'p-chips p-component'" [ngStyle]="style" [class]="styleClass" (click)="onClick()">
            <ul [ngClass]="{'p-inputtext p-chips-multiple-container':true,'p-focus':focus,'p-disabled':disabled}">
                <li #token *ngFor="let item of value; let i = index;" class="p-chips-token" (click)="onItemClick($event, item)">
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                    <span *ngIf="!itemTemplate" class="p-chips-token-label">{{field ? resolveFieldData(item,field) : item}}</span>
                    <span *ngIf="!disabled" class="p-chips-token-icon pi pi-times-circle" (click)="removeItem($event,i)"></span>
                </li>
                <li class="p-chips-input-token">
                    <input #inputtext type="text" [attr.id]="inputId" [attr.placeholder]="(value && value.length ? null : placeholder)" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)"
                    (input)="onInput()" (paste)="onPaste($event)" [attr.aria-labelledby]="ariaLabelledBy" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul>
        </div>
    `,
    host: {
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focus'
    },
    providers: [CHIPS_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./chips.css']
})
export class Chips implements AfterContentInit,ControlValueAccessor {

    @Input() style: any;

    @Input() styleClass: string;

    @Input() disabled: boolean;

    @Input() field: string;

    @Input() placeholder: string;

    @Input() max: number;

    @Input() ariaLabelledBy: string;

    @Input() tabindex: number;

    @Input() inputId: string;

    @Input() allowDuplicate: boolean = true;

    @Input() inputStyle: any;

    @Input() inputStyleClass: any;

    @Input() addOnTab: boolean;

    @Input() addOnBlur: boolean;

    @Input() separator: string;

    @Output() onAdd: EventEmitter<any> = new EventEmitter();

    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onChipClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('inputtext') inputViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public itemTemplate: TemplateRef<any>;

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    valueChanged: boolean;

    focus: boolean;

    filled: boolean;

    constructor(public el: ElementRef, public cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    onClick() {
        this.inputViewChild.nativeElement.focus();
    }

    onInput() {
        this.updateFilledState();
    }

    onPaste(event) {
        if (this.separator) {
            let pastedData = (event.clipboardData || window['clipboardData']).getData('Text');
            pastedData.split(this.separator).forEach(val => {
                this.addItem(event, val, true);
            });
            this.inputViewChild.nativeElement.value = '';
        }
        this.updateFilledState();
    }

    updateFilledState() {
        if (!this.value || this.value.length === 0) {
            this.filled = (this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '');
        }
        else {
            this.filled = true;
        }
    }

    onItemClick(event: Event, item: any) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    }

    writeValue(value: any) : void {
        this.value = value;
        this.updateMaxedOut();
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
            }
            else {
                let fields: string[] = field.split('.');
                let value = data;
                for(var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
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
        this.value = this.value.filter((val, i) => i!=index);
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateFilledState();
        this.updateMaxedOut();
    }

    addItem(event: Event, item: string, preventDefault: boolean): void {
        this.value = this.value||[];
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

    onKeydown(event: KeyboardEvent): void {
        switch(event.which) {
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
                }
                else if (this.separator) {
                    if (this.separator === ',' && event.which === 188) {
                        this.addItem(event, this.inputViewChild.nativeElement.value, true);
                    }
                }
            break;
        }
    }

    updateMaxedOut() {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.max && this.value && this.max === this.value.length)
                this.inputViewChild.nativeElement.disabled = true;
            else
                this.inputViewChild.nativeElement.disabled = this.disabled || false;
        }
    }
}

@NgModule({
    imports: [CommonModule,InputTextModule,SharedModule],
    exports: [Chips,InputTextModule,SharedModule],
    declarations: [Chips]
})
export class ChipsModule { }
