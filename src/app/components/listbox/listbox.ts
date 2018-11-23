import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, ContentChild, QueryList, TemplateRef,
    forwardRef, ChangeDetectorRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectItem } from '../common/selectitem';
import { SharedModule, PrimeTemplate, Footer, Header } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const LISTBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Listbox),
    multi: true
};

@Component({
    selector: 'p-listbox',
    template: `
    <div [ngClass]="{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,'ui-state-focus':focus}" [ngStyle]="style" [class]="styleClass">
      <div class="ui-helper-hidden-accessible">
        <input type="text" readonly="readonly" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
      </div>
      <div class="ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix" *ngIf="headerFacet">
        <ng-content select="p-header"></ng-content>
      </div>
      <div class="ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix" *ngIf="(checkbox && multiple && showToggleAll) || filter" [ngClass]="{'ui-listbox-header-w-checkbox': checkbox}">
        <div class="ui-chkbox ui-widget" *ngIf="checkbox && multiple && showToggleAll">
          <div class="ui-helper-hidden-accessible">
            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)">
          </div>
          <div #headerchkbox class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active': allChecked, 'ui-state-focus': headerCheckboxFocus}" (click)="toggleAll($event)">
            <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':allChecked}"></span>
          </div>
        </div>
        <div class="ui-listbox-filter-container" *ngIf="filter">
          <input type="text" role="textbox" [value]="filterValue||''" (input)="onFilter($event)" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [disabled]="disabled">
          <span class="ui-listbox-filter-icon pi pi-search"></span>
        </div>
      </div>
      <div class="ui-listbox-list-wrapper" [ngStyle]="listStyle">
        <ul class="ui-listbox-list">
          <li *ngFor="let option of options; let i = index;" [style.display]="isItemVisible(option) ? 'block' : 'none'" [attr.tabindex]="0"
              [ngClass]="{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option), 'ui-state-disabled': option.disabled}"
              (click)="onOptionClick($event,option)" (dblclick)="onOptionDoubleClick($event,option)" (touchend)="onOptionTouchEnd($event,option)">
            <div class="ui-chkbox ui-widget" *ngIf="checkbox && multiple">
              <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isSelected(option)}">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':isSelected(option)}"></span>
              </div>
            </div>
            <span *ngIf="!itemTemplate">{{option.label}}</span>
            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: i}"></ng-container>
          </li>
        </ul>
      </div>
      <div class="ui-listbox-footer ui-widget-header ui-corner-all" *ngIf="footerFacet">
        <ng-content select="p-footer"></ng-content>
      </div>
    </div>
  `,
    providers: [DomHandler, ObjectUtils, LISTBOX_VALUE_ACCESSOR]
})
export class Listbox implements AfterContentInit, ControlValueAccessor {

    @Input() multiple: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() listStyle: any;

    @Input() readonly: boolean;

    @Input() disabled: boolean;

    @Input() checkbox: boolean = false;

    @Input() filter: boolean = false;

    @Input() filterMode: string = 'contains';

    @Input() metaKeySelection: boolean = true;

    @Input() dataKey: string;

    @Input() showToggleAll: boolean = true;

    @Input() optionLabel: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onDblClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('headerchkbox') headerCheckboxViewChild: ElementRef;

    @ContentChild(Header) headerFacet;

    @ContentChild(Footer) footerFacet;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public itemTemplate: TemplateRef<any>;

    public _filterValue: string;

    public filtered: boolean;

    public value: any;

    public onModelChange: Function = () => { };

    public onModelTouched: Function = () => { };

    public optionTouched: boolean;

    public focus: boolean;

    public _options: any[];

    public headerCheckboxFocus: boolean;
    
    focusedIndex: number;
    
