import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    inject,
    InjectionToken,
    input,
    model,
    NgModule,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    untracked,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { findIndexInList, setAttribute, uuid } from '@primeuix/utils';
import { FilterMatchModeType, FilterService } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Button } from 'primeng/button';
import type { ButtonProps } from 'primeng/types/button';
import { AngleDoubleDown as AngleDoubleDownIcon } from '@primeicons/angular/angle-double-down';
import { AngleDoubleUp as AngleDoubleUpIcon } from '@primeicons/angular/angle-double-up';
import { AngleDown as AngleDownIcon } from '@primeicons/angular/angle-down';
import { AngleUp as AngleUpIcon } from '@primeicons/angular/angle-up';
import { Listbox, ListboxChangeEvent } from 'primeng/listbox';
import type { CSSProperties } from 'primeng/types/shared';
import type { OrderListControlsPosition } from 'primeng/types/orderlist';
import { OrderListFilterEvent, OrderListFilterOptions, OrderListFilterTemplateContext, OrderListItemTemplateContext, OrderListPassThrough, OrderListSelectionChangeEvent } from 'primeng/types/orderlist';
import { OrderListStyle } from './style/orderliststyle';

const ORDERLIST_INSTANCE = new InjectionToken<OrderList>('ORDERLIST_INSTANCE');

/**
 * OrderList is used to manage the order of a collection.
 * @group Components
 */
