import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    IterableDiffers,
    NgModule,
    NgZone,
    OnDestroy,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { InputTextModule } from 'primeng/inputtext';
import { Overlay, OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { Scroller, ScrollerModule, ScrollerOptions } from 'primeng/scroller';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { TimesIcon } from 'primeng/icons/times';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';

export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoComplete),
    multi: true
};

@Component({
    selector: 'p-autoComplete',
    template: `
        <span #container [ngClass]="{ 'p-autocomplete p-component': true, 'p-autocomplete-dd': dropdown, 'p-autocomplete-multiple': multiple }" [ngStyle]="style" [class]="styleClass">
            <input
                pAutoFocus
                [autofocus]="autofocus"
                *ngIf="!multiple"
                #in
                [attr.type]="type"
                [attr.id]="inputId"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [autocomplete]="autocomplete"
                [attr.required]="required"
                [attr.name]="name"
                class="p-autocomplete-input p-inputtext p-component"
                [ngClass]="{ 'p-autocomplete-dd-input': dropdown, 'p-disabled': disabled }"
                [value]="inputFieldValue"
                aria-autocomplete="list"
                role="searchbox"
                (click)="onInputClick($event)"
                (input)="onInput($event)"
                (keydown)="onKeydown($event)"
                (keyup)="onKeyup($event)"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (change)="onInputChange($event)"
                (paste)="onInputPaste($event)"
                [attr.placeholder]="placeholder"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [readonly]="readonly"
                [disabled]="disabled"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-required]="required"
            />
            <ng-container *ngIf="filled && !disabled && showClear">
                <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-autocomplete-clear-icon'" (click)="clear()" />
                <span *ngIf="clearIconTemplate" class="p-autocomplete-clear-icon" (click)="clear()">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ul *ngIf="multiple" #multiContainer class="p-autocomplete-multiple-container p-component p-inputtext" [ngClass]="{ 'p-disabled': disabled, 'p-focus': focus }" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value" class="p-autocomplete-token">
                    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: { $implicit: val }"></ng-container>
                    <span *ngIf="!selectedItemTemplate" class="p-autocomplete-token-label">{{ resolveFieldData(val) }}</span>
                    <span class="p-autocomplete-token-icon" (click)="removeItem(token)">
                        <TimesCircleIcon [styleClass]="'p-autocomplete-token-icon'" *ngIf="!removeIconTemplate" />
                        <span *ngIf="removeIconTemplate" class="p-autocomplete-token-icon">
                            <ng-template *ngTemplateOutlet="removeIconTemplate"></ng-template>
                        </span>
                    </span>
                </li>
                <li class="p-autocomplete-input-token">
                    <input
                        pAutoFocus
                        [autofocus]="autofocus"
                        #multiIn
                        [attr.type]="type"
                        [attr.id]="inputId"
                        [disabled]="disabled"
                        [attr.placeholder]="value && value.length ? null : placeholder"
                        [attr.tabindex]="tabindex"
                        [attr.maxlength]="maxlength"
                        (input)="onInput($event)"
                        (click)="onInputClick($event)"
                        (keydown)="onKeydown($event)"
                        [readonly]="readonly"
                        (keyup)="onKeyup($event)"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        (change)="onInputChange($event)"
                        (paste)="onInputPaste($event)"
                        [autocomplete]="autocomplete"
                        [ngStyle]="inputStyle"
                        [class]="inputStyleClass"
                        [attr.aria-label]="ariaLabel"
                        [attr.aria-labelledby]="ariaLabelledBy"
                        [attr.aria-required]="required"
                        aria-autocomplete="list"
                        [attr.aria-controls]="listId"
                        role="searchbox"
                        [attr.aria-expanded]="overlayVisible"
                        aria-haspopup="true"
                        [attr.aria-activedescendant]="'p-highlighted-option'"
                    />
                </li>
            </ul>
            <ng-container *ngIf="loading">
                <SpinnerIcon *ngIf="!loadingIconTemplate" [styleClass]="'p-autocomplete-loader'" [spin]="true" />
                <span *ngIf="loadingIconTemplate" class="p-autocomplete-loader pi-spin ">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <button #ddBtn type="button" pButton [attr.aria-label]="dropdownAriaLabel" class="p-autocomplete-dropdown p-button-icon-only" [disabled]="disabled" pRipple (click)="handleDropdownClick($event)" *ngIf="dropdown" [attr.tabindex]="tabindex">
                <span *ngIf="dropdownIcon" [ngClass]="dropdownIcon"></span>
                <ng-container *ngIf="!dropdownIcon">
                    <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </ng-container>
            </button>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="virtualScrollOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onShow)="show($event)"
                (onHide)="hide($event)"
            >
                <div [ngClass]="['p-autocomplete-panel p-component']" [style.max-height]="virtualScroll ? 'auto' : scrollHeight" [ngStyle]="panelStyle" [class]="panelStyleClass">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <p-scroller
                        *ngIf="virtualScroll"
                        #scroller
                        [items]="suggestions"
                        [style]="{ height: scrollHeight }"
                        [itemSize]="virtualScrollItemSize || _itemSize"
                        [autoSize]="true"
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
                        <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: suggestions, options: {} }"></ng-container>
                    </ng-container>

                    <ng-template #buildInItems let-items let-scrollerOptions="options">
                        <ul #items role="listbox" [attr.id]="listId" class="p-autocomplete-items" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle">
                            <ng-container *ngIf="group">
                                <ng-template ngFor let-optgroup [ngForOf]="items">
                                    <li class="p-autocomplete-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(optgroup) || 'empty' }}</span>
                                        <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: optgroup }"></ng-container>
                                    </li>
                                    <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: getOptionGroupChildren(optgroup) }"></ng-container>
                                </ng-template>
                            </ng-container>
                            <ng-container *ngIf="!group">
                                <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: items }"></ng-container>
                            </ng-container>
                            <ng-template #itemslist let-suggestionsToDisplay>
                                <li
                                    role="option"
                                    *ngFor="let option of suggestionsToDisplay; let idx = index"
                                    class="p-autocomplete-item"
                                    pRipple
                                    [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }"
                                    [ngClass]="{ 'p-highlight': option === highlightOption }"
                                    [id]="highlightOption == option ? 'p-highlighted-option' : ''"
                                    (click)="selectItem(option)"
                                >
                                    <span *ngIf="!itemTemplate">{{ resolveFieldData(option) }}</span>
                                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: option, index: scrollerOptions.getOptions ? scrollerOptions.getOptions(idx) : idx }"></ng-container>
                                </li>
                            </ng-template>
                            <li *ngIf="noResults && showEmptyMessage" class="p-autocomplete-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                <ng-container *ngIf="!emptyTemplate; else empty">
                                    {{ emptyMessageLabel }}
                                </ng-container>
                                <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                            </li>
                        </ul>
                    </ng-template>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </p-overlay>
        </span>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])],
    host: {
        class: 'p-element p-inputwrapper',
        '[class.p-inputwrapper-filled]': 'filled',
        '[class.p-inputwrapper-focus]': '((focus && !disabled) || autofocus) || overlayVisible',
        '[class.p-autocomplete-clearable]': 'showClear && !disabled'
    },
    providers: [AUTOCOMPLETE_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./autocomplete.css']
})
export class AutoComplete implements AfterViewChecked, AfterContentInit, OnDestroy, ControlValueAccessor {
    @Input() minLength: number = 1;

    @Input() delay: number = 300;

    @Input() style: any;

    @Input() panelStyle: any;

    @Input() styleClass: string;

    @Input() panelStyleClass: string;

    @Input() inputStyle: any;

    @Input() inputId: string;

    @Input() inputStyleClass: string;

    @Input() placeholder: string;

    @Input() readonly: boolean;

    @Input() disabled: boolean;

    @Input() scrollHeight: string = '200px';

    @Input() lazy: boolean = false;

    @Input() virtualScroll: boolean;

    @Input() virtualScrollItemSize: number;

    @Input() virtualScrollOptions: ScrollerOptions;

    @Input() maxlength: number;

    @Input() name: string;

    @Input() required: boolean;

    @Input() size: number;

    @Input() appendTo: any;

    @Input() autoHighlight: boolean;

    @Input() forceSelection: boolean;

    @Input() type: string = 'text';

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() ariaLabel: string;

    @Input() dropdownAriaLabel: string;

    @Input() ariaLabelledBy: string;

    @Input() dropdownIcon: string;

    @Input() unique: boolean = true;

    @Input() group: boolean;

    @Input() completeOnFocus: boolean = false;

    @Input() showClear: boolean = false;

    @Input() field: string;

    @Input() dropdown: boolean;

    @Input() showEmptyMessage: boolean;

    @Input() dropdownMode: string = 'blank';

    @Input() multiple: boolean;

    @Input() tabindex: number;

    @Input() dataKey: string;

    @Input() emptyMessage: string;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Input() autofocus: boolean;

    @Input() autocomplete: string = 'off';

    @Input() optionGroupChildren: string;

    @Input() optionGroupLabel: string;

    @Input() overlayOptions: OverlayOptions;

    @ViewChild('container') containerEL: ElementRef;

    @ViewChild('in') inputEL: ElementRef;

    @ViewChild('multiIn') multiInputEL: ElementRef;

    @ViewChild('multiContainer') multiContainerEL: ElementRef;

    @ViewChild('ddBtn') dropdownButton: ElementRef;

    @ViewChild('items') itemsViewChild: ElementRef;

    @ViewChild('scroller') scroller: Scroller;

    @ViewChild('overlay') overlayViewChild: Overlay;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @Output() completeMethod: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onKeyUp: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    /* @deprecated */
    _itemSize: number;
    @Input() get itemSize(): number {
        return this._itemSize;
    }
    set itemSize(val: number) {
        this._itemSize = val;
        console.warn('The itemSize property is deprecated, use virtualScrollItemSize property instead.');
    }

    itemsWrapper: HTMLDivElement;

    itemTemplate: TemplateRef<any>;

    emptyTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    selectedItemTemplate: TemplateRef<any>;

    groupTemplate: TemplateRef<any>;

    loaderTemplate: TemplateRef<any>;

    removeIconTemplate: TemplateRef<any>;

    loadingIconTemplate: TemplateRef<any>;

    clearIconTemplate: TemplateRef<any>;

    dropdownIconTemplate: TemplateRef<any>;

    value: any;

    _suggestions: any[];

    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    timeout: any;

    overlayVisible: boolean = false;

    suggestionsUpdated: boolean;

    highlightOption: any;

    highlightOptionChanged: boolean;

    focus: boolean = false;

    filled: boolean;

    inputClick: boolean;

    inputKeyDown: boolean;

    noResults: boolean;

    differ: any;

    inputFieldValue: string = null;

    loading: boolean;

    scrollHandler: ConnectedOverlayScrollHandler | null;

    documentResizeListener: VoidFunction | null;

    forceSelectionUpdateModelTimeout: any;

    listId: string;

    itemClicked: boolean;

    inputValue: string = null;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        public differs: IterableDiffers,
        public config: PrimeNGConfig,
        public overlayService: OverlayService,
        private zone: NgZone
    ) {
        this.differ = differs.find([]).create(null);
        this.listId = UniqueComponentId() + '_list';
    }

    @Input() get suggestions(): any[] {
        return this._suggestions;
    }

    set suggestions(val: any[]) {
        this._suggestions = val;
        this.handleSuggestionsChange();
    }

    ngAfterViewChecked() {
        //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
        if (this.suggestionsUpdated && this.overlayViewChild) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (this.overlayViewChild) {
                        this.overlayViewChild.alignOverlay();
                    }
                }, 1);
                this.suggestionsUpdated = false;
            });
        }

        if (this.highlightOptionChanged) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (this.overlayViewChild && this.itemsWrapper) {
                        let listItem = DomHandler.findSingle(this.overlayViewChild.overlayViewChild.nativeElement, 'li.p-highlight');

                        if (listItem) {
                            DomHandler.scrollInView(this.itemsWrapper, listItem);
                        }
                    }
                }, 1);
                this.highlightOptionChanged = false;
            });
        }
    }

    handleSuggestionsChange() {
        if (this._suggestions != null && this.loading) {
            this.highlightOption = null;
            if (this._suggestions.length) {
                this.noResults = false;
                this.show();
                this.suggestionsUpdated = true;

                if (this.autoHighlight) {
                    this.highlightOption = this._suggestions[0];
                }
            } else {
                this.noResults = true;

                if (this.showEmptyMessage) {
                    this.show();
                    this.suggestionsUpdated = true;
                } else {
                    this.hide();
                }
            }

            this.loading = false;
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

                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
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

                case 'removetokenicon':
                    this.removeIconTemplate = item.template;
                    break;

                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;

                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;

                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    writeValue(value: any): void {
        this.value = value;
        this.filled = this.value && this.value != '';
        this.updateInputField();
        this.cd.markForCheck();
    }

    getOptionGroupChildren(optionGroup: any) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }

    getOptionGroupLabel(optionGroup: any) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup.label != undefined ? optionGroup.label : optionGroup;
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

    onInput(event: Event) {
        // When an input element with a placeholder is clicked, the onInput event is invoked in IE.
        if (!this.inputKeyDown && DomHandler.isIE()) {
            return;
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        let value = (<HTMLInputElement>event.target).value;
        this.inputValue = value;
        if (!this.multiple && !this.forceSelection) {
            this.onModelChange(value);
        }

        if (value.length === 0 && !this.multiple) {
            this.value = null;
            this.hide();
            this.onClear.emit(event);
            this.onModelChange(value);
        }

        if (value.length >= this.minLength) {
            this.timeout = setTimeout(() => {
                this.search(event, value);
            }, this.delay);
        } else {
            this.hide();
        }
        this.updateFilledState();
        this.inputKeyDown = false;
    }

    onInputClick(event: MouseEvent) {
        this.inputClick = true;
    }

    search(event: any, query: string) {
        //allow empty string but not undefined or null
        if (query === undefined || query === null) {
            return;
        }

        this.loading = true;

        this.completeMethod.emit({
            originalEvent: event,
            query: query
        });
    }

    selectItem(option: any, focus: boolean = true) {
        if (this.forceSelectionUpdateModelTimeout) {
            clearTimeout(this.forceSelectionUpdateModelTimeout);
            this.forceSelectionUpdateModelTimeout = null;
        }

        if (this.multiple) {
            this.multiInputEL.nativeElement.value = '';
            this.value = this.value || [];
            if (!this.isSelected(option) || !this.unique) {
                this.value = [...this.value, option];
                this.onModelChange(this.value);
            }
        } else {
            this.inputEL.nativeElement.value = this.resolveFieldData(option);
            this.value = option;
            this.onModelChange(this.value);
        }

        this.onSelect.emit(option);
        this.updateFilledState();

        if (focus) {
            this.itemClicked = true;
            this.focusInput();
        }

        this.hide();
    }

    show(event?: Event) {
        if (this.multiInputEL || this.inputEL) {
            let hasFocus = this.multiple ? this.multiInputEL.nativeElement.ownerDocument.activeElement == this.multiInputEL.nativeElement : this.inputEL.nativeElement.ownerDocument.activeElement == this.inputEL.nativeElement;

            if (!this.overlayVisible && hasFocus) {
                this.overlayVisible = true;
            }
        }

        this.onShow.emit(event);
        this.cd.markForCheck();
    }

    clear() {
        if (this.multiple) {
            this.value = null;
        } else {
            this.inputValue = null;
            this.inputEL.nativeElement.value = '';
        }

        this.updateFilledState();
        this.onModelChange(this.value);
        this.onClear.emit();
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        if (event.toState === 'visible') {
            this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild.overlayViewChild.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-autocomplete-panel');
            this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild.nativeElement);
        }
    }

    resolveFieldData(value) {
        let data = this.field ? ObjectUtils.resolveFieldData(value, this.field) : value;
        return data !== (null || undefined) ? data : '';
    }

    hide(event?: any) {
        this.overlayVisible = false;

        this.onHide.emit(event);
        this.cd.markForCheck();
    }

    handleDropdownClick(event) {
        if (!this.overlayVisible) {
            this.focusInput();
            let queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;

            if (this.dropdownMode === 'blank') this.search(event, '');
            else if (this.dropdownMode === 'current') this.search(event, queryValue);

            this.onDropdownClick.emit({
                originalEvent: event,
                query: queryValue
            });
        } else {
            this.hide();
        }
    }

    focusInput() {
        if (this.multiple) this.multiInputEL.nativeElement.focus();
        else this.inputEL.nativeElement.focus();
    }

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    removeItem(item: any) {
        let itemIndex = DomHandler.index(item);
        let removedValue = this.value[itemIndex];
        this.value = this.value.filter((val, i) => i != itemIndex);
        this.onModelChange(this.value);
        this.updateFilledState();
        this.onUnselect.emit(removedValue);
    }

    onKeydown(event) {
        if (this.overlayVisible) {
            switch (event.which) {
                //down
                case 40:
                    if (this.group) {
                        let highlightItemIndex = this.findOptionGroupIndex(this.highlightOption, this.suggestions);
                        if (highlightItemIndex !== -1) {
                            let nextItemIndex = highlightItemIndex.itemIndex + 1;
                            if (nextItemIndex < this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex]).length) {
                                this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex])[nextItemIndex];
                                this.highlightOptionChanged = true;
                            } else if (this.suggestions[highlightItemIndex.groupIndex + 1]) {
                                this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex + 1])[0];
                                this.highlightOptionChanged = true;
                            }
                        } else {
                            this.highlightOption = this.getOptionGroupChildren(this.suggestions[0])[0];
                        }
                    } else {
                        let highlightItemIndex = this.findOptionIndex(this.highlightOption, this.suggestions);
                        if (highlightItemIndex != -1) {
                            var nextItemIndex = highlightItemIndex + 1;
                            if (nextItemIndex != this.suggestions.length) {
                                this.highlightOption = this.suggestions[nextItemIndex];
                                this.highlightOptionChanged = true;
                            }
                        } else {
                            this.highlightOption = this.suggestions[0];
                        }
                    }

                    event.preventDefault();
                    break;

                //up
                case 38:
                    if (this.group) {
                        let highlightItemIndex = this.findOptionGroupIndex(this.highlightOption, this.suggestions);
                        if (highlightItemIndex !== -1) {
                            let prevItemIndex = highlightItemIndex.itemIndex - 1;
                            if (prevItemIndex >= 0) {
                                this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex])[prevItemIndex];
                                this.highlightOptionChanged = true;
                            } else if (prevItemIndex < 0) {
                                let prevGroup = this.suggestions[highlightItemIndex.groupIndex - 1];
                                if (prevGroup) {
                                    this.highlightOption = this.getOptionGroupChildren(prevGroup)[this.getOptionGroupChildren(prevGroup).length - 1];
                                    this.highlightOptionChanged = true;
                                }
                            }
                        }
                    } else {
                        let highlightItemIndex = this.findOptionIndex(this.highlightOption, this.suggestions);

                        if (highlightItemIndex > 0) {
                            let prevItemIndex = highlightItemIndex - 1;
                            this.highlightOption = this.suggestions[prevItemIndex];
                            this.highlightOptionChanged = true;
                        }
                    }

                    event.preventDefault();
                    break;

                //enter
                case 13:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                        this.hide();
                    }
                    event.preventDefault();
                    break;

                //escape
                case 27:
                    this.hide();
                    event.preventDefault();
                    break;

                //tab
                case 9:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                    }
                    this.hide();
                    break;
            }
        } else {
            if (event.which === 40 && this.suggestions) {
                this.search(event, event.target.value);
            } else if (event.ctrlKey && event.key === 'z' && !this.multiple) {
                this.inputEL.nativeElement.value = this.resolveFieldData(null);
                this.value = '';
                this.onModelChange(this.value);
            } else if (event.ctrlKey && event.key === 'z' && this.multiple) {
                this.value.pop();
                this.onModelChange(this.value);
                this.updateFilledState();
            }
        }

        if (this.multiple) {
            switch (event.which) {
                //backspace
                case 8:
                    if (this.value && this.value.length && !this.multiInputEL.nativeElement.value) {
                        this.value = [...this.value];
                        const removedValue = this.value.pop();
                        this.onModelChange(this.value);
                        this.updateFilledState();
                        this.onUnselect.emit(removedValue);
                    }
                    break;
            }
        }

        this.inputKeyDown = true;
    }

    onKeyup(event) {
        this.onKeyUp.emit(event);
    }

    onInputFocus(event) {
        if (!this.itemClicked && this.completeOnFocus) {
            let queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;
            this.search(event, queryValue);
        }

        this.focus = true;
        this.onFocus.emit(event);
        this.itemClicked = false;
    }

    onInputBlur(event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }

    onInputChange(event) {
        if (this.forceSelection) {
            let valid = false;
            let inputValue = event.target.value.trim();

            if (this.suggestions) {
                for (let suggestion of this.suggestions) {
                    let itemValue = this.field ? ObjectUtils.resolveFieldData(suggestion, this.field) : suggestion;
                    if (itemValue && inputValue === itemValue.trim()) {
                        valid = true;
                        this.forceSelectionUpdateModelTimeout = setTimeout(() => {
                            this.selectItem(suggestion, false);
                        }, 250);
                        break;
                    }
                }
            }

            if (!valid) {
                if (this.multiple) {
                    this.multiInputEL.nativeElement.value = '';
                } else {
                    this.value = null;
                    this.inputEL.nativeElement.value = '';
                }

                this.onClear.emit(event);
                this.onModelChange(this.value);
                this.updateFilledState();
            }
        }
    }

    onInputPaste(event: ClipboardEvent) {
        this.onKeydown(event);
    }

    isSelected(val: any): boolean {
        let selected: boolean = false;
        if (this.value && this.value.length) {
            for (let i = 0; i < this.value.length; i++) {
                if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    }

    findOptionIndex(option, suggestions): number {
        let index: number = -1;
        if (suggestions) {
            for (let i = 0; i < suggestions.length; i++) {
                if (ObjectUtils.equals(option, suggestions[i])) {
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
            return { groupIndex: groupIndex, itemIndex: itemIndex };
        } else {
            return -1;
        }
    }

    updateFilledState() {
        if (this.multiple) this.filled = (this.value && this.value.length) || (this.multiInputEL && this.multiInputEL.nativeElement && this.multiInputEL.nativeElement.value != '');
        else this.filled = (this.inputFieldValue && this.inputFieldValue != '') || (this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '');
    }

    updateInputField() {
        let formattedValue = this.resolveFieldData(this.value);
        this.inputFieldValue = formattedValue;

        if (this.inputEL && this.inputEL.nativeElement) {
            this.inputEL.nativeElement.value = formattedValue;
        }

        this.updateFilledState();
    }

    ngOnDestroy() {
        if (this.forceSelectionUpdateModelTimeout) {
            clearTimeout(this.forceSelectionUpdateModelTimeout);
            this.forceSelectionUpdateModelTimeout = null;
        }

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, OverlayModule, InputTextModule, ButtonModule, SharedModule, RippleModule, ScrollerModule, AutoFocusModule, TimesCircleIcon, SpinnerIcon, TimesIcon, ChevronDownIcon],
    exports: [AutoComplete, OverlayModule, SharedModule, ScrollerModule, AutoFocusModule],
    declarations: [AutoComplete]
})
export class AutoCompleteModule {}
