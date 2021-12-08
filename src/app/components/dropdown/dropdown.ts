import {ScrollingModule, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,Input,Output,Renderer2,EventEmitter,ContentChildren,
        QueryList,ViewChild,TemplateRef,forwardRef,ChangeDetectorRef,NgZone,ViewRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {trigger,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {OverlayService, PrimeNGConfig, SelectItem, TranslationKeys} from 'primeng/api';
import {SharedModule,PrimeTemplate, FilterService} from 'primeng/api';
import {DomHandler, ConnectedOverlayScrollHandler} from 'primeng/dom';
import {ObjectUtils,UniqueComponentId,ZIndexUtils} from 'primeng/utils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';
import {RippleModule} from 'primeng/ripple';

export const DROPDOWN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Dropdown),
  multi: true
};

@Component({
    selector: 'p-dropdownItem',
    template: `
        <li (click)="onOptionClick($event)" role="option" pRipple
            [attr.aria-label]="label" [attr.aria-selected]="selected"
            [ngStyle]="{'height': itemSize + 'px'}" [id]="selected ? 'p-highlighted-option':''"
            [ngClass]="{'p-dropdown-item':true, 'p-highlight': selected, 'p-disabled': disabled}">
            <span *ngIf="!template">{{label||'empty'}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `,
    host: {
        'class': 'p-element'
    }
})
export class DropdownItem {

    @Input() option: SelectItem;

    @Input() selected: boolean;

    @Input() label: string;

    @Input() disabled: boolean;

    @Input() visible: boolean;

    @Input() itemSize: number;