@Component({
    selector: 'p-orderlist, p-order-list',
    standalone: true,
    imports: [NgTemplateOutlet, Button, DragDropModule, AngleDoubleDownIcon, AngleDoubleUpIcon, AngleUpIcon, AngleDownIcon, Listbox, FormsModule, Bind],
    template: `
        <div [pBind]="ptm('controls')" [class]="cx('controls')">
            <p-button [pt]="ptm('pcMoveUpButton')" [disabled]="$moveDisabled()" [ariaLabel]="moveUpAriaLabel()" [buttonProps]="upButtonProps()" (onClick)="moveUp()" [unstyled]="unstyled()" hostName="orderlist">
                <ng-template #icon>
                    @if (!moveUpIconTemplate()) {
                        <svg data-p-icon="angle-up" [pBind]="ptm('pcMoveUpButton')['icon']" />
                    } @else {
                        <ng-container *ngTemplateOutlet="moveUpIconTemplate()" />
                    }
                </ng-template>
            </p-button>
            <p-button [pt]="ptm('pcMoveTopButton')" [disabled]="$moveDisabled()" [ariaLabel]="moveTopAriaLabel()" [buttonProps]="topButtonProps()" (onClick)="moveTop()" [unstyled]="unstyled()" hostName="orderlist">
                <ng-template #icon>
                    @if (!moveTopIconTemplate()) {
                        <svg data-p-icon="angle-double-up" [pBind]="ptm('pcMoveTopButton')['icon']" />
                    } @else {
                        <ng-container *ngTemplateOutlet="moveTopIconTemplate()" />
                    }
                </ng-template>
            </p-button>
            <p-button [pt]="ptm('pcMoveDownButton')" [disabled]="$moveDisabled()" [ariaLabel]="moveDownAriaLabel()" [buttonProps]="downButtonProps()" (onClick)="moveDown()" [unstyled]="unstyled()" hostName="orderlist">
                <ng-template #icon>
                    @if (!moveDownIconTemplate()) {
                        <svg data-p-icon="angle-down" [pBind]="ptm('pcMoveDownButton')['icon']" />
                    } @else {
                        <ng-container *ngTemplateOutlet="moveDownIconTemplate()" />
                    }
                </ng-template>
            </p-button>
            <p-button [pt]="ptm('pcMoveBottomButton')" [disabled]="$moveDisabled()" [ariaLabel]="moveBottomAriaLabel()" [buttonProps]="bottomButtonProps()" (onClick)="moveBottom()" [unstyled]="unstyled()" hostName="orderlist">
                <ng-template #icon>
                    @if (!moveBottomIconTemplate()) {
                        <svg data-p-icon="angle-double-down" [pBind]="ptm('pcMoveBottomButton')['icon']" />
                    } @else {
                        <ng-container *ngTemplateOutlet="moveBottomIconTemplate()" />
                    }
                </ng-template>
            </p-button>
        </div>
        <p-listbox
            [pt]="ptm('pcListbox')"
            #listelement
            [multiple]="true"
            [options]="value()"
            [(ngModel)]="d_selection"
            [optionLabel]="$optionLabel()"
            [id]="id + '_list'"
            [listStyle]="listStyle()"
            [striped]="stripedRows()"
            [tabindex]="tabindex()"
            (onFocus)="onListFocus($event)"
            (onBlur)="onListBlur($event)"
            (onChange)="onChangeSelection($event)"
            [ariaLabel]="ariaLabel()"
            [disabled]="disabled()"
            [metaKeySelection]="metaKeySelection()"
            [scrollHeight]="scrollHeight()"
            [autoOptionFocus]="autoOptionFocus()"
            [filter]="filterBy()"
            [filterBy]="filterBy()"
            [filterLocale]="filterLocale()"
            [filterPlaceHolder]="filterPlaceholder()"
            [dragdrop]="dragdrop()"
            (onDrop)="onDrop($event)"
            hostName="orderlist"
            [unstyled]="unstyled()"
        >
            @if (headerTemplate()) {
                <ng-template #header>
                    <ng-template *ngTemplateOutlet="headerTemplate()" />
                </ng-template>
            }
            @if (itemTemplate()) {
                <ng-template #item let-option let-selected="selected" let-index="index">
                    <ng-template *ngTemplateOutlet="itemTemplate(); context: { $implicit: option, selected: selected, index: index }" />
                </ng-template>
            }
            @if (emptyMessageTemplate()) {
                <ng-template #empty>
                    <ng-template *ngTemplateOutlet="emptyMessageTemplate()" />
                </ng-template>
            }
            @if (emptyFilterMessageTemplate()) {
                <ng-template #emptyfilter>
                    <ng-template *ngTemplateOutlet="emptyFilterMessageTemplate()" />
                </ng-template>
            }
            @if (filterIconTemplate()) {
                <ng-template #filtericon>
                    <ng-template *ngTemplateOutlet="filterIconTemplate()" />
                </ng-template>
            }
            @if (filterTemplate()) {
                <ng-template #filter let-options="options">
                    <ng-template *ngTemplateOutlet="filterTemplate(); context: { options: options }" />
                </ng-template>
            }
        </p-listbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [OrderListStyle, { provide: ORDERLIST_INSTANCE, useExisting: OrderList }, { provide: PARENT_INSTANCE, useExisting: OrderList }],
    host: {
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class OrderList extends BaseComponent<OrderListPassThrough> {
    componentName = 'OrderList';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcOrderList: OrderList | undefined = inject(ORDERLIST_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * Text for the caption.
     * @group Props
     */
    header = input<string>();

    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(undefined, { transform: numberAttribute });

    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();

    /**
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    ariaLabelledBy = input<string>();

    /**
     * Inline style of the list element.
     * @group Props
     */
    listStyle = input<CSSProperties>();

    /**
     * A boolean value that indicates whether the component should be responsive.
     * @group Props
     */
    responsive = input(false, { transform: booleanAttribute });

    /**
     * When specified displays an input field to filter the items on keyup and decides which fields to search against.
     * @group Props
     */
    filterBy = input<string>();

    /**
     * Placeholder of the filter input.
     * @group Props
     */
    filterPlaceholder = input<string>();

    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string>();

    /**
     * When true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = input(false, { transform: booleanAttribute });

    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    dragdrop = input(false, { transform: booleanAttribute });

    /**
     * Defines the location of the buttons with respect to the list.
     * @group Props
     */
    controlsPosition = input<OrderListControlsPosition>('left');

    /**
     * Defines a string that labels the filter input.
     * @group Props
     */
    ariaFilterLabel = input<string>();

    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = input<FilterMatchModeType>('contains');

    /**
     * Indicates the width of the screen at which the component should change its behavior.
     * @group Props
     */
    breakpoint = input('960px');

    /**
     * Whether to displays rows with alternating colors.
     * @group Props
     */
    stripedRows = input(false, { transform: booleanAttribute });

    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });

    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    trackBy = input<Function>((index: number, item: any) => item);

    /**
     * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = input('14rem');

    /**
     * Whether to focus on the first visible or selected element.
     * @group Props
     */
    autoOptionFocus = input(true, { transform: booleanAttribute });

    /**
     * Name of the field that uniquely identifies the record in the data.
     * @group Props
     */
    dataKey = input<string>();

    /**
     * A list of values that are currently selected.
     * @group Props
     */
    selection = model<any[]>([]);

    /**
     * Array of values to be displayed in the component.
     * It represents the data source for the list of items.
     * @group Props
     */
    value = model<any[] | undefined>();

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    buttonProps = input<ButtonProps>({ severity: 'secondary' });

    /**
     * Used to pass all properties of the ButtonProps to the move up button inside the component.
     * @group Props
     */
    moveUpButtonProps = input<ButtonProps>();

    /**
     * Used to pass all properties of the ButtonProps to the move top button inside the component.
     * @group Props
     */
    moveTopButtonProps = input<ButtonProps>();

    /**
     * Used to pass all properties of the ButtonProps to the move down button inside the component.
     * @group Props
     */
    moveDownButtonProps = input<ButtonProps>();

    /**
     * Used to pass all properties of the ButtonProps to the move bottom button inside the component.
     * @group Props
     */
    moveBottomButtonProps = input<ButtonProps>();

    /**
     * Callback to invoke when list is reordered.
     * @param {*} any - list instance.
     * @group Emits
     */
    onReorder = output<any>();

    /**
     * Callback to invoke when selection changes.
     * @param {OrderListSelectionChangeEvent} event - Custom change event.
     * @group Emits
     */
    onSelectionChange = output<OrderListSelectionChangeEvent>();

    /**
     * Callback to invoke when filtering occurs.
     * @param {OrderListFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilterEvent = output<OrderListFilterEvent>();

    /**
     * Callback to invoke when the list is focused
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = output<Event>();

    /**
     * Callback to invoke when the list is blurred
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = output<Event>();

    listViewChild = viewChild.required<Listbox>('listelement');

    filterViewChild = viewChild<ElementRef>('filter');

    /**
     * Custom item template.
     * @param {OrderListItemTemplateContext} context - item context.
     * @see {@link OrderListItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<OrderListItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom empty template.
     * @group Templates
     */
    emptyMessageTemplate = contentChild<TemplateRef<void>>('empty', { descendants: false });

    /**
     * Custom empty filter template.
     * @group Templates
     */
    emptyFilterMessageTemplate = contentChild<TemplateRef<void>>('emptyfilter', { descendants: false });

    /**
     * Custom filter template.
     * @param {OrderListFilterTemplateContext} context - filter context.
     * @see {@link OrderListFilterTemplateContext}
     * @group Templates
     */
    filterTemplate = contentChild<TemplateRef<OrderListFilterTemplateContext>>('filter', { descendants: false });

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });

    /**
     * Custom move up icon template.
     * @group Templates
     */
    moveUpIconTemplate = contentChild<TemplateRef<void>>('moveupicon', { descendants: false });

    /**
     * Custom move top icon template.
     * @group Templates
     */
    moveTopIconTemplate = contentChild<TemplateRef<void>>('movetopicon', { descendants: false });

    /**
     * Custom move down icon template.
     * @group Templates
     */
    moveDownIconTemplate = contentChild<TemplateRef<void>>('movedownicon', { descendants: false });

    /**
     * Custom move bottom icon template.
     * @group Templates
     */
    moveBottomIconTemplate = contentChild<TemplateRef<void>>('movebottomicon', { descendants: false });

    /**
     * Custom filter icon template.
     * @group Templates
     */
    filterIconTemplate = contentChild<TemplateRef<void>>('filtericon', { descendants: false });

    private translation = toSignal(this.config.translationObserver, { initialValue: this.config.translation });

    moveUpAriaLabel = computed(() => this.translation()?.aria?.moveUp);

    moveTopAriaLabel = computed(() => this.translation()?.aria?.moveTop);

    moveDownAriaLabel = computed(() => this.translation()?.aria?.moveDown);

    moveBottomAriaLabel = computed(() => this.translation()?.aria?.moveBottom);

    upButtonProps = computed(() => ({ ...this.buttonProps(), ...this.moveUpButtonProps() }));

    topButtonProps = computed(() => ({ ...this.buttonProps(), ...this.moveTopButtonProps() }));

    downButtonProps = computed(() => ({ ...this.buttonProps(), ...this.moveDownButtonProps() }));

    bottomButtonProps = computed(() => ({ ...this.buttonProps(), ...this.moveBottomButtonProps() }));

    $optionLabel = computed(() => this.dataKey() ?? 'name');

    $moveDisabled = computed(() => this.disabled() || !this.selection()?.length);

    _componentStyle = inject(OrderListStyle);

    filterOptions: OrderListFilterOptions | undefined;

    d_selection: any[] = [];

    movedUp: boolean | undefined;

    movedDown: boolean | undefined;

    itemTouched: boolean | undefined;

    styleElement: any;

    id: string = uuid('pn_id_');

    filterValue = signal<string | null>(null);

    visibleOptions = signal<any[] | null>(null);

    filterService = inject(FilterService);

    constructor() {
        super();

        effect(() => {
            this.d_selection = this.selection();
        });

        effect(() => {
            const val = this.value();
            untracked(() => {
                if (this.filterValue()) {
                    this.filter();
                } else if (this.dragdrop()) {
                    this.visibleOptions.set([...(val || [])]);
                }
            });
        });
    }

    onInit() {
        if (this.responsive()) {
            this.createStyle();
        }

        if (this.filterBy()) {
            this.filterOptions = {
                filter: (value) => this.onFilterKeyup(value),
                reset: () => this.resetFilter()
            };
        }

        // Initialize visibleOptions for drag&drop if enabled and value exists
        if (this.dragdrop() && this.value() && !this.visibleOptions()) {
            this.visibleOptions.set([...this.value()!]);
        }
    }

    onChangeSelection(e: ListboxChangeEvent) {
        this.d_selection = e.value;
        this.selection.set(e.value);
        this.onSelectionChange.emit({ originalEvent: e.originalEvent, value: e.value });
    }

    onFilterKeyup(event: KeyboardEvent) {
        this.filterValue.set(((<HTMLInputElement>event.target).value.trim() as any).toLocaleLowerCase(this.filterLocale()));
        this.filter();

        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions() as any[]
        });
    }

    filter() {
        let searchFields: string[] = (this.filterBy() as string).split(',');
        this.visibleOptions.set(this.filterService.filter(this.value() as any[], searchFields, this.filterValue(), this.filterMatchMode(), this.filterLocale()));
    }

    /**
     * Callback to invoke on filter reset.
     * @group Method
     */
    public resetFilter() {
        this.filterValue.set('');
        const filterEl = this.filterViewChild();
        if (filterEl) {
            (<HTMLInputElement>filterEl.nativeElement).value = '';
        }
    }

    isItemVisible(item: any): boolean | undefined {
        if (this.filterValue() && this.filterValue()!.trim().length) {
            for (let i = 0; i < (this.visibleOptions() as any[]).length; i++) {
                if (item == (this.visibleOptions() as any[])[i]) {
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
        return this.filterValue() ? !this.visibleOptions() || this.visibleOptions()!.length === 0 : !this.value() || this.value()!.length === 0;
    }

    moveUp() {
        const sel = this.selection();
        const val = this.value();
        if (sel && val instanceof Array) {
            // Sort selection by their current index to process them from top to bottom
            const sortedSelection = this.sortByIndexInList(sel, val);

            for (let selectedItem of sortedSelection) {
                let selectedItemIndex: number = findIndexInList(selectedItem, val);
                // Only move if not at top and there's a valid position above
                if (selectedItemIndex > 0) {
                    let movedItem = val[selectedItemIndex];
                    let temp = val[selectedItemIndex - 1];
                    val[selectedItemIndex - 1] = movedItem;
                    val[selectedItemIndex] = temp;
                }
                // Don't break - continue with other items even if one can't move
            }

            this.value.set([...val]);
            this.movedUp = true;
            this.onReorder.emit(sel);
        }
    }

    moveTop() {
        const sel = this.selection();
        const val = this.value();
        if (sel) {
            for (let i = sel.length - 1; i >= 0; i--) {
                let selectedItem = sel[i];
                let selectedItemIndex: number = findIndexInList(selectedItem, val || []);

                if (selectedItemIndex != 0 && val instanceof Array) {
                    let movedItem = val.splice(selectedItemIndex, 1)[0];
                    val.unshift(movedItem);
                } else {
                    break;
                }
            }

            this.value.set([...(val || [])]);
            this.onReorder.emit(sel);
            setTimeout(() => {
                this.listViewChild().scrollInView(0);
            });
        }
    }

    moveDown() {
        const sel = this.selection();
        const val = this.value();
        if (sel && val instanceof Array) {
            const sortedSelection = this.sortByIndexInList(sel, val).reverse();

            for (let selectedItem of sortedSelection) {
                let selectedItemIndex: number = findIndexInList(selectedItem, val);
                if (selectedItemIndex < val.length - 1) {
                    let movedItem = val[selectedItemIndex];
                    let temp = val[selectedItemIndex + 1];
                    val[selectedItemIndex + 1] = movedItem;
                    val[selectedItemIndex] = temp;
                }
            }

            this.value.set([...val]);
            this.movedDown = true;
            this.onReorder.emit(sel);
        }
    }

    moveBottom() {
        const sel = this.selection();
        const val = this.value();
        if (sel) {
            for (let i = 0; i < sel.length; i++) {
                let selectedItem = sel[i];
                let selectedItemIndex: number = findIndexInList(selectedItem, val || []);

                if (val instanceof Array && selectedItemIndex != val.length - 1) {
                    let movedItem = val.splice(selectedItemIndex, 1)[0];
                    val.push(movedItem);
                } else {
                    break;
                }
            }

            this.value.set([...(val || [])]);
            this.onReorder.emit(sel);
            this.listViewChild()?.scrollInView(val?.length ? val.length - 1 : 0);
        }
    }

    onDrop(event: CdkDragDrop<string[]>) {
        let currentIndex = event.currentIndex;

        const val = this.value();
        const sel = this.selection();

        // Store the original state before Listbox's automatic reordering
        const originalValue = [...(val || [])];

        if (event.previousIndex !== currentIndex) {
            // Check if dragged item is in selected items AND we have multiple selections
            if (sel && sel.length > 1 && findIndexInList(event.item.data, sel) !== -1) {
                // Multi-selection: Move all selected items
                let itemsToMove = [...sel];

                // Restore original state to undo Listbox's automatic single-item reordering
                if (val) {
                    val.length = 0;
                    val.push(...originalValue);
                }

                // Map CDK index to real index when Listbox is filtering
                const listboxFilterValue = this.listViewChild()._filterValue?.();
                if (listboxFilterValue && this.filterBy()) {
                    const filterFields = (this.filterBy() as string).split(',');
                    const originalFiltered = this.filterService.filter(originalValue, filterFields, listboxFilterValue, this.filterMatchMode(), this.filterLocale());
                    const targetItem = originalFiltered[currentIndex];
                    currentIndex = findIndexInList(targetItem, originalValue);
                }

                // Sort items by their index in the array to maintain relative order
                itemsToMove = this.sortByIndexInList(itemsToMove, val || []);

                // Calculate how many selected items are before the drop position
                let itemsBefore = 0;
                for (const item of itemsToMove) {
                    const itemIndex = findIndexInList(item, val || []);
                    if (itemIndex !== -1 && itemIndex < currentIndex) {
                        itemsBefore++;
                    }
                }

                // Remove all selected items (in reverse order to avoid index shifting)
                for (let i = itemsToMove.length - 1; i >= 0; i--) {
                    const itemIndex = findIndexInList(itemsToMove[i], val || []);
                    if (itemIndex !== -1) {
                        val?.splice(itemIndex, 1);
                    }
                }

                // Calculate the final target index
                const targetIndex = Math.max(0, currentIndex - itemsBefore);

                // Insert all selected items at the target position
                for (let i = 0; i < itemsToMove.length; i++) {
                    val?.splice(targetIndex + i, 0, itemsToMove[i]);
                }
                this.value.set([...(val || [])]);
                this.onReorder.emit(itemsToMove);
            } else {
                // Single item: perform manual reorder using original state
                if (val) {
                    val.length = 0;
                    val.push(...originalValue);

                    const [movedItem] = val.splice(event.previousIndex, 1);
                    val.splice(currentIndex, 0, movedItem);
                    this.value.set([...val]);
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
        const vo = this.visibleOptions();
        const val = this.value();
        return vo && vo.length > 0 ? vo : val && val.length > 0 ? val : null;
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
                    @media screen and (max-width: ${this.breakpoint()}) {
                        .p-orderlist[${this.$attrSelector}] {
                            flex-direction: column;
                        }

                        .p-orderlist[${this.$attrSelector}] .p-orderlist-controls {
                            padding: var(--content-padding);
                            flex-direction: row;
                        }

                        .p-orderlist[${this.$attrSelector}] .p-orderlist-controls .p-button {
                            margin-right: var(--inline-spacing);
                            margin-bottom: 0;
                        }

                        .p-orderlist[${this.$attrSelector}] .p-orderlist-controls .p-button:last-child {
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

    onDestroy() {
        this.destroyStyle();
    }
}

@NgModule({
    imports: [OrderList],
    exports: [OrderList]
})
export class OrderListModule {}
