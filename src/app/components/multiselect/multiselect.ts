import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    NgZone,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterService, Footer, Header, OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { Overlay, OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { Scroller, ScrollerModule, ScrollerOptions } from 'primeng/scroller';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils } from 'primeng/utils';

export const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelect),
    multi: true
};

export interface MultiSelectFilterOptions {
    filter?: (value?: any) => void;
    reset?: () => void;
}

export interface MultiselectOnRemoveEvent {
    newValue: object;
    removed: MultiSelectItem;
}

@Component({
    selector: 'p-multiSelectItem',
    template: `
        <li
            class="p-multiselect-item"
            (click)="onOptionClick($event)"
            (keydown)="onOptionKeydown($event)"
            [attr.aria-label]="label"
            [attr.tabindex]="disabled ? null : '0'"
            [ngStyle]="{ height: itemSize + 'px' }"
            [ngClass]="{ 'p-highlight': selected, 'p-disabled': disabled }"
            pRipple
        >
            <div class="p-checkbox p-component">
                <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': selected }">
                    <span class="p-checkbox-icon" [ngClass]="{ 'pi pi-check': selected }"></span>
                </div>
            </div>
            <span *ngIf="!template">{{ label }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class MultiSelectItem {
    @Input() option: any;

    @Input() selected: boolean;

    @Input() label: any;

    @Input() disabled: boolean;

    @Input() itemSize: number;

    @Input() template: TemplateRef<any>;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onKeydown: EventEmitter<any> = new EventEmitter();

    onOptionClick(event: Event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option,
            selected: this.selected
        });
    }

    onOptionKeydown(event: Event) {
        this.onKeydown.emit({
            originalEvent: event,
            option: this.option
        });
    }
}

@Component({
    selector: 'p-multiSelect',
    template: `
        <div
            #container
            [ngClass]="{ 'p-multiselect p-component': true, 'p-multiselect-open': overlayVisible, 'p-multiselect-chip': display === 'chip', 'p-focus': focus, 'p-disabled': disabled }"
            [ngStyle]="style"
            [class]="styleClass"
            (click)="onMouseclick($event, in)"
        >
            <div class="p-hidden-accessible">
                <input
                    #in
                    type="text"
                    [attr.label]="label"
                    readonly="readonly"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    (keydown)="onKeydown($event)"
                    aria-haspopup="listbox"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    role="listbox"
                />
            </div>
            <div class="p-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <div
                    class="p-multiselect-label"
                    [ngClass]="{ 'p-placeholder': valuesAsString === (defaultLabel || placeholder), 'p-multiselect-label-empty': (valuesAsString == null || valuesAsString.length === 0) && (placeholder == null || placeholder.length === 0) }"
                >
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{ valuesAsString || 'empty' }}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of value; let i = index" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{ findLabelByValue(item) }}</span>
                                <span *ngIf="!disabled" class="p-multiselect-token-icon pi pi-times-circle" (click)="removeChip(item, $event)"></span>
                            </div>
                            <ng-container *ngIf="!value || value.length === 0">{{ placeholder || defaultLabel || 'empty' }}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: { $implicit: value }"></ng-container>
                </div>
                <i *ngIf="value != null && filled && !disabled && showClear" class="p-multiselect-clear-icon pi pi-times" (click)="clear($event)"></i>
            </div>
            <div [ngClass]="{ 'p-multiselect-trigger': true }">
                <span class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon"></span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <ng-template pTemplate="content">
                    <div [ngClass]="['p-multiselect-panel p-component']" [ngStyle]="panelStyle" [class]="panelStyleClass" (keydown)="onKeydown($event)">
                        <div class="p-multiselect-header" *ngIf="showHeader">
                            <ng-content select="p-header"></ng-content>
                            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div class="p-checkbox p-component" *ngIf="showToggleAll && !selectionLimit" [ngClass]="{ 'p-checkbox-disabled': disabled || toggleAllDisabled }">
                                    <div class="p-hidden-accessible">
                                        <input
                                            type="checkbox"
                                            readonly="readonly"
                                            [checked]="allChecked"
                                            (focus)="onHeaderCheckboxFocus()"
                                            (blur)="onHeaderCheckboxBlur()"
                                            (keydown.space)="toggleAll($event)"
                                            [disabled]="disabled || toggleAllDisabled"
                                        />
                                    </div>
                                    <div
                                        class="p-checkbox-box"
                                        role="checkbox"
                                        [attr.aria-checked]="allChecked"
                                        [ngClass]="{ 'p-highlight': allChecked, 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled }"
                                        (click)="toggleAll($event)"
                                    >
                                        <span class="p-checkbox-icon" [ngClass]="{ 'pi pi-check': allChecked }"></span>
                                    </div>
                                </div>
                                <div class="p-multiselect-filter-container" *ngIf="filter">
                                    <input
                                        #filterInput
                                        type="text"
                                        [attr.autocomplete]="autocomplete"
                                        role="textbox"
                                        [value]="filterValue || ''"
                                        (input)="onFilterInputChange($event)"
                                        class="p-multiselect-filter p-inputtext p-component"
                                        [disabled]="disabled"
                                        [attr.placeholder]="filterPlaceHolder"
                                        [attr.aria-label]="ariaFilterLabel"
                                    />
                                    <span class="p-multiselect-filter-icon pi pi-search"></span>
                                </div>
                                <button class="p-multiselect-close p-link" type="button" (click)="close($event)" pRipple>
                                    <span class="p-multiselect-close-icon pi pi-times"></span>
                                </button>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="optionsToRender"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [tabindex]="-1"
                                [lazy]="lazy"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions"
                            >
                                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                                </ng-template>
                                <ng-container *ngIf="loaderTemplate">
                                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-scroller>
                            <ng-container *ngIf="!virtualScroll">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: optionsToRender, options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items class="p-multiselect-items p-component" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true">
                                    <ng-container *ngIf="group">
                                        <ng-template ngFor let-optgroup [ngForOf]="items">
                                            <li class="p-multiselect-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(optgroup) || 'empty' }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: optgroup }"></ng-container>
                                            </li>
                                            <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: getOptionGroupChildren(optgroup) }"></ng-container>
                                        </ng-template>
                                    </ng-container>
                                    <ng-container *ngIf="!group">
                                        <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: items }"></ng-container>
                                    </ng-container>
                                    <ng-template #itemslist let-optionsToDisplay let-selectedOption="selectedOption">
                                        <ng-template ngFor let-option let-i="index" [ngForOf]="optionsToDisplay">
                                            <p-multiSelectItem
                                                [option]="option"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                (onClick)="onOptionClick($event)"
                                                (onKeydown)="onOptionKeydown($event)"
                                                [template]="itemTemplate"
                                                [itemSize]="scrollerOptions.itemSize"
                                            ></p-multiSelectItem>
                                        </ng-template>
                                    </ng-template>
                                    <li *ngIf="hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                        </div>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `,
    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focus || overlayVisible',
        '[class.p-multiselect-clearable]': 'showClear && !disabled'
    },
    providers: [MULTISELECT_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./multiselect.css']
})
export class MultiSelect implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, ControlValueAccessor {
    @Input() style: any;

