import {NgModule,Component,ElementRef,Input,Output,EventEmitter,AfterContentInit,ContentChildren,QueryList,TemplateRef,IterableDiffers,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/api';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/ObjectUtils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const LISTBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Listbox),
    multi: true
};

@Component({
    selector: 'p-listbox',
    template: `
        <div [ngClass]="{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix" *ngIf="(checkbox && multiple) || filter">
                <div class="ui-chkbox ui-widget" *ngIf="checkbox && multiple">
                    <div class="ui-helper-hidden-accessible">
                        <input #cb type="checkbox" readonly="readonly" [checked]="allChecked">
                    </div>
                    <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':allChecked}" (click)="toggleAll($event,cb)">
                        <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-check':allChecked}"></span>
                    </div>
                </div>
                <div class="ui-listbox-filter-container" *ngIf="filter">
                    <input type="text" role="textbox" (input)="onFilter($event)" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [disabled]="disabled">
                    <span class="fa fa-search"></span>
                </div>
            </div>
            <ul class="ui-listbox-list">
                <li *ngFor="let option of options; let i = index;" [style.display]="isItemVisible(option) ? 'block' : 'none'"
                    [ngClass]="{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option)}"
                    (click)="onOptionClick($event,option)" (dblclick)="onDoubleClick($event,option)" (touchend)="onOptionTouchEnd($event,option)">
                    <div class="ui-chkbox ui-widget" *ngIf="checkbox && multiple" (click)="onCheckboxClick($event,option)">
                        <div class="ui-helper-hidden-accessible">
                            <input type="checkbox" [checked]="isSelected(option)" [disabled]="disabled">
                        </div>
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isSelected(option)}">
                            <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-check':isSelected(option)}"></span>
                        </div>
                    </div>
                    <span *ngIf="!itemTemplate">{{option.label}}</span>
                    <ng-template *ngIf="itemTemplate" [pTemplateWrapper]="itemTemplate" [item]="option" [index]="i"></ng-template>
                </li>
            </ul>
        </div>
    `,
    providers: [DomHandler,ObjectUtils,LISTBOX_VALUE_ACCESSOR]
})
export class Listbox implements AfterContentInit,ControlValueAccessor {

    @Input() options: SelectItem[];

    @Input() multiple: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() disabled: boolean;

    @Input() checkbox: boolean = false;

    @Input() filter: boolean = false;
    
    @Input() metaKeySelection: boolean = true;
    
    @Input() dataKey: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onDblClick: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    public itemTemplate: TemplateRef<any>;

    public filterValue: string;
    
    public visibleOptions: SelectItem[];

    public filtered: boolean;

    public value: any;

    public onModelChange: Function = () => { };

    public onModelTouched: Function = () => { };

    public checkboxClick: boolean;
    
    public optionTouched: boolean;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils) {}
    
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

    onOptionClick(event, option) {
        if(this.disabled) {
            return;
        }
        
        if(!this.checkboxClick) {
            if(this.multiple)
                this.onOptionClickMultiple(event, option);
            else
                this.onOptionClickSingle(event, option);
        }
        else {
            this.checkboxClick = false;
        }
        
        this.optionTouched = false;
    }
    
    onOptionTouchEnd(event, option) {
        if(this.disabled) {
            return;
        }
        
        this.optionTouched = true;
    }

    onOptionClickSingle(event, option) {        
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;

        if(metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);
            
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
        }
        else {
            this.value = selected ? null : option.value;            
            valueChanged = true;
        }

        if(valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }

    onOptionClickMultiple(event, option) {        
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;

        if(metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);
            
            if(selected) {
                if(metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [option.value];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = [...this.value, option.value];
                valueChanged = true;
            }
        }
        else {
            if(selected) {
                this.removeOption(option);
            }
            else {
                this.value = [...this.value||[],option.value];
            }
            
            valueChanged = true;
        }

        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    
    removeOption(option: any): void {
        this.value = this.value.filter(val => !this.objectUtils.equals(val, option.value, this.dataKey));
    }

    isSelected(option: SelectItem) {
        let selected = false;

        if(this.multiple) {
            if(this.value) {
                for(let val of this.value) {
                    if(this.objectUtils.equals(val, option.value, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = this.objectUtils.equals(this.value, option.value, this.dataKey);
        }

        return selected;
    }

    get allChecked(): boolean {
        if(this.filterValue && this.filterValue.trim().length)
            return this.allFilteredSelected();
        else
            return this.value&&this.options&&(this.value.length == this.options.length);
    }
    
    allFilteredSelected(): boolean {
        let allSelected: boolean;
        if(this.value && this.visibleOptions && this.visibleOptions.length) {
            allSelected = true;
            for(let opt of this.visibleOptions) {
                let selected: boolean;
                for(let val of this.value) {
                    if(this.objectUtils.equals(val, opt.value, this.dataKey)) {
                        selected = true;
                    }
                }
                
                if(!selected) {
                    allSelected = false;
                    break;
                }
            }
        }
                
        return allSelected;
    }

    onFilter(event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.visibleOptions = [];
        for(let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if(option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
                this.visibleOptions.push(option);
            }
        }
        this.filtered = true;
    }

    toggleAll(event, checkbox) {
        if(this.disabled || (this.filterValue && this.filterValue.trim().length && (!this.visibleOptions || this.visibleOptions.length === 0))) {
            return;
        }
        
        if(checkbox.checked) {
            this.value = [];
        }
        else {
            let opts = (this.visibleOptions&&this.visibleOptions.length) ? this.visibleOptions : this.options;
            if(opts) {
                this.value = [];
                for(let i = 0; i < opts.length; i++) {
                    this.value.push(opts[i].value);
                } 
            }
        }
        checkbox.checked = !checkbox.checked;
        this.onModelChange(this.value);
        this.onChange.emit({originalEvent: event, value: this.value});
    } 

    isItemVisible(option: SelectItem): boolean {
        if(this.filterValue && this.filterValue.trim().length) {
            for(let i = 0; i < this.visibleOptions.length; i++) {
                if(this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }

    onDoubleClick(event: Event, option: SelectItem): any {
        if(this.disabled) {
            return;
        }
        
        this.onDblClick.emit({
            originalEvent: event,
            value: this.value
        })
    }
    
    onCheckboxClick(event: Event, option: SelectItem) {
        if(this.disabled) {
            return;
        }
        
        this.checkboxClick = true;
        let selected = this.isSelected(option);

        if(selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = [...this.value,option.value];
        }

        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [Listbox, SharedModule],
    declarations: [Listbox]
})
export class ListboxModule { }
