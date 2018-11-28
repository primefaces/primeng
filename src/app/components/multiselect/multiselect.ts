import { NgModule, Component, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, Input, Output, Renderer2, EventEmitter,
    forwardRef, ViewChild, ChangeDetectorRef, TemplateRef, ContentChildren, QueryList, ContentChild, HostListener } from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/selectitem';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';
import {SharedModule,PrimeTemplate,Footer} from '../common/shared';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelect),
  multi: true
};

@Component({
    selector: 'p-multiSelect',
    template: `
        <div #container [ngClass]="{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-multiselect-open':overlayVisible,'ui-state-focus':focus,'ui-state-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
            (click)="onMouseclick($event,in)">
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly="readonly" [attr.id]="inputId" [attr.name]="name" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
                       [disabled]="disabled" [attr.tabindex]="tabindex">
            </div>
            <div class="ui-multiselect-label-container" [title]="valuesAsString">
                <label class="ui-multiselect-label ui-corner-all">
                    <ng-container *ngIf="!selectedItemsTemplate">{{valuesAsString}}</ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: {$implicit: value}"></ng-container>
                </label>
            </div>
            <div [ngClass]="{'ui-multiselect-trigger ui-state-default ui-corner-right':true}">
                <span class="ui-multiselect-trigger-icon ui-clickable" [ngClass]="dropdownIcon"></span>
            </div>
            <div *ngIf="overlayVisible" [ngClass]="['ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow']" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                [ngStyle]="panelStyle" [class]="panelStyleClass" (click)="panelClick=true">
                <div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix" [ngClass]="{'ui-multiselect-header-no-toggleall': !showToggleAll}" *ngIf="showHeader">
                    <div class="ui-chkbox ui-widget" *ngIf="showToggleAll && !selectionLimit">
                        <div class="ui-helper-hidden-accessible">
                            <input type="checkbox" readonly="readonly" [checked]="isAllChecked()" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)">
                        </div>
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isAllChecked(), 'ui-state-focus': headerCheckboxFocus}" (click)="toggleAll($event)">
                            <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':isAllChecked()}"></span>
                        </div>
                    </div>
                    <div class="ui-multiselect-filter-container" *ngIf="filter">
                        <input #filterInput type="text" role="textbox" [value]="filterValue||''" (input)="onFilter()" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceHolder">
                        <span class="ui-multiselect-filter-icon pi pi-search"></span>
                    </div>
                    <a class="ui-multiselect-close ui-corner-all" tabindex="0" (click)="close($event)" (keydown.enter)="close($event)">
                        <span class="pi pi-times"></span>
                    </a>
                    <ng-content select="p-header"></ng-content>
                </div>
                <div class="ui-multiselect-items-wrapper" [style.max-height]="scrollHeight||'auto'">
                    <ul class="ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
                        <li *ngFor="let option of options; let i = index" class="ui-multiselect-item ui-corner-all" (click)="onItemClick($event,option)"
                            [style.display]="isItemVisible(option) ? 'block' : 'none'" [attr.tabindex]="0"
                            [ngClass]="{'ui-state-highlight': isSelected(option.value), 'ui-state-disabled': option.disabled || (maxSelectionLimitReached && !isSelected(option.value))}">
                            <div class="ui-chkbox ui-widget">
                                <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"
                                    [ngClass]="{'ui-state-active': isSelected(option.value)}">
                                    <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':isSelected(option.value)}"></span>
                                </div>
                            </div>
                            <label *ngIf="!itemTemplate">{{option.label}}</label>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: i}"></ng-container>
                        </li>
                    </ul>
                </div>
                <div class="ui-multiselect-footer ui-widget-content" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            state('void', style({
                transform: 'translateY(5%)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => visible', animate('{{showTransitionParams}}')),
            transition('visible => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [DomHandler,ObjectUtils,MULTISELECT_VALUE_ACCESSOR]
})
export class MultiSelect implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {

    @Input() scrollHeight: string = '200px';

    _defaultLabel: string = 'Choose';

    @Input() set defaultLabel(val: string) {
        this._defaultLabel = val;
        this.updateLabel();
    }

    get defaultLabel(): string {
        return this._defaultLabel;
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
    
    @Input() overlayVisible: boolean;

    @Input() tabindex: number;
    
    @Input() appendTo: any;
    
    @Input() dataKey: string;
    
    @Input() name: string;
    
    @Input() displaySelectedLabel: boolean = true;
    
    @Input() maxSelectedLabels: number = 3;
    
    @Input() selectionLimit: number;
    
    @Input() selectedItemsLabel: string = '{0} items selected';
    
    @Input() showToggleAll: boolean = true;
    
    @Input() resetFilterOnHide: boolean = false;
    
    @Input() dropdownIcon: string = 'pi pi-caret-down';
    
    @Input() optionLabel: string;

    @Input() showHeader: boolean = true;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() filterBy: string = 'label';

    @Input() showTransitionOptions: string = '225ms ease-out';

    @Input() hideTransitionOptions: string = '195ms ease-in';
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('filterInput') filterInputChild: ElementRef;

    @ContentChild(Footer) footerFacet;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    
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
    
    public selfClick: boolean;
    
    public panelClick: boolean;
    
    public filterValue: string;
    
    public visibleOptions: SelectItem[];
    
    public filtered: boolean;
    
    public itemTemplate: TemplateRef<any>;
    
    public selectedItemsTemplate: TemplateRef<any>;
    
    public headerCheckboxFocus: boolean;
    
    _options: any[];
    
    maxSelectionLimitReached: boolean;

    documentResizeListener: any;
    
    focusedOption: any;
    
    focusedIndex: number;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public objectUtils: ObjectUtils, private cd: ChangeDetectorRef) {}
    
    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
        this._options = opts;
        this.updateLabel();
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
        this.cd.markForCheck();
    }

    updateFilledState() {
        this.filled = (this.valuesAsString != null && this.valuesAsString.length > 0);
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
    
    onItemClick(event, option) {
        if (option.disabled) {
            return;
        }
        
        const value = option.value;
        let selectionIndex = this.findSelectionIndex(value);
        if (selectionIndex != -1) {
            this.value = this.value.filter((val,i) => i != selectionIndex);

            if (this.selectionLimit) {
                this.maxSelectionLimitReached = false;
            }
        }
        else {
            if (!this.selectionLimit || (this.value.length < this.selectionLimit)) {
                this.value = [...this.value || [], value];
            }

            if (this.selectionLimit && this.value.length === this.selectionLimit) {
                this.maxSelectionLimitReached = true;
            }
        }
    
        this.focusedOption = option;
        this.onModelChange(this.value);
        this.onChange.emit({originalEvent: event, value: this.value, itemValue: value});
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
                if (this.objectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
    
        return index;
    }
    
    toggleAll(event) {
        if (this.isAllChecked()) {
            this.value = [];
        }
        else {
            let opts = this.getVisibleOptions();
            if (opts) {
                this.value = [];
                for (let i = 0; i < opts.length; i++) {
                    let option = opts[i];

                    if (!option.disabled) {
                        this.value.push(opts[i].value);
                    }
                }
            }
        }
        
        this.onModelChange(this.value);
        this.onChange.emit({originalEvent: event, value: this.value});
        this.updateLabel();
    }
    
    isAllChecked() {
        if (this.filterValue && this.filterValue.trim().length) {
            return this.value && this.visibleOptions&&this.visibleOptions.length && (this.value.length == this.visibleOptions.length);
        }
        else {
            let optionCount = this.getEnabledOptionCount();

            return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount);
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
    
    show() {
        if(!this.overlayVisible){
            this.overlayVisible = true;
        }
    
        if(this.filter) {
            setTimeout(() => {
                if (this.filterInputChild != undefined) {
                    this.filterInputChild.nativeElement.focus();
                }
            }, 200);
        }
        this.bindDocumentClickListener();
        
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
                this.domHandler.appendChild(this.overlay, this.appendTo);

            this.overlay.style.minWidth = this.domHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
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
                this.domHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                this.domHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
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
    }
    
    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }
    
    onMouseclick(event,input) {
        if (this.disabled || this.readonly) {
            return;
        }
        
        if (!this.panelClick) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
        
        this.selfClick = true;
    }
    
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit({originalEvent: event});
    }
    
    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit({originalEvent: event});
        this.onModelTouched();
    }
    
    @HostListener('keydown',['$event'])
    onKeyDown(event:KeyboardEvent){
        let currentOption, opts;
        
        if (this.readonly) {
            return;
        }
        
        if(this.overlayVisible) {
            opts = this.getVisibleOptions();
            currentOption = event.target;
            this.focusedIndex = this.domHandler.indexWithDisplay(currentOption);
            this.focusedOption = opts[this.focusedIndex]
        }
        
        switch(event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                if(this.overlayVisible) {
                    let nextOption = this.findNextOption(currentOption);
                    this.focusedIndex = this.focusedIndex + 1;
                    if (this.focusedIndex != (opts.length)) {
                        this.focusedOption = opts[this.focusedIndex];
                    }
                    if(nextOption) {
                        nextOption.focus();
                    }
                }
                
                event.preventDefault();
                break;
        
            //up
            case 38:
                if(this.overlayVisible ){
                    let prevOption = this.findPrevOption(currentOption);
                    this.focusedIndex = this.focusedIndex - 1;
                    this.focusedOption = opts[this.focusedIndex];
                    if (prevOption) {
                        prevOption.focus();
                    }
                }
    
                event.preventDefault();
                break;
    
            //enter
            case 13:
                if(this.overlayVisible) {
                    if (this.focusedOption) {
                        this.onItemClick(event,this.focusedOption);
                    }
                }
                event.preventDefault();
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
        }
    }
    
    findNextOption(row) {
        let nextOption = row.nextElementSibling;
        if (nextOption) {
            if (this.domHandler.hasClass(nextOption, 'ui-multiselect-item')  && nextOption.style.display == 'block')
                return nextOption;
            else
                return this.findNextOption(nextOption);
        }
        else {
            return null;
        }
    }
    
    findPrevOption(row) {
        let prevOption = row.previousElementSibling;
        if (prevOption) {
            if (this.domHandler.hasClass(prevOption, 'ui-multiselect-item')  && prevOption.style.display == 'block')
                return prevOption;
            else
                return this.findPrevOption(prevOption);
        }
        else {
            return null;
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
                }
            }
        }
        else {
            this.valuesAsString = this.defaultLabel;
        }
    }
    
    findLabelByValue(val: any): string {
        let label = null;
        for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if (val == null && option.value == null || this.objectUtils.equals(val, option.value, this.dataKey)) {
                label = option.label;
                break;
            }
        }
        return label;
    }

    onFilter() {
        let inputValue = this.filterInputChild.nativeElement.value.trim().toLowerCase();
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.visibleOptions = [];
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.visibleOptions = this.options;
            this.filtered = false;
        }

        this.focusedOption = null;
        this.focusedIndex = null;
    }
    
    activateFilter() {
        if (this.options && this.options.length) {
            let searchFields: string[] = this.filterBy.split(',');
            this.visibleOptions = this.objectUtils.filter(this.options, searchFields, this.filterValue);
            this.filtered = true;
        }        
    }
    
    isItemVisible(option: SelectItem): boolean {
        if (this.filterValue && this.filterValue.trim().length) {
            for (let i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    
    getVisibleOptions(): SelectItem[] {
        if (this.visibleOptions && this.visibleOptions.length) {
            return this.visibleOptions;
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
    
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.selfClick && !this.panelClick && this.overlayVisible) {
                    this.hide();
                }
                
                this.selfClick = false;
                this.panelClick = false;
                this.cd.markForCheck();
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
        this.hide();
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
    }

    ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }

}

@NgModule({
    imports: [CommonModule,SharedModule],
    exports: [MultiSelect,SharedModule],
    declarations: [MultiSelect]
})
export class MultiSelectModule { }