    @Input() template: TemplateRef<any>;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    onOptionClick(event: Event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
}

@Component({
    selector: 'p-dropdown',
    template: `
         <div #container [ngClass]="{'p-dropdown p-component':true,
            'p-disabled':disabled, 'p-dropdown-open':overlayVisible, 'p-focus':focused, 'p-dropdown-clearable': showClear && !disabled}"
            (click)="onMouseclick($event)" [ngStyle]="style" [class]="styleClass">
            <div class="p-hidden-accessible">
                <input #in [attr.id]="inputId" type="text" readonly (focus)="onInputFocus($event)" aria-haspopup="listbox" [attr.placeholder]="placeholder"
                    aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" [attr.aria-labelledby]="ariaLabelledBy" (blur)="onInputBlur($event)" (keydown)="onKeydown($event, true)"
                    [disabled]="disabled" [attr.tabindex]="tabindex" [attr.autofocus]="autofocus" [attr.aria-activedescendant]="overlayVisible ? 'p-highlighted-option' : labelId" role="listbox">
            </div>
            <span [attr.id]="labelId" [ngClass]="{'p-dropdown-label p-inputtext':true,'p-dropdown-label-empty':(label == null || label.length === 0)}" *ngIf="!editable && (label != null)" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <ng-container *ngIf="!selectedItemTemplate">{{label||'empty'}}</ng-container>
                <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedOption}"></ng-container>
            </span>
            <span [ngClass]="{'p-dropdown-label p-inputtext p-placeholder':true,'p-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}" *ngIf="!editable && (label == null)">{{placeholder||'empty'}}</span>
            <input #editableInput type="text" [attr.maxlength]="maxlength" class="p-dropdown-label p-inputtext" *ngIf="editable" [disabled]="disabled" [attr.placeholder]="placeholder"
                aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible" (click)="onEditableInputClick()" (input)="onEditableInputChange($event)" (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
            <i class="p-dropdown-clear-icon pi pi-times" (click)="clear($event)" *ngIf="value != null && showClear && !disabled"></i>
            <div class="p-dropdown-trigger" role="button" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible">
                <span class="p-dropdown-trigger-icon" [ngClass]="dropdownIcon"></span>
            </div>
            <div *ngIf="overlayVisible" [ngClass]="'p-dropdown-panel p-component'" (click)="onOverlayClick($event)" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.start)="onOverlayAnimationEnd($event)"onOverlayAnimationEnd [ngStyle]="panelStyle" [class]="panelStyleClass">
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div class="p-dropdown-header" *ngIf="filter" >
                    <div class="p-dropdown-filter-container" (click)="$event.stopPropagation()">
                        <input #filter type="text" autocomplete="off" [value]="filterValue||''" class="p-dropdown-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder"
                        (keydown.enter)="$event.preventDefault()" (keydown)="onKeydown($event, false)" (input)="onFilterInputChange($event)" [attr.aria-label]="ariaFilterLabel" [attr.aria-activedescendant]="overlayVisible ? 'p-highlighted-option' : labelId">
                        <span class="p-dropdown-filter-icon pi pi-search"></span>
                    </div>
                </div>
                <div class="p-dropdown-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
                    <ul [attr.id]="listId" class="p-dropdown-items" [ngClass]="{'p-dropdown-virtualscroll': virtualScroll}" role="listbox">
                        <ng-container *ngIf="group">
                            <ng-template ngFor let-optgroup [ngForOf]="optionsToDisplay">
                                <li class="p-dropdown-item-group">
                                    <span *ngIf="!groupTemplate">{{getOptionGroupLabel(optgroup)||'empty'}}</span>
                                    <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                                </li>
                                <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: getOptionGroupChildren(optgroup), selectedOption: selectedOption}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="!group">
                            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}"></ng-container>
                        </ng-container>
                        <ng-template #itemslist let-options let-selectedOption="selectedOption">
                            <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                                <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                                    <p-dropdownItem [option]="option" [selected]="selectedOption == option" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)"
                                                    (onClick)="onItemClick($event)"
                                                    [template]="itemTemplate"></p-dropdownItem>
                                </ng-template>
                            </ng-container>
                            <ng-template #virtualScrollList>
                                <cdk-virtual-scroll-viewport (scrolledIndexChange)="scrollToSelectedVirtualScrollElement()" #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll && optionsToDisplay && optionsToDisplay.length">
                                    <ng-container *cdkVirtualFor="let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                                        <p-dropdownItem [option]="option" [selected]="selectedOption == option" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)"
                                                                   (onClick)="onItemClick($event)"
                                                                   [template]="itemTemplate"></p-dropdownItem>
                                    </ng-container>
                                </cdk-virtual-scroll-viewport>
                            </ng-template>
                        </ng-template>
                        <li *ngIf="filterValue && isEmpty()" class="p-dropdown-empty-message">
                            <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                {{emptyFilterMessageLabel}}
                            </ng-container>
                            <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                        </li>
                        <li *ngIf="!filterValue && isEmpty()" class="p-dropdown-empty-message">
                            <ng-container *ngIf="!emptyTemplate; else empty">
                                {{emptyMessageLabel}}
                            </ng-container>
                            <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                        </li>
                    </ul>
                </div>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
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
        'class': 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
    },
    providers: [DROPDOWN_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dropdown.css']
})
export class Dropdown implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {

    @Input() scrollHeight: string = '200px';

    @Input() filter: boolean;

    @Input() name: string;

    @Input() style: any;

    @Input() panelStyle: any;

    @Input() styleClass: string;

    @Input() panelStyleClass: string;

    @Input() readonly: boolean;

    @Input() required: boolean;

    @Input() editable: boolean;

    @Input() appendTo: any;

    @Input() tabindex: number;

    @Input() placeholder: string;

    @Input() filterPlaceholder: string;

    @Input() filterLocale: string;

    @Input() inputId: string;

    @Input() selectId: string;

    @Input() dataKey: string;

    @Input() filterBy: string;

    @Input() autofocus: boolean;

    @Input() resetFilterOnHide: boolean = false;

    @Input() dropdownIcon: string = 'pi pi-chevron-down';

    @Input() optionLabel: string;

    @Input() optionValue: string;

    @Input() optionDisabled: string;

    @Input() optionGroupLabel: string;

    @Input() optionGroupChildren: string = "items";

    @Input() autoDisplayFirst: boolean = true;

    @Input() group: boolean;

    @Input() showClear: boolean;

    @Input() emptyFilterMessage: string = '';

    @Input() emptyMessage: string = '';

    @Input() virtualScroll: boolean;

    @Input() itemSize: number;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Input() ariaFilterLabel: string;

    @Input() ariaLabelledBy: string;

    @Input() filterMatchMode: string = "contains";

    @Input() maxlength: number;

    @Input() tooltip: string = '';

    @Input() tooltipPosition: string = 'right';

    @Input() tooltipPositionStyle: string = 'absolute';

    @Input() tooltipStyleClass: string;

    @Input() autofocusFilter: boolean = true;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('filter') filterViewChild: ElementRef;

    @ViewChild('in') accessibleViewChild: ElementRef;

    @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

    @ViewChild('editableInput') editableInputViewChild: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    private _disabled: boolean;

    @Input() get disabled(): boolean {
        return this._disabled;
    };

    set disabled(_disabled: boolean) {
        if (_disabled) {
            this.focused = false;

            if (this.overlayVisible)
                this.hide();
        }

        this._disabled = _disabled;
        if (!(this.cd as ViewRef).destroyed) {
            this.cd.detectChanges();
        }
    }

    overlay: HTMLDivElement;

    itemsWrapper: HTMLDivElement;

    itemTemplate: TemplateRef<any>;

    groupTemplate: TemplateRef<any>;

    selectedItemTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    emptyFilterTemplate: TemplateRef<any>;

    emptyTemplate: TemplateRef<any>;

    selectedOption: any;

    _options: any[];

    value: any;

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    optionsToDisplay: any[];

    hover: boolean;

    focused: boolean;

    overlayVisible: boolean;

    documentClickListener: any;

    scrollHandler: any;

    optionsChanged: boolean;

    panel: HTMLDivElement;

    dimensionsUpdated: boolean;

    hoveredItem: any;

    selectedOptionUpdated: boolean;

    _filterValue: string;

    searchValue: string;

    searchIndex: number;

    searchTimeout: any;

    previousSearchChar: string;

    currentSearchChar: string;

    documentResizeListener: any;

    virtualAutoScrolled: boolean;

    virtualScrollSelectedIndex: number;

    viewPortOffsetTop: number = 0;

    preventModelTouched: boolean;

    id: string = UniqueComponentId();

    labelId: string;

    listId: string;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public zone: NgZone, public filterService: FilterService, public config: PrimeNGConfig, public overlayService: OverlayService) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;

                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                break;

                case 'empty':
                    this.emptyTemplate = item.template;
                break;

                case 'group':
                    this.groupTemplate = item.template;
                break;

                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    ngOnInit() {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
        this.labelId = this.id + '_label';
        this.listId = this.id + '_list';
    }

    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        this._options = val;
        this.optionsToDisplay = this._options;
        this.updateSelectedOption(this.value);
        this.optionsChanged = true;

        if (this._filterValue && this._filterValue.length) {
            this.activateFilter();
        }
    }

    @Input() get filterValue(): string {
        return this._filterValue;
    }

    set filterValue(val: string) {
        this._filterValue = val;
        this.activateFilter();
    }

    ngAfterViewInit() {
        if (this.editable) {
            this.updateEditableLabel();
        }
    }

    get label(): string {
        return this.selectedOption ? this.getOptionLabel(this.selectedOption) : null;
    }

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    get emptyFilterMessageLabel(): string {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }

    get filled() {
        return this.value || this.value != null || this.value != undefined;
    }

    updateEditableLabel(): void {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.getOptionLabel(this.selectedOption) : this.value||'');
        }
    }

    getOptionLabel(option: any) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
    }

    getOptionValue(option: any) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : (this.optionLabel || option.value === undefined ? option : option.value);
    }

    isOptionDisabled(option: any) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
    }

    getOptionGroupLabel(optionGroup: any) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : (optionGroup.label != undefined ? optionGroup.label : optionGroup);
    }

    getOptionGroupChildren(optionGroup: any) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }

    onItemClick(event) {
        const option = event.option;

        if (!this.isOptionDisabled(option)) {
            this.selectItem(event.originalEvent, option);
            this.accessibleViewChild.nativeElement.focus();
        }

        setTimeout(() => {
            this.hide();
        }, 150);
    }

    selectItem(event, option) {
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = this.getOptionValue(option);

            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });

            if (this.virtualScroll) {
                setTimeout(() => {
                    this.viewPortOffsetTop = this.viewPort ? this.viewPort.measureScrollOffset() : 0;
                }, 1);
            }
        }
    }

    ngAfterViewChecked() {
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;

            if (this.virtualScroll) {
                this.updateVirtualScrollSelectedIndex(true);
            }

            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.alignOverlay();
                }, 1);
            });
        }

        if (this.selectedOptionUpdated && this.itemsWrapper) {
            if (this.virtualScroll && this.viewPort) {
                let range = this.viewPort.getRenderedRange();
                this.updateVirtualScrollSelectedIndex(false);

                if (range.start > this.virtualScrollSelectedIndex || range.end < this.virtualScrollSelectedIndex) {
                    this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
                }
            }

            let selectedItem = DomHandler.findSingle(this.overlay, 'li.p-highlight');
            if (selectedItem) {
                DomHandler.scrollInView(this.itemsWrapper, DomHandler.findSingle(this.overlay, 'li.p-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    }

    writeValue(value: any): void {
        if (this.filter) {
            this.resetFilter();
        }

        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.cd.markForCheck();
    }

    resetFilter(): void {
        this._filterValue = null;

        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }

        this.optionsToDisplay = this.options;
    }

    updateSelectedOption(val: any): void {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);

        if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
            this.value = this.getOptionValue(this.selectedOption);
            this.onModelChange(this.value);
        }

        this.selectedOptionUpdated = true;
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

    onMouseclick(event) {
        if (this.disabled || this.readonly || this.isInputClick(event)) {
            return;
        }

        this.onClick.emit(event);
        this.accessibleViewChild.nativeElement.focus();

        if (this.overlayVisible)
            this.hide();
        else
            this.show();

        this.cd.detectChanges();
    }

    onOverlayClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.el.nativeElement
        });
    }

    isInputClick(event): boolean {
        return DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') ||
            event.target.isSameNode(this.accessibleViewChild.nativeElement) ||
            (this.editableInputViewChild && event.target.isSameNode(this.editableInputViewChild.nativeElement));
    }

    isOutsideClicked(event: Event): boolean {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(<Node> event.target)));
    }

    isEmpty() {
        return !this.optionsToDisplay || (this.optionsToDisplay && this.optionsToDisplay.length === 0);
    }

    onEditableInputClick() {
        this.bindDocumentClickListener();
    }

    onEditableInputFocus(event) {
        this.focused = true;
        this.hide();
        this.onFocus.emit(event);
    }

    onEditableInputChange(event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }

    show() {
        this.overlayVisible = true;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                let itemsWrapperSelector = this.virtualScroll ? '.cdk-virtual-scroll-viewport' : '.p-dropdown-items-wrapper';
                this.itemsWrapper = DomHandler.findSingle(this.overlay, itemsWrapperSelector);
                this.appendOverlay();
                if (this.autoZIndex) {
                    ZIndexUtils.set('overlay', this.overlay, this.baseZIndex + this.config.zIndex.overlay);
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();

                if (this.options && this.options.length) {
                    if (!this.virtualScroll) {
                        let selectedListItem = DomHandler.findSingle(this.itemsWrapper, '.p-dropdown-item.p-highlight');

                        if (selectedListItem) {
                            selectedListItem.scrollIntoView({ block: 'nearest', inline: 'start' });
                        }
                    }
                }

                if (this.filterViewChild && this.filterViewChild.nativeElement) {
                    this.preventModelTouched = true;

                    if (this.autofocusFilter) {
                        this.filterViewChild.nativeElement.focus();
                    }
                }

                this.onShow.emit(event);
            break;

            case 'void':
                this.onOverlayHide();
                this.onHide.emit(event);
            break;
        }
    }

    onOverlayAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
            break;
        }
    }

    scrollToSelectedVirtualScrollElement() {
        if (!this.virtualAutoScrolled) {
            if (this.viewPortOffsetTop) {
                this.viewPort.scrollToOffset(this.viewPortOffsetTop);
            }
            else if (this.virtualScrollSelectedIndex > -1) {
                this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
            }
        }

        this.virtualAutoScrolled = true;
    }

    updateVirtualScrollSelectedIndex(resetOffset) {
        if (this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
            if (resetOffset) {
                this.viewPortOffsetTop = 0;
            }

            this.virtualScrollSelectedIndex = this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay);
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

    hide() {
        this.overlayVisible = false;

        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }

        if (this.virtualScroll) {
            this.virtualAutoScrolled = false;
        }

        this.cd.markForCheck();
    }

    alignOverlay() {
        if (this.overlay) {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    }

    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event) {
        this.focused = false;
        this.onBlur.emit(event);

        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }

    findPrevEnabledOption(index) {
        let prevEnabledOption;

        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (let i = (index - 1); 0 <= i; i--) {
                let option = this.optionsToDisplay[i];
                if (this.isOptionDisabled(option)) {
                    continue;
                }
                else {
                    prevEnabledOption = option;
                    break;
                }
            }

            if (!prevEnabledOption) {
                for (let i = this.optionsToDisplay.length - 1; i >= index ; i--) {
                    let option = this.optionsToDisplay[i];
                    if (this.isOptionDisabled(option)) {
                        continue;
                    }
                    else {
                        prevEnabledOption = option;
                        break;
                    }
                }
            }
        }

        return prevEnabledOption;
    }

    findNextEnabledOption(index) {
        let nextEnabledOption;

        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (let i = (index + 1); i < this.optionsToDisplay.length; i++) {
                let option = this.optionsToDisplay[i];
                if (this.isOptionDisabled(option)) {
                    continue;
                }
                else {
                    nextEnabledOption = option;
                    break;
                }
            }

            if (!nextEnabledOption) {
                for (let i = 0; i < index; i++) {
                    let option = this.optionsToDisplay[i];
                    if (this.isOptionDisabled(option)) {
                        continue;
                    }
                    else {
                        nextEnabledOption = option;
                        break;
                    }
                }
            }
        }

        return nextEnabledOption;
    }

    onKeydown(event: KeyboardEvent, search: boolean) {
        if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }

        switch(event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                else {
                    if (this.group) {
                        let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;

                        if (selectedItemIndex !== -1) {
                            let nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if (nextItemIndex < (this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex]).length)) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex + 1])[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
                                this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[0])[0]);
                            }
                        }
                    }
                    else {
                        let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                        let nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                        if (nextEnabledOption) {
                            this.selectItem(event, nextEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                }

                event.preventDefault();

            break;

            //up
            case 38:
                if (this.group) {
                    let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                    if (selectedItemIndex !== -1) {
                        let prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if (prevItemIndex >= 0) {
                            this.selectItem(event, this.getOptionGroupChildren(this.optionsToDisplay[selectedItemIndex.groupIndex])[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if (prevItemIndex < 0) {
                            let prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if (prevGroup) {
                                this.selectItem(event, this.getOptionGroupChildren(prevGroup)[this.getOptionGroupChildren(prevGroup).length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
                    let prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                    if (prevEnabledOption) {
                        this.selectItem(event, prevEnabledOption);
                        this.selectedOptionUpdated = true;
                    }
                }

                event.preventDefault();
            break;

            //space
            case 32:
                if (search) {
                    if (!this.overlayVisible){
                        this.show();
                    }
                    else {
                        this.hide();
                    }

                    event.preventDefault();
                }
            break;

            //enter
            case 13:
                if (this.overlayVisible && (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0))) {
                    this.hide();
                }

                else if (!this.overlayVisible) {
                    this.show();
                }

                event.preventDefault();
            break;

            //escape and tab
            case 27:
            case 9:
                this.hide();
            break;

            //search item based on keyboard input
            default:
                if (search && !event.metaKey) {
                    this.search(event);
                }
            break;
        }
    }

    search(event: KeyboardEvent) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        const char = event.key;
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;

        if (this.previousSearchChar === this.currentSearchChar)
            this.searchValue = this.currentSearchChar;
        else
            this.searchValue = this.searchValue ? this.searchValue + char : char;

        let newOption;
        if (this.group) {
            let searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : {groupIndex: 0, itemIndex: 0};
            newOption = this.searchOptionWithinGroup(searchIndex);
        }
        else {
            let searchIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
            newOption = this.searchOption(++searchIndex);
        }

        if (newOption && !this.isOptionDisabled(newOption)) {
            this.selectItem(event, newOption);
            this.selectedOptionUpdated = true;
        }

        this.searchTimeout = setTimeout(() => {
            this.searchValue = null;
        }, 250);
    }

    searchOption(index) {
        let option;

        if (this.searchValue) {
            option = this.searchOptionInRange(index, this.optionsToDisplay.length);

            if (!option) {
                option = this.searchOptionInRange(0, index);
            }
        }

        return option;
    }

    searchOptionInRange(start, end) {
        for (let i = start; i < end; i++) {
            let opt = this.optionsToDisplay[i];
            if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith((this.searchValue as any).toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                return opt;
            }
        }

        return null;
    }

    searchOptionWithinGroup(index) {
        let option;

        if (this.searchValue) {
            for (let i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                for (let j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.getOptionGroupChildren(this.optionsToDisplay[i]).length; j++) {
                    let opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
                    if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith((this.searchValue as any).toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                        return opt;
                    }
                }
            }

            if (!option) {
                for (let i = 0; i <= index.groupIndex; i++) {
                    for (let j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.getOptionGroupChildren(this.optionsToDisplay[i]).length); j++) {
                        let opt = this.getOptionGroupChildren(this.optionsToDisplay[i])[j];
                        if (this.getOptionLabel(opt).toLocaleLowerCase(this.filterLocale).startsWith((this.searchValue as any).toLocaleLowerCase(this.filterLocale)) && !this.isOptionDisabled(opt)) {
                            return opt;
                        }
                    }
                }
            }
        }

        return null;
    }

    findOptionIndex(val: any, opts: any[]): number {
        let index: number = -1;
        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                if ((val == null && this.getOptionValue(opts[i]) == null) || ObjectUtils.equals(val, this.getOptionValue(opts[i]), this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    findOptionGroupIndex(val: any, opts: any[]): any {
        let groupIndex, itemIndex;

        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, this.getOptionGroupChildren(opts[i]));

                if (itemIndex !== -1) {
                    break;
                }
            }
        }

        if (itemIndex !== -1) {
            return {groupIndex: groupIndex, itemIndex: itemIndex};
        }
        else {
            return -1;
        }
    }

    findOption(val: any, opts: any[], inGroup?: boolean): SelectItem {
        if (this.group && !inGroup) {
            let opt: SelectItem;
            if (opts && opts.length) {
                for (let optgroup of opts) {
                    opt = this.findOption(val, this.getOptionGroupChildren(optgroup), true);
                    if (opt) {
                        break;
                    }
                }
            }
            return opt;
        }
        else {
            let index: number = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    }

    onFilterInputChange(event): void {
        let inputValue = event.target.value;
        if (inputValue && inputValue.length) {
            this._filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this._filterValue = null;
            this.optionsToDisplay = this.options;
        }

        this.optionsChanged = true;
        this.onFilter.emit({originalEvent: event, filter: this._filterValue});
    }

    activateFilter() {
        let searchFields: string[] = (this.filterBy || this.optionLabel || 'label').split(',');

        if (this.options && this.options.length) {
            if (this.group) {
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({...optgroup, ...{[this.optionGroupChildren]: filteredSubOptions}});
                    }
                }

                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = this.filterService.filter(this.options, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
            }

            this.optionsChanged = true;
        }
    }

    applyFocus(): void {
        if (this.editable)
            DomHandler.findSingle(this.el.nativeElement, '.p-dropdown-label.p-inputtext').focus();
        else
            DomHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    }

    focus(): void {
        this.applyFocus();
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                if (this.isOutsideClicked(event)) {
                    this.hide();
                    this.unbindDocumentClickListener();
                }

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
        if (this.overlayVisible && !DomHandler.isTouchDevice()) {
            this.hide();
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.containerViewChild.nativeElement, (event: any) => {
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

    clear(event: Event) {
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.onClear.emit(event);
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
        this.itemsWrapper = null;
        this.onModelTouched();
    }

    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
        }

        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}

@NgModule({
    imports: [CommonModule,SharedModule,ScrollingModule,TooltipModule,RippleModule],
    exports: [Dropdown,SharedModule,ScrollingModule],
    declarations: [Dropdown,DropdownItem]
})
export class DropdownModule { }
