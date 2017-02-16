import {NgModule,Component,ElementRef,Input,Output,EventEmitter,AfterContentInit,ContentChildren,QueryList,TemplateRef,IterableDiffers,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/api';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
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
                        <input #cb type="checkbox" readonly="readonly" [checked]="isAllChecked()">
                    </div>
                    <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isAllChecked()}" (click)="toggleAll($event,cb)">
                        <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-check':isAllChecked()}"></span>
                    </div>
                </div>
                <div class="ui-listbox-filter-container" *ngIf="filter">
                    <input type="text" role="textbox" (input)="onFilter($event)" class="ui-inputtext ui-widget ui-state-default ui-corner-all">
                    <span class="fa fa-search"></span>
                </div>
            </div>
            <ul class="ui-listbox-list">
                <li *ngFor="let option of options" [style.display]="isItemVisible(option) ? 'block' : 'none'"
                    [ngClass]="{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option)}"
                    (click)="onOptionClick($event,option)" (dblclick)="onDoubleClick($event,option)">
                    <div class="ui-chkbox ui-widget" *ngIf="checkbox && multiple" (click)="onCheckboxClick($event,option)">
                        <div class="ui-helper-hidden-accessible">
                            <input type="checkbox" [checked]="isSelected(option)">
                        </div>
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isSelected(option)}">
                            <span class="ui-chkbox-icon ui-c" [ngClass]="{'fa fa-check':isSelected(option)}"></span>
                        </div>
                    </div>
                    <span *ngIf="!itemTemplate">{{option.label}}</span>
                    <template *ngIf="itemTemplate" [pTemplateWrapper]="itemTemplate" [item]="option"></template>
                </li>
            </ul>
        </div>
    `,
    providers: [DomHandler, LISTBOX_VALUE_ACCESSOR]
})
export class Listbox implements AfterContentInit,ControlValueAccessor {

    @Input() options: SelectItem[];

    @Input() multiple: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() disabled: boolean;

    @Input() checkbox: boolean = false;

    @Input() filter: boolean = false;

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

    constructor(public el: ElementRef, public domHandler: DomHandler) {}
    
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
        if(!this.checkboxClick) {
            let metaKey = (event.metaKey || event.ctrlKey);
            let selected = this.isSelected(option);

            if (this.multiple)
                this.onOptionClickMultiple(event, option);
            else
                this.onOptionClickSingle(event, option);
        }
        else {
            this.checkboxClick = false;
        }
    }

    onOptionClickSingle(event, option) {
        let metaKey = (event.metaKey || event.ctrlKey);
        let selected = this.isSelected(option);
        let valueChanged = false;

        if (selected) {
            if (metaKey) {
                this.value = null;
                valueChanged = true;
            }
        }
        else {
            this.value = option.value;
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

    onOptionClickMultiple(event, option) {
        let selected = this.isSelected(option);

        if (selected) {
            this.value.splice(this.findIndex(option), 1);
        }
        else {
            this.value = this.value || [];
            this.value.push(option.value);

        }

        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });

    }

    isSelected(option: SelectItem) {
        let selected = false;

        if (this.multiple) {
            if (this.value) {
                for (let i = 0; i < this.value.length; i++) {
                    if (this.value[i] === option.value) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = this.value == option.value;
        }

        return selected;
    }

    findIndex(option: SelectItem): number {
        let index: number = -1;
        if (this.value) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.domHandler.equals(option.value, this.value[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    isAllChecked() {
        if(this.filterValue && this.filterValue.trim().length)
            return this.value&&this.visibleOptions&&(this.value.length == this.visibleOptions.length);
        else
            return this.value&&this.options&&(this.value.length == this.options.length);
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
        if(checkbox.checked) {
            this.value = [];
        }
        else {
            let opts = this.getVisibleOptions();
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

    getVisibleOptions(): SelectItem[] {
        if(this.filterValue && this.filterValue.trim().length) {
            let items = [];
            for(let i = 0; i < this.options.length; i++) {
                let option = this.options[i];
                if(option.label.toLowerCase().includes(this.filterValue.toLowerCase())) {
                    items.push(option);
                }
            }
            return items;
        }
        else {
            return this.options;
        }
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
        this.onDblClick.emit({
            originalEvent: event,
            value: this.value
        })
    }
    
    onCheckboxClick(event: Event, option: SelectItem) {
        this.checkboxClick = true;
        let selected = this.isSelected(option);

        if(selected) {
            this.value.splice(this.findIndex(option), 1);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value.push(option.value);
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
