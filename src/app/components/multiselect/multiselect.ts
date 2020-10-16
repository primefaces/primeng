import { NgModule, Component, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, Input, Output, Renderer2, EventEmitter,
    forwardRef, ViewChild, ChangeDetectorRef, TemplateRef, ContentChildren, QueryList, ContentChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { SharedModule, PrimeTemplate, Footer, Header } from 'primeng/api';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterUtils } from 'primeng/utils';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';

export const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelect),
  multi: true
};

@Component({
    selector: 'p-multiSelectItem',
    template: `
        <li class="p-multiselect-item" (click)="onOptionClick($event)" (keydown)="onOptionKeydown($event)" [attr.aria-label]="option.label"
            [attr.tabindex]="option.disabled ? null : '0'" [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'p-highlight': selected, 'p-disabled': (option.disabled || (maxSelectionLimitReached && !selected))}">
            <div class="p-checkbox p-component">
                <div class="p-checkbox-box" [ngClass]="{'p-highlight': selected}">
                    <span class="p-checkbox-icon" [ngClass]="{'pi pi-check': selected}"></span>
                </div>
            </div>
            <span *ngIf="!template">{{option.label}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MultiSelectItem {

    @Input() option: any;

    @Input() selected: boolean;

    @Input() disabled: boolean;

    @Input() itemSize: number;

    @Input() template: TemplateRef<any>;

    @Input() maxSelectionLimitReached: boolean;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onKeydown: EventEmitter<any> = new EventEmitter();

    onOptionClick(event: Event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
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
        <div #container [ngClass]="{'p-multiselect p-component':true,'p-multiselect-open':overlayVisible,'p-focus':focus,'p-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
            (click)="onMouseclick($event,in)">
            <div class="p-hidden-accessible">
                <input #in type="text" readonly="readonly" [attr.id]="inputId" [attr.name]="name" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
                       [disabled]="disabled" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible"
                       [attr.aria-labelledby]="ariaLabelledBy" role="listbox">
            </div>
            <div class="p-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <div class="p-multiselect-label" [ngClass]="{'p-placeholder': valuesAsString === (defaultLabel || placeholder), 'p-multiselect-label-empty': ((valuesAsString == null || valuesAsString.length === 0) && (placeholder == null || placeholder.length === 0))}">
                    <ng-container *ngIf="!selectedItemsTemplate">{{valuesAsString || 'empty'}}</ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: {$implicit: value}"></ng-container>
                </div>
            </div>
            <div [ngClass]="{'p-multiselect-trigger':true}">
                <span class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon"></span>
            </div>
            <div *ngIf="overlayVisible" [ngClass]="['p-multiselect-panel p-component']" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                [ngStyle]="panelStyle" [class]="panelStyleClass" (keydown)="onKeydown($event)">
                <div class="p-multiselect-header" *ngIf="showHeader">
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-checkbox p-component" *ngIf="showToggleAll && !selectionLimit">
                        <div class="p-hidden-accessible">
                            <input type="checkbox" readonly="readonly" [checked]="isAllChecked()" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)">
                        </div>
                        <div class="p-checkbox-box" role="checkbox" [attr.aria-checked]="isAllChecked()" [ngClass]="{'p-highlight':isAllChecked(), 'p-focus': headerCheckboxFocus}" (click)="toggleAll($event)">
                            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':isAllChecked()}"></span>
                        </div>
                    </div>
                    <div class="p-multiselect-filter-container" *ngIf="filter">
                        <input #filterInput type="text" role="textbox" [value]="filterValue||''" (input)="onFilter()" class="p-multiselect-filter p-inputtext p-component" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
                        <span class="p-multiselect-filter-icon pi pi-search"></span>
                    </div>
                    <button class="p-multiselect-close p-link" type="button" (click)="close($event)" pRipple>
                        <span class="p-multiselect-close-icon pi pi-times"></span>
                    </button>
                </div>
                <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
                    <ul class="p-multiselect-items p-component" role="listbox" aria-multiselectable="true">
                        <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                            <ng-template ngFor let-option let-i="index" [ngForOf]="visibleOptions">
                                <p-multiSelectItem [option]="option" [selected]="isSelected(option.value)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                        [maxSelectionLimitReached]="maxSelectionLimitReached" [template]="itemTemplate"></p-multiSelectItem>
                            </ng-template>
                        </ng-container>
                        <ng-template #virtualScrollList>
                            <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll && visibleOptions && visibleOptions.length">
                                <ng-container *cdkVirtualFor="let option of visibleOptions; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                                    <p-multiSelectItem [option]="option" [selected]="isSelected(option.value)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                        [maxSelectionLimitReached]="maxSelectionLimitReached" [template]="itemTemplate" [itemSize]="itemSize"></p-multiSelectItem>
                                </ng-container>
                            </cdk-virtual-scroll-viewport>
                        </ng-template>
                        <li *ngIf="filter && visibleOptions && visibleOptions.length === 0" class="p-multiselect-empty-message">{{emptyFilterMessage}}</li>
                    </ul>
                </div>
                <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('{{showTransitionParams}}')
              ]),
              transition(':leave', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
              ])
        ])
    ],
    host: {
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focus'
    },
    providers: [MULTISELECT_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./multiselect.css']
})
export class MultiSelect implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {

    @Input() scrollHeight: string = '200px';

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

    @Input() style: any;

    @Input() styleClass: string;

    @Input() panelStyle: any;

    @Input() panelStyleClass: string;

    @Input() inputId: string;

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() filter: boolean = true;

    @Input() filterPlaceHolder: string;

    @Input() filterLocale: string;

    @Input() overlayVisible: boolean;

    @Input() tabindex: number;

    @Input() appendTo: any;

    @Input() dataKey: string;

    @Input() name: string;

    @Input() ariaLabelledBy: string;

    @Input() displaySelectedLabel: boolean = true;

    @Input() maxSelectedLabels: number = 3;

    @Input() selectionLimit: number;

    @Input() selectedItemsLabel: string = '{0} items selected';

    @Input() showToggleAll: boolean = true;

    @Input() emptyFilterMessage: string = 'No results found';

    @Input() resetFilterOnHide: boolean = false;

    @Input() dropdownIcon: string = 'pi pi-chevron-down';

    @Input() optionLabel: string;

    @Input() showHeader: boolean = true;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() filterBy: string = 'label';

    @Input() virtualScroll: boolean;

    @Input() itemSize: number;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Input() ariaFilterLabel: string;

    @Input() filterMatchMode: string = "contains";

    @Input() tooltip: string = '';

    @Input() tooltipPosition: string = 'right';

    @Input() tooltipPositionStyle: string = 'absolute';

    @Input() tooltipStyleClass: string;

    @Input() autofocusFilter: boolean = true;

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('filterInput') filterInputChild: ElementRef;

    @ViewChild('in') accessibleViewChild: ElementRef;

    @ContentChild(Footer) footerFacet;

    @ContentChild(Header) headerFacet;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onPanelShow: EventEmitter<any> = new EventEmitter();

    @Output() onPanelHide: EventEmitter<any> = new EventEmitter();

    public value: any[];

    public onModelChange: Function = () => {};

    public onModelTouched: Function = () => {};

    overlay: HTMLDivElement;

    public valuesAsString: string;

    public focus: boolean;

    filled: boolean;

    public documentClickListener: any;

    public filterValue: string;

    public visibleOptions: SelectItem[];

    public disabledSelectedOptions: SelectItem[] = [];

    public filtered: boolean;

    public itemTemplate: TemplateRef<any>;

    public headerTemplate: TemplateRef<any>;

    public footerTemplate: TemplateRef<any>;

    public selectedItemsTemplate: TemplateRef<any>;

    public headerCheckboxFocus: boolean;

    _options: any[];

    maxSelectionLimitReached: boolean;

    scrollHandler: any;

    documentResizeListener: any;

    preventModelTouched: boolean;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef) {}

    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
        this.visibleOptions = opts;
        this._options = opts;
        this.updateLabel();

        if (this.filterValue && this.filterValue.length) {
            this.activateFilter();
        }
    }

    ngOnInit() {
        this.updateLabel();
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'selectedItems':
                    this.selectedItemsTemplate = item.template;
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

    ngAfterViewInit() {
        if (this.overlayVisible) {
            this.show();
        }
    }

    ngAfterViewChecked() {
        if (this.filtered) {
            this.alignOverlay();

            this.filtered = false;
        }
    }

    writeValue(value: any) : void {
        this.value = value;
        this.updateLabel();
        this.updateFilledState();
        this.setDisabledSelectedOptions();
        this.checkSelectionLimit();

        this.cd.markForCheck();
    }

    checkSelectionLimit() {
        if (this.selectionLimit && (this.value && this.value.length === this.selectionLimit)) {
            this.maxSelectionLimitReached = true;
        }
        else {
            this.maxSelectionLimitReached = false;
        }
    }

    updateFilledState() {
        this.filled = (this.value && this.value.length > 0);
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
        if (option.disabled) {
            return;
        }

        const optionValue = option.value;
        let selectionIndex = this.findSelectionIndex(optionValue);
        if (selectionIndex != -1) {
            this.value = this.value.filter((val,i) => i != selectionIndex);

            if (this.selectionLimit) {
                this.maxSelectionLimitReached = false;
            }
        }
        else {
            if (!this.selectionLimit || (!this.value || this.value.length < this.selectionLimit)) {
                this.value = [...this.value || [], optionValue];
            }

            this.checkSelectionLimit();
        }

        this.onModelChange(this.value);
        this.onChange.emit({originalEvent: event.originalEvent, value: this.value, itemValue: optionValue});
        this.updateLabel();
        this.updateFilledState();
    }

    isSelected(value) {
        return this.findSelectionIndex(value) != -1;
    }

    findSelectionIndex(val: any): number {
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

    toggleAll(event: Event) {
        if (this.isAllChecked()) {
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
            let opts = this.getVisibleOptions();
            if (opts) {
                let value = [];
                if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                    value = [...this.disabledSelectedOptions];
                }
                for (let i = 0; i < opts.length; i++) {
                    let option = opts[i];

                    if (!option.disabled) {
                        value.push(opts[i].value);
                    }
                }
                this.value = value;
            }
        }

        this.onModelChange(this.value);
        this.onChange.emit({originalEvent: event, value: this.value});
        this.updateFilledState();
        this.updateLabel();
    }

    isAllChecked() {
        if (this.filterValue && this.filterValue.trim().length) {
            return this.value && this.visibleOptions && this.visibleOptions.length && this.isAllVisibleOptionsChecked();
        }
        else {
            let optionCount = this.getEnabledOptionCount();
            let disabledSelectedOptionCount = this.disabledSelectedOptions.length;

            return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount + disabledSelectedOptionCount);
        }
    }

    isAllVisibleOptionsChecked() {
        if (!this.visibleOptions || this.visibleOptions.length === 0) {
            return false;
        }
        else {
            for (let option of this.visibleOptions) {
                if (!this.isSelected(option.value)) {
                    return false;
                }
            }
            return true;
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

    setDisabledSelectedOptions(){
        if (this.options) {
            this.disabledSelectedOptions = [];
            if (this.value) {
                for (let opt of this.options) {
                    if (opt.disabled && this.isSelected(opt.value)) {
                        this.disabledSelectedOptions.push(opt.value);
                    }
                }
            }
        }
    }

    show() {
        if (!this.overlayVisible){
            this.overlayVisible = true;
        }
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();

                if (this.filterInputChild && this.filterInputChild.nativeElement) {
                    this.preventModelTouched = true;

                    if (this.autofocusFilter) {
                        this.filterInputChild.nativeElement.focus();
                    }
                }

                this.onPanelShow.emit();
            break;

            case 'void':
                this.onOverlayHide();
            break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);

            if (!this.overlay.style.minWidth) {
                this.overlay.style.minWidth = DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
            }
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }

    alignOverlay() {
        if (this.overlay) {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    }

    hide() {
        this.overlayVisible = false;
        this.unbindDocumentClickListener();
        if (this.resetFilterOnHide){
            this.filterInputChild.nativeElement.value = '';
            this.onFilter();
        }
        this.onPanelHide.emit();
        this.cd.markForCheck();
    }

    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }

    onMouseclick(event,input) {
        if (this.disabled || this.readonly || event.target.isSameNode(this.accessibleViewChild.nativeElement)) {
            return;
        }

        this.onClick.emit(event);

        if (!this.isOverlayClick(event)) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
    }

    isOverlayClick(event) {
        return (this.overlay && this.overlay.contains(<Node> event.target));
    }

    isOutsideClicked(event: Event): boolean {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target) || this.isOverlayClick(event));
    }

    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit({originalEvent: event});
    }

    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit({originalEvent: event});

        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }

    onOptionKeydown(event) {
        if (this.readonly) {
            return;
        }

        switch(event.originalEvent.which) {

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
        }
    }

    findNextItem(item) {
        let nextItem = item.nextElementSibling;

        if (nextItem)
            return DomHandler.hasClass(nextItem.children[0], 'p-disabled') || DomHandler.isHidden(nextItem.children[0]) ? this.findNextItem(nextItem) : nextItem.children[0];
        else
            return null;
    }

    findPrevItem(item) {
        let prevItem = item.previousElementSibling;

        if (prevItem)
            return DomHandler.hasClass(prevItem.children[0], 'p-disabled') || DomHandler.isHidden(prevItem.children[0]) ? this.findPrevItem(prevItem) : prevItem.children[0];
        else
            return null;
    }

    onKeydown(event: KeyboardEvent){
        switch(event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                    event.preventDefault();
                }
            break;

            //space
            case 32:
                if (!this.overlayVisible){
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

            if (this.value.length <= this.maxSelectedLabels) {
                this.valuesAsString = label;
            }
            else {
                let pattern = /{(.*?)}/;
                if (pattern.test(this.selectedItemsLabel)) {
                    this.valuesAsString = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                } else {
                    this.valuesAsString = this.selectedItemsLabel;
                }
            }
        }
        else {
            this.valuesAsString = this.placeholder || this.defaultLabel;
        }
    }

    findLabelByValue(val: any): string {
        let label = null;
        for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if (val == null && option.value == null || ObjectUtils.equals(val, option.value, this.dataKey)) {
                label = option.label;
                break;
            }
        }
        return label;
    }

    onFilter() {
        let inputValue = this.filterInputChild.nativeElement.value;
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.visibleOptions = this.options;
            this.filtered = false;
        }
    }

    activateFilter() {
        if (this.options && this.options.length) {
            let searchFields: string[] = this.filterBy.split(',');
            this.visibleOptions = FilterUtils.filter(this.options, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
            this.filtered = true;
        }
    }

    getVisibleOptions(): SelectItem[] {
        return this.visibleOptions || this.options;
    }

    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }

    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                if (this.isOutsideClicked(event)) {
                    this.hide();
                }
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    onWindowResize() {
        if (!DomHandler.isAndroid()) {
            this.hide();
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
        this.onModelTouched();
    }

    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        this.restoreOverlayAppend();
        this.onOverlayHide();
    }

}

@NgModule({
    imports: [CommonModule,SharedModule,ScrollingModule,TooltipModule,RippleModule],
    exports: [MultiSelect,SharedModule,ScrollingModule],
    declarations: [MultiSelect,MultiSelectItem]
})
export class MultiSelectModule { }
