import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, ContentChild, QueryList, TemplateRef,forwardRef, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectItem } from 'primeng/api';
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
        <div class="p-checkbox p-component" *ngIf="checkbox && multiple && showToggleAll" [ngClass]="{'p-checkbox-disabled': disabled}">
          <div class="p-hidden-accessible">
            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)" [attr.disabled]="disabled">
          </div>
          <div #headerchkbox class="p-checkbox-box" [ngClass]="{'p-highlight': allChecked, 'p-focus': headerCheckboxFocus}" (click)="toggleAll($event)">
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
          <li *ngFor="let option of options; let i = index;" [style.display]="isItemVisible(option) ? 'flex' : 'none'" [attr.tabindex]="disabled || option.disabled ? null : '0'" pRipple
              [ngClass]="{'p-listbox-item':true,'p-highlight':isSelected(option), 'p-disabled': option.disabled}" role="option" [attr.aria-label]="option.label"
              [attr.aria-selected]="isSelected(option)" (click)="onOptionClick($event,option)" (dblclick)="onOptionDoubleClick($event,option)" (touchend)="onOptionTouchEnd($event,option)" (keydown)="onOptionKeyDown($event,option)">
            <div class="p-checkbox p-component" *ngIf="checkbox && multiple" [ngClass]="{'p-checkbox-disabled': disabled || option.disabled}">
              <div class="p-checkbox-box" [ngClass]="{'p-highlight':isSelected(option)}">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':isSelected(option)}"></span>
              </div>
            </div>
            <span *ngIf="!itemTemplate">{{option.label}}</span>
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

    @Input() ariaFilterLabel: string;

    @Input() filterPlaceHolder: string;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onDblClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('headerchkbox') headerCheckboxViewChild: ElementRef;

    @ContentChild(Header) headerFacet;

    @ContentChild(Footer) footerFacet;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    public itemTemplate: TemplateRef<any>;

    public headerTemplate: TemplateRef<any>;

    public footerTemplate: TemplateRef<any>;

    public _filterValue: string;

    public filtered: boolean;

    public value: any;

    public onModelChange: Function = () => { };

    public onModelTouched: Function = () => { };

    public optionTouched: boolean;

    public focus: boolean;

    public _options: any[];

    public headerCheckboxFocus: boolean;

    public disabledSelectedOptions: SelectItem[] = [];

    constructor(public el: ElementRef, public cd: ChangeDetectorRef) { }

    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
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

    writeValue(value: any): void {
        this.value = value;
        this.setDisabledSelectedOptions();
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
        this.onClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
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
    }

    removeOption(option: any): void {
        this.value = this.value.filter(val => !ObjectUtils.equals(val, option.value, this.dataKey));
    }

    isSelected(option: SelectItem) {
        let selected = false;

        if (this.multiple) {
            if (this.value) {
                for (let val of this.value) {
                    if (ObjectUtils.equals(val, option.value, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = ObjectUtils.equals(this.value, option.value, this.dataKey);
        }

        return selected;
    }

    get allChecked(): boolean {
        if (this.filterValue) {
            return this.allFilteredSelected();
        }
        else {
            let optionCount = this.getEnabledOptionCount();
            let disabledSelectedOptionCount = this.disabledSelectedOptions.length;

            return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount + disabledSelectedOptionCount);
        }
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
        this._filterValue = event.target.value;
    }

    toggleAll(event) {
        if (this.disabled || this.readonly || !this.options || this.options.length === 0) {
            return;
        }

        if (this.allChecked) {
            if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                let value = [];
                value = [...this.disabledSelectedOptions];
                this.value = value;
            }
            else {
                this.value = [];
            }
        }
        else {
            if (this.options) {
                this.value = [];
                if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                    this.value = [...this.disabledSelectedOptions];
                }

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

            if (this.filterMode) {
                visible = FilterUtils[this.filterMode](option.label, this.filterValue, this.filterLocale);
            }
            else {
                visible = true;
            }

            return visible;
        }
        else {
            return true;
        }
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

    getFilteredOptions() {
        let filteredOptions = [];
        if (this.filterValue) {
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

    setDisabledSelectedOptions(){
        if (this.options) {
            this.disabledSelectedOptions = [];
            if (this.value) {
                for (let opt of this.options) {
                    if (opt.disabled && this.isSelected(opt)) {
                        this.disabledSelectedOptions.push(opt.value);
                    }
                }
            }
        }
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, RippleModule],
    exports: [Listbox, SharedModule],
    declarations: [Listbox]
})
export class ListboxModule { }

