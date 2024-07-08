import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    numberAttribute
} from '@angular/core';
import { FilterService, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { AngleDoubleDownIcon } from 'primeng/icons/angledoubledown';
import { AngleDoubleUpIcon } from 'primeng/icons/angledoubleup';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { SearchIcon } from 'primeng/icons/search';
import { RippleModule } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { OrderListFilterEvent, OrderListFilterOptions, OrderListSelectionChangeEvent } from './orderlist.interface';
/**
 * OrderList is used to managed the order of a collection.
 * @group Components
 */
@Component({
    selector: 'p-orderList',
    template: `
        <div
            [ngClass]="{ 'p-orderlist p-component': true, 'p-orderlist-striped': stripedRows, 'p-orderlist-controls-left': controlsPosition === 'left', 'p-orderlist-controls-right': controlsPosition === 'right' }"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.data-pc-section]="'root'"
        >
            <div class="p-orderlist-controls" [attr.data-pc-section]="'controls'">
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveUp()" [attr.aria-label]="moveUpAriaLabel" [attr.data-pc-section]="'moveUpButton'">
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveTop()" [attr.aria-label]="moveTopAriaLabel" [attr.data-pc-section]="'moveTopButton'">
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveDown()" [attr.aria-label]="moveDownAriaLabel" [attr.data-pc-section]="'moveDownButton'">
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveBottom()" [attr.aria-label]="moveBottomAriaLabel" [attr.data-pc-section]="'moveBottomButton'">
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-orderlist-list-container" [attr.data-pc-section]="'container'">
                <div class="p-orderlist-header" *ngIf="header || headerTemplate" [attr.data-pc-section]="'header'">
                    <div class="p-orderlist-title" *ngIf="!headerTemplate">{{ header }}</div>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </div>
                <div class="p-orderlist-filter-container" *ngIf="filterBy" [attr.data-pc-section]="'filterContainer'">
                    <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                        <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInFilterElement>
                        <div class="p-orderlist-filter" [attr.data-pc-section]="'filter'">
                            <input
                                #filter
                                type="text"
                                role="textbox"
                                (keyup)="onFilterKeyup($event)"
                                [disabled]="disabled"
                                class="p-orderlist-filter-input p-inputtext p-component"
                                [attr.placeholder]="filterPlaceholder"
                                [attr.aria-label]="ariaFilterLabel"
                            />
                            <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-orderlist-filter-icon'" [attr.data-pc-section]="'filterIcon'" />
                            <span class="p-orderlist-filter-icon" *ngIf="filterIconTemplate" [attr.data-pc-section]="'filterIcon'">
                                <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul
                    #listelement
                    [id]="id + '_list'"
                    cdkDropList
                    (cdkDropListDropped)="onDrop($event)"
                    class="p-orderlist-list"
                    [ngStyle]="listStyle"
                    [attr.data-pc-section]="'list'"
                    role="listbox"
                    [tabindex]="tabindex"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused ? focusedOptionId() : undefined"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    (focus)="onListFocus($event)"
                    (blur)="onListBlur($event)"
                    (keydown)="onItemKeydown($event)"
                >
                    <ng-template ngFor [ngForTrackBy]="trackBy" let-item [ngForOf]="value" let-i="index" let-l="last">
                        <li
                            [id]="id + '_' + i"
                            pRipple
                            cdkDrag
                            role="option"
                            class="p-orderlist-item"
                            [ngClass]="{ 'p-highlight': isSelected(item), 'p-disabled': disabled, 'p-focus': id + '_' + i === focusedOptionId() }"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, i, id + '_' + i)"
                            (touchend)="onItemTouchEnd()"
                            (mousedown)="onOptionMouseDown(i)"
                            *ngIf="isItemVisible(item)"
                            [attr.aria-selected]="isSelected(item)"
                            [attr.data-pc-section]="'item'"
                            [attr.data-p-highlight]="isSelected(item)"
                            [attr.data-p-focused]="id + '_' + i === focusedOptionId()"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty() && (emptyMessageTemplate || emptyFilterMessageTemplate)">
                        <li *ngIf="!filterValue || !emptyFilterMessageTemplate" class="p-orderlist-empty-message" [attr.data-pc-section]="'emptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
                        </li>
                        <li *ngIf="filterValue" class="p-orderlist-empty-message" [attr.data-pc-section]="'emptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./orderlist.css'],
    host: {
        class: 'p-element'
    }
})
export class OrderList implements AfterViewChecked, AfterContentInit {
    /**
     * Text for the caption.
     * @group Props
     */
    @Input() header: string | undefined;

    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;

    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input({ transform: numberAttribute }) tabindex: number | undefined;

    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;

    /**
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;

    /**
     * Inline style of the list element.
     * @group Props
     */
    @Input() listStyle: { [klass: string]: any } | null | undefined;

    /**
     * A boolean value that indicates whether the component should be responsive.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) responsive: boolean | undefined;

    /**
     * When specified displays an input field to filter the items on keyup and decides which fields to search against.
     * @group Props
     */
    @Input() filterBy: string | undefined;

    /**
     * Placeholder of the filter input.
     * @group Props
     */
    @Input() filterPlaceholder: string | undefined;

    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() filterLocale: string | undefined;

    /**
     * When true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) metaKeySelection: boolean = false;

    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) dragdrop: boolean = false;

    /**
     * Defines the location of the buttons with respect to the list.
     * @group Props
     */
    @Input() controlsPosition: 'left' | 'right' = 'left';

    /**
     * Defines a string that labels the filter input.
     * @group Props
     */
    @Input() ariaFilterLabel: string | undefined;

    /**
     * Defines how the items are filtered.
     * @group Props
     */
    @Input() filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' = 'contains';

    /**
     * Indicates the width of the screen at which the component should change its behavior.
     * @group Props
     */
    @Input() breakpoint: string = '960px';

    /**
     * Whether to displays rows with alternating colors.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) stripedRows: boolean | undefined;

    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean = false;

    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    @Input() trackBy: Function = (index: number, item: any) => item;

    /**
     * A list of values that are currently selected.
     * @group Props
     */
    @Input() set selection(val: any[]) {
        this.d_selection = val;
    }
    get selection(): any[] {
        return this.d_selection;
    }

    /**
     * Array of values to be displayed in the component.
     * It represents the data source for the list of items.
     * @group Props
     */
    @Input() set value(val: any[] | undefined) {
        this._value = val;
        if (this.filterValue) {
            this.filter();
        }
    }
    get value(): any[] | undefined {
        return this._value;
    }

    /**
     * Callback to invoke on selection change.
     * @param {*} any - selection instance.
     * @group Emits
     */
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    /**
     * Callback to invoke when list is reordered.
     * @param {*} any - list instance.
     * @group Emits
     */
    @Output() onReorder: EventEmitter<any> = new EventEmitter();

    /**
     * Callback to invoke when selection changes.
     * @param {OrderListSelectionChangeEvent} event - Custom change event.
     * @group Emits
     */
    @Output() onSelectionChange: EventEmitter<OrderListSelectionChangeEvent> = new EventEmitter<OrderListSelectionChangeEvent>();

    /**
     * Callback to invoke when filtering occurs.
     * @param {OrderListFilterEvent} event - Custom filter event.
     * @group Emits
     */
    @Output() onFilterEvent: EventEmitter<OrderListFilterEvent> = new EventEmitter<OrderListFilterEvent>();

    /**
     * Callback to invoke when the list is focused
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onFocus: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * Callback to invoke when the list is blurred
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onBlur: EventEmitter<Event> = new EventEmitter<Event>();

    @ViewChild('listelement') listViewChild: Nullable<ElementRef>;

    @ViewChild('filter') filterViewChild: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    public itemTemplate: Nullable<TemplateRef<any>>;

    public headerTemplate: Nullable<TemplateRef<any>>;

    public emptyMessageTemplate: Nullable<TemplateRef<any>>;

    public emptyFilterMessageTemplate: Nullable<TemplateRef<any>>;

    public filterTemplate: Nullable<TemplateRef<any>>;

    get moveUpAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.moveUp : undefined;
    }

    get moveTopAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.moveTop : undefined;
    }

    get moveDownAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.moveDown : undefined;
    }

    get moveBottomAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.moveBottom : undefined;
    }

    moveUpIconTemplate: Nullable<TemplateRef<any>>;

    moveTopIconTemplate: Nullable<TemplateRef<any>>;

    moveDownIconTemplate: Nullable<TemplateRef<any>>;

    moveBottomIconTemplate: Nullable<TemplateRef<any>>;

    filterIconTemplate: Nullable<TemplateRef<any>>;

    filterOptions: Nullable<OrderListFilterOptions>;

    d_selection: any[] = [];

    movedUp: Nullable<boolean>;

    movedDown: Nullable<boolean>;

    itemTouched: Nullable<boolean>;

    styleElement: any;

    id: string = UniqueComponentId();

    focused: boolean = false;

    focusedOptionIndex: any = -1;

    focusedOption: any | undefined;

    public filterValue: Nullable<string>;

    public visibleOptions: Nullable<any[]>;

    public _value: any[] | undefined;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2,
        public el: ElementRef,
        public cd: ChangeDetectorRef,
        public filterService: FilterService,
        public config: PrimeNGConfig
    ) {}

    ngOnInit() {
        if (this.responsive) {
            this.createStyle();
        }

        if (this.filterBy) {
            this.filterOptions = {
                filter: (value) => this.onFilterKeyup(value),
                reset: () => this.resetFilter()
            };
        }
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;

                case 'empty':
                    this.emptyMessageTemplate = item.template;
                    break;

                case 'emptyfilter':
                    this.emptyFilterMessageTemplate = item.template;
                    break;

                case 'filter':
                    this.filterTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'moveupicon':
                    this.moveUpIconTemplate = item.template;
                    break;

                case 'movetopicon':
                    this.moveTopIconTemplate = item.template;
                    break;

                case 'movedownicon':
                    this.moveDownIconTemplate = item.template;
                    break;

                case 'movebottomicon':
                    this.moveBottomIconTemplate = item.template;
                    break;

                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;

                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.listViewChild?.nativeElement, 'li.p-highlight');
            let listItem;

            if (listItems.length > 0) {
                if (this.movedUp) listItem = listItems[0];
                else listItem = listItems[listItems.length - 1];

                DomHandler.scrollInView(this.listViewChild?.nativeElement, listItem);
            }
            this.movedUp = false;
            this.movedDown = false;
        }
    }

    onItemClick(event, item: any, index?: number, selectedId?: string) {
        this.itemTouched = false;
        let focusedIndex = index ? index : ObjectUtils.findIndexInList(this.focusedOption, this.value);
        let selectedIndex = ObjectUtils.findIndexInList(item, this.d_selection);
        let selected = selectedIndex !== -1;
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;

        if (selectedId) {
            this.focusedOptionIndex = selectedId;
        }

        if (metaSelection) {
            let metaKey = event.metaKey || event.ctrlKey;

            if (selected && metaKey) {
                this.d_selection = this.d_selection.filter((val, focusedIndex) => focusedIndex !== selectedIndex);
            } else {
                this.d_selection = metaKey ? (this.d_selection ? [...this.d_selection] : []) : [];
                ObjectUtils.insertIntoOrderedArray(item, focusedIndex, this.d_selection, this.value);
            }
        } else {
            if (selected) {
                this.d_selection = this.d_selection.filter((val, focusedIndex) => focusedIndex !== selectedIndex);
            } else {
                this.d_selection = this.d_selection ? [...this.d_selection] : [];
                ObjectUtils.insertIntoOrderedArray(item, focusedIndex, this.d_selection, this.value);
            }
        }

        //binding
        this.selectionChange.emit(this.d_selection);

        //event
        this.onSelectionChange.emit({ originalEvent: event, value: this.d_selection });
    }

    onFilterKeyup(event: KeyboardEvent) {
        this.filterValue = ((<HTMLInputElement>event.target).value.trim() as any).toLocaleLowerCase(this.filterLocale);
        this.filter();

        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions as any[]
        });
    }

    filter() {
        let searchFields: string[] = (this.filterBy as string).split(',');
        this.visibleOptions = this.filterService.filter(this.value as any[], searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
    }

    /**
     * Callback to invoke on filter reset.
     * @group Method
     */
    public resetFilter() {
        this.filterValue = null;
        this.filterViewChild && ((<HTMLInputElement>this.filterViewChild.nativeElement).value = '');
    }

    isItemVisible(item: any): boolean | undefined {
        if (this.filterValue && this.filterValue.trim().length) {
            for (let i = 0; i < (this.visibleOptions as any[]).length; i++) {
                if (item == (this.visibleOptions as any[])[i]) {
                    return true;
                }
            }
        } else {
            return true;
        }
    }

    onItemTouchEnd() {
        this.itemTouched = true;
    }

    isSelected(item: any) {
        return ObjectUtils.findIndexInList(item, this.d_selection) !== -1;
    }

    isEmpty() {
        return this.filterValue ? !this.visibleOptions || this.visibleOptions.length === 0 : !this.value || this.value.length === 0;
    }

    moveUp() {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex != 0 && this.value instanceof Array) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex - 1];
                    this.value[selectedItemIndex - 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (this.dragdrop && this.filterValue) this.filter();

            this.movedUp = true;
            this.onReorder.emit(this.selection);
        }
    }

    moveTop() {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, this.value);

                if (selectedItemIndex != 0 && this.value instanceof Array) {
                    let movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.unshift(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop && this.filterValue) this.filter();

            this.onReorder.emit(this.selection);
            (this.listViewChild as ElementRef).nativeElement.scrollTop = 0;
        }
    }

    moveDown() {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, this.value);

                if (this.value instanceof Array && selectedItemIndex != this.value.length - 1) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex + 1];
                    this.value[selectedItemIndex + 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (this.dragdrop && this.filterValue) this.filter();

            this.movedDown = true;
            this.onReorder.emit(this.selection);
        }
    }

    moveBottom() {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = ObjectUtils.findIndexInList(selectedItem, this.value);

                if (this.value instanceof Array && selectedItemIndex != this.value.length - 1) {
                    let movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.push(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop && this.filterValue) this.filter();

            this.onReorder.emit(this.selection);
            (this.listViewChild as ElementRef).nativeElement.scrollTop = this.listViewChild?.nativeElement.scrollHeight;
        }
    }

    onDrop(event: CdkDragDrop<string[]>) {
        let previousIndex = event.previousIndex;
        let currentIndex = event.currentIndex;

        if (previousIndex !== currentIndex) {
            if (this.visibleOptions) {
                if (this.filterValue) {
                    previousIndex = ObjectUtils.findIndexInList(event.item.data, this.value);
                    currentIndex = ObjectUtils.findIndexInList(this.visibleOptions[currentIndex], this.value);
                }

                moveItemInArray(this.visibleOptions, event.previousIndex, event.currentIndex);
            }

            moveItemInArray(this.value as any[], previousIndex, currentIndex);
            this.changeFocusedOptionIndex(currentIndex);
            this.onReorder.emit([event.item.data]);
        }
    }

    onListFocus(event) {
        const focusableEl = DomHandler.findSingle(this.listViewChild.nativeElement, '[data-p-highlight="true"]') || DomHandler.findSingle(this.listViewChild.nativeElement, '[data-pc-section="item"]');

        if (focusableEl) {
            const findIndex = ObjectUtils.findIndexInList(focusableEl, this.listViewChild.nativeElement.children);
            this.focused = true;
            const index = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : focusableEl ? findIndex : -1;

            this.changeFocusedOptionIndex(index);
        }

        this.onFocus.emit(event);
    }

    onListBlur(event) {
        this.focused = false;
        this.focusedOption = null;
        this.focusedOptionIndex = -1;
        this.onBlur.emit(event);
    }

    onItemKeydown(event: KeyboardEvent) {
        const targetTagName = (event.target as HTMLElement).tagName.toLowerCase();

        if (targetTagName == 'input') {
            return;
        }

        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            case 'Enter':
                this.onEnterKey(event);
                break;

            case 'Space':
                this.onSpaceKey(event);
                break;

            case 'KeyA':
                if (event.ctrlKey) {
                    this.d_selection = [...this.value];
                    this.selectionChange.emit(this.d_selection);
                }

            default:
                break;
        }
    }

    onOptionMouseDown(index) {
        this.focused = true;
        this.focusedOptionIndex = index;
    }

    onArrowDownKey(event) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);

        this.changeFocusedOptionIndex(optionIndex);

        if (event.shiftKey) {
            this.onEnterKey(event);
        }

        event.preventDefault();
    }
    onArrowUpKey(event) {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);

        this.changeFocusedOptionIndex(optionIndex);

        if (event.shiftKey) {
            this.onEnterKey(event);
        }

        event.preventDefault();
    }

    onHomeKey(event) {
        if (event.ctrlKey && event.shiftKey) {
            let visibleOptions = this.getVisibleOptions();
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleOptions);
            this.d_selection = [...this.value].slice(0, focusedIndex + 1);
            this.selectionChange.emit(this.d_selection);
        } else {
            this.changeFocusedOptionIndex(0);
        }

        event.preventDefault();
    }

    onEndKey(event) {
        if (event.ctrlKey && event.shiftKey) {
            let visibleOptions = this.getVisibleOptions();
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleOptions);
            this.d_selection = [...this.value].slice(focusedIndex, visibleOptions.length - 1);
            this.selectionChange.emit(this.d_selection);
        } else {
            this.changeFocusedOptionIndex(DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="item"]').length - 1);
        }

        event.preventDefault();
    }

    onEnterKey(event) {
        this.onItemClick(event, this.focusedOption);

        event.preventDefault();
    }

    onSpaceKey(event) {
        event.preventDefault();

        if (event.shiftKey && this.selection && this.selection.length > 0) {
            let visibleOptions = this.getVisibleOptions();
            let lastSelectedIndex = this.getLatestSelectedVisibleOptionIndex(visibleOptions);

            if (lastSelectedIndex !== -1) {
                let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleOptions);
                this.d_selection = [...visibleOptions.slice(Math.min(lastSelectedIndex, focusedIndex), Math.max(lastSelectedIndex, focusedIndex) + 1)];
                this.selectionChange.emit(this.d_selection);
                this.onSelectionChange.emit({ originalEvent: event, value: this.d_selection });

                return;
            }
        }

        this.onEnterKey(event);
    }

    findNextOptionIndex(index) {
        const items = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="item"]');
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }

    findPrevOptionIndex(index) {
        const items = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="item"]');
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);

        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }

    getLatestSelectedVisibleOptionIndex(visibleOptions: any[]): number {
        const latestSelectedItem = [...this.d_selection].reverse().find((item) => visibleOptions.includes(item));

        return latestSelectedItem !== undefined ? visibleOptions.indexOf(latestSelectedItem) : -1;
    }

    getVisibleOptions() {
        return this.visibleOptions && this.visibleOptions.length > 0 ? this.visibleOptions : this.value && this.value.length > 0 ? this.value : null;
    }

    getFocusedOption(index: number) {
        if (index === -1) return null;

        return this.visibleOptions && this.visibleOptions.length ? this.visibleOptions[index] : this.value && this.value.length ? this.value[index] : null;
    }

    changeFocusedOptionIndex(index) {
        const items = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="item"]');

        let order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;

        this.focusedOptionIndex = items[order] ? items[order].getAttribute('id') : -1;
        this.focusedOption = this.getFocusedOption(order);

        this.scrollInView(this.focusedOptionIndex);
    }

    scrollInView(id) {
        const element = DomHandler.findSingle(this.listViewChild.nativeElement, `[data-pc-section="item"][id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    findNextItem(item: any): HTMLElement | null {
        let nextItem = item.nextElementSibling;

        if (nextItem) return !DomHandler.hasClass(nextItem, 'p-orderlist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else return null;
    }

    findPrevItem(item: any): HTMLElement | null {
        let prevItem = item.previousElementSibling;

        if (prevItem) return !DomHandler.hasClass(prevItem, 'p-orderlist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else return null;
    }

    moveDisabled() {
        if (this.disabled || !this.selection.length) {
            return true;
        }
    }

    focusedOptionId() {
        return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }

    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, '');
                this.styleElement = this.renderer.createElement('style');
                this.renderer.setAttribute(this.styleElement, 'type', 'text/css');
                DomHandler.setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
                this.renderer.appendChild(this.document.head, this.styleElement);

                let innerHTML = `
                    @media screen and (max-width: ${this.breakpoint}) {
                        .p-orderlist[${this.id}] {
                            flex-direction: column;
                        }

                        .p-orderlist[${this.id}] .p-orderlist-controls {
                            padding: var(--content-padding);
                            flex-direction: row;
                        }

                        .p-orderlist[${this.id}] .p-orderlist-controls .p-button {
                            margin-right: var(--inline-spacing);
                            margin-bottom: 0;
                        }

                        .p-orderlist[${this.id}] .p-orderlist-controls .p-button:last-child {
                            margin-right: 0;
                        }
                    }
                `;
                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
            }
        }
    }

    destroyStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.styleElement) {
                this.renderer.removeChild(this.document, this.styleElement);
                this.styleElement = null;
                ``;
            }
        }
    }

    ngOnDestroy() {
        this.destroyStyle();
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleUpIcon, AngleUpIcon, AngleDownIcon, SearchIcon],
    exports: [OrderList, SharedModule, DragDropModule],
    declarations: [OrderList]
})
export class OrderListModule {}