    focusedOption: any;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils, public cd: ChangeDetectorRef) { }

    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
        this._options = opts;
    }
    
    @Input() get filterValue(): string {
        return this._filterValue;
    }
    
    set filterValue(val: string) {
        this._filterValue = val;
    }

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
    }

    onOptionClick(event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }

        if (this.multiple) {
            if (this.checkbox)
                this.onOptionClickCheckbox(event, option);
            else
                this.onOptionClickMultiple(event, option);
        }
        else {
            this.onOptionClickSingle(event, option);
        }
        this.optionTouched = false;
    }

    onOptionTouchEnd(event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }

        this.optionTouched = true;
    }

    onOptionDoubleClick(event: Event, option: SelectItem): any {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }

        this.onDblClick.emit({
            originalEvent: event,
            value: this.value
        })
    
        this.focusedOption = option;
    }

    onOptionClickSingle(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;

        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);

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
        }
        else {
            this.value = selected ? null : option.value;
            valueChanged = true;
        }

        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    
        this.focusedOption = option;
    }

    onOptionClickMultiple(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;

        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);

            if (selected) {
                if (metaKey) {
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
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = [...this.value || [], option.value];
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
    
        this.focusedOption = option;
    }

    onOptionClickCheckbox(event, option) {
        if (this.disabled || this.readonly) {
            return;
        }

        let selected = this.isSelected(option);

        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = [...this.value, option.value];
        }

        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    
        this.focusedOption = option;
    }

    removeOption(option: any): void {
        this.value = this.value.filter(val => !this.objectUtils.equals(val, option.value, this.dataKey));
    }

    isSelected(option: SelectItem) {
        let selected = false;

        if (this.multiple) {
            if (this.value) {
                for (let val of this.value) {
                    if (this.objectUtils.equals(val, option.value, this.dataKey)) {
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
        if (this.filterValue)
            return this.allFilteredSelected();
        else
            return this.value && this.options && (this.value.length > 0 && this.value.length === this.getEnabledOptionCount());
    }

    getEnabledOptionCount(): number {
        if (this.options) {
            let count = 0;
            for (let opt of this.options) {
                if (!opt.disabled) {
                    count++;
                }
            }

            return count;
        }
        else {
            return 0;
        }
    }

    allFilteredSelected(): boolean {
        let allSelected: boolean;
        let options = this.filterValue ? this.getFilteredOptions() : this.options;

        if (this.value && options && options.length)  {
            allSelected = true;
            for (let opt of this.options) {
                if (this.isItemVisible(opt)) {
                    if (!this.isSelected(opt)) {
                        allSelected = false;
                        break;
                    }
                }
            }
        }

        return allSelected;
    }

    onFilter(event) {
        let query = event.target.value.trim().toLowerCase();
        this._filterValue = query.length ? query : null;
        this.focusedOption = null;
        this.focusedIndex = null;
    }

    toggleAll(event) {
        if (this.disabled || this.readonly || !this.options || this.options.length === 0) {
            return;
        }

        if (this.allChecked) {
            this.value = [];
        }
        else {
            if (this.options) {
                this.value = [];
                for (let i = 0; i < this.options.length; i++) {
                    let opt = this.options[i];
                    if (this.isItemVisible(opt) && !opt.disabled) {
                        this.value.push(opt.value);
                    }
                }
            }
        }

        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    }

    isItemVisible(option: SelectItem): boolean {
        if (this.filterValue) {
            let visible;

            switch (this.filterMode) {
                case 'startsWith':
                    visible = option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) === 0;
                    break;

                case 'contains':
                    visible = option.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1;
                    break;

                default:
                    visible = true;
            }

            return visible;
        }
        else {
            return true;
        }
    }

    onInputFocus(event) {
        this.focus = true;
    }

    onInputBlur(event) {
        this.focus = false;
    }
    
    @HostListener('keydown',['$event'])
    onKeyDown(event:KeyboardEvent){
        if (this.readonly) {
            return;
        }
        
        let opts = this.getFilteredOptions();
        let currentOption = <HTMLLIElement>event.target;
        this.focusedIndex = this.domHandler.indexWithDisplay(currentOption);
        this.focusedOption = opts[this.focusedIndex]
        
        switch(event.which) {
            //down
            case 40:
                this.focusedIndex = this.focusedIndex + 1;
                if (this.focusedIndex != (opts.length)) {
                    this.focusedOption = opts[this.focusedIndex];
                }
                let nextOption = this.findNextOption(currentOption);
                if(nextOption) {
                    nextOption.focus();
                }
                
                event.preventDefault();
                break;
            
            //up
            case 38:
                this.focusedIndex = this.focusedIndex - 1;
                this.focusedOption = opts[this.focusedIndex];
                let prevOption = this.findPrevOption(currentOption);
                if (prevOption) {
                    prevOption.focus();
                }
                
                event.preventDefault();
                break;
            
            //enter
            case 13:
                if (this.focusedOption) {
                    this.onOptionClick(event,this.focusedOption);
                }
                event.preventDefault();
                break;
        }
    }
    
    findPrevOption(row)  {
        let prevOption = row.previousElementSibling;
        if (prevOption) {
            if (this.domHandler.hasClass(prevOption, 'ui-listbox-item') && prevOption.style.display == 'block')
                return prevOption;
            else
                return this.findPrevOption(prevOption);
        }
        else {
            return null;
        }
    }
    
    findNextOption(row) {
        let nextOption = row.nextElementSibling;
        if (nextOption) {
            if (this.domHandler.hasClass(nextOption, 'ui-listbox-item') && nextOption.style.display == 'block')
                return nextOption;
            else
                return this.findNextOption(nextOption);
        }
        else {
            return null;
        }
    }
    
    getFilteredOptions() {
        let filteredOptions = [];
        if(this.filterValue) {
            for (let i = 0; i < this.options.length; i++) {
                let opt = this.options[i];
                if (this.isItemVisible(opt) && !opt.disabled) {
                    filteredOptions.push(opt);
                }
            }
            return filteredOptions;
        }
        else {
            return this.options;
        }
    }

    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }

    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [Listbox, SharedModule],
    declarations: [Listbox]
})
export class ListboxModule { }