    @Input() styleClass: string;

    @Input() panelStyle: any;

    @Input() panelStyleClass: string;

    @Input() inputId: string;

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() group: boolean;

    @Input() filter: boolean = true;

    @Input() filterPlaceHolder: string;

    @Input() filterLocale: string;

    @Input() overlayVisible: boolean;

    @Input() tabindex: number;

    @Input() appendTo: any;

    @Input() dataKey: string;

    @Input() name: string;

    @Input() label: string;

    @Input() ariaLabelledBy: string;

    @Input() displaySelectedLabel: boolean = true;

    @Input() maxSelectedLabels: number = 3;

    @Input() selectionLimit: number;

    @Input() selectedItemsLabel: string = 'ellipsis';

    @Input() showToggleAll: boolean = true;

    @Input() emptyFilterMessage: string = '';

    @Input() emptyMessage: string = '';

    @Input() resetFilterOnHide: boolean = false;

    @Input() dropdownIcon: string = 'pi pi-chevron-down';

    @Input() optionLabel: string;

    @Input() optionValue: string;

    @Input() optionDisabled: string;

    @Input() optionGroupLabel: string;

    @Input() optionGroupChildren: string = 'items';

    @Input() showHeader: boolean = true;

    @Input() filterBy: string;

    @Input() scrollHeight: string = '200px';

