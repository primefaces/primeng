import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgModule,
    numberAttribute,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { findIndexInList, setAttribute, uuid } from '@primeuix/utils';
import { FilterService, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonModule, ButtonProps } from 'primeng/button';
import { AngleDoubleDownIcon, AngleDoubleUpIcon, AngleDownIcon, AngleUpIcon } from 'primeng/icons';
import { Listbox, ListboxChangeEvent } from 'primeng/listbox';
import { Ripple } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { OrderListFilterEvent, OrderListFilterOptions, OrderListSelectionChangeEvent } from './orderlist.interface';
import { OrderListStyle } from './style/orderliststyle';

/**
 * OrderList is used to manage the order of a collection.
 * @group Components
 */
@Component({
    selector: 'p-orderList, p-orderlist, p-order-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, Ripple, DragDropModule, AngleDoubleDownIcon, AngleDoubleUpIcon, AngleUpIcon, AngleDownIcon, Listbox, FormsModule, SharedModule],
    template: `
        <div [class]="cx('controls')" [attr.data-pc-section]="'controls'">
            <button type="button" [disabled]="moveDisabled()" pButton pRipple (click)="moveUp()" [attr.aria-label]="moveUpAriaLabel" [attr.data-pc-section]="'moveUpButton'" [buttonProps]="getButtonProps('up')">
                <svg data-p-icon="angle-up" *ngIf="!moveUpIconTemplate && !_moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" pButtonIcon />
                <ng-template *ngTemplateOutlet="moveUpIconTemplate || _moveUpIconTemplate"></ng-template>
            </button>
            <button type="button" [disabled]="moveDisabled()" pButton pRipple (click)="moveTop()" [attr.aria-label]="moveTopAriaLabel" [attr.data-pc-section]="'moveTopButton'" [buttonProps]="getButtonProps('top')">
                <svg data-p-icon="angle-double-up" *ngIf="!moveTopIconTemplate && !_moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" pButtonIcon />
                <ng-template *ngTemplateOutlet="moveTopIconTemplate || _moveTopIconTemplate"></ng-template>
            </button>
            <button type="button" [disabled]="moveDisabled()" pButton pRipple (click)="moveDown()" [attr.aria-label]="moveDownAriaLabel" [attr.data-pc-section]="'moveDownButton'" [buttonProps]="getButtonProps('down')">
                <svg data-p-icon="angle-down" *ngIf="!moveDownIconTemplate && !_moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" pButtonIcon />
                <ng-template *ngTemplateOutlet="moveDownIconTemplate || _moveDownIconTemplate"></ng-template>
            </button>
            <button type="button" [disabled]="moveDisabled()" pButton pRipple (click)="moveBottom()" [attr.aria-label]="moveBottomAriaLabel" [attr.data-pc-section]="'moveBottomButton'" [buttonProps]="getButtonProps('bottom')">
                <svg data-p-icon="angle-double-down" *ngIf="!moveBottomIconTemplate && !_moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" pButtonIcon />
                <ng-template *ngTemplateOutlet="moveBottomIconTemplate || _moveBottomIconTemplate"></ng-template>
            </button>
        </div>
        <p-listbox
            #listelement
            [multiple]="true"
            [options]="value"
            [(ngModel)]="d_selection"
            [optionLabel]="dataKey ?? 'name'"
            [id]="id + '_list'"
            [listStyle]="listStyle"
            [striped]="stripedRows"
            [tabindex]="tabindex"
            (onFocus)="onListFocus($event)"
            (onBlur)="onListBlur($event)"
            (onChange)="onChangeSelection($event)"
            [ariaLabel]="ariaLabel"
            [disabled]="disabled"
            [metaKeySelection]="metaKeySelection"
            [scrollHeight]="scrollHeight"
            [autoOptionFocus]="autoOptionFocus"
            [filter]="filterBy"
            [filterBy]="filterBy"
            [filterLocale]="filterLocale"
            [filterPlaceHolder]="filterPlaceholder"
            [dragdrop]="dragdrop"
            (onDrop)="onDrop($event)"
        >
            <ng-container *ngIf="headerTemplate || _headerTemplate">
                <ng-template #header>
                    <ng-template *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-template>
                </ng-template>
            </ng-container>
            <ng-container *ngIf="itemTemplate || _itemTemplate">
                <ng-template #item let-option let-selected="selected" let-index="index">
                    <ng-template *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: option, selected: selected, index: index }"></ng-template>
                </ng-template>
            </ng-container>
            <ng-container *ngIf="emptyMessageTemplate || _emptyMessageTemplate">
                <ng-template #empty>
                    <ng-template *ngTemplateOutlet="emptyMessageTemplate || _emptyMessageTemplate"></ng-template>
                </ng-template>
            </ng-container>
            <ng-container *ngIf="emptyFilterMessageTemplate || _emptyFilterMessageTemplate">
                <ng-template #emptyfilter>
                    <ng-template *ngTemplateOutlet="emptyFilterMessageTemplate || _emptyFilterMessageTemplate"></ng-template>
                </ng-template>
            </ng-container>
        </p-listbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [OrderListStyle],
    host: {
        '[class]': "cn(cx('root'), styleClass)",
        '[attr.data-pc-section]': "'root'"
    }
})
export class OrderList extends BaseComponent implements AfterContentInit {
    /**
     * Text for the caption.
     * @group Props
     */
    @Input() header: string | undefined;

    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
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
    @Input({ transform: booleanAttribute }) disabled: boolean;

    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    @Input() trackBy: Function = (index: number, item: any) => item;

    /**
     * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    @Input() scrollHeight = '14rem';

    /**
     * Whether to focus on the first visible or selected element.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoOptionFocus: boolean = true;
    /**
     * Name of the field that uniquely identifies the record in the data.
     * @group Props
     */
    @Input() dataKey: string | undefined;
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
        } else if (this.dragdrop) {
            // Initialize visibleOptions for drag&drop even when no filtering is active
            this.visibleOptions = [...(val || [])];
        }
    }
    get value(): any[] | undefined {
        return this._value;
    }

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() buttonProps: ButtonProps = { severity: 'secondary' };

    /**
     * Used to pass all properties of the ButtonProps to the move up button inside the component.
     * @group Props
     */
    @Input() moveUpButtonProps: ButtonProps;

    /**
     * Used to pass all properties of the ButtonProps to the move top button inside the component.
     * @group Props
     */
    @Input() moveTopButtonProps: ButtonProps;

    /**
     * Used to pass all properties of the ButtonProps to the move down button inside the component.
     * @group Props
     */
    @Input() moveDownButtonProps: ButtonProps;

    /**
     * Used to pass all properties of the ButtonProps to the move bottom button inside the component.
     * @group Props
     */
    @Input() moveBottomButtonProps: ButtonProps;

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

    @ViewChild('listelement') listViewChild!: Listbox;

    @ViewChild('filter') filterViewChild: Nullable<ElementRef>;

    /**
     * Custom item template.
     * @group Templates
     */
    @ContentChild('item', { descendants: false }) itemTemplate: TemplateRef<any> | undefined;

    /**
     * Custom empty template.
     * @group Templates
     */
    @ContentChild('empty', { descendants: false }) emptyMessageTemplate: TemplateRef<any> | undefined;

    /**
     * Custom empty filter template.
     * @group Templates
     */
    @ContentChild('emptyfilter', { descendants: false }) emptyFilterMessageTemplate: TemplateRef<any> | undefined;

    /**
     * Custom filter template.
     * @group Templates
     */
    @ContentChild('filter', { descendants: false }) filterTemplate: TemplateRef<any> | undefined;

    /**
     * Custom header template.
     * @group Templates
     */
    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<any> | undefined;

    /**
     * Custom move up icon template.
     * @group Templates
     */
    @ContentChild('moveupicon', { descendants: false }) moveUpIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom move top icon template.
     * @group Templates
     */
    @ContentChild('movetopicon', { descendants: false }) moveTopIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom move down icon template.
     * @group Templates
     */
    @ContentChild('movedownicon', { descendants: false }) moveDownIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom move bottom icon template.
     * @group Templates
     */
    @ContentChild('movebottomicon', { descendants: false }) moveBottomIconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom filter icon template.
     * @group Templates
     */
    @ContentChild('filtericon', { descendants: false }) filterIconTemplate: TemplateRef<any> | undefined;

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

    _componentStyle = inject(OrderListStyle);

    filterOptions: Nullable<OrderListFilterOptions>;

    d_selection: any[] = [];

    movedUp: Nullable<boolean>;

    movedDown: Nullable<boolean>;

    itemTouched: Nullable<boolean>;

    styleElement: any;

    id: string = uuid('pn_id_');

    public filterValue: Nullable<string>;

    public visibleOptions: Nullable<any[]>;

    public _value: any[] | undefined;

    filterService = inject(FilterService);

    getButtonProps(direction: string) {
        switch (direction) {
            case 'up':
                return { ...this.buttonProps, ...this.moveUpButtonProps };
            case 'top':
                return { ...this.buttonProps, ...this.moveTopButtonProps };
            case 'down':
                return { ...this.buttonProps, ...this.moveDownButtonProps };
            case 'bottom':
                return { ...this.buttonProps, ...this.moveBottomButtonProps };
            default:
                return this.buttonProps;
        }
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.responsive) {
            this.createStyle();
        }

        if (this.filterBy) {
            this.filterOptions = {
                filter: (value) => this.onFilterKeyup(value),
                reset: () => this.resetFilter()
            };
        }

        // Initialize visibleOptions for drag&drop if enabled and value exists
        if (this.dragdrop && this.value && !this.visibleOptions) {
            this.visibleOptions = [...this.value];
        }
    }

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

    _itemTemplate: TemplateRef<any> | undefined;

    _emptyMessageTemplate: TemplateRef<any> | undefined;

    _emptyFilterMessageTemplate: TemplateRef<any> | undefined;

    _filterTemplate: TemplateRef<any> | undefined;

    _headerTemplate: TemplateRef<any> | undefined;

    _moveUpIconTemplate: TemplateRef<any> | undefined;

    _moveTopIconTemplate: TemplateRef<any> | undefined;

    _moveDownIconTemplate: TemplateRef<any> | undefined;

    _moveBottomIconTemplate: TemplateRef<any> | undefined;

    _filterIconTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this._itemTemplate = item.template;
                    break;

                case 'empty':
                    this._emptyMessageTemplate = item.template;
                    break;

                case 'emptyfilter':
                    this._emptyFilterMessageTemplate = item.template;
                    break;

                case 'filter':
                    this._filterTemplate = item.template;
                    break;

                case 'header':
                    this._headerTemplate = item.template;
                    break;

                case 'moveupicon':
                    this._moveUpIconTemplate = item.template;
                    break;

                case 'movetopicon':
                    this._moveTopIconTemplate = item.template;
                    break;

                case 'movedownicon':
                    this._moveDownIconTemplate = item.template;
                    break;

                case 'movebottomicon':
                    this._moveBottomIconTemplate = item.template;
                    break;

                case 'filtericon':
                    this._filterIconTemplate = item.template;
                    break;

                default:
                    this._itemTemplate = item.template;
                    break;
            }
        });
    }

    onChangeSelection(e: ListboxChangeEvent) {
        this.d_selection = e.value;

        //binding
        this.selectionChange.emit(e.value);

        //event
        this.onSelectionChange.emit({ originalEvent: e.originalEvent, value: e.value });
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
        this.filterValue = '';
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

    isSelected(item: any) {
        return findIndexInList(item, this.d_selection) !== -1;
    }

    isEmpty() {
        return this.filterValue ? !this.visibleOptions || this.visibleOptions.length === 0 : !this.value || this.value.length === 0;
    }

    moveUp() {
        if (this.selection && this.value instanceof Array) {
            // Sort selection by their current index to process them from top to bottom
            const sortedSelection = this.sortByIndexInList(this.selection, this.value);

            for (let selectedItem of sortedSelection) {
                let selectedItemIndex: number = findIndexInList(selectedItem, this.value);
                // Only move if not at top and there's a valid position above
                if (selectedItemIndex > 0) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex - 1];
                    this.value[selectedItemIndex - 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
                // Don't break - continue with other items even if one can't move
            }

            if (this.dragdrop) {
                if (this.filterValue) {
                    this.filter();
                } else if (this.visibleOptions) {
                    // Update visibleOptions to match value when no filtering
                    this.visibleOptions = [...this.value];
                }
            }

            this.movedUp = true;
            this.onReorder.emit(this.selection);
        }
        this.listViewChild?.cd?.markForCheck();
    }

    moveTop() {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = findIndexInList(selectedItem, this.value || []);

                if (selectedItemIndex != 0 && this.value instanceof Array) {
                    let movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.unshift(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop) {
                if (this.filterValue) {
                    this.filter();
                } else if (this.visibleOptions) {
                    // Update visibleOptions to match value when no filtering
                    this.visibleOptions = [...(this.value || [])];
                }
            }

            this.onReorder.emit(this.selection);
            setTimeout(() => {
                this.listViewChild.scrollInView(0);
            });
        }
        this.listViewChild?.cd?.markForCheck();
    }

    moveDown() {
        if (this.selection && this.value instanceof Array) {
            const sortedSelection = this.sortByIndexInList(this.selection, this.value).reverse();

            for (let selectedItem of sortedSelection) {
                let selectedItemIndex: number = findIndexInList(selectedItem, this.value);
                if (selectedItemIndex < this.value.length - 1) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex + 1];
                    this.value[selectedItemIndex + 1] = movedItem;
                    this.value[selectedItemIndex] = temp;
                }
            }

            if (this.dragdrop) {
                if (this.filterValue) {
                    this.filter();
                } else if (this.visibleOptions) {
                    this.visibleOptions = [...this.value];
                }
            }

            this.movedDown = true;
            this.onReorder.emit(this.selection);
        }

        this.listViewChild?.cd?.markForCheck();
    }

    moveBottom() {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex: number = findIndexInList(selectedItem, this.value || []);

                if (this.value instanceof Array && selectedItemIndex != this.value.length - 1) {
                    let movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.push(movedItem);
                } else {
                    break;
                }
            }

            if (this.dragdrop) {
                if (this.filterValue) {
                    this.filter();
                } else if (this.visibleOptions) {
                    this.visibleOptions = [...(this.value || [])];
                }
            }

            this.onReorder.emit(this.selection);
            this.listViewChild?.scrollInView(this.value?.length ? this.value.length - 1 : 0);
        }
        this.listViewChild?.cd?.markForCheck();
    }

    onDrop(event: CdkDragDrop<string[]>) {
        let previousIndex = event.previousIndex;
        let currentIndex = event.currentIndex;

        // Store the original state before any modifications
        const originalValue = [...(this.value || [])];
        const originalVisibleOptions = this.visibleOptions ? [...this.visibleOptions] : null;

        if (previousIndex !== currentIndex) {
            // Determine items to move
            let itemsToMove: any[] = [];

            // Check if dragged item is in selected items AND we have multiple selections
            if (this.selection && this.selection.length > 1 && findIndexInList(event.item.data, this.selection) !== -1) {
                // Multi-selection: Move all selected items
                itemsToMove = [...this.selection];

                // For multi-selection, restore original state to undo Listbox's automatic reordering
                if (this.value) {
                    this.value.length = 0;
                    this.value.push(...originalValue);
                }
                if (originalVisibleOptions && this.visibleOptions) {
                    this.visibleOptions.length = 0;
                    this.visibleOptions.push(...originalVisibleOptions);
                }

                // Sort items by their index in the array to maintain relative order
                itemsToMove = this.sortByIndexInList(itemsToMove, this.value || []);

                // Calculate how many selected items are before the drop position
                let itemsBefore = 0;
                for (const item of itemsToMove) {
                    const itemIndex = findIndexInList(item, this.value || []);
                    if (itemIndex !== -1 && itemIndex < currentIndex) {
                        itemsBefore++;
                    }
                }

                // Remove all selected items (in reverse order to avoid index shifting)
                for (let i = itemsToMove.length - 1; i >= 0; i--) {
                    const itemIndex = findIndexInList(itemsToMove[i], this.value || []);
                    if (itemIndex !== -1) {
                        this.value?.splice(itemIndex, 1);
                    }
                }

                // Calculate the final target index
                // If we're dragging down, we need to subtract the number of items that were before the target
                const targetIndex = Math.max(0, currentIndex - itemsBefore);

                // Insert all selected items at the target position
                for (let i = 0; i < itemsToMove.length; i++) {
                    this.value?.splice(targetIndex + i, 0, itemsToMove[i]);
                }
                // Update visibleOptions to match value
                if (this.dragdrop) {
                    if (this.filterValue) {
                        this.filter();
                    } else if (this.visibleOptions) {
                        this.visibleOptions = [...(this.value || [])];
                    }
                }

                // Ensure change detection runs
                this.cd?.markForCheck();

                this.onReorder.emit(itemsToMove);
            } else {
                // Single item: Move only the dragged item (let Listbox handle it)
                itemsToMove = [event.item.data];

                if (this.filterValue) {
                    previousIndex = findIndexInList(event.item.data, this.value || []);
                    currentIndex = findIndexInList(this.visibleOptions?.[currentIndex], this.value || []);
                }

                moveItemInArray(this.value as any[], previousIndex, currentIndex);

                // Sync visibleOptions for non-filtered case
                if (this.dragdrop && this.visibleOptions && !this.filterValue) {
                    this.visibleOptions = [...(this.value || [])];
                }

                this.onReorder.emit([event.item.data]);
            }
        }
    }

    // Helper method to sort items by their index in a list
    private sortByIndexInList(items: any[], list: any[]): any[] {
        return items.sort((a, b) => {
            const indexA = findIndexInList(a, list);
            const indexB = findIndexInList(b, list);
            return indexA - indexB;
        });
    }

    onListFocus(event: any) {
        this.onFocus.emit(event);
    }

    onListBlur(event: any) {
        this.onBlur.emit(event);
    }

    getVisibleOptions() {
        return this.visibleOptions && this.visibleOptions.length > 0 ? this.visibleOptions : this.value && this.value.length > 0 ? this.value : null;
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
                setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
                this.renderer.appendChild(this.document.head, this.styleElement);

                let innerHTML = `
                    @media screen and (max-width: ${this.breakpoint}) {
                        .p-orderlist[${this.attrSelector}] {
                            flex-direction: column;
                        }

                        .p-orderlist[${this.attrSelector}] .p-orderlist-controls {
                            padding: var(--content-padding);
                            flex-direction: row;
                        }

                        .p-orderlist[${this.attrSelector}] .p-orderlist-controls .p-button {
                            margin-right: var(--inline-spacing);
                            margin-bottom: 0;
                        }

                        .p-orderlist[${this.attrSelector}] .p-orderlist-controls .p-button:last-child {
                            margin-right: 0;
                        }
                    }
                `;
                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
                setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
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
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [OrderList, SharedModule],
    exports: [OrderList, SharedModule]
})
export class OrderListModule {}
