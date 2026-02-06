import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    effect,
    ElementRef,
    forwardRef,
    Inject,
    inject,
    InjectionToken,
    input,
    NgModule,
    numberAttribute,
    output,
    Renderer2,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import {
    appendChild,
    calculateScrollbarWidth,
    findLastIndex,
    findSingle,
    focus,
    getHiddenElementOuterHeight,
    getHiddenElementOuterWidth,
    getOffset,
    getOuterWidth,
    getViewport,
    isAndroid,
    isEmpty,
    isIOS,
    isNotEmpty,
    isPrintableCharacter,
    resolve,
    uuid
} from '@primeuix/utils';
import { MenuItem, OverlayService, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { BindModule } from 'primeng/bind';
import { AngleRightIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import type { AppendTo, CSSProperties } from 'primeng/types/shared';
import { VoidListener } from 'primeng/ts-helpers';
import { ContextMenuItemTemplateContext, ContextMenuPassThrough, ContextMenuProcessedItem, ContextMenuSubmenuIconTemplateContext } from 'primeng/types/contextmenu';
import { ZIndexUtils } from 'primeng/utils';
import { ContextMenuStyle } from './style/contextmenustyle';

const CONTEXTMENU_INSTANCE = new InjectionToken<ContextMenu>('CONTEXTMENU_INSTANCE');
const CONTEXTMENUSUB_INSTANCE = new InjectionToken<ContextMenuSub>('CONTEXTMENUSUB_INSTANCE');

@Component({
    selector: 'p-contextMenuSub, p-contextmenu-sub',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, Ripple, TooltipModule, AngleRightIcon, BadgeModule, SharedModule, BindModule, MotionModule],
    template: `
        @if (render()) {
            <ul
                #sublist
                role="menu"
                [class]="root() ? cx('rootList') : cx('submenu')"
                [pBind]="_ptm(root() ? 'rootList' : 'submenu')"
                [attr.id]="menuId() + '_list'"
                [tabindex]="tabindex()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledBy]="ariaLabelledBy()"
                [attr.aria-activedescendant]="focusedItemId()"
                [attr.aria-orientation]="'vertical'"
                (keydown)="menuKeydown.emit($event)"
                (focus)="menuFocus.emit($event)"
                (blur)="menuBlur.emit($event)"
                [pMotion]="root() ? true : visible()"
                [pMotionAppear]="true"
                [pMotionName]="'p-anchored-overlay'"
                [pMotionOptions]="motionOptions()"
                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                (pMotionOnAfterLeave)="onAfterLeave()"
            >
                @for (processedItem of items(); track processedItem.key; let index = $index) {
                    @if (isItemVisible(processedItem) && getItemProp(processedItem, 'separator')) {
                        <li [attr.id]="getItemId(processedItem)" [style]="getItemProp(processedItem, 'style')" [class]="cn(cx('separator'), getItemProp(processedItem, 'styleClass'))" role="separator" [pBind]="_ptm('separator')"></li>
                    }
                    @if (isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')) {
                        <li
                            #listItem
                            role="menuitem"
                            [attr.id]="getItemId(processedItem)"
                            [attr.data-p-highlight]="isItemActive(processedItem)"
                            [attr.data-p-focused]="isItemFocused(processedItem)"
                            [attr.data-p-disabled]="isItemDisabled(processedItem)"
                            [attr.aria-label]="getItemLabel(processedItem)"
                            [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                            [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                            [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                            [attr.aria-level]="level() + 1"
                            [attr.aria-setsize]="getAriaSetSize()"
                            [attr.aria-posinset]="getAriaPosInset(index)"
                            [style]="getItemProp(processedItem, 'style')"
                            [class]="cn(cx('item', { instance: this, processedItem }), getItemProp(processedItem, 'styleClass'))"
                            [pBind]="getPTOptions(processedItem, index, 'item')"
                            pTooltip
                            [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                            [pTooltipUnstyled]="unstyled()"
                        >
                            <div [class]="cx('itemContent')" [pBind]="getPTOptions(processedItem, index, 'itemContent')" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({ $event, processedItem })">
                                @if (!itemTemplate()) {
                                    @if (!getItemProp(processedItem, 'routerLink')) {
                                        <a
                                            [attr.href]="getItemProp(processedItem, 'url')"
                                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                            [attr.title]="getItemProp(processedItem, 'title')"
                                            [target]="getItemProp(processedItem, 'target')"
                                            [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                                            [style]="getItemProp(processedItem, 'linkStyle')"
                                            [attr.tabindex]="-1"
                                            [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                                            pRipple
                                        >
                                            @if (getItemProp(processedItem, 'icon')) {
                                                <span
                                                    [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                                    [style]="getItemProp(processedItem, 'iconStyle')"
                                                    [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                                                    [attr.aria-hidden]="true"
                                                    [attr.tabindex]="-1"
                                                >
                                                </span>
                                            }
                                            @if (getItemProp(processedItem, 'escape')) {
                                                <span [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))" [style]="getItemProp(processedItem, 'labelStyle')" [pBind]="getPTOptions(processedItem, index, 'itemLabel')">
                                                    {{ getItemLabel(processedItem) }}
                                                </span>
                                            } @else {
                                                <span
                                                    [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                                    [style]="getItemProp(processedItem, 'labelStyle')"
                                                    [innerHTML]="getItemLabel(processedItem)"
                                                    [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                                ></span>
                                            }
                                            @if (getItemProp(processedItem, 'badge')) {
                                                <p-badge [class]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" [unstyled]="unstyled()" />
                                            }
                                            @if (isItemGroup(processedItem)) {
                                                @if (!contextMenu.submenuIconTemplate()) {
                                                    <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" [attr.aria-hidden]="true" />
                                                } @else {
                                                    <ng-container *ngTemplateOutlet="contextMenu.submenuIconTemplate(); context: { class: 'p-contextmenu-submenu-icon' }"></ng-container>
                                                }
                                            }
                                        </a>
                                    } @else {
                                        <a
                                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                            [attr.title]="getItemProp(processedItem, 'title')"
                                            [attr.tabindex]="-1"
                                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                            [target]="getItemProp(processedItem, 'target')"
                                            [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                                            [style]="getItemProp(processedItem, 'linkStyle')"
                                            [fragment]="getItemProp(processedItem, 'fragment')"
                                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                            [state]="getItemProp(processedItem, 'state')"
                                            [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                                            pRipple
                                        >
                                            @if (getItemProp(processedItem, 'icon')) {
                                                <span
                                                    [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                                    [style]="getItemProp(processedItem, 'iconStyle')"
                                                    [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                                                    [attr.aria-hidden]="true"
                                                    [attr.tabindex]="-1"
                                                >
                                                </span>
                                            }
                                            @if (getItemProp(processedItem, 'escape')) {
                                                <span [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))" [style]="getItemProp(processedItem, 'labelStyle')" [pBind]="getPTOptions(processedItem, index, 'itemLabel')">
                                                    {{ getItemLabel(processedItem) }}
                                                </span>
                                            } @else {
                                                <span
                                                    [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                                    [style]="getItemProp(processedItem, 'labelStyle')"
                                                    [innerHTML]="getItemLabel(processedItem)"
                                                    [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                                ></span>
                                            }
                                            @if (getItemProp(processedItem, 'badge')) {
                                                <p-badge [class]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" [unstyled]="unstyled()" />
                                            }
                                            @if (isItemGroup(processedItem)) {
                                                @if (!contextMenu.submenuIconTemplate()) {
                                                    <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" [attr.aria-hidden]="true" />
                                                } @else {
                                                    <ng-container *ngTemplateOutlet="contextMenu.submenuIconTemplate(); context: { class: 'p-contextmenu-submenu-icon' }"></ng-container>
                                                }
                                            }
                                        </a>
                                    }
                                } @else {
                                    <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: processedItem.item }"></ng-container>
                                }
                            </div>

                            @if (isItemVisible(processedItem) && isItemGroup(processedItem)) {
                                <p-contextmenu-sub
                                    [items]="processedItem.items"
                                    [itemTemplate]="itemTemplate()"
                                    [menuId]="menuId()"
                                    [visible]="isItemActive(processedItem) && isItemGroup(processedItem)"
                                    [activeItemPath]="activeItemPath()"
                                    [focusedItemId]="focusedItemId()"
                                    [level]="level() + 1"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                    [pt]="pt()"
                                    [motionOptions]="motionOptions()"
                                    [unstyled]="unstyled()"
                                />
                            }
                        </li>
                    }
                }
            </ul>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [ContextMenuStyle, { provide: CONTEXTMENUSUB_INSTANCE, useExisting: ContextMenuSub }, { provide: PARENT_INSTANCE, useExisting: ContextMenuSub }]
})
export class ContextMenuSub extends BaseComponent<ContextMenuPassThrough> {
    visible = input<boolean>(false);

    items = input<any[]>();

    itemTemplate = input<TemplateRef<ContextMenuItemTemplateContext>>();

    root = input(false, { transform: booleanAttribute });

    autoZIndex = input(true, { transform: booleanAttribute });

    baseZIndex = input(0, { transform: numberAttribute });

    popup = input(undefined, { transform: booleanAttribute });

    menuId = input<string>();

    ariaLabel = input<string>();

    ariaLabelledBy = input<string>();

    level = input(0, { transform: numberAttribute });

    focusedItemId = input<string>();

    activeItemPath = input<any[]>();

    motionOptions = input<MotionOptions[]>();

    tabindex = input(0, { transform: numberAttribute });

    itemClick = output<any>();

    itemMouseEnter = output<any>();

    menuFocus = output<any>();

    menuBlur = output<any>();

    menuKeydown = output<any>();

    sublistViewChild = viewChild<ElementRef>('sublist');

    render = signal<boolean>(false);

    hostName = 'ContextMenu';

    _componentStyle = inject(ContextMenuStyle);

    $pcContextMenu: ContextMenu | undefined = inject(CONTEXTMENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    $pcContextMenuSub: ContextMenuSub | undefined = inject(CONTEXTMENUSUB_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    el = inject(ElementRef);

    renderer = inject(Renderer2);

    queryMatches() {
        return this.contextMenu.queryMatches();
    }

    constructor(@Inject(forwardRef(() => ContextMenu)) public contextMenu: ContextMenu) {
        super();

        effect(() => {
            const isVisible = this.visible();
            if (isVisible || this.root()) {
                this.render.set(true);
            }
        });

        this.contextMenu.handleSubmenuAfterLeave = () => {
            if (this.root()) {
                this.onAfterLeave();
            }
        };
    }

    getItemProp(processedItem: ContextMenuProcessedItem, name: string, params: Record<string, unknown> | null = null) {
        return processedItem && processedItem.item ? resolve(processedItem.item[name as keyof MenuItem], params) : undefined;
    }

    getItemId(processedItem: ContextMenuProcessedItem): string {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId()}_${processedItem.key}`;
    }

    getItemKey(processedItem: ContextMenuProcessedItem): string {
        return this.getItemId(processedItem);
    }

    getItemLabel(processedItem: ContextMenuProcessedItem): string {
        return this.getItemProp(processedItem, 'label') as string;
    }

    getAriaSetSize() {
        return this.items()?.filter((processedItem: ContextMenuProcessedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length ?? 0;
    }

    getAriaPosInset(index: number) {
        return (
            index -
            (this.items()
                ?.slice(0, index)
                .filter((processedItem: ContextMenuProcessedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length ?? 0) +
            1
        );
    }

    isItemVisible(processedItem: ContextMenuProcessedItem): boolean {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem: ContextMenuProcessedItem): boolean | undefined {
        const path = this.activeItemPath();
        if (path) {
            return path.some((p: ContextMenuProcessedItem) => p.key === processedItem.key);
        }
    }

    isItemDisabled(processedItem: ContextMenuProcessedItem): boolean | undefined {
        return this.getItemProp(processedItem, 'disabled') as boolean | undefined;
    }

    isItemFocused(processedItem: ContextMenuProcessedItem): boolean {
        return this.focusedItemId() === this.getItemId(processedItem);
    }

    isItemGroup(processedItem: ContextMenuProcessedItem): boolean {
        return isNotEmpty(processedItem.items);
    }

    onItemMouseEnter(param: { event: MouseEvent; processedItem: ContextMenuProcessedItem }) {
        const { event, processedItem } = param;
        this.itemMouseEnter.emit({ originalEvent: event, processedItem });
    }

    onItemClick(event: MouseEvent, processedItem: ContextMenuProcessedItem) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }

    onBeforeEnter(event: MotionEvent) {
        this.position(event.element as HTMLUListElement);
    }

    onAfterLeave() {
        this.render.set(false);
    }

    // TODO: will be removed later. Helper method to get PT from parent ContextMenu if available, otherwise use own PT
    _ptm(section: string, options?: Record<string, unknown>) {
        return this.$pcContextMenu ? this.$pcContextMenu.ptm(section, options) : this.ptm(section, options);
    }

    getPTOptions(processedItem: ContextMenuProcessedItem, index: number, key: string) {
        return this._ptm(key, {
            context: {
                item: processedItem.item,
                index: index,
                active: this.isItemActive(processedItem),
                focused: this.isItemFocused(processedItem),
                disabled: this.isItemDisabled(processedItem)
            }
        });
    }

    position(sublist: HTMLUListElement) {
        const parentItem = sublist.parentElement?.parentElement;
        if (!parentItem) return;

        const containerOffset = getOffset(parentItem);
        const viewport = getViewport();
        const sublistWidth = sublist.offsetParent ? sublist.offsetWidth : getHiddenElementOuterWidth(sublist);
        const itemOuterWidth = getOuterWidth(parentItem.children[0]) ?? 0;

        sublist.style.top = '0px';

        if (parseInt(String(containerOffset?.left ?? 0), 10) + itemOuterWidth + sublistWidth > viewport.width - calculateScrollbarWidth()) {
            sublist.style.left = -1 * sublistWidth + 'px';
        } else {
            sublist.style.left = itemOuterWidth + 'px';
        }
    }
}
/**
 * ContextMenu displays an overlay menu on right click of its target. Note that components like Table has special integration with ContextMenu.
 * @group Components
 */
@Component({
    selector: 'p-contextMenu, p-contextmenu, p-context-menu',
    standalone: true,
    imports: [ContextMenuSub, RouterModule, TooltipModule, BadgeModule, SharedModule, BindModule, MotionModule],
    template: `
        @if (render()) {
            <div
                #container
                [attr.id]="_id"
                [class]="cn(cx('root'), styleClass())"
                [style]="sx('root')"
                [pBind]="ptm('root')"
                [pMotion]="visible()"
                [pMotionName]="'p-anchored-overlay'"
                [pMotionAppear]="true"
                [pMotionOptions]="computedMotionOptions()"
                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                (pMotionOnAfterEnter)="onAfterEnter()"
                (pMotionOnAfterLeave)="onAfterLeave()"
            >
                <p-contextmenu-sub
                    #rootmenu
                    [root]="true"
                    [items]="processedItems"
                    [itemTemplate]="itemTemplate()"
                    [menuId]="_id"
                    [ariaLabel]="ariaLabel()"
                    [ariaLabelledBy]="ariaLabelledBy()"
                    [baseZIndex]="baseZIndex()"
                    [autoZIndex]="autoZIndex()"
                    [visible]="submenuVisible()"
                    [focusedItemId]="focused ? focusedItemId : undefined"
                    [activeItemPath]="activeItemPath()"
                    (itemClick)="onItemClick($event)"
                    (menuFocus)="onMenuFocus($event)"
                    (menuBlur)="onMenuBlur($event)"
                    (menuKeydown)="onKeyDown($event)"
                    (itemMouseEnter)="onItemMouseEnter($event)"
                    [pt]="pt()"
                    [unstyled]="unstyled()"
                    [motionOptions]="computedMotionOptions()"
                />
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ContextMenuStyle, { provide: CONTEXTMENU_INSTANCE, useExisting: ContextMenu }]
})
export class ContextMenu extends BaseComponent<ContextMenuPassThrough> {
    componentName = 'ContextMenu';

    /**
     * An array of menuitems.
     * @group Props
     */
    model = input<MenuItem[]>();
    /**
     * Event for which the menu must be displayed.
     * @group Props
     */
    triggerEvent = input('contextmenu');
    /**
     * Local template variable name of the element to attach the context menu.
     * @group Props
     */
    target = input<HTMLElement | string | null>();
    /**
     * Attaches the menu to document instead of a particular item.
     * @group Props
     */
    global = input(false, { transform: booleanAttribute });
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
     * Current id state as a string.
     * @group Props
     */
    id = input<string>();

    _id: string | undefined;
    /**
     * The breakpoint to define the maximum width boundary.
     * @group Props
     */
    breakpoint = input('960px');
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
     * Press delay in touch devices as miliseconds.
     * @group Props
     */
    pressDelay = input(500, { transform: numberAttribute });
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<AppendTo>(undefined);
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

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
    onShow = output<void>();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    onHide = output<void>();

    rootmenu = viewChild<ContextMenuSub>('rootmenu');

    container: HTMLElement | null | undefined;

    handleSubmenuAfterLeave: (() => void) | null = null;

    outsideClickListener: VoidListener;

    resizeListener: VoidListener;

    triggerEventListener: VoidListener;

    documentClickListener: VoidListener;

    documentTriggerListener: VoidListener;

    touchEndListener: VoidListener;

    pageX: number;

    pageY: number;

    visible = signal(false);

    render = signal<boolean>(false);

    focused: boolean = false;

    activeItemPath = signal<any>([]);

    focusedItemInfo = signal<any>({ index: -1, level: 0, parentKey: '', item: null });

    submenuVisible = signal<boolean>(false);

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    searchValue: string = '';

    searchTimeout: any;

    _processedItems: any[];

    pressTimer: any;

    hideCallback: any;

    private matchMediaListener: (() => void) | null;

    private query: MediaQueryList;

    public queryMatches = signal<boolean>(false);

    _componentStyle = inject(ContextMenuStyle);

    overlayService = inject(OverlayService);

    get visibleItems(): ContextMenuProcessedItem[] {
        const processedItem = this.activeItemPath().find((p: ContextMenuProcessedItem) => p.key === this.focusedItemInfo().parentKey);

        return processedItem ? (processedItem.items ?? []) : this.processedItems;
    }

    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model() || []);
        }
        return this._processedItems;
    }

    get focusedItemId() {
        const focusedItem = this.focusedItemInfo();
        return focusedItem.item && focusedItem.item?.id ? focusedItem.item.id : focusedItem.index !== -1 ? `${this._id}${isNotEmpty(focusedItem.parentKey) ? '_' + focusedItem.parentKey : ''}_${focusedItem.index}` : null;
    }

    constructor() {
        super();

        effect(() => {
            const value = this.model();
            this._processedItems = this.createProcessedItems(value || []);
        });

        effect(() => {
            const path = this.activeItemPath();

            if (isNotEmpty(path)) {
                this.bindGlobalListeners();
            } else if (!this.visible()) {
                this.unbindGlobalListeners();
            }
        });
    }

    onInit() {
        this._id = this.id() || uuid('pn_id_');
        this.bindMatchMediaListener();
        this.bindTriggerEventListener();
    }

    isMobile() {
        return isIOS() || isAndroid();
    }

    bindTriggerEventListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.triggerEventListener) {
                const targetEl = this.target();
                const triggerEventName = this.triggerEvent();
                if (!this.isMobile()) {
                    if (this.global()) {
                        this.triggerEventListener = this.renderer.listen(this.document, triggerEventName, (event) => {
                            this.show(event);
                        });
                    } else if (targetEl) {
                        this.triggerEventListener = this.renderer.listen(targetEl, triggerEventName, (event) => {
                            this.show(event);
                        });
                    }
                } else {
                    if (this.global()) {
                        this.triggerEventListener = this.renderer.listen(this.document, 'touchstart', this.onTouchStart.bind(this));
                        this.touchEndListener = this.renderer.listen(this.document, 'touchend', this.onTouchEnd.bind(this));
                    } else if (targetEl) {
                        this.triggerEventListener = this.renderer.listen(targetEl, 'touchstart', this.onTouchStart.bind(this));
                        this.touchEndListener = this.renderer.listen(targetEl, 'touchend', this.onTouchEnd.bind(this));
                    }
                }
            }
        }
    }

    bindGlobalListeners() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener) {
                const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

                this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                    if (this.container?.offsetParent && this.isOutsideClicked(event) && !event.ctrlKey && event.button !== 2) {
                        this.hide();
                    }
                });
            }
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', () => {
                    this.hide();
                });
            }
        }
    }
    /**
     * Custom item template.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<ContextMenuItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom submenu icon template.
     * @group Templates
     */
    submenuIconTemplate = contentChild<TemplateRef<ContextMenuSubmenuIconTemplateContext>>('submenuicon', { descendants: false });

    getPTOptions(key: string, item: MenuItem, index: number, _id: string) {
        return this.ptm(key, {
            context: {
                item: item,
                index: index,
                focused: this.isItemFocused({ index, item }),
                disabled: this.isItemDisabled(item)
            }
        });
    }

    isItemFocused(itemInfo: { index: number; item: MenuItem }): boolean {
        return this.focusedItemInfo().index === itemInfo.index;
    }

    createProcessedItems(items: MenuItem[], level: number = 0, parent: ContextMenuProcessedItem | Record<string, never> = {}, parentKey: string = ''): ContextMenuProcessedItem[] {
        const processedItems: ContextMenuProcessedItem[] = [];

        items &&
            items.forEach((item: MenuItem, index: number) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem: ContextMenuProcessedItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };

                newItem.items = this.createProcessedItems(item.items ?? [], level + 1, newItem, key);
                processedItems.push(newItem);
            });

        return processedItems;
    }

    bindMatchMediaListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.matchMediaListener) {
                const query = window.matchMedia(`(max-width: ${this.breakpoint()})`);

                this.query = query;
                this.queryMatches.set(query.matches);

                this.matchMediaListener = () => {
                    this.queryMatches.set(query.matches);
                    this.cd.markForCheck();
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

    getItemProp(item: MenuItem, name: string) {
        return item ? resolve(item[name as keyof MenuItem]) : undefined;
    }

    getProccessedItemLabel(processedItem: ContextMenuProcessedItem) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }

    getItemLabel(item: MenuItem) {
        return this.getItemProp(item, 'label');
    }

    isProcessedItemGroup(processedItem: ContextMenuProcessedItem): boolean {
        return processedItem && isNotEmpty(processedItem.items);
    }

    isSelected(processedItem: ContextMenuProcessedItem): boolean {
        return this.activeItemPath().some((p: ContextMenuProcessedItem) => p.key === processedItem.key);
    }

    isValidSelectedItem(processedItem: ContextMenuProcessedItem): boolean {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }

    isValidItem(processedItem: ContextMenuProcessedItem): boolean {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
    }

    isItemDisabled(item: MenuItem): boolean {
        return this.getItemProp(item, 'disabled') as boolean;
    }

    isItemSeparator(item: MenuItem): boolean {
        return this.getItemProp(item, 'separator') as boolean;
    }

    isItemMatched(processedItem: ContextMenuProcessedItem): boolean {
        return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isProccessedItemGroup(processedItem: ContextMenuProcessedItem): boolean {
        return processedItem && isNotEmpty(processedItem.items);
    }

    onItemClick(event: { processedItem: ContextMenuProcessedItem; isFocus?: boolean }) {
        const { processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const selected = this.isSelected(processedItem);

        if (selected) {
            const { index, key, level, parentKey, item } = processedItem;

            this.activeItemPath.set(this.activeItemPath().filter((p: ContextMenuProcessedItem) => key !== p.key && key.startsWith(p.key)));
            this.focusedItemInfo.set({ index, level, parentKey, item });

            focus(this.rootmenu()?.sublistViewChild()?.nativeElement);
        } else {
            grouped ? this.onItemChange(event) : this.hide();
        }
    }

    onItemMouseEnter(event: { originalEvent: MouseEvent; processedItem: ContextMenuProcessedItem }) {
        this.onItemChange(event, 'hover');
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

        if (grouped) {
            this.onItemChange({ originalEvent: event, processedItem });
            this.focusedItemInfo.set({ index: -1, parentKey: processedItem.key, item: processedItem.item });
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

            this.hide();
            event.preventDefault();
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();

            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        if (!processedItem) return;

        const parentItem = this.activeItemPath().find((p: ContextMenuProcessedItem) => p.key === processedItem.parentKey);
        const root = isEmpty(processedItem.parent);

        if (!root) {
            this.focusedItemInfo.set({ index: -1, parentKey: parentItem ? parentItem.parentKey : '', item: processedItem.item });
            this.searchValue = '';
            this.onArrowDownKey(event);
        }

        const activeItemPath = this.activeItemPath().filter((p: ContextMenuProcessedItem) => p.parentKey !== this.focusedItemInfo().parentKey);
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
        this.hide();
        const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
        const focusedItemInfo = this.focusedItemInfo();
        this.focusedItemInfo.set({ ...focusedItemInfo, index: this.findFirstFocusedItemIndex(), item: processedItem?.item ?? null });

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
            const element = <any>findSingle(this.rootmenu()?.el?.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && (<any>findSingle(element, '[data-pc-section="itemlink"]') || findSingle(element, 'a,button'));

            anchorElement ? anchorElement.click() : element && element.click();

            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);

            if (!grouped) {
                const focusedItemInfo = this.focusedItemInfo();
                this.focusedItemInfo.set({ ...focusedItemInfo, index: this.findFirstFocusedItemIndex() });
            }
        }

        event.preventDefault();
    }

    onItemChange(event: { originalEvent?: Event; processedItem: ContextMenuProcessedItem; isFocus?: boolean }, type?: string) {
        const { processedItem, isFocus } = event;
        if (isEmpty(processedItem)) return;

        const { index, key, level, parentKey, items } = processedItem;
        const grouped = isNotEmpty(items);
        const activeItemPath = this.activeItemPath().filter((p: ContextMenuProcessedItem) => p.parentKey !== parentKey && p.parentKey !== key);

        if (grouped) {
            activeItemPath.push(processedItem);
            this.submenuVisible.set(true);
        }
        this.focusedItemInfo.set({ index, level, parentKey, item: processedItem.item });
        isFocus && focus(this.rootmenu()?.sublistViewChild()?.nativeElement);

        if (type === 'hover' && this.queryMatches()) {
            return;
        }

        this.activeItemPath.set(activeItemPath);
    }

    onMenuFocus(_event: FocusEvent) {
        this.focused = true;
        const focusedItemInfo = this.focusedItemInfo().index !== -1 ? this.focusedItemInfo() : { index: -1, level: 0, parentKey: '', item: null };

        this.focusedItemInfo.set(focusedItemInfo);
    }

    onMenuBlur(_event: FocusEvent) {
        this.focused = false;
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        this.searchValue = '';
    }

    onBeforeEnter(event: MotionEvent) {
        this.container = event.element as HTMLElement;
        this.appendOverlay();
        this.moveOnTop();
        this.position();
        this.$attrSelector && this.container?.setAttribute(this.$attrSelector, '');
    }

    onAfterEnter() {
        this.bindGlobalListeners();
        focus(this.rootmenu()?.sublistViewChild()?.nativeElement);
    }

    onAfterLeave() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
        this.handleSubmenuAfterLeave?.();
        this.render.set(false);
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
            this.el.nativeElement.appendChild(this.container!);
        }
    }

    moveOnTop() {
        if (this.autoZIndex() && this.container) {
            ZIndexUtils.set('menu', this.container, this.baseZIndex() + this.config.zIndex.menu);
        }
    }

    onOverlayHide() {
        this.unbindGlobalListeners();

        if (this.container && this.autoZIndex()) {
            ZIndexUtils.clear(this.container);
        }

        this.container = null;
    }

    onTouchStart(event: MouseEvent) {
        this.pressTimer = setTimeout(() => {
            this.show(event);
        }, this.pressDelay());
    }

    onTouchEnd() {
        clearTimeout(this.pressTimer);
    }

    hide() {
        this.visible.set(false);
        this.onHide.emit();

        this.hideCallback?.();
        this.activeItemPath.set([]);
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
    }

    toggle(event?: any) {
        this.visible() ? this.hide() : this.show(event);
    }

    show(event: any) {
        this.activeItemPath.set([]);
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
        focus(this.rootmenu()?.sublistViewChild()?.nativeElement);

        this.pageX = event.pageX;
        this.pageY = event.pageY;

        this.onShow.emit();
        this.visible() ? this.position() : this.visible.set(true);

        this.render.set(true);

        event.stopPropagation();
        event.preventDefault();
    }

    position() {
        if (!this.document.scrollingElement || !this.container) return;

        let left = this.pageX + 1;
        let top = this.pageY + 1;
        let width = this.container.offsetParent ? this.container.offsetWidth : getHiddenElementOuterWidth(this.container);
        let height = this.container.offsetParent ? this.container.offsetHeight : getHiddenElementOuterHeight(this.container);
        let viewport = getViewport();

        //flip
        if (left + width - this.document.scrollingElement.scrollLeft > viewport.width) {
            left -= width;
        }

        //flip
        if (top + height - this.document.scrollingElement.scrollTop > viewport.height) {
            top -= height;
        }

        //fit
        if (left < this.document.scrollingElement.scrollLeft) {
            left = this.document.scrollingElement.scrollLeft;
        }

        //fit
        if (top < this.document.scrollingElement.scrollTop) {
            top = this.document.scrollingElement.scrollTop;
        }

        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    }

    searchItems(event: any, char: string) {
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
            this.searchTimeout = null;
        }, 500);

        return matched;
    }

    findVisibleItem(index: number): ContextMenuProcessedItem | null {
        return isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
    }

    findLastFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
    }

    findLastItemIndex() {
        return findLastIndex(this.visibleItems, (processedItem: ContextMenuProcessedItem) => this.isValidItem(processedItem));
    }

    findPrevItemIndex(index: number) {
        const matchedItemIndex = index > 0 ? findLastIndex(this.visibleItems.slice(0, index), (processedItem: ContextMenuProcessedItem) => this.isValidItem(processedItem)) : -1;

        return matchedItemIndex > -1 ? matchedItemIndex : index;
    }

    findNextItemIndex(index: number) {
        const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem: ContextMenuProcessedItem) => this.isValidItem(processedItem)) : -1;

        return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    }

    findFirstFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();

        return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
    }

    findFirstItemIndex() {
        return this.visibleItems.findIndex((processedItem: ContextMenuProcessedItem) => this.isValidItem(processedItem));
    }

    findSelectedItemIndex() {
        return this.visibleItems.findIndex((processedItem: ContextMenuProcessedItem) => this.isValidSelectedItem(processedItem));
    }

    changeFocusedItemIndex(_event: KeyboardEvent, index: number) {
        const processedItem = this.findVisibleItem(index);
        const focusedItemInfo = this.focusedItemInfo();
        if (focusedItemInfo.index !== index) {
            this.focusedItemInfo.set({ ...focusedItemInfo, index, item: processedItem?.item ?? null });
            this.scrollInView();
        }
    }

    scrollInView(index: number = -1) {
        const id = index !== -1 ? `${this._id}_${index}` : this.focusedItemId;
        const element = findSingle(this.rootmenu()?.el?.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', () => {
                    this.hide();
                });
            }
        }
    }

    isOutsideClicked(event: Event) {
        return !(this.container?.isSameNode(event.target as Node) || this.container?.contains(event.target as Node));
    }

    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }

    unbindGlobalListeners() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }

        if (this.documentTriggerListener) {
            this.documentTriggerListener();
            this.documentTriggerListener = null;
        }

        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }

        if (this.touchEndListener) {
            this.touchEndListener();
            this.touchEndListener = null;
        }
    }

    unbindTriggerEventListener() {
        if (this.triggerEventListener) {
            this.triggerEventListener();
            this.triggerEventListener = null;
        }
    }

    onDestroy() {
        this.unbindGlobalListeners();
        this.unbindTriggerEventListener();
        this.unbindMatchMediaListener();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}

@NgModule({
    imports: [ContextMenu, SharedModule],
    exports: [ContextMenu, SharedModule]
})
export class ContextMenuModule {}