    @Input() lazy: boolean = false;

    @Input() virtualScroll: boolean;

    @Input() virtualScrollItemSize: number;

    @Input() virtualScrollOptions: ScrollerOptions;

    @Input() overlayOptions: OverlayOptions;

    @Input() ariaFilterLabel: string;

    @Input() filterMatchMode: string = 'contains';

    @Input() tooltip: string = '';

    @Input() tooltipPosition: string = 'right';

    @Input() tooltipPositionStyle: string = 'absolute';

    @Input() tooltipStyleClass: string;

    @Input() autofocusFilter: boolean = true;

    @Input() display: string = 'comma';

    @Input() autocomplete: string = 'on';

    @Input() showClear: boolean = false;

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('overlay') overlayViewChild: Overlay;

    @ViewChild('filterInput') filterInputChild: ElementRef;

    @ViewChild('in') accessibleViewChild: ElementRef;

    @ViewChild('items') itemsViewChild: ElementRef;

    @ViewChild('scroller') scroller: Scroller;

    @ContentChild(Footer) footerFacet;

    @ContentChild(Header) headerFacet;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onPanelShow: EventEmitter<any> = new EventEmitter();

    @Output() onPanelHide: EventEmitter<any> = new EventEmitter();

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Output() onRemove: EventEmitter<MultiselectOnRemoveEvent> = new EventEmitter();

    /* @deprecated */
    _autoZIndex: boolean;
    @Input() get autoZIndex(): boolean {
        return this._autoZIndex;
    }
    set autoZIndex(val: boolean) {
        this._autoZIndex = val;
        console.warn('The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }

    /* @deprecated */
    _baseZIndex: number;
    @Input() get baseZIndex(): number {
        return this._baseZIndex;
    }
    set baseZIndex(val: number) {
        this._baseZIndex = val;
        console.warn('The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }

    /* @deprecated */
    _showTransitionOptions: string;
    @Input() get showTransitionOptions(): string {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val: string) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }

    /* @deprecated */
    _hideTransitionOptions: string;
    @Input() get hideTransitionOptions(): string {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val: string) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }

    _defaultLabel: string;

    @Input() set defaultLabel(val: string) {
        this._defaultLabel = val;
        this.updateLabel();
    }

    get defaultLabel(): string {
        return this._defaultLabel;
    }

    _placeholder: string;

    @Input() set placeholder(val: string) {
        this._placeholder = val;
        this.updateLabel();
    }

    get placeholder(): string {
        return this._placeholder;
    }

    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        this._options = val;
        this.updateLabel();
    }

    @Input() get filterValue(): string {
        return this._filterValue;
    }

    set filterValue(val: string) {
        this._filterValue = val;
        this.activateFilter();
    }

    /* @deprecated */
    _itemSize: number;
    @Input() get itemSize(): number {
        return this._itemSize;
    }
    set itemSize(val: number) {
        this._itemSize = val;
        console.warn('The itemSize property is deprecated, use virtualScrollItemSize property instead.');
    }

    public value: any[];

    public _filteredOptions: any[];

    public onModelChange: Function = () => {};

    public onModelTouched: Function = () => {};

    public valuesAsString: string;

    public focus: boolean;

    filled: boolean;

    public _filterValue: string;

    public filtered: boolean;

    public itemTemplate: TemplateRef<any>;

    public groupTemplate: TemplateRef<any>;

    public loaderTemplate: TemplateRef<any>;

    public headerTemplate: TemplateRef<any>;

    public filterTemplate: TemplateRef<any>;

    public footerTemplate: TemplateRef<any>;

    public emptyFilterTemplate: TemplateRef<any>;

    public emptyTemplate: TemplateRef<any>;

    public selectedItemsTemplate: TemplateRef<any>;

    public headerCheckboxFocus: boolean;

    filterOptions: MultiSelectFilterOptions;

    _options: any[];

    maxSelectionLimitReached: boolean;

    preventModelTouched: boolean;

    preventDocumentDefault: boolean;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public zone: NgZone, public filterService: FilterService, public config: PrimeNGConfig, public overlayService: OverlayService) {}

