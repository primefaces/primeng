import {NgModule,Component,ElementRef,Input,Output,EventEmitter,ContentChild,TemplateRef,IterableDiffers,forwardRef, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../common/shared';
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
            <ul [ngClass]="{'ui-inputtext ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled':disabled}" (click)="inputtext.focus()">
                <li #token *ngFor="let item of value; let i = index;" class="ui-chips-token ui-state-highlight ui-corner-all">
                    <span *ngIf="!itemTemplate && !disabled" class="ui-chips-token-icon fa fa-fw fa-close" (click)="removeItem(i)"></span>
                    <span *ngIf="!itemTemplate" class="ui-chips-token-label">{{field ? resolveFieldData(item,field) : item}}</span>
                    <template *ngIf="itemTemplate" [pTemplateWrapper]="itemTemplate" [item]="item"></template>
                </li>
                <li class="ui-chips-input-token">
                    <input #inputtext type="text" pInputText [attr.placeholder]="placeholder" (keydown)="onKeydown($event,inputtext)" (focus)="onFocus()" (blur)="onBlur()"
                        [disabled]="maxedOut||disabled" [disabled]="disabled" [pattern]="pattern">
                </li>
            </ul>
        </div>
    `,
    providers: [DomHandler,CHIPS_VALUE_ACCESSOR]
})
export class Chips implements ControlValueAccessor, OnChanges {

    @Output() onAdd: EventEmitter<any> = new EventEmitter();
    
    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    
    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() disabled: boolean;
    
    @Input() field: string;
    
    @Input() placeholder: string;
    
    @Input() max: number;

    @Input() separators: Array<Number> = [13];

    @Input() pattern: string;

    @Input() allowInvalid: boolean = true;

    @Input() allowDuplicates: boolean = true;
    
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
        
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
        
    valueChanged: boolean;
    
    focus: boolean;

    patternRegEx: RegExp;
            
    constructor(public el: ElementRef, public domHandler: DomHandler) {
        this.patternRegEx = new RegExp(this.pattern);
    }
    
    writeValue(value: any) : void {
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
        if(data && field) {
            if(field.indexOf('.') == -1) {
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
    
    onFocus() {
        this.focus = true;
    }
    
    onBlur() {
        this.focus = false;
        this.onModelTouched();
    }
    
    removeItem(index: number): void {
        if(this.disabled) {
            return;
        }
        
        let removedItem = this.value.splice(index, 1);
        this.onModelChange(this.value);
        this.onRemove.emit(removedItem);
    }
    
    onKeydown(event: KeyboardEvent, inputEL: HTMLInputElement): void {
        if(event.which == 8) {
            // backspace
            if(inputEL.value.length === 0 && this.value && this.value.length > 0) {
                this.value.pop();
                this.onModelChange(this.value);
            }
            return;
        }

        for(let sep of this.separators) {
            if (sep === event.which) {
                this.value = this.value||[];
                if((!this.max || this.max > this.value.length) && this.isInputValid(inputEL.value)) {
                    this.value.push(inputEL.value);
                    this.onModelChange(this.value);
                    this.onAdd.emit(inputEL.value);
                }                
                inputEL.value = '';
                event.preventDefault();
                return;
            }
        }
            
        if(this.max && this.value && this.max === this.value.length) {
            event.preventDefault();
        }
    }

    isInputValid(input: string): boolean {
        if (this.allowInvalid) { 
            return true;
        }
        if (this.allowDuplicates == false) {
            if (this.value.indexOf(input) > -1) {
                return  false;
            }
        }
        return this.patternRegEx.test(input);
    }
    
    get maxedOut(): boolean {
        return this.max && this.value && this.max === this.value.length;
    }

    ngOnChanges (changes: SimpleChanges) {
        if (changes["pattern"]) {
            this.pattern = changes["pattern"].currentValue;
            this.patternRegEx = new RegExp(this.pattern);
        }
    }
}

@NgModule({
    imports: [CommonModule,InputTextModule,SharedModule],
    exports: [Chips,InputTextModule,SharedModule],
    declarations: [Chips]
})
export class ChipsModule { }