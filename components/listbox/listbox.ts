import {NgModule,Component,ElementRef,Input,Output,EventEmitter,ContentChild,TemplateRef,IterableDiffers,forwardRef,Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/api';
import {SharedModule} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const LISTBOX_VALUE_ACCESSOR: Provider = new Provider(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => Listbox),
    multi: true
});

@Component({
    selector: 'p-listbox',
    template: `
        <div [ngClass]="{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass">
            <ul class="ui-listbox-list">
                <li #item *ngFor="let option of options"
                    [ngClass]="{'ui-listbox-item ui-corner-all':true,'ui-state-hover':(hoveredItem==item),'ui-state-highlight':isSelected(option)}"
                    (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null" (click)="onOptionClick($event,option)">
                    <span *ngIf="!itemTemplate">{{option.label}}</span>
                    <template *ngIf="itemTemplate" [pTemplateWrapper]="itemTemplate" [item]="option"></template>
                </li>
            </ul>
        </div>
    `,
    providers: [DomHandler,LISTBOX_VALUE_ACCESSOR]
})
export class Listbox implements ControlValueAccessor {

    @Input() options: SelectItem[];

    @Input() multiple: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() disabled: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    
    value: any;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
        
    valueChanged: boolean;
    
    hoveredItem: any;
        
    constructor(protected el: ElementRef, protected domHandler: DomHandler) {}
    
    writeValue(value: any) : void {
        this.value = value;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
                
    onOptionClick(event, option) {
        let metaKey = (event.metaKey||event.ctrlKey);
        let selected = this.isSelected(option);
        
        if(this.multiple)
            this.onOptionClickMultiple(event,option);
        else
            this.onOptionClickSingle(event,option);
    }
    
    onOptionClickSingle(event, option) {
        let metaKey = (event.metaKey||event.ctrlKey);
        let selected = this.isSelected(option);
        let valueChanged = false;
        
        if(selected) {
            if(metaKey) {
                this.value = null;
                valueChanged = true;
            }
        }
        else {
            this.value = option.value;
            valueChanged = true;
        }
        
        if(valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit(event);
        }
    }
    
    onOptionClickMultiple(event, option) {
        let metaKey = (event.metaKey||event.ctrlKey);
        let selected = this.isSelected(option);
        let valueChanged = false;
        
        if(selected) {
            if(metaKey) {
                this.value.splice(this.findIndex(option), 1);
            }
            else {
                this.value = [];
                this.value.push(option.value);
            }
            valueChanged = true;
        }
        else {
            this.value = (metaKey) ? this.value||[] : [];            
            this.value.push(option.value);
            valueChanged = true;
        }
        
        if(valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit(event);
        }
    }
    
    isSelected(option: SelectItem) {
        let selected = false;
        
        if(this.multiple) {
            if(this.value) {
                for(let i = 0; i < this.value.length; i++) {
                    if(this.value[i] === option.value) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected =  this.value == option.value;
        }
        
        return selected;
    }
    
    findIndex(option: SelectItem): number {        
        let index: number = -1;
        if(this.value) {
            for(let i = 0; i < this.value.length; i++) {
                if(this.domHandler.equals(option.value, this.value[i])) {
                    index = i;
                    break;
                }
            }
        }
                
        return index;
    }
}

@NgModule({
    imports: [CommonModule,SharedModule],
    exports: [Listbox,SharedModule],
    declarations: [Listbox]
})
export class ListboxModule { }