    ngOnInit() {
        this.updateLabel();

        if (this.filterBy) {
            this.filterOptions = {
                filter: (value) => this.onFilterInputChange(value),
                reset: () => this.resetFilter()
            };
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'group':
                    this.groupTemplate = item.template;
                    break;

                case 'selectedItems':
                    this.selectedItemsTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'filter':
                    this.filterTemplate = item.template;
                    break;

                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;

                case 'empty':
                    this.emptyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'loader':
                    this.loaderTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewInit() {
        if (this.overlayVisible) {
            this.show();
        }
    }

    ngAfterViewChecked() {
        if (this.filtered) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.overlayViewChild?.alignOverlay();
                }, 1);
            });

            this.filtered = false;
        }
    }

    getOptionLabel(option: any) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option && option.label != undefined ? option.label : option;
    }

    getOptionValue(option: any) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : !this.optionLabel && option && option.value !== undefined ? option.value : option;
    }

    getOptionGroupLabel(optionGroup: any) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label != undefined ? optionGroup.label : optionGroup;
    }

    getOptionGroupChildren(optionGroup: any) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }

    isOptionDisabled(option: any) {
        let disabled = this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false;
        return disabled || (this.maxSelectionLimitReached && !this.isSelected(option));
    }

    writeValue(value: any): void {
        this.value = value;
        this.updateLabel();
        this.updateFilledState();
        this.checkSelectionLimit();

        this.cd.markForCheck();
    }

    checkSelectionLimit() {
        if (this.selectionLimit && this.value && this.value.length === this.selectionLimit) {
            this.maxSelectionLimitReached = true;
        } else {
            this.maxSelectionLimitReached = false;
        }
    }

    updateFilledState() {
        this.filled = this.value && this.value.length > 0;
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

    onOptionClick(event) {
        let option = event.option;
        if (this.isOptionDisabled(option)) {
            return;
        }

        let optionValue = this.getOptionValue(option);
        let selectionIndex = this.findSelectionIndex(optionValue);
        if (selectionIndex != -1) {
            this.value = this.value.filter((val, i) => i != selectionIndex);
            this.onRemove.emit({ newValue: this.value, removed: optionValue });

            if (this.selectionLimit) {
                this.maxSelectionLimitReached = false;
            }
        } else {
            if (!this.selectionLimit || !this.value || this.value.length < this.selectionLimit) {
                this.value = [...(this.value || []), optionValue];
            }

            this.checkSelectionLimit();
        }

        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event.originalEvent, value: this.value, itemValue: optionValue });
        this.updateLabel();
        this.updateFilledState();
    }

    isSelected(option) {
        return this.findSelectionIndex(this.getOptionValue(option)) != -1;
    }

    findSelectionIndex(val: any): number {
        let index = -1;

        if (this.value) {
            for (let i = 0; i < this.value.length; i++) {
                if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    get toggleAllDisabled(): boolean {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return true;
        } else {
            for (let option of optionsToRender) {
                if (!this.isOptionDisabled(option)) return false;
            }

            return true;
        }
    }

    toggleAll(event) {
        if (this.disabled || this.toggleAllDisabled || this.readonly) {
            return;
        }

        let allChecked = this.allChecked;

        if (allChecked) this.uncheckAll();
        else this.checkAll();

        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        this.updateFilledState();
        this.updateLabel();
        event.preventDefault();
    }

    checkAll() {
        let optionsToRender = this.optionsToRender;
        let val: any[] = [];

        optionsToRender.forEach((opt) => {
            if (!this.group) {
                let optionDisabled = this.isOptionDisabled(opt);
                if (!optionDisabled || (optionDisabled && this.isSelected(opt))) {
                    val.push(this.getOptionValue(opt));
                }
            } else {
                let subOptions = this.getOptionGroupChildren(opt);

                if (subOptions) {
                    subOptions.forEach((option) => {
                        let optionDisabled = this.isOptionDisabled(option);
                        if (!optionDisabled || (optionDisabled && this.isSelected(option))) {
                            val.push(this.getOptionValue(option));
                        }
                    });
                }
            }
        });

        this.value = val;
    }

    uncheckAll() {
        let optionsToRender = this.optionsToRender;
        let val: any[] = [];

        optionsToRender.forEach((opt) => {
            if (!this.group) {
                let optionDisabled = this.isOptionDisabled(opt);
                if (optionDisabled && this.isSelected(opt)) {
                    val.push(this.getOptionValue(opt));
                }
            } else {
                if (opt.items) {
                    opt.items.forEach((option) => {
                        let optionDisabled = this.isOptionDisabled(option);
                        if (optionDisabled && this.isSelected(option)) {
                            val.push(this.getOptionValue(option));
                        }
                    });
                }
            }
        });

        this.value = val;
    }

    show() {
        if (!this.overlayVisible) {
            this.overlayVisible = true;
            this.preventDocumentDefault = true;
            this.cd.markForCheck();
        }
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild.nativeElement);

                if (this.filterInputChild && this.filterInputChild.nativeElement) {
                    this.preventModelTouched = true;

                    if (this.autofocusFilter) {
                        this.filterInputChild.nativeElement.focus();
                    }
                }

                this.onPanelShow.emit();
                break;

            case 'void':
                this.onModelTouched();
                break;
        }
    }

    hide() {
        this.overlayVisible = false;
        if (this.resetFilterOnHide) {
            this.resetFilter();
        }
        this.onPanelHide.emit();
        this.cd.markForCheck();
    }

    resetFilter() {
        if (this.filterInputChild && this.filterInputChild.nativeElement) {
            this.filterInputChild.nativeElement.value = '';
        }

        this._filterValue = null;
        this._filteredOptions = null;
    }

    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }

    clear(event) {
        this.value = null;
        this.updateLabel();
        this.updateFilledState();
        this.onClear.emit();
        this.onModelChange(this.value);
        event.stopPropagation();
    }

    onMouseclick(event: MouseEvent, input) {
        if (this.disabled || this.readonly || (<Node>event.target).isSameNode(this.accessibleViewChild.nativeElement)) {
            return;
        }

        this.onClick.emit(event);

        if (!this.overlayViewChild?.el?.nativeElement?.contains(event.target) && !DomHandler.hasClass(event.target, 'p-multiselect-token-icon')) {
            if (this.overlayVisible) {
                this.hide();
            } else {
                this.show();
            }

            input.focus();
        }
    }

    removeChip(chip: any, event: MouseEvent) {
        this.value = this.value.filter((val) => !ObjectUtils.equals(val, chip, this.dataKey));
        this.onModelChange(this.value);
        this.checkSelectionLimit();
        this.onChange.emit({ originalEvent: event, value: this.value, itemValue: chip });
        this.updateLabel();
        this.updateFilledState();
    }

    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit({ originalEvent: event });
    }

    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit({ originalEvent: event });

        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }

    onOptionKeydown(event) {
        if (this.readonly) {
            return;
        }

        switch (event.originalEvent.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(event.originalEvent.target.parentElement);
                if (nextItem) {
                    nextItem.focus();
                }

                event.originalEvent.preventDefault();
                break;

            //up
            case 38:
                var prevItem = this.findPrevItem(event.originalEvent.target.parentElement);
                if (prevItem) {
                    prevItem.focus();
                }

                event.originalEvent.preventDefault();
                break;

            //enter
            case 13:
                this.onOptionClick(event);
                event.originalEvent.preventDefault();
                break;

            case 27:
            case 9:
                this.hide();
                break;
        }
    }

    findNextItem(item) {
        let nextItem = item.nextElementSibling;

        if (nextItem) return DomHandler.hasClass(nextItem.children[0], 'p-disabled') || DomHandler.isHidden(nextItem.children[0]) || DomHandler.hasClass(nextItem, 'p-multiselect-item-group') ? this.findNextItem(nextItem) : nextItem.children[0];
        else return null;
    }

    findPrevItem(item) {
        let prevItem = item.previousElementSibling;

        if (prevItem) return DomHandler.hasClass(prevItem.children[0], 'p-disabled') || DomHandler.isHidden(prevItem.children[0]) || DomHandler.hasClass(prevItem, 'p-multiselect-item-group') ? this.findPrevItem(prevItem) : prevItem.children[0];
        else return null;
    }

    onKeydown(event: KeyboardEvent) {
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                    event.preventDefault();
                }
                break;

            //space
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;

            //escape
            case 27:
                this.hide();
                break;
        }
    }

    updateLabel() {
        if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
            let label = '';
            for (let i = 0; i < this.value.length; i++) {
                let itemLabel = this.findLabelByValue(this.value[i]);
                if (itemLabel) {
                    if (label.length > 0) {
                        label = label + ', ';
                    }
                    label = label + itemLabel;
                }
            }

            if (this.value.length <= this.maxSelectedLabels || this.selectedItemsLabel === 'ellipsis') {
                this.valuesAsString = label;
            } else {
                let pattern = /{(.*?)}/;
                if (pattern.test(this.selectedItemsLabel)) {
                    this.valuesAsString = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                } else {
                    this.valuesAsString = this.selectedItemsLabel;
                }
            }
        } else {
            this.valuesAsString = this.placeholder || this.defaultLabel;
        }
    }

    findLabelByValue(val: any): string {
        if (this.group) {
            let label = null;

            for (let i = 0; i < this.options.length; i++) {
                let subOptions = this.getOptionGroupChildren(this.options[i]);
                if (subOptions) {
                    label = this.searchLabelByValue(val, subOptions);

                    if (label) {
                        break;
                    }
                }
            }

            return label;
        } else {
            return this.searchLabelByValue(val, this.options);
        }
    }

    searchLabelByValue(val: any, options: any[]): string {
        let label = null;

        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let optionValue = this.getOptionValue(option);

            if ((val == null && optionValue == null) || ObjectUtils.equals(val, optionValue, this.dataKey)) {
                label = this.getOptionLabel(option);
                break;
            }
        }

        return label;
    }

    get allChecked(): boolean {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return false;
        } else {
            let selectedDisabledItemsLength = 0;
            let unselectedDisabledItemsLength = 0;
            let selectedEnabledItemsLength = 0;
            let visibleOptionsLength = this.group ? 0 : this.optionsToRender.length;

            for (let option of optionsToRender) {
                if (!this.group) {
                    let disabled = this.isOptionDisabled(option);
                    let selected = this.isSelected(option);

                    if (disabled) {
                        if (selected) selectedDisabledItemsLength++;
                        else unselectedDisabledItemsLength++;
                    } else {
                        if (selected) selectedEnabledItemsLength++;
                        else return false;
                    }
                } else {
                    for (let opt of this.getOptionGroupChildren(option)) {
                        let disabled = this.isOptionDisabled(opt);
                        let selected = this.isSelected(opt);

                        if (disabled) {
                            if (selected) selectedDisabledItemsLength++;
                            else unselectedDisabledItemsLength++;
                        } else {
                            if (selected) selectedEnabledItemsLength++;
                            else {
                                return false;
                            }
                        }

                        visibleOptionsLength++;
                    }
                }
            }

            return (
                visibleOptionsLength === selectedDisabledItemsLength ||
                visibleOptionsLength === selectedEnabledItemsLength ||
                (selectedEnabledItemsLength && visibleOptionsLength === selectedEnabledItemsLength + unselectedDisabledItemsLength + selectedDisabledItemsLength)
            );
        }
    }

    get optionsToRender(): any[] {
        return this._filteredOptions || this.options;
    }

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    get emptyFilterMessageLabel(): string {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }

    hasFilter() {
        return this._filterValue && this._filterValue.trim().length > 0;
    }

    isEmpty() {
        return !this.optionsToRender || (this.optionsToRender && this.optionsToRender.length === 0);
    }

    onFilterInputChange(event: KeyboardEvent) {
        this._filterValue = (<HTMLInputElement>event.target).value;
        this.activateFilter();
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue });
        this.cd.detectChanges();
    }

    activateFilter() {
        if (this.hasFilter() && this._options) {
            let searchFields: string[] = (this.filterBy || this.optionLabel || 'label').split(',');

            if (this.group) {
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({ ...optgroup, ...{ [this.optionGroupChildren]: filteredSubOptions } });
                    }
                }

                this._filteredOptions = filteredGroups;
            } else {
                this._filteredOptions = this.filterService.filter(this.options, searchFields, this._filterValue, this.filterMatchMode, this.filterLocale);
            }
        } else {
            this._filteredOptions = null;
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
    imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule],
    exports: [MultiSelect, OverlayModule, SharedModule, ScrollerModule],
    declarations: [MultiSelect, MultiSelectItem]
})
export class MultiSelectModule {}
