import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, ContentChild, QueryList, TemplateRef,forwardRef, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate, Footer, Header } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FilterUtils } from 'primeng/utils';
import { RippleModule } from 'primeng/ripple';  

export const LISTBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Listbox),
    multi: true
};

@Component({
    selector: 'p-listbox',
    template: `
    <div [ngClass]="{'p-listbox p-component': true, 'p-disabled': disabled}" [ngStyle]="style" [class]="styleClass">
      <div class="p-listbox-header" *ngIf="headerFacet || headerTemplate">
        <ng-content select="p-header"></ng-content>
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      </div>
      <div class="p-listbox-header" *ngIf="(checkbox && multiple && showToggleAll) || filter">
        <div class="p-checkbox p-component" *ngIf="checkbox && multiple && showToggleAll" [ngClass]="{'p-checkbox-disabled': disabled || toggleAllDisabled}">
          <div class="p-hidden-accessible">
            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)" [attr.disabled]="disabled || toggleAllDisabled">
          </div>
          <div #headerchkbox class="p-checkbox-box" [ngClass]="{'p-highlight': allChecked, 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled}" (click)="toggleAll($event)">
            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':allChecked}"></span>
          </div>
        </div>
        <div class="p-listbox-filter-container" *ngIf="filter">
          <input type="text" [value]="filterValue||''" (input)="onFilter($event)" class="p-listbox-filter p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
          <span class="p-listbox-filter-icon pi pi-search"></span>
        </div>
      </div>
      <div [ngClass]="'p-listbox-list-wrapper'" [ngStyle]="listStyle" [class]="listStyleClass">
        <ul class="p-listbox-list" role="listbox" aria-multiselectable="multiple">
          <li *ngFor="let option of optionsToRender; let i = index;" [attr.tabindex]="disabled || isOptionDisabled(option) ? null : '0'" pRipple
              [ngClass]="{'p-listbox-item':true,'p-highlight':isSelected(option), 'p-disabled': this.isOptionDisabled(option)}" role="option" [attr.aria-label]="getOptionLabel(option)"
              [attr.aria-selected]="isSelected(option)" (click)="onOptionClick($event,option)" (dblclick)="onOptionDoubleClick($event,option)" (touchend)="onOptionTouchEnd(option)" (keydown)="onOptionKeyDown($event,option)">
            <div class="p-checkbox p-component" *ngIf="checkbox && multiple" [ngClass]="{'p-checkbox-disabled': disabled || isOptionDisabled(option)}">
              <div class="p-checkbox-box" [ngClass]="{'p-highlight':isSelected(option)}">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':isSelected(option)}"></span>
              </div>
            </div>
            <span *ngIf="!itemTemplate">{{getOptionLabel(option)}}</span>
            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: i}"></ng-container>
          </li>
        </ul>
      </div>
      <div class="p-listbox-footer" *ngIf="footerFacet || footerTemplate">
        <ng-content select="p-footer"></ng-content>
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </div>
    </div>
  `,
    providers: [LISTBOX_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./listbox.css']
})
export class Listbox implements AfterContentInit, ControlValueAccessor {

    @Input() multiple: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() listStyle: any;

    @Input() listStyleClass: string;

    @Input() readonly: boolean;

    @Input() disabled: boolean;

    @Input() checkbox: boolean = false;

    @Input() filter: boolean = false;

    @Input() filterMode: string = 'contains';

    @Input() filterLocale: string;

    @Input() metaKeySelection: boolean = true;

    @Input() dataKey: string;

    @Input() showToggleAll: boolean = true;

    @Input() optionLabel: string;

    @Input() optionValue: string;

    @Input() optionDisabled: string;

    @Input() ariaFilterLabel: string;

    @Input() filterPlaceHolder: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onDblClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('headerchkbox') headerCheckboxViewChild: ElementRef;

    @ContentChild(Header) headerFacet;

    @ContentChild(Footer) footerFacet;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public _options: any[];

    public itemTemplate: TemplateRef<any>;

    public headerTemplate: TemplateRef<any>;

    public footerTemplate: TemplateRef<any>;

    public _filterValue: string;

    public _filteredOptions: any[];

    public filtered: boolean;

    public value: any;

    public onModelChange: Function = () => { };

    public onModelTouched: Function = () => { };

    public optionTouched: boolean;

    public focus: boolean;

    public headerCheckboxFocus: boolean;

    constructor(public el: ElementRef, public cd: ChangeDetectorRef) { }

    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        this._options = val;
    }

    @Input() get filterValue(): string {
        return this._filterValue;
    }

    set filterValue(val: string) {
        this._filterValue = val;
        this.filterOptions();
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;

                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    getOptionLabel(option: any) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
    }

    getOptionValue(option: any) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : (option.value !== undefined ? option.value : option);
    }

    isOptionDisabled(option: any) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
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
        this.cd.markForCheck();
    }

    onOptionClick(event: Event, option: any) {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
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
        this.onClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
        this.optionTouched = false;
    }

    onOptionTouchEnd(option: any) {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
            return;
        }

        this.optionTouched = true;
    }

    onOptionDoubleClick(event: Event, option: any): any {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
            return;
        }

        this.onDblClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        })
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
                this.value = this.getOptionValue(option);
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : this.getOptionValue(option);
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
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;

        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);

            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [this.getOptionValue(option)];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = [...this.value, this.getOptionValue(option)];
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = [...this.value || [], this.getOptionValue(option)];
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
            this.value = [...this.value, this.getOptionValue(option)];
        }

        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }

    removeOption(option: any): void {
        this.value = this.value.filter(val => !ObjectUtils.equals(val, this.getOptionValue(option), this.dataKey));
    }

    isSelected(option: any) {
        let selected = false;
        let optionValue = this.getOptionValue(option);

        if (this.multiple) {
            if (this.value) {
                for (let val of this.value) {
                    if (ObjectUtils.equals(val, optionValue, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = ObjectUtils.equals(this.value, optionValue, this.dataKey);
        }

        return selected;
    }

    get allChecked(): boolean {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return false;
        }
        else {
            let selectedDisabledItemsLength = 0;
            let unselectedDisabledItemsLength = 0;
            let selectedEnabledItemsLength = 0;

            for (let option of optionsToRender) {
                let disabled = this.isOptionDisabled(option);
                let selected = this.isSelected(option);

                if (disabled) {
                    if (selected)
                        selectedDisabledItemsLength++;
                    else 
                        unselectedDisabledItemsLength++;
                }
                else {
                    if (selected)
                        selectedEnabledItemsLength++;
                    else
                        return false;
                }
            }

            return (optionsToRender.length === selectedDisabledItemsLength 
                    || optionsToRender.length === selectedEnabledItemsLength 
                    || selectedEnabledItemsLength && optionsToRender.length === (selectedEnabledItemsLength + unselectedDisabledItemsLength + selectedDisabledItemsLength));
        }
    }

    get optionsToRender(): any[] {
        return this._filteredOptions || this.options;
    }

    hasFilter() {
        return this._filterValue && this._filterValue.trim().length > 0; 
    }

    onFilter(event: KeyboardEvent) {
        this._filterValue = (<HTMLInputElement> event.target).value;
        this.filterOptions();
    }

    filterOptions() {
        if (this.hasFilter() && this._options)
            this._filteredOptions = this._options.filter(option => FilterUtils[this.filterMode](this.getOptionLabel(option), this._filterValue, this.filterLocale));
        else
            this._filteredOptions = null;
    }

    get toggleAllDisabled(): boolean {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return true;
        }
        else {
            for (let option of optionsToRender) {
                if (!this.isOptionDisabled(option))
                    return false;
            }

            return true;
        }
    }

    toggleAll(event) {
        if (this.disabled || this.toggleAllDisabled || this.readonly) {
            return;
        }
        
        let allChecked = this.allChecked;     

        if (allChecked)
            this.uncheckAll();
        else
            this.checkAll();

        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    }

    checkAll() {
        let optionsToRender = this.optionsToRender;
        let val: any[] = [];

        optionsToRender.forEach(opt => {
            let optionDisabled = this.isOptionDisabled(opt); 
            if (!optionDisabled || (optionDisabled && this.isSelected(opt))) {
                val.push(this.getOptionValue(opt));
            }
        });

        this.value = val;
    }

    uncheckAll() {
        let optionsToRender = this.optionsToRender;
        let val: any[] = [];

        optionsToRender.forEach(opt => {
            let optionDisabled = this.isOptionDisabled(opt); 
            if (optionDisabled && this.isSelected(opt)) {
                val.push(this.getOptionValue(opt));
            }
        });

        this.value = val;
    }

    onOptionKeyDown(event:KeyboardEvent, option) {
        if (this.readonly) {
            return;
        }

        let item = <HTMLLIElement> event.currentTarget;

        switch(event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    nextItem.focus();
                }

                event.preventDefault();
            break;

            //up
            case 38:
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    prevItem.focus();
                }

                event.preventDefault();
            break;

            //enter
            case 13:
                this.onOptionClick(event, option);
                event.preventDefault();
            break;
        }
    }

    findNextItem(item) {
        let nextItem = item.nextElementSibling;

        if (nextItem)
            return DomHandler.hasClass(nextItem, 'p-disabled') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }

    findPrevItem(item) {
        let prevItem = item.previousElementSibling;

        if (prevItem)
            return DomHandler.hasClass(prevItem, 'p-disabled') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }

    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }

    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, RippleModule],
    exports: [Listbox, SharedModule],
    declarations: [Listbox]
})
export class ListboxModule { }

