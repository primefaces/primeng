import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, effect, ElementRef, inject, input, NgModule, numberAttribute, output, signal, TemplateRef, viewChild, ViewEncapsulation, ViewRef } from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { absolutePosition, addStyle, appendChild, findLastIndex, findSingle, focus, getOuterWidth, isEmpty, isNotEmpty, isPrintableCharacter, isTouchDevice, relativePosition, resolve, uuid } from '@primeuix/utils';
import { MenuItem, OverlayService, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ConnectedOverlayScrollHandler } from 'primeng/dom';
import { MotionModule } from 'primeng/motion';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { TieredMenuFocusedItemInfo, TieredMenuItemClickEvent, TieredMenuItemMouseEnterEvent, TieredMenuItemTemplateContext, TieredMenuPassThrough, TieredMenuProcessedItem, TieredMenuToggleEvent } from 'primeng/types/tieredmenu';
import { ZIndexUtils } from 'primeng/utils';
import { TieredMenuStyle } from './style/tieredmenustyle';
import { TieredMenuSub } from './tieredmenu-sub';
import { TIEREDMENU_INSTANCE } from './tieredmenu-token';

/**
 * TieredMenu displays submenus in nested overlays.
 * @group Components
 */
@Component({
    selector: 'p-tieredmenu, p-tiered-menu',
    standalone: true,
    imports: [TieredMenuSub, SharedModule, BindModule, MotionModule],
    template: `
        @if (shouldRender()) {
            <div
                #container
                [id]="$id()"
                [class]="cn(cx('root'), styleClass())"
                [style]="style()"
                [pBind]="ptm('root')"
                (click)="onOverlayClick($event)"
                [pMotion]="shouldAnimate()"
                [pMotionName]="'p-anchored-overlay'"
                [pMotionAppear]="true"
                [pMotionDisabled]="!popup()"
                [pMotionOptions]="computedMotionOptions()"
                (pMotionOnBeforeEnter)="onOverlayBeforeEnter($event)"
                (pMotionOnAfterEnter)="onOverlayAfterEnter()"
                (pMotionOnAfterLeave)="onOverlayAfterLeave()"
            >
                <p-tieredmenusub
                    #rootmenu
                    [root]="true"
                    [visible]="true"
                    [items]="processedItems"
                    [itemTemplate]="itemTemplate()"
                    [menuId]="$id()"
                    [tabindex]="getMenuTabindex()"
                    [ariaLabel]="ariaLabel()"
                    [ariaLabelledBy]="ariaLabelledBy()"
                    [baseZIndex]="baseZIndex()"
                    [autoZIndex]="autoZIndex()"
                    [autoDisplay]="autoDisplay()"
                    [popup]="popup()"
                    [focusedItemId]="getFocusedItemIdValue()"
                    [activeItemPath]="activeItemPath()"
                    (itemClick)="onItemClick($event)"
                    (menuFocus)="onMenuFocus($event)"
                    (menuBlur)="onMenuBlur($event)"
                    (menuKeydown)="onKeyDown($event)"
                    (itemMouseEnter)="onItemMouseEnter($event)"
                    [pt]="pt()"
                    [unstyled]="unstyled()"
                    [motionOptions]="computedMotionOptions()"
                ></p-tieredmenusub>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TieredMenuStyle, { provide: TIEREDMENU_INSTANCE, useExisting: TieredMenu }, { provide: PARENT_INSTANCE, useExisting: TieredMenu }],
    hostDirectives: [Bind]
})
export class TieredMenu extends BaseComponent<TieredMenuPassThrough> {
    componentName = 'TieredMenu';

    /**
     * An array of menuitems.
     * @group Props
     */
    model = input<MenuItem[]>();
    /**
     * Defines if menu would displayed as a popup.
     * @group Props
     */
    popup = input(false, { transform: booleanAttribute });
    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<CSSProperties>();
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * The breakpoint to define the maximum width boundary.
     * @group Props
     */
    breakpoint = input('960px');
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = input(true, { transform: booleanAttribute });
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = input(0, { transform: numberAttribute });
    /**
     * Whether to show a root submenu on mouse over.
     * @defaultValue true
     * @group Props
     */
    autoDisplay = input(true, { transform: booleanAttribute });
    /**
     * Current id state as a string.
     * @group Props
     */
    id = input<string>();
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<AppendTo>();
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions>();

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
    /**
     * Callback to invoke when overlay menu is shown.
     * @group Emits
     */
    onShow = output<Record<string, never>>();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    onHide = output<Record<string, never>>();

    rootmenu = viewChild<TieredMenuSub>('rootmenu');

    containerViewChild = viewChild<ElementRef<HTMLDivElement>>('container');
    /**
     * Custom submenu icon template.
     * @group Templates
     */
    submenuIconTemplate = contentChild<TemplateRef<void>>('submenuicon', { descendants: false });
    /**
     * Custom item template.
     * @param {TieredMenuItemTemplateContext} context - item context.
     * @see {@link TieredMenuItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<TieredMenuItemTemplateContext>>('item', { descendants: false });

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    render = signal<boolean>(false);

    container: HTMLElement | undefined;

    outsideClickListener: VoidListener;

    resizeListener: VoidListener;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    target: HTMLElement | null = null;

    relatedTarget: HTMLElement | null = null;

    visible: boolean | undefined;

    dirty: boolean = false;

    focused: boolean = false;

    activeItemPath = signal<TieredMenuProcessedItem[]>([]);

    focusedItemInfo = signal<TieredMenuFocusedItemInfo>({ index: -1, level: 0, parentKey: '', item: null });

    searchValue: string = '';

    searchTimeout: ReturnType<typeof setTimeout> | undefined;

    _processedItems: TieredMenuProcessedItem[] = [];

    _componentStyle = inject(TieredMenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    overlayService = inject(OverlayService);

    private matchMediaListener: (() => void) | null = null;

    private query: MediaQueryList;

    public queryMatches = signal<boolean>(false);

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    shouldRender(): boolean {
        return this.render() || !this.popup();
    }

    shouldAnimate(): boolean {
        return this.visible || !this.popup();
    }

    getMenuTabindex() {
        return !this.disabled() ? this.tabindex() : -1;
    }

    getFocusedItemIdValue() {
        return this.focused ? this.focusedItemId : undefined;
    }

    get visibleItems(): TieredMenuProcessedItem[] {
        const processedItem = this.activeItemPath().find((p: TieredMenuProcessedItem) => p.key === this.focusedItemInfo().parentKey);
        return processedItem ? processedItem.items : this.processedItems;
    }

    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model() || []);
        }
        return this._processedItems;
    }

    get focusedItemId() {
        const focusedItemInfo = this.focusedItemInfo();
        return focusedItemInfo.item?.id ? focusedItemInfo.item.id : focusedItemInfo.index !== -1 ? `${this.$id()}${isNotEmpty(focusedItemInfo.parentKey) ? '_' + focusedItemInfo.parentKey : ''}_${focusedItemInfo.index}` : null;
    }

    constructor() {
        super();
        effect(() => {
            const path = this.activeItemPath();

            if (isNotEmpty(path)) {
                this.bindOutsideClickListener();
                this.bindResizeListener();
            } else {
                this.unbindOutsideClickListener();
                this.unbindResizeListener();
            }
        });

        effect(() => {
            const value = this.model();
            if (value) {
                this._processedItems = this.createProcessedItems(value);
            }
        });
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onInit() {
        this.bindMatchMediaListener();
    }

    bindMatchMediaListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.matchMediaListener) {
                const query = window.matchMedia(`(max-width: ${this.breakpoint()})`);

                this.query = query;
                this.queryMatches.set(query.matches);

                this.matchMediaListener = () => {
                    this.queryMatches.set(query.matches);
                };

                query.addEventListener('change', this.matchMediaListener);
            }
        }
    }

    unbindMatchMediaListener() {
        if (this.matchMediaListener) {
            this.query.removeEventListener('change', this.matchMediaListener);
            this.matchMediaListener = null;
        }
    }

    createProcessedItems(items: MenuItem[] | undefined, level: number = 0, parent: TieredMenuProcessedItem | Record<string, never> = {}, parentKey: string = ''): TieredMenuProcessedItem[] {
        const processedItems: TieredMenuProcessedItem[] = [];

        items &&
            items.forEach((item: MenuItem, index: number) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem: TieredMenuProcessedItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey,
                    items: []
                };

                newItem.items = this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });

        return processedItems;
    }

    getItemProp(item: MenuItem, name: keyof MenuItem) {
        return item ? resolve(item[name]) : undefined;
    }

    getProccessedItemLabel(processedItem: TieredMenuProcessedItem) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }

    getItemLabel(item: MenuItem) {
        return this.getItemProp(item, 'label');
    }

    isProcessedItemGroup(processedItem: TieredMenuProcessedItem): boolean {
        return processedItem && isNotEmpty(processedItem.items);
    }

    isSelected(processedItem: TieredMenuProcessedItem): boolean {
        return this.activeItemPath().some((p: TieredMenuProcessedItem) => p.key === processedItem.key);
    }

    isValidSelectedItem(processedItem: TieredMenuProcessedItem): boolean {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }

    isValidItem(processedItem: TieredMenuProcessedItem): boolean {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item) && this.isItemVisible(processedItem.item);
    }

    isItemDisabled(item: MenuItem): boolean {
        return !!this.getItemProp(item, 'disabled');
    }

    isItemVisible(item: MenuItem): boolean {
        return this.getItemProp(item, 'visible') !== false;
    }

    isItemSeparator(item: MenuItem): boolean {
        return !!this.getItemProp(item, 'separator');
    }

    isItemMatched(processedItem: TieredMenuProcessedItem): boolean {
        const label = this.getProccessedItemLabel(processedItem);
        return this.isValidItem(processedItem) && !!label && label.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isProccessedItemGroup(processedItem: TieredMenuProcessedItem): boolean {
        return processedItem && isNotEmpty(processedItem.items);
    }

    onOverlayClick(event: MouseEvent) {
        if (this.popup()) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }
    }

    onItemClick(event: TieredMenuItemClickEvent) {
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);

        if (selected) {
            const { index, key, level, parentKey, item } = processedItem;

            this.activeItemPath.set(this.activeItemPath().filter((p: TieredMenuProcessedItem) => key !== p.key && key.startsWith(p.key)));
            this.focusedItemInfo.set({ index, level, parentKey, item });

            this.dirty = true;
            focus(this.rootmenu()?.sublistViewChild()?.nativeElement);
        } else {
            if (grouped) {
                this.onItemChange(event);
            } else {
                const rootProcessedItem = root ? processedItem : this.activeItemPath().find((p: TieredMenuProcessedItem) => p.parentKey === '');
                this.hide(originalEvent);
                this.changeFocusedItemIndex(originalEvent, rootProcessedItem?.index ?? -1);

                focus(this.rootmenu()?.sublistViewChild()?.nativeElement);
            }
        }
    }

    onItemMouseEnter(event: TieredMenuItemMouseEnterEvent) {
        if (!isTouchDevice()) {
            if (this.dirty) {
                this.onItemChange(event, 'hover');
            }
        } else {
            this.onItemChange({ ...event, focus: this.autoDisplay() }, 'hover');
        }
    }

    onKeyDown(event: KeyboardEvent) {
        const metaKey = event.metaKey || event.ctrlKey;

        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;

            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;

            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            case 'Space':
                this.onSpaceKey(event);
                break;

            case 'Enter':
                this.onEnterKey(event);
                break;

            case 'Escape':
                this.onEscapeKey(event);
                break;

            case 'Tab':
                this.onTabKey(event);
                break;

            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;

            default:
                if (!metaKey && isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }

                break;
        }
    }

    onArrowDownKey(event: KeyboardEvent) {
        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

        this.changeFocusedItemIndex(event, itemIndex);
        event.preventDefault();
    }

    onArrowRightKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const grouped = this.isProccessedItemGroup(processedItem);
        const item = processedItem?.item;

        if (grouped) {
            this.onItemChange({ originalEvent: event, processedItem });
            this.focusedItemInfo.set({ index: -1, parentKey: processedItem.key, item });
            this.searchValue = '';
            this.onArrowDownKey(event);
        }

        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        if (event.altKey) {
            if (this.focusedItemInfo().index !== -1) {
                const processedItem = this.visibleItems[this.focusedItemInfo().index];
                const grouped = this.isProccessedItemGroup(processedItem);

                !grouped && this.onItemChange({ originalEvent: event, processedItem });
            }

            this.popup() && this.hide(event, true);
            event.preventDefault();
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();

            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        if (!processedItem) {
            event.preventDefault();
            return;
        }
        const parentItem = this.activeItemPath().find((p: TieredMenuProcessedItem) => p.key === processedItem.parentKey);
        const root = isEmpty(processedItem.parent);

        if (!root) {
            this.focusedItemInfo.set({ index: -1, parentKey: parentItem ? parentItem.parentKey : '', item: processedItem.item });
            this.searchValue = '';
            this.onArrowDownKey(event);
        }

        const activeItemPath = this.activeItemPath().filter((p: TieredMenuProcessedItem) => p.parentKey !== this.focusedItemInfo().parentKey);
        this.activeItemPath.set(activeItemPath);

        event.preventDefault();
    }

    onHomeKey(event: KeyboardEvent) {
        this.changeFocusedItemIndex(event, this.findFirstItemIndex());
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        this.changeFocusedItemIndex(event, this.findLastItemIndex());
        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent) {
        this.onEnterKey(event);
    }

    onEscapeKey(event: KeyboardEvent) {
        this.hide(event, true);
        this.focusedItemInfo().index = this.findFirstFocusedItemIndex();

        event.preventDefault();
    }

    onTabKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);

            !grouped && this.onItemChange({ originalEvent: event, processedItem });
        }

        this.hide();
    }

    onEnterKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const element = findSingle(this.rootmenu()?.el?.nativeElement, `li[id="${`${this.focusedItemId}`}"]`) as HTMLElement | null;
            const anchorElement = element && ((findSingle(element, '[data-pc-section="itemlink"]') as HTMLElement) || (findSingle(element, 'a,button') as HTMLElement));

            anchorElement ? anchorElement.click() : element?.click();

            if (!this.popup()) {
                const processedItem = this.visibleItems[this.focusedItemInfo().index];
                const grouped = this.isProccessedItemGroup(processedItem);

                !grouped && (this.focusedItemInfo().index = this.findFirstFocusedItemIndex());
            }
        }

        event.preventDefault();
    }

    onItemChange(event: TieredMenuItemClickEvent | TieredMenuItemMouseEnterEvent, type?: string) {
        const { processedItem } = event;
        const isFocus = 'isFocus' in event ? event.isFocus : 'focus' in event ? event.focus : false;

        if (isEmpty(processedItem)) return;

        const { index, key, level, parentKey, items, item } = processedItem;
        const grouped = isNotEmpty(items);
        const activeItemPath = this.activeItemPath().filter((p: TieredMenuProcessedItem) => p.parentKey !== parentKey && p.parentKey !== key);

        grouped && activeItemPath.push(processedItem);
        this.focusedItemInfo.set({ index, level, parentKey, item });

        grouped && (this.dirty = true);
        isFocus && focus(this.rootmenu()?.sublistViewChild()?.nativeElement);

        if (type === 'hover' && this.queryMatches()) {
            return;
        }

        this.activeItemPath.set(activeItemPath);
    }

    onMenuFocus(_event: FocusEvent) {
        this.focused = true;
        if (this.focusedItemInfo().index === -1 && !this.popup()) {
            // this.onArrowDownKey(_event);
        }
    }

    onMenuBlur(_event: FocusEvent) {
        this.focused = false;
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        this.searchValue = '';
        this.dirty = false;
    }

    onOverlayBeforeEnter(event: MotionEvent) {
        if (this.popup()) {
            this.container = event.element as HTMLElement;
            addStyle(this.container!, { position: 'absolute' });
            this.moveOnTop();
            this.onShow.emit({});
            this.$attrSelector && this.container?.setAttribute(this.$attrSelector, '');
            this.appendOverlay();
            this.alignOverlay();
        }
    }

    onOverlayAfterEnter() {
        if (this.popup()) {
            this.bindOutsideClickListener();
            this.bindResizeListener();
            this.bindScrollListener();

            this.scrollInView();
        }

        focus(this.rootmenu()?.sublistViewChild()?.nativeElement);
    }

    onOverlayAfterLeave() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
        this.render.set(false);
        this.onHide.emit({});
    }

    relativeAlign: boolean = false;

    alignOverlay() {
        if (this.container && this.target) {
            if (this.relativeAlign) relativePosition(this.container!, this.target);
            else absolutePosition(this.container!, this.target);
            const targetWidth = getOuterWidth(this.target);

            if (targetWidth > getOuterWidth(this.container)) {
                this.container.style.minWidth = getOuterWidth(this.target) + 'px';
            }
        }
    }

    appendOverlay() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body') {
                appendChild(this.document.body, this.container!);
            } else {
                appendChild(this.$appendTo(), this.container!);
            }
        }
    }

    restoreOverlayAppend() {
        if (this.container && this.$appendTo() !== 'self') {
            appendChild(this.el.nativeElement, this.container!);
        }
    }

    moveOnTop() {
        if (this.autoZIndex()) {
            ZIndexUtils.set('menu', this.container, this.baseZIndex() + this.config.zIndex.menu);
        }
    }

    /**
     * Hides the popup menu.
     * @group Method
     */
    hide(_event?: Event, isFocus?: boolean) {
        if (this.popup()) {
            this.onHide.emit({});
            this.visible = false;
        }
        this.activeItemPath.set([]);
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '' });

        isFocus && focus(this.relatedTarget || this.target || this.rootmenu()?.sublistViewChild()?.nativeElement);
        this.dirty = false;
    }

    /**
     * Toggles the visibility of the popup menu.
     * @param {TieredMenuToggleEvent} event - Toggle event.
     * @group Method
     */
    toggle(event: TieredMenuToggleEvent) {
        this.visible ? this.hide(undefined, true) : this.show(event);
    }

    /**
     * Displays the popup menu.
     * @param {TieredMenuToggleEvent} event - Toggle event.
     * @group Method
     */
    show(event: TieredMenuToggleEvent, isFocus?: boolean) {
        if (this.popup()) {
            this.visible = true;
            this.target = this.target || (event.currentTarget as HTMLElement) || null;
            this.relatedTarget = (event.relatedTarget as HTMLElement) || null;
            this.relativeAlign = event?.relativeAlign || false;
        }

        this.render.set(true);

        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '' });

        isFocus && focus(this.rootmenu()?.sublistViewChild()?.nativeElement);

        this.cd.markForCheck();
    }

    searchItems(event: KeyboardEvent, char: string) {
        this.searchValue = (this.searchValue || '') + char;

        let itemIndex = -1;
        let matched = false;

        if (this.focusedItemInfo().index !== -1) {
            itemIndex = this.visibleItems.slice(this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem));
            itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo().index;
        } else {
            itemIndex = this.visibleItems.findIndex((processedItem) => this.isItemMatched(processedItem));
        }

        if (itemIndex !== -1) {
            matched = true;
        }

        if (itemIndex === -1 && this.focusedItemInfo().index === -1) {
            itemIndex = this.findFirstFocusedItemIndex();
        }

        if (itemIndex !== -1) {
            this.changeFocusedItemIndex(event, itemIndex);
        }

        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = undefined;
        }, 500);

        return matched;
    }

    findLastFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
    }

    findLastItemIndex() {
        return findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
    }

    findPrevItemIndex(index: number) {
        const matchedItemIndex = index > 0 ? findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;

        return matchedItemIndex > -1 ? matchedItemIndex : index;
    }

    findNextItemIndex(index: number) {
        const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;

        return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    }

    findFirstFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();

        return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
    }

    findFirstItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidItem(processedItem));
    }

    findSelectedItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidSelectedItem(processedItem));
    }

    changeFocusedItemIndex(_event: Event, index: number) {
        if (this.focusedItemInfo().index !== index) {
            const focusedItemInfo = this.focusedItemInfo();
            this.focusedItemInfo.set({ ...focusedItemInfo, item: this.visibleItems[index].item, index });
            this.scrollInView();
        }
    }

    scrollInView(index: number = -1) {
        const id = index !== -1 ? `${this.$id()}_${index}` : this.focusedItemId;
        const element = findSingle(this.rootmenu()?.el?.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, (event: Event) => {
                if (this.visible) {
                    this.hide(event, true);
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
            this.scrollHandler = null;
        }
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    if (!isTouchDevice()) {
                        this.hide(event, true);
                    }
                });
            }
        }
    }

    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const containerEl = this.containerViewChild();
                    const isOutsideContainer = containerEl && !containerEl.nativeElement.contains(event.target);
                    const isOutsideTarget = this.popup() ? !(this.target && (this.target === event.target || this.target.contains(event.target))) : true;
                    if (isOutsideContainer && isOutsideTarget) {
                        this.hide();
                    }
                });
            }
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }

    onOverlayHide() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        this.unbindScrollListener();

        if (!(this.cd as ViewRef).destroyed) {
            this.target = null;
        }

        if (this.container && this.autoZIndex()) {
            ZIndexUtils.clear(this.container);
        }
    }

    onDestroy() {
        if (this.popup()) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
        this.unbindMatchMediaListener();
    }
}

@NgModule({
    imports: [TieredMenu, SharedModule],
    exports: [TieredMenu, SharedModule]
})
export class TieredMenuModule {}
