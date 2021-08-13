import { NgModule, Component, ElementRef, Input, Output, Renderer2, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef, ContentChildren, ContentChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { SharedModule, PrimeTemplate, Footer, Header, FilterService, PrimeNGConfig, TranslationKeys } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
export const MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelect),
    multi: true
};
export class MultiSelectItem {
    constructor() {
        this.onClick = new EventEmitter();
        this.onKeydown = new EventEmitter();
    }
    onOptionClick(event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
    onOptionKeydown(event) {
        this.onKeydown.emit({
            originalEvent: event,
            option: this.option
        });
    }
}
MultiSelectItem.decorators = [
    { type: Component, args: [{
                selector: 'p-multiSelectItem',
                template: `
        <li
            aria-atomic="false" aria-describedby="checkDrama" [attr.aria-describedby]="'checkDrama'"
            class="p-multiselect-item" (click)="onOptionClick($event)" (keydown)="onOptionKeydown($event)"
            [attr.tabindex]="disabled ? null : '0'" [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'p-highlight': selected, 'p-disabled': disabled}" pRipple>

            <span class="p-hidden-accessible" value="Checkbox" for="Checkbox">Select</span>
            <div role="checkbox"
                aria-atomic="false" aria-describedby="checkDrama" [attr.aria-describedby]="'checkDrama'"
                 class="p-checkbox p-component">
                <div
                    aria-atomic="false" aria-describedby="checkDrama" [attr.aria-describedby]="'checkDrama'"
                    class="p-checkbox-box" [ngClass]="{'p-highlight': selected}">
                    <span
                        aria-atomic="false" aria-describedby="checkDrama" [attr.aria-describedby]="'checkDrama'"
                        class="p-checkbox-icon" [ngClass]="{'pi pi-check': selected}"></span>
                    <span class="p-hidden-accessible" id="checkDrama">{{label}} {{selected ? 'checked' : 'unchecked'}}</span>
                </div>
            </div>

            <span *ngIf="!template">{{label}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `,
                encapsulation: ViewEncapsulation.None
            },] }
];
MultiSelectItem.propDecorators = {
    option: [{ type: Input }],
    selected: [{ type: Input }],
    label: [{ type: Input }],
    disabled: [{ type: Input }],
    itemSize: [{ type: Input }],
    template: [{ type: Input }],
    onClick: [{ type: Output }],
    onKeydown: [{ type: Output }]
};
export class MultiSelect {
    constructor(el, renderer, cd, filterService, config) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.filterService = filterService;
        this.config = config;
        this.filter = true;
        this.displaySelectedLabel = true;
        this.maxSelectedLabels = 3;
        this.selectedItemsLabel = 'ellipsis';
        this.showToggleAll = true;
        this.emptyFilterMessage = '';
        this.emptyMessage = '';
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-chevron-down';
        this.optionGroupChildren = "items";
        this.showHeader = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
        this.filterMatchMode = "contains";
        this.tooltip = '';
        this.tooltipPosition = 'right';
        this.tooltipPositionStyle = 'absolute';
        this.autofocusFilter = true;
        this.display = 'comma';
        this.onChange = new EventEmitter();
        this.onFilter = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onPanelShow = new EventEmitter();
        this.onPanelHide = new EventEmitter();
        this.scrollHeight = '200px';
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.ariaOptionsSetSize = 0;
    }
    set defaultLabel(val) {
        this._defaultLabel = val;
        this.updateLabel();
    }
    get defaultLabel() {
        return this._defaultLabel;
    }
    set placeholder(val) {
        this._placeholder = val;
        this.updateLabel();
    }
    get placeholder() {
        return this._placeholder;
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        this.updateLabel();
    }
    get filterValue() {
        return this._filterValue;
    }
    set filterValue(val) {
        this._filterValue = val;
        this.activateFilter();
    }
    ngOnInit() {
        this.updateLabel();
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
                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
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
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : (this.optionLabel || option.value === undefined ? option : option.value);
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : (optionGroup.label != undefined ? optionGroup.label : optionGroup);
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }
    isOptionDisabled(option) {
        let disabled = this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
        return (disabled || (this.maxSelectionLimitReached && !this.isSelected(option)));
    }
    writeValue(value) {
        this.value = value;
        this.updateLabel();
        this.updateFilledState();
        this.checkSelectionLimit();
        this.cd.markForCheck();
    }
    checkSelectionLimit() {
        this.maxSelectionLimitReached = this.selectionLimit && (this.value && this.value.length === this.selectionLimit);
    }
    updateFilledState() {
        this.filled = (this.value && this.value.length > 0);
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
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
        this.onChange.emit({ originalEvent: event.originalEvent, value: this.value, itemValue: optionValue });
        this.updateLabel();
        this.updateFilledState();
    }
    isSelected(option) {
        return this.findSelectionIndex(this.getOptionValue(option)) != -1;
    }
    findSelectionIndex(val) {
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
    get toggleAllDisabled() {
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
        this.updateFilledState();
        this.updateLabel();
        event.preventDefault();
    }
    checkAll() {
        let optionsToRender = this.optionsToRender;
        let val = [];
        optionsToRender.forEach(opt => {
            if (!this.group) {
                let optionDisabled = this.isOptionDisabled(opt);
                if (!optionDisabled || (optionDisabled && this.isSelected(opt))) {
                    val.push(this.getOptionValue(opt));
                }
            }
            else {
                let subOptions = this.getOptionGroupChildren(opt);
                if (subOptions) {
                    subOptions.forEach(option => {
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
        const optionsToRender = this.optionsToRender;
        const val = [];
        optionsToRender.forEach(opt => {
            if (!this.group) {
                const optionDisabled = this.isOptionDisabled(opt);
                if (optionDisabled && this.isSelected(opt)) {
                    val.push(this.getOptionValue(opt));
                }
            }
            else {
                if (opt.items) {
                    opt.items.forEach(option => {
                        const optionDisabled = this.isOptionDisabled(option);
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
        }
    }
    onOverlayAnimationStart(event) {
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
        if (this.resetFilterOnHide) {
            this.filterInputChild.nativeElement.value = '';
            this._filterValue = null;
            this._filteredOptions = null;
        }
        this.onPanelHide.emit();
        this.cd.markForCheck();
    }
    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }
    onMouseclick(event, input) {
        if (this.disabled || this.readonly || event.target.isSameNode(this.accessibleViewChild.nativeElement)) {
            return;
        }
        this.onClick.emit(event);
        if (!this.isOverlayClick(event) && !DomHandler.hasClass(event.target, 'p-multiselect-token-icon')) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
    }
    removeChip(chip, event) {
        this.value = this.value.filter(val => !ObjectUtils.equals(val, chip, this.dataKey));
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        this.updateLabel();
        this.updateFilledState();
    }
    isOverlayClick(event) {
        let targetNode = event.target;
        return this.overlay ? (this.overlay.isSameNode(targetNode) || this.overlay.contains(targetNode)) : false;
    }
    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target) || this.isOverlayClick(event));
    }
    /**
     * 2021, search listener
     */
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
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem.children[0], 'p-disabled') || DomHandler.isHidden(nextItem.children[0]) || DomHandler.hasClass(nextItem, 'p-multiselect-item-group') ? this.findNextItem(nextItem) : nextItem.children[0];
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem.children[0], 'p-disabled') || DomHandler.isHidden(prevItem.children[0]) || DomHandler.hasClass(prevItem, 'p-multiselect-item-group') ? this.findPrevItem(prevItem) : prevItem.children[0];
        else
            return null;
    }
    /**
     * 2021, aria key down handler, SEARCH HANDLER
     */
    onKeydown(event) {
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
            }
            else {
                let pattern = /{(.*?)}/;
                if (pattern.test(this.selectedItemsLabel)) {
                    this.valuesAsString = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                }
                else {
                    this.valuesAsString = this.selectedItemsLabel;
                }
            }
        }
        else {
            this.valuesAsString = this.placeholder || this.defaultLabel;
        }
    }
    findLabelByValue(val) {
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
        }
        else {
            return this.searchLabelByValue(val, this.options);
        }
    }
    searchLabelByValue(val, options) {
        let label = null;
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            let optionValue = this.getOptionValue(option);
            if (val == null && optionValue == null || ObjectUtils.equals(val, optionValue, this.dataKey)) {
                label = this.getOptionLabel(option);
                break;
            }
        }
        return label;
    }
    get allChecked() {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return false;
        }
        else {
            let selectedDisabledItemsLength = 0;
            let unselectedDisabledItemsLength = 0;
            let selectedEnabledItemsLength = 0;
            let visibleOptionsLength = this.group ? 0 : this.optionsToRender.length;
            for (let option of optionsToRender) {
                if (!this.group) {
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
                else {
                    for (let opt of this.getOptionGroupChildren(option)) {
                        let disabled = this.isOptionDisabled(opt);
                        let selected = this.isSelected(opt);
                        if (disabled) {
                            if (selected)
                                selectedDisabledItemsLength++;
                            else
                                unselectedDisabledItemsLength++;
                        }
                        else {
                            if (selected)
                                selectedEnabledItemsLength++;
                            else {
                                return false;
                            }
                        }
                        visibleOptionsLength++;
                    }
                }
            }
            return (visibleOptionsLength === selectedDisabledItemsLength
                || visibleOptionsLength === selectedEnabledItemsLength
                || selectedEnabledItemsLength && visibleOptionsLength === (selectedEnabledItemsLength + unselectedDisabledItemsLength + selectedDisabledItemsLength));
        }
    }
    get optionsToRender() {
        var _a, _b;
        this.ariaOptionsSetSize = ((_a = this._filteredOptions) === null || _a === void 0 ? void 0 : _a.length) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.length);
        return this._filteredOptions || this.options;
    }
    get emptyOptions() {
        let optionsToRender = this.optionsToRender;
        return !optionsToRender || optionsToRender.length === 0;
    }
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    get emptyFilterMessageLabel() {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }
    hasFilter() {
        return this._filterValue && this._filterValue.trim().length > 0;
    }
    onFilterInputChange(event) {
        var _a, _b;
        this.ariaOptionsSetSize = ((_a = this._filteredOptions) === null || _a === void 0 ? void 0 : _a.length) || ((_b = this.options) === null || _b === void 0 ? void 0 : _b.length);
        this._filterValue = event.target.value;
        this.activateFilter();
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue });
    }
    activateFilter() {
        if (this.hasFilter() && this._options) {
            let searchFields = (this.filterBy || this.optionLabel || 'label').split(',');
            if (this.group) {
                let searchFields = (this.optionLabel || 'label').split(',');
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push(Object.assign(Object.assign({}, optgroup), { [this.optionGroupChildren]: filteredSubOptions }));
                    }
                }
                this._filteredOptions = filteredGroups;
            }
            else {
                this._filteredOptions = this.filterService.filter(this.options, searchFields, this._filterValue, this.filterMatchMode, this.filterLocale);
            }
        }
        else {
            this._filteredOptions = null;
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
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
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
MultiSelect.decorators = [
    { type: Component, args: [{
                selector: 'p-multiSelect',
                template: `

        <p id="filteredItemsDrama" class="p-hidden-accessible">
            {{ariaOptionsSetSize}} items filtered
        </p>
        <p id="listboxDrama" class="p-hidden-accessible">
            {{ariaOptionsSetSize}} items
        </p>
        <p id="checkboxDrama" class="p-hidden-accessible">
            {{ariaOptionsSetSize}} items checked
        </p>
        <p id="allCheckedDrama" class="p-hidden-accessible">
            {{allChecked ? ' all items checked' : ' all items unchecked'}}
        </p>

        <div #container [ngClass]="{'p-multiselect p-component':true,
            'p-multiselect-open':overlayVisible,
            'p-multiselect-chip': display === 'chip',
            'p-focus':focus,
            'p-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
             (click)="onMouseclick($event,inname)">
            <div class="p-hidden-accessible">
                <input #inname type="text" readonly="readonly" [attr.id]="inputId" [attr.name]="name" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
                       [disabled]="disabled" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)"
                >
            </div>
            <div
                [attr.aria-labelledby]="ariaLabelledBy"
                role="combobox"
                aria-atomic="true" aria-label="" aria-describedby="listboxDrama"

                class="p-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle"
                    [tooltipStyleClass]="tooltipStyleClass">

                <div
                    class="p-multiselect-label"
                     [ngClass]="{'p-placeholder': valuesAsString === (defaultLabel || placeholder), 'p-multiselect-label-empty': ((valuesAsString == null || valuesAsString.length === 0) && (placeholder == null || placeholder.length === 0))}">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{valuesAsString || 'empty'}}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of value; let i = index;" class="p-multiselect-token">
                                <span
                                    role="checkbox" aria-atomic="true" aria-label="" aria-describedby="checkDrama"
                                    class="p-multiselect-token-label">{{findLabelByValue(item)}}</span>
                                <span *ngIf="!disabled" class="p-multiselect-token-icon pi pi-times-circle" (click)="removeChip(item, $event)"></span>
                            </div>
                            <ng-container *ngIf="!value || value.length === 0">{{placeholder || defaultLabel || 'empty'}}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: {$implicit: value}"></ng-container>
                </div>
            </div>
            <div [ngClass]="{'p-multiselect-trigger':true}">
                <span class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon"></span>
            </div>

            <div *ngIf="overlayVisible" [ngClass]="['p-multiselect-panel p-component']"
                 [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                 [ngStyle]="panelStyle" [class]="panelStyleClass" (keydown)="onKeydown($event)">
                <div class="p-multiselect-header"
                            [attr.aria-labelledby]="ariaLabelledBy"
                            itemLabel="Checkbox"
                            [attr.aria-roledescription]="'Select all items'" aria-live="polite"
                            role="checkbox" tabindex="0"
                            aria-atomic="true" aria-label="" aria-describedby="checkDrama"

                            *ngIf="showHeader">
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-checkbox p-component" *ngIf="showToggleAll && !selectionLimit" [ngClass]="{'p-checkbox-disabled': disabled || toggleAllDisabled}">
                        <div class="p-hidden-accessible">
                            <input
                                [tabIndex]="0"
                                type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()"
                                   (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)"
                                   [attr.disabled]="disabled || toggleAllDisabled">
                        </div>
                        <div class="p-checkbox-box" role="checkbox"
                             [ngClass]="{'p-highlight':allChecked, 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled}"
                             (click)="toggleAll($event)">
                            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':allChecked}"></span>
                        </div>
                    </div>
                    <div [pTooltip]="'enter filter text'"
                        class="p-multiselect-filter-container" *ngIf="filter">
                        <input
                            #filterInput type="text" role="textbox" [value]="filterValue||''" (input)="onFilterInputChange($event)" class="p-multiselect-filter p-inputtext p-component" [disabled]="disabled"
                            [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaOptionsSetSize + ' items'">
                        <span class="p-multiselect-filter-icon pi pi-search"></span>
                    </div>
                    <button class="p-multiselect-close p-link" type="button" (click)="close($event)" pRipple>
                        <span class="p-multiselect-close-icon pi pi-times"></span>
                    </button>
                </div>
                <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
                    <ul class="p-multiselect-items p-component" [ngClass]="{'p-multiselect-virtualscroll': virtualScroll}"
                            role="listbox"
                            [attr.aria-label]="ariaOptionsSetSize + ' items'"
                            [attr.aria-describedby]="ariaOptionsSetSize + ' items'" >
                        <ng-container *ngIf="group">
                            <ng-template ngFor let-optgroup [ngForOf]="optionsToRender">
                                <li class="p-multiselect-item-group">
                                    <span *ngIf="!groupTemplate">{{getOptionGroupLabel(optgroup) || 'empty'}}</span>
                                    <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                                </li>
                                <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: getOptionGroupChildren(optgroup)}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="!group">
                            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToRender}"></ng-container>
                        </ng-container>
                        <ng-template #itemslist let-optionsToDisplay let-selectedOption="selectedOption">
                            <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                                <ng-template ngFor let-option let-i="index" [ngForOf]="optionsToDisplay">
                                    <p-multiSelectItem
                                        [attr.aria-describedby]="'pmsVSDrama'"

                                        [option]="option" [selected]="isSelected(option)" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)"
                                        (onClick)="onOptionClick($event)"
                                        (onKeydown)="onOptionKeydown($event)"
                                        [template]="itemTemplate"></p-multiSelectItem>
                                    <p id="pmsVSDrama" class="p-hidden-accessible">
                                        {{options.length}} items shown
                                    </p>
                                </ng-template>
                            </ng-container>
                            <ng-template #virtualScrollList>
                                <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll && !emptyOptions">
                                    <ng-container *cdkVirtualFor="let option of optionsToDisplay; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                                        <p-multiSelectItem [attr.aria-describedby]="'pmsVSDrama'"
                                                           [option]="option" [selected]="isSelected(option)" [label]="getOptionLabel(option)" [disabled]="isOptionDisabled(option)" (onClick)="onOptionClick($event)"
                                                           (onKeydown)="onOptionKeydown($event)"
                                                           [template]="itemTemplate" [itemSize]="itemSize"></p-multiSelectItem>
                                        <p id="pmsVSDrama" class="p-hidden-accessible">
                                            {{options.length}} items shown
                                        </p>
                                    </ng-container>
                                </cdk-virtual-scroll-viewport>
                            </ng-template>
                            <li *ngIf="hasFilter() && emptyOptions" class="p-multiselect-empty-message">
                                <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                    {{emptyFilterMessageLabel}}
                                </ng-container>
                                <ng-template #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-template>
                            </li>
                            <li *ngIf="!hasFilter() && emptyOptions" class="p-multiselect-empty-message">
                                <ng-container *ngIf="!emptyTemplate; else empty">
                                    {{emptyMessageLabel}}
                                </ng-container>
                                <ng-template #empty *ngTemplateOutlet="emptyTemplate"></ng-template>
                            </li>
                        </ng-template>
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
                            style({ opacity: 0, transform: 'scaleY(0.8)' }),
                            animate('{{showTransitionParams}}')
                        ]),
                        transition(':leave', [
                            animate('{{hideTransitionParams}}', style({ opacity: 0 }))
                        ])
                    ])
                ],
                host: {
                    '[class.p-inputwrapper-filled]': 'filled',
                    '[class.p-inputwrapper-focus]': 'focus || overlayVisible'
                },
                providers: [MULTISELECT_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-multiselect{-ms-user-select:none;-webkit-user-select:none;cursor:pointer;display:inline-flex;position:relative;user-select:none}.p-multiselect-trigger{align-items:center;display:flex;flex-shrink:0;justify-content:center}.p-multiselect-label-container{cursor:pointer;flex:1 1 auto;overflow:hidden}.p-multiselect-label{cursor:pointer;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.p-multiselect-label-empty{overflow:hidden;visibility:hidden}.p-multiselect-token{align-items:center;cursor:default;display:inline-flex;flex:0 0 auto}.p-multiselect-token-icon{cursor:pointer}.p-multiselect .p-multiselect-panel{min-width:100%}.p-multiselect-panel{position:absolute}.p-multiselect-items-wrapper{overflow:auto}.p-multiselect-items{list-style-type:none;margin:0;padding:0}.p-multiselect-item{align-items:center;cursor:pointer;display:flex;font-weight:400;overflow:hidden;position:relative;white-space:nowrap}.p-multiselect-header{align-items:center;display:flex;justify-content:space-between}.p-multiselect-filter-container{flex:1 1 auto;position:relative}.p-multiselect-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-multiselect-filter-container .p-inputtext{width:100%}.p-multiselect-close{align-items:center;display:flex;flex-shrink:0;justify-content:center;overflow:hidden;position:relative}.p-fluid .p-multiselect{display:flex}"]
            },] }
];
MultiSelect.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: FilterService },
    { type: PrimeNGConfig }
];
MultiSelect.propDecorators = {
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    panelStyle: [{ type: Input }],
    panelStyleClass: [{ type: Input }],
    inputId: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    group: [{ type: Input }],
    filter: [{ type: Input }],
    filterPlaceHolder: [{ type: Input }],
    filterLocale: [{ type: Input }],
    overlayVisible: [{ type: Input }],
    tabindex: [{ type: Input }],
    appendTo: [{ type: Input }],
    dataKey: [{ type: Input }],
    name: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    displaySelectedLabel: [{ type: Input }],
    maxSelectedLabels: [{ type: Input }],
    selectionLimit: [{ type: Input }],
    selectedItemsLabel: [{ type: Input }],
    showToggleAll: [{ type: Input }],
    emptyFilterMessage: [{ type: Input }],
    emptyMessage: [{ type: Input }],
    resetFilterOnHide: [{ type: Input }],
    dropdownIcon: [{ type: Input }],
    optionLabel: [{ type: Input }],
    optionValue: [{ type: Input }],
    optionDisabled: [{ type: Input }],
    optionGroupLabel: [{ type: Input }],
    optionGroupChildren: [{ type: Input }],
    showHeader: [{ type: Input }],
    autoZIndex: [{ type: Input }],
    baseZIndex: [{ type: Input }],
    filterBy: [{ type: Input }],
    virtualScroll: [{ type: Input }],
    itemSize: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    ariaFilterLabel: [{ type: Input }],
    filterMatchMode: [{ type: Input }],
    tooltip: [{ type: Input }],
    tooltipPosition: [{ type: Input }],
    tooltipPositionStyle: [{ type: Input }],
    tooltipStyleClass: [{ type: Input }],
    autofocusFilter: [{ type: Input }],
    display: [{ type: Input }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }],
    filterInputChild: [{ type: ViewChild, args: ['filterInput',] }],
    accessibleViewChild: [{ type: ViewChild, args: ['inname',] }],
    footerFacet: [{ type: ContentChild, args: [Footer,] }],
    headerFacet: [{ type: ContentChild, args: [Header,] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    onChange: [{ type: Output }],
    onFilter: [{ type: Output }],
    onFocus: [{ type: Output }],
    onBlur: [{ type: Output }],
    onClick: [{ type: Output }],
    onPanelShow: [{ type: Output }],
    onPanelHide: [{ type: Output }],
    scrollHeight: [{ type: Input }],
    defaultLabel: [{ type: Input }],
    placeholder: [{ type: Input }],
    options: [{ type: Input }],
    filterValue: [{ type: Input }]
};
export class MultiSelectModule {
}
MultiSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SharedModule, ScrollingModule, TooltipModule, RippleModule],
                exports: [MultiSelect, SharedModule, ScrollingModule],
                declarations: [MultiSelect, MultiSelectItem]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL211bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsibXVsdGlzZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUF3RSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQ2xKLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQWUsZUFBZSxFQUFhLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SyxPQUFPLEVBQUUsT0FBTyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLDZCQUE2QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6SCxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFB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RW5CLFlBQVksU0FBQyxNQUFNO3dCQUVuQixlQUFlLFNBQUMsYUFBYTt1QkFFN0IsTUFBTTt1QkFFTixNQUFNO3NCQUVOLE1BQU07cUJBRU4sTUFBTTtzQkFFTixNQUFNOzBCQUVOLE1BQU07MEJBRU4sTUFBTTsyQkFFTixLQUFLOzJCQUlMLEtBQUs7MEJBV0wsS0FBSztzQkFTTCxLQUFLOzBCQVNMLEtBQUs7O0FBc3hCVixNQUFNLE9BQU8saUJBQWlCOzs7WUFMN0IsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLGFBQWEsRUFBQyxZQUFZLENBQUM7Z0JBQy9FLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsZUFBZSxDQUFDO2dCQUNuRCxZQUFZLEVBQUUsQ0FBQyxXQUFXLEVBQUMsZUFBZSxDQUFDO2FBQzlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIFJlbmRlcmVyMiwgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlLEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEb21IYW5kbGVyLCBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUsIFByaW1lVGVtcGxhdGUsIEZvb3RlciwgSGVhZGVyLCBGaWx0ZXJTZXJ2aWNlLCBQcmltZU5HQ29uZmlnLCBUcmFuc2xhdGlvbktleXMgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuXG5leHBvcnQgY29uc3QgTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tdWx0aVNlbGVjdEl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxsaVxuICAgICAgICAgICAgYXJpYS1hdG9taWM9XCJmYWxzZVwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjaGVja0RyYW1hXCIgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY2hlY2tEcmFtYSdcIlxuICAgICAgICAgICAgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWl0ZW1cIiAoY2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCIgKGtleWRvd24pPVwib25PcHRpb25LZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpdGVtU2l6ZSArICdweCd9XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1oaWdobGlnaHQnOiBzZWxlY3RlZCwgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiBwUmlwcGxlPlxuXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIiB2YWx1ZT1cIkNoZWNrYm94XCIgZm9yPVwiQ2hlY2tib3hcIj5TZWxlY3Q8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IHJvbGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgYXJpYS1hdG9taWM9XCJmYWxzZVwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjaGVja0RyYW1hXCIgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCInY2hlY2tEcmFtYSdcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cInAtY2hlY2tib3ggcC1jb21wb25lbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtYXRvbWljPVwiZmFsc2VcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY2hlY2tEcmFtYVwiIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NoZWNrRHJhbWEnXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWNoZWNrYm94LWJveFwiIFtuZ0NsYXNzXT1cInsncC1oaWdobGlnaHQnOiBzZWxlY3RlZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtYXRvbWljPVwiZmFsc2VcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY2hlY2tEcmFtYVwiIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ2NoZWNrRHJhbWEnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1jaGVja2JveC1pY29uXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaGVjayc6IHNlbGVjdGVkfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCIgaWQ9XCJjaGVja0RyYW1hXCI+e3tsYWJlbH19IHt7c2VsZWN0ZWQgPyAnY2hlY2tlZCcgOiAndW5jaGVja2VkJ319PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tsYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRpb259XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbGk+XG4gICAgYCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0SXRlbSB7XG5cbiAgICBASW5wdXQoKSBvcHRpb246IGFueTtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbGFiZWw6IGFueTtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgaXRlbVNpemU6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uS2V5ZG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBvbk9wdGlvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIG9wdGlvbjogdGhpcy5vcHRpb25cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25PcHRpb25LZXlkb3duKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uS2V5ZG93bi5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgb3B0aW9uOiB0aGlzLm9wdGlvblxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tdWx0aVNlbGVjdCcsXG4gICAgdGVtcGxhdGU6IGBcblxuICAgICAgICA8cCBpZD1cImZpbHRlcmVkSXRlbXNEcmFtYVwiIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgICAge3thcmlhT3B0aW9uc1NldFNpemV9fSBpdGVtcyBmaWx0ZXJlZFxuICAgICAgICA8L3A+XG4gICAgICAgIDxwIGlkPVwibGlzdGJveERyYW1hXCIgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICB7e2FyaWFPcHRpb25zU2V0U2l6ZX19IGl0ZW1zXG4gICAgICAgIDwvcD5cbiAgICAgICAgPHAgaWQ9XCJjaGVja2JveERyYW1hXCIgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICB7e2FyaWFPcHRpb25zU2V0U2l6ZX19IGl0ZW1zIGNoZWNrZWRcbiAgICAgICAgPC9wPlxuICAgICAgICA8cCBpZD1cImFsbENoZWNrZWREcmFtYVwiIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgICAge3thbGxDaGVja2VkID8gJyBhbGwgaXRlbXMgY2hlY2tlZCcgOiAnIGFsbCBpdGVtcyB1bmNoZWNrZWQnfX1cbiAgICAgICAgPC9wPlxuXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3AtbXVsdGlzZWxlY3QgcC1jb21wb25lbnQnOnRydWUsXG4gICAgICAgICAgICAncC1tdWx0aXNlbGVjdC1vcGVuJzpvdmVybGF5VmlzaWJsZSxcbiAgICAgICAgICAgICdwLW11bHRpc2VsZWN0LWNoaXAnOiBkaXNwbGF5ID09PSAnY2hpcCcsXG4gICAgICAgICAgICAncC1mb2N1cyc6Zm9jdXMsXG4gICAgICAgICAgICAncC1kaXNhYmxlZCc6IGRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgIChjbGljayk9XCJvbk1vdXNlY2xpY2soJGV2ZW50LGlubmFtZSlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbm5hbWUgdHlwZT1cInRleHRcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXG4gICAgICAgICAgICAgICAgYXJpYS1hdG9taWM9XCJ0cnVlXCIgYXJpYS1sYWJlbD1cIlwiIGFyaWEtZGVzY3JpYmVkYnk9XCJsaXN0Ym94RHJhbWFcIlxuXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWxhYmVsLWNvbnRhaW5lclwiIFtwVG9vbHRpcF09XCJ0b29sdGlwXCIgW3Rvb2x0aXBQb3NpdGlvbl09XCJ0b29sdGlwUG9zaXRpb25cIiBbcG9zaXRpb25TdHlsZV09XCJ0b29sdGlwUG9zaXRpb25TdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIFt0b29sdGlwU3R5bGVDbGFzc109XCJ0b29sdGlwU3R5bGVDbGFzc1wiPlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbXVsdGlzZWxlY3QtbGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieydwLXBsYWNlaG9sZGVyJzogdmFsdWVzQXNTdHJpbmcgPT09IChkZWZhdWx0TGFiZWwgfHwgcGxhY2Vob2xkZXIpLCAncC1tdWx0aXNlbGVjdC1sYWJlbC1lbXB0eSc6ICgodmFsdWVzQXNTdHJpbmcgPT0gbnVsbCB8fCB2YWx1ZXNBc1N0cmluZy5sZW5ndGggPT09IDApICYmIChwbGFjZWhvbGRlciA9PSBudWxsIHx8IHBsYWNlaG9sZGVyLmxlbmd0aCA9PT0gMCkpfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNlbGVjdGVkSXRlbXNUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXkgPT09ICdjb21tYSdcIj57e3ZhbHVlc0FzU3RyaW5nIHx8ICdlbXB0eSd9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXkgPT09ICdjaGlwJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgI3Rva2VuICpuZ0Zvcj1cImxldCBpdGVtIG9mIHZhbHVlOyBsZXQgaSA9IGluZGV4O1wiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC10b2tlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImNoZWNrYm94XCIgYXJpYS1hdG9taWM9XCJ0cnVlXCIgYXJpYS1sYWJlbD1cIlwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjaGVja0RyYW1hXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tdWx0aXNlbGVjdC10b2tlbi1sYWJlbFwiPnt7ZmluZExhYmVsQnlWYWx1ZShpdGVtKX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFkaXNhYmxlZFwiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC10b2tlbi1pY29uIHBpIHBpLXRpbWVzLWNpcmNsZVwiIChjbGljayk9XCJyZW1vdmVDaGlwKGl0ZW0sICRldmVudClcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2YWx1ZSB8fCB2YWx1ZS5sZW5ndGggPT09IDBcIj57e3BsYWNlaG9sZGVyIHx8IGRlZmF1bHRMYWJlbCB8fCAnZW1wdHknfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNlbGVjdGVkSXRlbXNUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogdmFsdWV9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieydwLW11bHRpc2VsZWN0LXRyaWdnZXInOnRydWV9XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW11bHRpc2VsZWN0LXRyaWdnZXItaWNvblwiIFtuZ0NsYXNzXT1cImRyb3Bkb3duSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwib3ZlcmxheVZpc2libGVcIiBbbmdDbGFzc109XCJbJ3AtbXVsdGlzZWxlY3QtcGFuZWwgcC1jb21wb25lbnQnXVwiXG4gICAgICAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJwYW5lbFN0eWxlXCIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtaGVhZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1MYWJlbD1cIkNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXJvbGVkZXNjcmlwdGlvbl09XCInU2VsZWN0IGFsbCBpdGVtcydcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJjaGVja2JveFwiIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1hdG9taWM9XCJ0cnVlXCIgYXJpYS1sYWJlbD1cIlwiIGFyaWEtZGVzY3JpYmVkYnk9XCJjaGVja0RyYW1hXCJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0hlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94IHAtY29tcG9uZW50XCIgKm5nSWY9XCJzaG93VG9nZ2xlQWxsICYmICFzZWxlY3Rpb25MaW1pdFwiIFtuZ0NsYXNzXT1cInsncC1jaGVja2JveC1kaXNhYmxlZCc6IGRpc2FibGVkIHx8IHRvZ2dsZUFsbERpc2FibGVkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhYkluZGV4XT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW2NoZWNrZWRdPVwiYWxsQ2hlY2tlZFwiIChmb2N1cyk9XCJvbkhlYWRlckNoZWNrYm94Rm9jdXMoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uSGVhZGVyQ2hlY2tib3hCbHVyKClcIiAoa2V5ZG93bi5zcGFjZSk9XCJ0b2dnbGVBbGwoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRpc2FibGVkXT1cImRpc2FibGVkIHx8IHRvZ2dsZUFsbERpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94LWJveFwiIHJvbGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1oaWdobGlnaHQnOmFsbENoZWNrZWQsICdwLWZvY3VzJzogaGVhZGVyQ2hlY2tib3hGb2N1cywgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCB8fCB0b2dnbGVBbGxEaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlQWxsKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtY2hlY2tib3gtaWNvblwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2hlY2snOmFsbENoZWNrZWR9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFtwVG9vbHRpcF09XCInZW50ZXIgZmlsdGVyIHRleHQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJJbnB1dCB0eXBlPVwidGV4dFwiIHJvbGU9XCJ0ZXh0Ym94XCIgW3ZhbHVlXT1cImZpbHRlclZhbHVlfHwnJ1wiIChpbnB1dCk9XCJvbkZpbHRlcklucHV0Q2hhbmdlKCRldmVudClcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtZmlsdGVyIHAtaW5wdXR0ZXh0IHAtY29tcG9uZW50XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZUhvbGRlclwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYU9wdGlvbnNTZXRTaXplICsgJyBpdGVtcydcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1jbG9zZSBwLWxpbmtcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW11bHRpc2VsZWN0LWNsb3NlLWljb24gcGkgcGktdGltZXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWl0ZW1zLXdyYXBwZXJcIiBbc3R5bGUubWF4LWhlaWdodF09XCJ2aXJ0dWFsU2Nyb2xsID8gJ2F1dG8nIDogKHNjcm9sbEhlaWdodHx8J2F1dG8nKVwiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWl0ZW1zIHAtY29tcG9uZW50XCIgW25nQ2xhc3NdPVwieydwLW11bHRpc2VsZWN0LXZpcnR1YWxzY3JvbGwnOiB2aXJ0dWFsU2Nyb2xsfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYU9wdGlvbnNTZXRTaXplICsgJyBpdGVtcydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiYXJpYU9wdGlvbnNTZXRTaXplICsgJyBpdGVtcydcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW9wdGdyb3VwIFtuZ0Zvck9mXT1cIm9wdGlvbnNUb1JlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWl0ZW0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWdyb3VwVGVtcGxhdGVcIj57e2dldE9wdGlvbkdyb3VwTGFiZWwob3B0Z3JvdXApIHx8ICdlbXB0eSd9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cFRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRncm91cH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1zbGlzdDsgY29udGV4dDogeyRpbXBsaWNpdDogZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRncm91cCl9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtc2xpc3Q7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGlvbnNUb1JlbmRlcn1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNpdGVtc2xpc3QgbGV0LW9wdGlvbnNUb0Rpc3BsYXkgbGV0LXNlbGVjdGVkT3B0aW9uPVwic2VsZWN0ZWRPcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZpcnR1YWxTY3JvbGw7IGVsc2UgdmlydHVhbFNjcm9sbExpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1vcHRpb24gbGV0LWk9XCJpbmRleFwiIFtuZ0Zvck9mXT1cIm9wdGlvbnNUb0Rpc3BsYXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLW11bHRpU2VsZWN0SXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ3Btc1ZTRHJhbWEnXCJcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25dPVwib3B0aW9uXCIgW3NlbGVjdGVkXT1cImlzU2VsZWN0ZWQob3B0aW9uKVwiIFtsYWJlbF09XCJnZXRPcHRpb25MYWJlbChvcHRpb24pXCIgW2Rpc2FibGVkXT1cImlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25LZXlkb3duKT1cIm9uT3B0aW9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGVtcGxhdGVdPVwiaXRlbVRlbXBsYXRlXCI+PC9wLW11bHRpU2VsZWN0SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGlkPVwicG1zVlNEcmFtYVwiIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7b3B0aW9ucy5sZW5ndGh9fSBpdGVtcyBzaG93blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdmlydHVhbFNjcm9sbExpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQgI3ZpZXdwb3J0IFtuZ1N0eWxlXT1cInsnaGVpZ2h0Jzogc2Nyb2xsSGVpZ2h0fVwiIFtpdGVtU2l6ZV09XCJpdGVtU2l6ZVwiICpuZ0lmPVwidmlydHVhbFNjcm9sbCAmJiAhZW1wdHlPcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpjZGtWaXJ0dWFsRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zVG9EaXNwbGF5OyBsZXQgaSA9IGluZGV4OyBsZXQgYyA9IGNvdW50OyBsZXQgZiA9IGZpcnN0OyBsZXQgbCA9IGxhc3Q7IGxldCBlID0gZXZlbjsgbGV0IG8gPSBvZGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1tdWx0aVNlbGVjdEl0ZW0gW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCIncG1zVlNEcmFtYSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbb3B0aW9uXT1cIm9wdGlvblwiIFtzZWxlY3RlZF09XCJpc1NlbGVjdGVkKG9wdGlvbilcIiBbbGFiZWxdPVwiZ2V0T3B0aW9uTGFiZWwob3B0aW9uKVwiIFtkaXNhYmxlZF09XCJpc09wdGlvbkRpc2FibGVkKG9wdGlvbilcIiAob25DbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25LZXlkb3duKT1cIm9uT3B0aW9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiIFtpdGVtU2l6ZV09XCJpdGVtU2l6ZVwiPjwvcC1tdWx0aVNlbGVjdEl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgaWQ9XCJwbXNWU0RyYW1hXCIgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7b3B0aW9ucy5sZW5ndGh9fSBpdGVtcyBzaG93blxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cImhhc0ZpbHRlcigpICYmIGVtcHR5T3B0aW9uc1wiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1lbXB0eS1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlGaWx0ZXJUZW1wbGF0ZSAmJiAhZW1wdHlUZW1wbGF0ZTsgZWxzZSBlbXB0eUZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tlbXB0eUZpbHRlck1lc3NhZ2VMYWJlbH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2VtcHR5RmlsdGVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlGaWx0ZXJUZW1wbGF0ZSB8fCBlbXB0eVRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFoYXNGaWx0ZXIoKSAmJiBlbXB0eU9wdGlvbnNcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtZW1wdHktbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVtcHR5VGVtcGxhdGU7IGVsc2UgZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7ZW1wdHlNZXNzYWdlTGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNlbXB0eSAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWZvb3RlclwiICpuZ0lmPVwiZm9vdGVyRmFjZXQgfHwgZm9vdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZVkoMC44KSd9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzIHx8IG92ZXJsYXlWaXNpYmxlJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vbXVsdGlzZWxlY3QuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3QgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCxBZnRlckNvbnRlbnRJbml0LEFmdGVyVmlld0NoZWNrZWQsT25EZXN0cm95LENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBncm91cDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGZpbHRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJQbGFjZUhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvdmVybGF5VmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgZGF0YUtleTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc3BsYXlTZWxlY3RlZExhYmVsOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIG1heFNlbGVjdGVkTGFiZWxzOiBudW1iZXIgPSAzO1xuXG4gICAgQElucHV0KCkgc2VsZWN0aW9uTGltaXQ6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkSXRlbXNMYWJlbDogc3RyaW5nID0gJ2VsbGlwc2lzJztcblxuICAgIEBJbnB1dCgpIHNob3dUb2dnbGVBbGw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZW1wdHlGaWx0ZXJNZXNzYWdlOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKSByZXNldEZpbHRlck9uSGlkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgZHJvcGRvd25JY29uOiBzdHJpbmcgPSAncGkgcGktY2hldnJvbi1kb3duJztcblxuICAgIEBJbnB1dCgpIG9wdGlvbkxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvcHRpb25WYWx1ZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgb3B0aW9uRGlzYWJsZWQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG9wdGlvbkdyb3VwTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG9wdGlvbkdyb3VwQ2hpbGRyZW46IHN0cmluZyA9IFwiaXRlbXNcIjtcblxuICAgIEBJbnB1dCgpIHNob3dIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgZmlsdGVyQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHZpcnR1YWxTY3JvbGw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBpdGVtU2l6ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMXMgbGluZWFyJztcblxuICAgIEBJbnB1dCgpIGFyaWFGaWx0ZXJMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZmlsdGVyTWF0Y2hNb2RlOiBzdHJpbmcgPSBcImNvbnRhaW5zXCI7XG5cbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nID0gJ3JpZ2h0JztcblxuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvblN0eWxlOiBzdHJpbmcgPSAnYWJzb2x1dGUnO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGF1dG9mb2N1c0ZpbHRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBkaXNwbGF5OiBzdHJpbmcgPSAnY29tbWEnO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVySW5wdXQnKSBmaWx0ZXJJbnB1dENoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5uYW1lJykgYWNjZXNzaWJsZVZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXJGYWNldDtcblxuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXJGYWNldDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25GaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25QYW5lbFNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uUGFuZWxIaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcblxuICAgIF9kZWZhdWx0TGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNldCBkZWZhdWx0TGFiZWwodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZGVmYXVsdExhYmVsID0gdmFsO1xuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdExhYmVsO1xuICAgIH1cblxuICAgIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2V0IHBsYWNlaG9sZGVyKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsO1xuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XG4gICAgfVxuXG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cblxuICAgIHNldCBvcHRpb25zKHZhbDogYW55W10pIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHZhbDtcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBmaWx0ZXJWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyVmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IGZpbHRlclZhbHVlKHZhbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ZpbHRlclZhbHVlID0gdmFsO1xuICAgICAgICB0aGlzLmFjdGl2YXRlRmlsdGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbHVlOiBhbnlbXTtcblxuICAgIHB1YmxpYyBfZmlsdGVyZWRPcHRpb25zOiBhbnlbXTtcblxuICAgIHB1YmxpYyBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb3ZlcmxheTogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgdmFsdWVzQXNTdHJpbmc6IHN0cmluZztcblxuICAgIHB1YmxpYyBmb2N1czogYm9vbGVhbjtcblxuICAgIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcblxuICAgIHB1YmxpYyBfZmlsdGVyVmFsdWU6IHN0cmluZztcblxuICAgIHB1YmxpYyBmaWx0ZXJlZDogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwdWJsaWMgZ3JvdXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHB1YmxpYyBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHB1YmxpYyBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHB1YmxpYyBlbXB0eUZpbHRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHVibGljIGVtcHR5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRJdGVtc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHVibGljIGhlYWRlckNoZWNrYm94Rm9jdXM6IGJvb2xlYW47XG5cbiAgICBfb3B0aW9uczogYW55W107XG5cbiAgICBtYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWQ6IGJvb2xlYW47XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBhbnk7XG5cbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XG5cbiAgICBwcmV2ZW50TW9kZWxUb3VjaGVkOiBib29sZWFuO1xuXG4gICAgYXJpYU9wdGlvbnNTZXRTaXplOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0ZWRJdGVtcyc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1RlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eWZpbHRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlGaWx0ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcblxuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uTGFiZWwob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uTGFiZWwgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25MYWJlbCkgOiAob3B0aW9uLmxhYmVsICE9IHVuZGVmaW5lZCA/IG9wdGlvbi5sYWJlbCA6IG9wdGlvbik7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uVmFsdWUob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uVmFsdWUgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25WYWx1ZSkgOiAodGhpcy5vcHRpb25MYWJlbCB8fCBvcHRpb24udmFsdWUgPT09IHVuZGVmaW5lZCA/IG9wdGlvbiA6IG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uR3JvdXBMYWJlbChvcHRpb25Hcm91cDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkdyb3VwTGFiZWwgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbkdyb3VwLCB0aGlzLm9wdGlvbkdyb3VwTGFiZWwpIDogKG9wdGlvbkdyb3VwLmxhYmVsICE9IHVuZGVmaW5lZCA/IG9wdGlvbkdyb3VwLmxhYmVsIDogb3B0aW9uR3JvdXApO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0aW9uR3JvdXA6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb25Hcm91cCwgdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuKSA6IG9wdGlvbkdyb3VwLml0ZW1zO1xuICAgIH1cblxuICAgIGlzT3B0aW9uRGlzYWJsZWQob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgbGV0IGRpc2FibGVkID0gdGhpcy5vcHRpb25EaXNhYmxlZCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uLCB0aGlzLm9wdGlvbkRpc2FibGVkKSA6IChvcHRpb24uZGlzYWJsZWQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbi5kaXNhYmxlZCA6IGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIChkaXNhYmxlZCB8fCAodGhpcy5tYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWQgJiYgIXRoaXMuaXNTZWxlY3RlZChvcHRpb24pKSk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWwoKTtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLmNoZWNrU2VsZWN0aW9uTGltaXQoKTtcblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGNoZWNrU2VsZWN0aW9uTGltaXQoKSB7XG4gICAgICAgIHRoaXMubWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkID0gdGhpcy5zZWxlY3Rpb25MaW1pdCAmJiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3Rpb25MaW1pdCk7XG4gICAgfVxuXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZmlsbGVkID0gKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25PcHRpb25DbGljayhldmVudCkge1xuICAgICAgICBsZXQgb3B0aW9uID0gZXZlbnQub3B0aW9uO1xuICAgICAgICBpZiAodGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvcHRpb25WYWx1ZSA9IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKTtcbiAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kU2VsZWN0aW9uSW5kZXgob3B0aW9uVmFsdWUpO1xuICAgICAgICBpZiAoc2VsZWN0aW9uSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcigodmFsLGkpID0+IGkgIT0gc2VsZWN0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25MaW1pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0aW9uTGltaXQgfHwgKCF0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUubGVuZ3RoIDwgdGhpcy5zZWxlY3Rpb25MaW1pdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWUgfHwgW10sIG9wdGlvblZhbHVlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGVja1NlbGVjdGlvbkxpbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgdmFsdWU6IHRoaXMudmFsdWUsIGl0ZW1WYWx1ZTogb3B0aW9uVmFsdWV9KTtcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFNlbGVjdGlvbkluZGV4KHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKSkgIT0gLTE7XG4gICAgfVxuXG4gICAgZmluZFNlbGVjdGlvbkluZGV4KHZhbDogYW55KTogbnVtYmVywqB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuZXF1YWxzKHRoaXMudmFsdWVbaV0sIHZhbCwgdGhpcy5kYXRhS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBnZXQgdG9nZ2xlQWxsRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBvcHRpb25zVG9SZW5kZXIgPSB0aGlzLm9wdGlvbnNUb1JlbmRlcjtcbiAgICAgICAgaWYgKCFvcHRpb25zVG9SZW5kZXIgfHwgb3B0aW9uc1RvUmVuZGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBvcHRpb24gb2Ygb3B0aW9uc1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUFsbChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnRvZ2dsZUFsbERpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhbGxDaGVja2VkID0gdGhpcy5hbGxDaGVja2VkO1xuXG4gICAgICAgIGlmIChhbGxDaGVja2VkKVxuICAgICAgICAgICAgdGhpcy51bmNoZWNrQWxsKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuY2hlY2tBbGwoKTtcblxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy52YWx1ZSB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hlY2tBbGwoKSB7XG4gICAgICAgIGxldCBvcHRpb25zVG9SZW5kZXIgPSB0aGlzLm9wdGlvbnNUb1JlbmRlcjtcbiAgICAgICAgbGV0IHZhbDogYW55W10gPSBbXTtcblxuICAgICAgICBvcHRpb25zVG9SZW5kZXIuZm9yRWFjaChvcHQgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbkRpc2FibGVkID0gdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdCk7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25EaXNhYmxlZCB8fCAob3B0aW9uRGlzYWJsZWQgJiYgdGhpcy5pc1NlbGVjdGVkKG9wdCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbC5wdXNoKHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1Yk9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzdWJPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Yk9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbkRpc2FibGVkID0gdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbkRpc2FibGVkIHx8IChvcHRpb25EaXNhYmxlZCAmJiB0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwucHVzaCh0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgfVxuXG4gICAgdW5jaGVja0FsbCgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uc1RvUmVuZGVyID0gdGhpcy5vcHRpb25zVG9SZW5kZXI7XG4gICAgICAgIGNvbnN0IHZhbDogYW55W10gPSBbXTtcblxuICAgICAgICBvcHRpb25zVG9SZW5kZXIuZm9yRWFjaChvcHQgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uRGlzYWJsZWQgPSB0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0KTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uRGlzYWJsZWQgJiYgdGhpcy5pc1NlbGVjdGVkKG9wdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsLnB1c2godGhpcy5nZXRPcHRpb25WYWx1ZShvcHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0Lml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdC5pdGVtcy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25EaXNhYmxlZCA9IHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbkRpc2FibGVkICYmIHRoaXMuaXNTZWxlY3RlZChvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLnB1c2godGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSl7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJJbnB1dENoaWxkICYmIHRoaXMuZmlsdGVySW5wdXRDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmVudE1vZGVsVG91Y2hlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b2ZvY3VzRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblBhbmVsU2hvdy5lbWl0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5LCB0aGlzLmFwcGVuZFRvKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXkuc3R5bGUubWluV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUubWluV2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVPdmVybGF5QXBwZW5kKCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5ICYmIHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpZ25PdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbylcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbGF0aXZlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgaWYgKHRoaXMucmVzZXRGaWx0ZXJPbkhpZGUpe1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dENoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlclZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkT3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblBhbmVsSGlkZS5lbWl0KCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY2xvc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIG9uTW91c2VjbGljayhldmVudDogTW91c2VFdmVudCwgaW5wdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSB8fCAoPE5vZGU+IGV2ZW50LnRhcmdldCkuaXNTYW1lTm9kZSh0aGlzLmFjY2Vzc2libGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNPdmVybGF5Q2xpY2soZXZlbnQpICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtbXVsdGlzZWxlY3QtdG9rZW4taWNvbicpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUNoaXAoY2hpcDogYW55LCBldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIodmFsID0+ICFPYmplY3RVdGlscy5lcXVhbHModmFsLCBjaGlwLCB0aGlzLmRhdGFLZXkpKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IHRoaXMudmFsdWUgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWwoKTtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIGlzT3ZlcmxheUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGxldCB0YXJnZXROb2RlID0gPE5vZGU+IGV2ZW50LnRhcmdldDtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheSA/ICh0aGlzLm92ZXJsYXkuaXNTYW1lTm9kZSh0YXJnZXROb2RlKSB8fCB0aGlzLm92ZXJsYXkuY29udGFpbnModGFyZ2V0Tm9kZSkpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgaXNPdXRzaWRlQ2xpY2tlZChldmVudDogTW91c2VFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShldmVudC50YXJnZXQpIHx8IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8IHRoaXMuaXNPdmVybGF5Q2xpY2soZXZlbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAyMDIxLCBzZWFyY2ggbGlzdGVuZXJcbiAgICAgKi9cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudH0pO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnR9KTtcblxuICAgICAgICBpZiAoIXRoaXMucHJldmVudE1vZGVsVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldmVudE1vZGVsVG91Y2hlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uT3B0aW9uS2V5ZG93bihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoKGV2ZW50Lm9yaWdpbmFsRXZlbnQud2hpY2gpIHtcblxuICAgICAgICAgICAgLy9kb3duXG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHZhciBuZXh0SXRlbSA9IHRoaXMuZmluZE5leHRJdGVtKGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0SXRlbS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy91cFxuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICB2YXIgcHJldkl0ZW0gPSB0aGlzLmZpbmRQcmV2SXRlbShldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEl0ZW0oaXRlbSkge1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBpdGVtLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAobmV4dEl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbS5jaGlsZHJlblswXSwgJ3AtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKG5leHRJdGVtLmNoaWxkcmVuWzBdKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRJdGVtLCAncC1tdWx0aXNlbGVjdC1pdGVtLWdyb3VwJykgPyB0aGlzLmZpbmROZXh0SXRlbShuZXh0SXRlbSkgOiBuZXh0SXRlbS5jaGlsZHJlblswXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtKGl0ZW0pIHtcbiAgICAgICAgbGV0IHByZXZJdGVtID0gaXRlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChwcmV2SXRlbSlcbiAgICAgICAgICAgIHJldHVybiBEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZJdGVtLmNoaWxkcmVuWzBdLCAncC1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4ocHJldkl0ZW0uY2hpbGRyZW5bMF0pIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICdwLW11bHRpc2VsZWN0LWl0ZW0tZ3JvdXAnKSA/IHRoaXMuZmluZFByZXZJdGVtKHByZXZJdGVtKSA6IHByZXZJdGVtLmNoaWxkcmVuWzBdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAyMDIxLCBhcmlhIGtleSBkb3duIGhhbmRsZXIsIFNFQVJDSCBIQU5ETEVSXG4gICAgICovXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KXtcbiAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Rvd25cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vc3BhY2VcbiAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2VzY2FwZVxuICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdXBkYXRlTGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMub3B0aW9ucyAmJiB0aGlzLnZhbHVlLmxlbmd0aCAmJiB0aGlzLmRpc3BsYXlTZWxlY3RlZExhYmVsKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSAnJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtTGFiZWwgPSB0aGlzLmZpbmRMYWJlbEJ5VmFsdWUodGhpcy52YWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1MYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYWJlbCArICcsICc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYWJlbCArIGl0ZW1MYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA8PSB0aGlzLm1heFNlbGVjdGVkTGFiZWxzIHx8IHRoaXMuc2VsZWN0ZWRJdGVtc0xhYmVsID09PSAnZWxsaXBzaXMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNBc1N0cmluZyA9IGxhYmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhdHRlcm4gPSAveyguKj8pfS87XG4gICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4udGVzdCh0aGlzLnNlbGVjdGVkSXRlbXNMYWJlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNBc1N0cmluZyA9IHRoaXMuc2VsZWN0ZWRJdGVtc0xhYmVsLnJlcGxhY2UodGhpcy5zZWxlY3RlZEl0ZW1zTGFiZWwubWF0Y2gocGF0dGVybilbMF0sIHRoaXMudmFsdWUubGVuZ3RoICsgJycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzQXNTdHJpbmcgPSB0aGlzLnNlbGVjdGVkSXRlbXNMYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc0FzU3RyaW5nID0gdGhpcy5wbGFjZWhvbGRlciB8fCB0aGlzLmRlZmF1bHRMYWJlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRMYWJlbEJ5VmFsdWUodmFsOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc3ViT3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbih0aGlzLm9wdGlvbnNbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChzdWJPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5zZWFyY2hMYWJlbEJ5VmFsdWUodmFsLCBzdWJPcHRpb25zKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hMYWJlbEJ5VmFsdWUodmFsLCB0aGlzLm9wdGlvbnMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWFyY2hMYWJlbEJ5VmFsdWUodmFsOiBhbnksIG9wdGlvbnM6IGFueVtdKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGxhYmVsID0gbnVsbDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvcHRpb24gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgbGV0IG9wdGlvblZhbHVlID0gdGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pO1xuXG4gICAgICAgICAgICBpZiAodmFsID09IG51bGwgJiYgb3B0aW9uVmFsdWUgPT0gbnVsbCB8fCBPYmplY3RVdGlscy5lcXVhbHModmFsLCBvcHRpb25WYWx1ZSwgdGhpcy5kYXRhS2V5KSkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5nZXRPcHRpb25MYWJlbChvcHRpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH1cblxuICAgIGdldCBhbGxDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgb3B0aW9uc1RvUmVuZGVyID0gdGhpcy5vcHRpb25zVG9SZW5kZXI7XG4gICAgICAgIGlmICghb3B0aW9uc1RvUmVuZGVyIHx8IG9wdGlvbnNUb1JlbmRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZERpc2FibGVkSXRlbXNMZW5ndGggPSAwO1xuICAgICAgICAgICAgbGV0IHVuc2VsZWN0ZWREaXNhYmxlZEl0ZW1zTGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVuYWJsZWRJdGVtc0xlbmd0aCA9IDA7XG4gICAgICAgICAgICBsZXQgdmlzaWJsZU9wdGlvbnNMZW5ndGggPSB0aGlzLmdyb3VwID8gMCA6IHRoaXMub3B0aW9uc1RvUmVuZGVyLmxlbmd0aDtcblxuICAgICAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIG9wdGlvbnNUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREaXNhYmxlZEl0ZW1zTGVuZ3RoKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zZWxlY3RlZERpc2FibGVkSXRlbXNMZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEVuYWJsZWRJdGVtc0xlbmd0aCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSB0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChvcHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGlzYWJsZWRJdGVtc0xlbmd0aCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zZWxlY3RlZERpc2FibGVkSXRlbXNMZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRFbmFibGVkSXRlbXNMZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZU9wdGlvbnNMZW5ndGgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh2aXNpYmxlT3B0aW9uc0xlbmd0aCA9PT0gc2VsZWN0ZWREaXNhYmxlZEl0ZW1zTGVuZ3RoXG4gICAgICAgICAgICAgICAgfHwgdmlzaWJsZU9wdGlvbnNMZW5ndGggPT09IHNlbGVjdGVkRW5hYmxlZEl0ZW1zTGVuZ3RoXG4gICAgICAgICAgICAgICAgfHzCoHNlbGVjdGVkRW5hYmxlZEl0ZW1zTGVuZ3RoICYmIHZpc2libGVPcHRpb25zTGVuZ3RoID09PSAoc2VsZWN0ZWRFbmFibGVkSXRlbXNMZW5ndGggKyB1bnNlbGVjdGVkRGlzYWJsZWRJdGVtc0xlbmd0aCArIHNlbGVjdGVkRGlzYWJsZWRJdGVtc0xlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG9wdGlvbnNUb1JlbmRlcigpOiBhbnlbXSB7XG4gICAgICAgIHRoaXMuYXJpYU9wdGlvbnNTZXRTaXplID0gdGhpcy5fZmlsdGVyZWRPcHRpb25zPy5sZW5ndGggfHwgdGhpcy5vcHRpb25zPy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJlZE9wdGlvbnMgfHwgdGhpcy5vcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBlbXB0eU9wdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBvcHRpb25zVG9SZW5kZXIgPSB0aGlzLm9wdGlvbnNUb1JlbmRlcjtcbiAgICAgICAgcmV0dXJuICFvcHRpb25zVG9SZW5kZXIgfHwgb3B0aW9uc1RvUmVuZGVyLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlNZXNzYWdlTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9NRVNTQUdFKTtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlGaWx0ZXJNZXNzYWdlTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlGaWx0ZXJNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9GSUxURVJfTUVTU0FHRSk7XG4gICAgfVxuXG4gICAgaGFzRmlsdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyVmFsdWUgJiYgdGhpcy5fZmlsdGVyVmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgb25GaWx0ZXJJbnB1dENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hcmlhT3B0aW9uc1NldFNpemUgPSB0aGlzLl9maWx0ZXJlZE9wdGlvbnM/Lmxlbmd0aCB8fCB0aGlzLm9wdGlvbnM/Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5fZmlsdGVyVmFsdWUgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWU7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5vbkZpbHRlci5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgZmlsdGVyOiB0aGlzLl9maWx0ZXJWYWx1ZX0pO1xuICAgIH1cblxuICAgIGFjdGl2YXRlRmlsdGVyKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSAmJiB0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoRmllbGRzOiBzdHJpbmdbXSA9ICh0aGlzLmZpbHRlckJ5IHx8wqB0aGlzLm9wdGlvbkxhYmVsIHx8ICdsYWJlbCcpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cCkge1xuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hGaWVsZHM6IHN0cmluZ1tdID0gKHRoaXMub3B0aW9uTGFiZWwgfHwgJ2xhYmVsJykuc3BsaXQoJywnKTtcblxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZEdyb3VwcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG9wdGdyb3VwIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRTdWJPcHRpb25zID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcih0aGlzLmdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0Z3JvdXApLCBzZWFyY2hGaWVsZHMsIHRoaXMuZmlsdGVyVmFsdWUsIHRoaXMuZmlsdGVyTWF0Y2hNb2RlLCB0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZFN1Yk9wdGlvbnMgJiYgZmlsdGVyZWRTdWJPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRHcm91cHMucHVzaCh7Li4ub3B0Z3JvdXAsIC4uLntbdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuXTogZmlsdGVyZWRTdWJPcHRpb25zfX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRPcHRpb25zID0gZmlsdGVyZWRHcm91cHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmZpbHRlclNlcnZpY2UuZmlsdGVyKHRoaXMub3B0aW9ucywgc2VhcmNoRmllbGRzLCB0aGlzLl9maWx0ZXJWYWx1ZSwgdGhpcy5maWx0ZXJNYXRjaE1vZGUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkT3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhlYWRlckNoZWNrYm94Rm9jdXMoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyQ2hlY2tib3hGb2N1cyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25IZWFkZXJDaGVja2JveEJsdXIoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyQ2hlY2tib3hGb2N1cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGRvY3VtZW50VGFyZ2V0OiBhbnkgPSB0aGlzLmVsID8gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQgOiAnZG9jdW1lbnQnO1xuXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKGRvY3VtZW50VGFyZ2V0LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dHNpZGVDbGlja2VkKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICghRG9tSGFuZGxlci5pc0FuZHJvaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBuZXcgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3ZlcmxheUhpZGUoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IG51bGw7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XG4gICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsU2hhcmVkTW9kdWxlLFNjcm9sbGluZ01vZHVsZSxUb29sdGlwTW9kdWxlLFJpcHBsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW011bHRpU2VsZWN0LFNoYXJlZE1vZHVsZSxTY3JvbGxpbmdNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW011bHRpU2VsZWN0LE11bHRpU2VsZWN0SXRlbV1cbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RNb2R1bGUgeyB9XG4iXX0=