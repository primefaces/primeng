import {
    NgModule,
    Component,
    ElementRef,
    AfterViewChecked,
    AfterContentInit,
    Input,
    Output,
    ContentChildren,
    QueryList,
    TemplateRef,
    EventEmitter,
    ViewChild,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ChangeDetectorRef,
    Inject,
    Renderer2,
    PLATFORM_ID
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule, PrimeTemplate, FilterService } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { RippleModule } from 'primeng/ripple';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { AngleDoubleDownIcon } from 'primeng/icons/angledoubledown';
import { AngleDoubleUpIcon } from 'primeng/icons/angledoubleup';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { SearchIcon } from 'primeng/icons/search';
import { Nullable } from 'primeng/ts-helpers';
import { OrderListFilterEvent, OrderListFilterOptions, OrderListSelectionChangeEvent } from './orderlist.interface';

@Component({
    selector: 'p-orderList',
    template: `
        <div
            [ngClass]="{ 'p-orderlist p-component': true, 'p-orderlist-striped': stripedRows, 'p-orderlist-controls-left': controlsPosition === 'left', 'p-orderlist-controls-right': controlsPosition === 'right' }"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <div class="p-orderlist-controls">
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveUp()">
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveTop()">
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveDown()">
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button type="button" [disabled]="moveDisabled()" pButton pRipple class="p-button-icon-only" (click)="moveBottom()">
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-orderlist-list-container">
                <div class="p-orderlist-header" *ngIf="header || headerTemplate">
                    <div class="p-orderlist-title" *ngIf="!headerTemplate">{{ header }}</div>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </div>
                <div class="p-orderlist-filter-container" *ngIf="filterBy">
                    <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                        <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInFilterElement>
                        <div class="p-orderlist-filter">
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
                            <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-orderlist-filter-icon'" />
                            <span class="p-orderlist-filter-icon" *ngIf="filterIconTemplate">
                                <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul #listelement cdkDropList (cdkDropListDropped)="onDrop($event)" class="p-orderlist-list" [ngStyle]="listStyle">
                    <ng-template ngFor [ngForTrackBy]="trackBy" let-item [ngForOf]="value" let-i="index" let-l="last">
                        <li
                            class="p-orderlist-item"
                            tabindex="0"
                            [ngClass]="{ 'p-highlight': isSelected(item), 'p-disabled': disabled }"
                            cdkDrag
                            pRipple
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, i)"
                            (touchend)="onItemTouchEnd()"
                            (keydown)="onItemKeydown($event, item, i)"
                            *ngIf="isItemVisible(item)"
                            role="option"
                            [attr.aria-selected]="isSelected(item)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty() && (emptyMessageTemplate || emptyFilterMessageTemplate)">
                        <li *ngIf="!filterValue || !emptyFilterMessageTemplate" class="p-orderlist-empty-message">
                            <ng-container *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
                        </li>
                        <li *ngIf="filterValue" class="p-orderlist-empty-message">
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
     * Inline style of the list element.
     * @group Props
     */
    @Input() listStyle: { [klass: string]: any } | null | undefined;
    /**
     * A boolean value that indicates whether the component should be responsive.
     * @group Props
     */
    @Input() responsive: boolean | undefined;
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
    @Input() metaKeySelection: boolean = true;
    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    @Input() dragdrop: boolean = false;
    /**
     * Defines the location of the buttons with respect to the list, valid values are "left" or "right".
     * @group Props
     */
    @Input() controlsPosition: string = 'left';
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
    @Input() stripedRows: boolean | undefined;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    @Input() disabled: boolean = false;
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
        this._selection = val;
    }
    get selection(): any[] {
        return this._selection;
    }
    /**
     * Value of the component.
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
     * @param {OrderListSelectionChangeEvent} event - custom change event.
     * @group Emits
     */
    @Output() onSelectionChange: EventEmitter<OrderListSelectionChangeEvent> = new EventEmitter<OrderListSelectionChangeEvent>();
    /**
     * Callback to invoke when filtering occurs.
     * @param {OrderListFilterEvent} event - custom filter event.
     * @group Emits
     */
    @Output() onFilterEvent: EventEmitter<OrderListFilterEvent> = new EventEmitter<OrderListFilterEvent>();

    @ViewChild('listelement') listViewChild: Nullable<ElementRef>;

    @ViewChild('filter') filterViewChild: Nullable<ElementRef>;

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    public itemTemplate: Nullable<TemplateRef<any>>;

    public headerTemplate: Nullable<TemplateRef<any>>;

    public emptyMessageTemplate: Nullable<TemplateRef<any>>;

    public emptyFilterMessageTemplate: Nullable<TemplateRef<any>>;

    public filterTemplate: Nullable<TemplateRef<any>>;

    moveUpIconTemplate: Nullable<TemplateRef<any>>;

    moveTopIconTemplate: Nullable<TemplateRef<any>>;

    moveDownIconTemplate: Nullable<TemplateRef<any>>;

    moveBottomIconTemplate: Nullable<TemplateRef<any>>;

    filterIconTemplate: Nullable<TemplateRef<any>>;

    filterOptions: Nullable<OrderListFilterOptions>;

    _selection: any[] = [];

    movedUp: Nullable<boolean>;

    movedDown: Nullable<boolean>;

    itemTouched: Nullable<boolean>;

    styleElement: any;

    id: string = UniqueComponentId();

    public filterValue: Nullable<string>;

    public visibleOptions: Nullable<any[]>;

    public _value: any[] | undefined;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public el: ElementRef, public cd: ChangeDetectorRef, public filterService: FilterService) {}

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

    onItemClick(event: Event, item: any, index: number) {
        this.itemTouched = false;
        let selectedIndex = ObjectUtils.findIndexInList(item, this.selection);
        let selected = selectedIndex != -1;
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;

        if (metaSelection && event instanceof KeyboardEvent) {
            let metaKey = event.metaKey || event.ctrlKey || event.shiftKey;

            if (selected && metaKey) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            } else {
                this._selection = metaKey ? (this._selection ? [...this._selection] : []) : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value as any[]);
            }
        } else {
            if (selected) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            } else {
                this._selection = this._selection ? [...this._selection] : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value as any[]);
            }
        }

        //binding
        this.selectionChange.emit(this._selection);

        //event
        this.onSelectionChange.emit({ originalEvent: event, value: this._selection });
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
     * @group Methods
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
        return ObjectUtils.findIndexInList(item, this.selection) != -1;
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
            this.onReorder.emit([event.item.data]);
        }
    }

    onItemKeydown(event: KeyboardEvent, item: any, index: number) {
        let listItem = <HTMLLIElement>event.currentTarget;

        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(listItem);
                if (nextItem) {
                    nextItem.focus();
                }

                event.preventDefault();
                break;

            //up
            case 38:
                var prevItem = this.findPrevItem(listItem);
                if (prevItem) {
                    prevItem.focus();
                }

                event.preventDefault();
                break;

            //enter
            case 13:
                this.onItemClick(event, item, index);
                event.preventDefault();
                break;
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

    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, '');
                this.styleElement = this.renderer.createElement('style');
                this.renderer.setAttribute(this.styleElement, 'type', 'text/css');
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
