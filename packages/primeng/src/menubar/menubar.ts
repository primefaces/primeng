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
    Injectable,
    InjectionToken,
    input,
    NgModule,
    numberAttribute,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { findLastIndex, findSingle, focus, isEmpty, isNotEmpty, isPrintableCharacter, isTouchDevice, resolve, uuid } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { AngleDownIcon, AngleRightIcon, BarsIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { VoidListener } from 'primeng/ts-helpers';
import { FocusedItemInfo, MenubarItemClickEvent, MenubarItemMouseEnterEvent, MenubarItemTemplateContext, MenubarPassThrough, ProcessedMenuItem } from 'primeng/types/menubar';
import type { CSSProperties } from 'primeng/types/shared';
import { ZIndexUtils } from 'primeng/utils';
import { interval, Subject, Subscription } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';
import { MenuBarStyle } from './style/menubarstyle';

const MENUBAR_INSTANCE = new InjectionToken<Menubar>('MENUBAR_INSTANCE');

@Injectable()
export class MenubarService {
    autoHide: boolean | undefined;

    autoHideDelay: number | undefined;

    readonly mouseLeaves = new Subject<boolean>();

    readonly mouseLeft$ = this.mouseLeaves.pipe(
        debounce(() => interval(this.autoHideDelay)),
        filter((mouseLeft) => (this.autoHide as boolean) && mouseLeft)
    );
}

@Component({
    selector: 'p-menubarSub, p-menubarsub, [pMenubarSub]',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, Ripple, TooltipModule, AngleDownIcon, AngleRightIcon, BadgeModule, SharedModule, BindModule],
    template: `
        @for (processedItem of items(); track processedItem) {
            @if (isItemVisible(processedItem) && getItemProp(processedItem, 'separator')) {
                <li [attr.id]="getItemId(processedItem)" [style]="getItemProp(processedItem, 'style')" [class]="cn(cx('separator'), processedItem?.styleClass)" role="separator" [pBind]="ptm('separator')"></li>
            }
            @if (isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')) {
                @let _itemTemplate = itemTemplate();
                @let _submenuiconTemplate = submenuiconTemplate();
                @let _root = root();
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
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset($index)"
                    [style]="getItemProp(processedItem, 'style')"
                    [class]="cn(cx('item', { instance: this, processedItem }), getItemProp(processedItem, 'styleClass'))"
                    [pBind]="getPTOptions(processedItem, $index, 'item')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                    [pTooltipUnstyled]="unstyled()"
                >
                    <div [class]="cx('itemContent')" [pBind]="getPTOptions(processedItem, $index, 'itemContent')" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({ $event, processedItem })">
                        @if (!_itemTemplate) {
                            @if (!getItemProp(processedItem, 'routerLink')) {
                                <a
                                    [attr.href]="getItemProp(processedItem, 'url')"
                                    [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                    [attr.title]="getItemProp(processedItem, 'title')"
                                    [attr.target]="getItemProp(processedItem, 'target')"
                                    [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                                    [style]="getItemProp(processedItem, 'linkStyle')"
                                    [attr.tabindex]="-1"
                                    [pBind]="getPTOptions(processedItem, $index, 'itemLink')"
                                    pRipple
                                >
                                    @if (getItemProp(processedItem, 'icon')) {
                                        <span
                                            [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                            [style]="getItemProp(processedItem, 'iconStyle')"
                                            [attr.tabindex]="-1"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemIcon')"
                                        >
                                        </span>
                                    }
                                    @if (getItemProp(processedItem, 'escape')) {
                                        <span
                                            [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                            [style]="getItemProp(processedItem, 'labelStyle')"
                                            [id]="getItemLabelId(processedItem)"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemLabel')"
                                        >
                                            {{ getItemLabel(processedItem) }}
                                        </span>
                                    } @else {
                                        <span
                                            [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                            [style]="getItemProp(processedItem, 'labelStyle')"
                                            [innerHTML]="getItemLabel(processedItem)"
                                            [id]="getItemLabelId(processedItem)"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemLabel')"
                                        ></span>
                                    }
                                    @if (getItemProp(processedItem, 'badge')) {
                                        <p-badge [class]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" [pt]="getPTOptions(processedItem, $index, 'pcBadge')" [unstyled]="unstyled()" />
                                    }
                                    @if (isItemGroup(processedItem)) {
                                        @if (!_submenuiconTemplate) {
                                            @if (_root) {
                                                <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            } @else {
                                                <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="_submenuiconTemplate"></ng-container>
                                    }
                                </a>
                            } @else {
                                <a
                                    [routerLink]="getItemProp(processedItem, 'routerLink')"
                                    [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                    [attr.title]="getItemProp(processedItem, 'title')"
                                    [attr.tabindex]="-1"
                                    [queryParams]="getItemProp(processedItem, 'queryParams')"
                                    [routerLinkActive]="'p-menubar-item-link-active'"
                                    [routerLinkActiveOptions]="getRouterLinkActiveOptions(processedItem)"
                                    [target]="getItemProp(processedItem, 'target')"
                                    [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                                    [style]="getItemProp(processedItem, 'linkStyle')"
                                    [fragment]="getItemProp(processedItem, 'fragment')"
                                    [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                    [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                    [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                    [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                    [state]="getItemProp(processedItem, 'state')"
                                    [pBind]="getPTOptions(processedItem, $index, 'itemLink')"
                                    pRipple
                                >
                                    @if (getItemProp(processedItem, 'icon')) {
                                        <span
                                            [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                            [style]="getItemProp(processedItem, 'iconStyle')"
                                            [attr.tabindex]="-1"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemIcon')"
                                        ></span>
                                    }
                                    @if (getItemProp(processedItem, 'escape')) {
                                        <span [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))" [style]="getItemProp(processedItem, 'labelStyle')" [pBind]="getPTOptions(processedItem, $index, 'itemLabel')">{{
                                            getItemLabel(processedItem)
                                        }}</span>
                                    } @else {
                                        <span
                                            [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                            [style]="getItemProp(processedItem, 'labelStyle')"
                                            [innerHTML]="getItemLabel(processedItem)"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemLabel')"
                                        ></span>
                                    }
                                    @if (getItemProp(processedItem, 'badge')) {
                                        <p-badge [class]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" [pt]="getPTOptions(processedItem, $index, 'pcBadge')" [unstyled]="unstyled()" />
                                    }
                                    @if (isItemGroup(processedItem)) {
                                        @if (!_submenuiconTemplate) {
                                            @if (_root) {
                                                <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            } @else {
                                                <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="_submenuiconTemplate"></ng-container>
                                    }
                                </a>
                            }
                        } @else {
                            <ng-container *ngTemplateOutlet="_itemTemplate; context: getItemTemplateContext(processedItem.item, _root)"></ng-container>
                        }
                    </div>
                    @if (isItemVisible(processedItem) && isItemGroup(processedItem)) {
                        <ul
                            pMenubarSub
                            [itemTemplate]="_itemTemplate"
                            [items]="processedItem.items"
                            [mobileActive]="mobileActive()"
                            [autoDisplay]="autoDisplay()"
                            [menuId]="menuId()"
                            [activeItemPath]="activeItemPath()"
                            [focusedItemId]="focusedItemId()"
                            [level]="level() + 1"
                            [attr.aria-labelledby]="getItemLabelId(processedItem)"
                            (itemClick)="itemClick.emit($event)"
                            (itemMouseEnter)="onItemMouseEnter($event)"
                            [inlineStyles]="sx('submenu', true, { instance: this, processedItem })"
                            [pt]="pt()"
                            [pBind]="ptm('submenu')"
                            [unstyled]="unstyled()"
                            [submenuiconTemplate]="_submenuiconTemplate"
                        ></ul>
                    }
                </li>
            }
        }
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': 'hostId()',
        '[attr.aria-activedescendant]': 'focusedItemId()',
        '[class]': 'hostClass()',
        '[attr.role]': "'menubar'",
        '[style]': 'inlineStyles()'
    }
})
export class MenubarSub extends BaseComponent<MenubarPassThrough> {
    hostId = computed(() => (this.root() ? this.menuId() : null));

    hostClass = computed(() => (this.level() === 0 ? this.cx('rootList') : this.cx('submenu')));

    items = input<ProcessedMenuItem[]>();

    itemTemplate = input<TemplateRef<MenubarItemTemplateContext>>();

    root = input(false, { transform: booleanAttribute });

    autoZIndex = input(true, { transform: booleanAttribute });

    baseZIndex = input(0, { transform: numberAttribute });

    mobileActive = input(undefined, { transform: booleanAttribute });

    autoDisplay = input(undefined, { transform: booleanAttribute });

    menuId = input<string>();

    ariaLabel = input<string>();

    ariaLabelledBy = input<string>();

    level = input(0, { transform: numberAttribute });

    focusedItemId = input<string>();

    activeItemPath = input<ProcessedMenuItem[]>();

    inlineStyles = input<CSSProperties>();

    submenuiconTemplate = input<TemplateRef<void>>();

    itemClick = output<MenubarItemClickEvent>();

    itemMouseEnter = output<MenubarItemMouseEnterEvent>();

    menuFocus = output<FocusEvent>();

    menuBlur = output<FocusEvent>();

    menuKeydown = output<KeyboardEvent>();

    mouseLeaveSubscriber: Subscription | undefined;

    menubarService = inject(MenubarService);

    _componentStyle = inject(MenuBarStyle);

    hostName = 'Menubar';

    onInit() {
        this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => {
            this.cd.markForCheck();
        });
    }

    onItemClick(event: Event, processedItem: ProcessedMenuItem) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }

    getItemProp(processedItem: ProcessedMenuItem, name: string, params: { originalEvent: Event; item: MenuItem } | null = null) {
        return processedItem && processedItem.item ? resolve(processedItem.item[name], params) : undefined;
    }

    getItemId(processedItem: ProcessedMenuItem): string {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId()}_${processedItem.key}`;
    }

    getItemLabelId(processedItem: ProcessedMenuItem): string {
        return `${this.menuId()}_${processedItem.key}_label`;
    }

    getItemLabel(processedItem: ProcessedMenuItem): string {
        return this.getItemProp(processedItem, 'label');
    }

    isItemVisible(processedItem: ProcessedMenuItem): boolean {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem: ProcessedMenuItem): boolean {
        const path = this.activeItemPath();
        if (path) {
            return path.some((p) => p.key === processedItem.key);
        }
        return false;
    }

    isItemDisabled(processedItem: ProcessedMenuItem): boolean {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemFocused(processedItem: ProcessedMenuItem): boolean {
        return this.focusedItemId() === this.getItemId(processedItem);
    }

    isItemGroup(processedItem: ProcessedMenuItem): boolean {
        return isNotEmpty(processedItem.items);
    }

    getAriaSetSize() {
        const items = this.items();
        return items ? items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length : 0;
    }

    getAriaPosInset(index: number) {
        const items = this.items();
        return items ? index - items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1 : 0;
    }

    onItemMouseEnter(param: { $event: Event; processedItem: ProcessedMenuItem }) {
        if (this.autoDisplay()) {
            const { $event, processedItem } = param;
            this.itemMouseEnter.emit({ originalEvent: $event, processedItem });
        }
    }

    getRouterLinkActiveOptions(processedItem: ProcessedMenuItem) {
        return this.getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false };
    }

    getPTOptions(processedItem: ProcessedMenuItem, index: number, key: string) {
        return this.ptm(key, {
            context: {
                item: processedItem.item,
                index,
                active: this.isItemActive(processedItem),
                focused: this.isItemFocused(processedItem),
                disabled: this.isItemDisabled(processedItem),
                level: this.level()
            }
        });
    }

    getItemTemplateContext(item: MenuItem, isRoot: boolean): MenubarItemTemplateContext {
        return { $implicit: item, root: isRoot };
    }

    onDestroy() {
        this.mouseLeaveSubscriber?.unsubscribe();
    }
}
/**
 * Menubar is a horizontal menu component.
 * @group Components
 */
@Component({
    selector: 'p-menubar',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, MenubarSub, TooltipModule, BarsIcon, BadgeModule, SharedModule, BindModule],
    template: `
        @if (startTemplate()) {
            <div [class]="cx('start')" [pBind]="ptm('start')">
                <ng-container *ngTemplateOutlet="startTemplate()"></ng-container>
            </div>
        }
        @if (model()?.length) {
            <a
                #menubutton
                tabindex="0"
                role="button"
                [attr.aria-haspopup]="true"
                [attr.aria-expanded]="mobileActive"
                [attr.aria-controls]="$id()"
                [attr.aria-label]="navigationAriaLabel"
                [class]="cx('button')"
                [pBind]="ptm('button')"
                (click)="menuButtonClick($event)"
                (keydown)="menuButtonKeydown($event)"
            >
                @if (!menuIconTemplate()) {
                    <svg data-p-icon="bars" [pBind]="ptm('buttonIcon')" />
                }
                <ng-container *ngTemplateOutlet="menuIconTemplate()"></ng-container>
            </a>
        }
        <ul
            pMenubarSub
            #rootmenu
            [items]="processedItems()"
            [itemTemplate]="itemTemplate()"
            tabindex="0"
            [menuId]="$id()"
            [root]="true"
            [baseZIndex]="baseZIndex()"
            [autoZIndex]="autoZIndex()"
            [mobileActive]="mobileActive"
            [autoDisplay]="autoDisplay()"
            [attr.aria-label]="ariaLabel()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [submenuiconTemplate]="submenuIconTemplate()"
            [activeItemPath]="activeItemPath()"
            (itemClick)="onItemClick($event)"
            (mousedown)="onMenuMouseDown($event)"
            (focus)="onMenuFocus($event)"
            (blur)="onMenuBlur($event)"
            (keydown)="onKeyDown($event)"
            (itemMouseEnter)="onItemMouseEnter($event)"
            (mouseleave)="onMouseLeave($event)"
            [pt]="pt()"
            [pBind]="ptm('rootList')"
            [unstyled]="unstyled()"
        ></ul>
        @if (endTemplate()) {
            <div [class]="cx('end')" [pBind]="ptm('end')">
                <ng-container *ngTemplateOutlet="endTemplate()"></ng-container>
            </div>
        } @else {
            <div [class]="cx('end')">
                <ng-content></ng-content>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MenubarService, MenuBarStyle, { provide: MENUBAR_INSTANCE, useExisting: Menubar }, { provide: PARENT_INSTANCE, useExisting: Menubar }],
    host: {
        '[class]': 'cx("root")'
    },
    hostDirectives: [Bind]
})
export class Menubar extends BaseComponent<MenubarPassThrough> {
    componentName = 'Menubar';

    $pcMenubar: Menubar | undefined = inject(MENUBAR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    menubarService = inject(MenubarService);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * An array of menuitems.
     * @group Props
     */
    model = input<MenuItem[]>();
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
     * Whether to hide a root submenu when mouse leaves.
     * @group Props
     */
    autoHide = input(undefined, { transform: booleanAttribute });
    /**
     * The breakpoint to define the maximum width boundary.
     * @group Props
     */
    breakpoint = input('960px');
    /**
     * Delay to hide the root submenu in milliseconds when mouse leaves.
     * @group Props
     */
    autoHideDelay = input(100, { transform: numberAttribute });
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
     * Callback to execute when button is focused.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = output<FocusEvent>();
    /**
     * Callback to execute when button loses focus.
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onBlur = output<FocusEvent>();

    /**
     * Defines template option for start.
     * @group Templates
     */
    startTemplate = contentChild<TemplateRef<void>>('start', { descendants: false });

    /**
     * Defines template option for end.
     * @group Templates
     */
    endTemplate = contentChild<TemplateRef<void>>('end', { descendants: false });

    /**
     * Custom item template.
     * @param {MenubarItemTemplateContext} context - item context.
     * @see {@link MenubarItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<MenubarItemTemplateContext>>('item', { descendants: false });
    /**
     * Defines template option for menu icon.
     * @group Templates
     */
    menuIconTemplate = contentChild<TemplateRef<void>>('menuicon', { descendants: false });
    /**
     * Defines template option for submenu icon.
     * @group Templates
     */
    submenuIconTemplate = contentChild<TemplateRef<void>>('submenuicon', { descendants: false });

    menubutton = viewChild<ElementRef>('menubutton');

    rootmenu = viewChild<MenubarSub>('rootmenu');

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    mobileActive: boolean | undefined;

    private matchMediaListener: () => void;

    private query: MediaQueryList;

    public queryMatches = signal<boolean>(false);

    outsideClickListener: VoidListener;

    resizeListener: VoidListener;

    mouseLeaveSubscriber: Subscription | undefined;

    dirty: boolean = false;

    focused: boolean = false;

    activeItemPath = signal<ProcessedMenuItem[]>([]);

    focusedItemInfo = signal<FocusedItemInfo>({ index: -1, level: 0, parentKey: '', item: null });

    searchValue: string = '';

    searchTimeout: ReturnType<typeof setTimeout> | null = null;

    _componentStyle = inject(MenuBarStyle);

    processedItems = computed<ProcessedMenuItem[]>(() => this.createProcessedItems(this.model() || []));

    get visibleItems(): ProcessedMenuItem[] {
        const processedItem = this.activeItemPath().find((p) => p.key === this.focusedItemInfo().parentKey);

        return processedItem ? processedItem.items! : this.processedItems();
    }

    get navigationAriaLabel(): string | undefined {
        return this.config.translation?.aria?.navigation;
    }

    get focusedItemId() {
        const focusedItem = this.focusedItemInfo();
        return focusedItem.item && focusedItem.item?.id ? focusedItem.item.id : focusedItem.index !== -1 ? `${this.$id()}${isNotEmpty(focusedItem.parentKey) ? '_' + focusedItem.parentKey : ''}_${focusedItem.index}` : null;
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
    }

    onInit() {
        this.bindMatchMediaListener();
        this.menubarService.autoHide = this.autoHide();
        this.menubarService.autoHideDelay = this.autoHideDelay();
        this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => {
            this.hide();
        });
    }

    createProcessedItems(items: MenuItem[], level: number = 0, parent: ProcessedMenuItem | Record<string, never> = {}, parentKey: string = ''): ProcessedMenuItem[] {
        const processedItems: ProcessedMenuItem[] = [];

        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem: ProcessedMenuItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };

                newItem.items = this.createProcessedItems(item.items || [], level + 1, newItem, key);
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
                    this.mobileActive = false;
                    this.cd.markForCheck();
                };

                query.addEventListener('change', this.matchMediaListener);
            }
        }
    }

    unbindMatchMediaListener() {
        if (this.matchMediaListener) {
            this.query.removeEventListener('change', this.matchMediaListener);
            this.matchMediaListener = null!;
        }
    }

    getItemProp(item: MenuItem, name: string) {
        return item ? resolve(item[name]) : undefined;
    }

    menuButtonClick(event: MouseEvent) {
        this.toggle(event);
    }

    menuButtonKeydown(event: KeyboardEvent) {
        (event.code === 'Enter' || event.code === 'Space') && this.menuButtonClick(event as unknown as MouseEvent);
    }

    onItemClick(event: MenubarItemClickEvent) {
        this.dirty = true;
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);

        if (selected) {
            const { index, key, level, parentKey, item } = processedItem;

            this.activeItemPath.set(this.activeItemPath().filter((p) => key !== p.key && key.startsWith(p.key)));
            this.focusedItemInfo.set({ index, level, parentKey, item });

            this.dirty = !root;
            focus(this.rootmenu()?.el.nativeElement);
        } else {
            if (grouped) {
                this.onItemChange(event);
            } else {
                const rootProcessedItem = root ? processedItem : this.activeItemPath().find((p) => p.parentKey === '');
                this.hide(originalEvent);
                this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);

                this.mobileActive = false;
                focus(this.rootmenu()?.el.nativeElement);
            }
        }
    }

    onItemMouseEnter(event: MenubarItemMouseEnterEvent) {
        if (!isTouchDevice()) {
            if (this.dirty) {
                this.onItemChange(event, 'hover');
            }
        } else {
            this.onItemChange({ originalEvent: event.originalEvent, processedItem: event.processedItem, isFocus: this.autoDisplay() }, 'hover');
        }
    }

    onMouseLeave(_event: MouseEvent) {
        const autoHideEnabled = this.menubarService.autoHide;
        const autoHideDelay = this.menubarService.autoHideDelay;

        if (autoHideEnabled) {
            setTimeout(() => {
                this.menubarService.mouseLeaves.next(true);
            }, autoHideDelay);
        }
    }

    changeFocusedItemIndex(_event: Event, index: number) {
        const processedItem = this.findVisibleItem(index);
        if (this.focusedItemInfo().index !== index) {
            const focusedItemInfo = this.focusedItemInfo();
            this.focusedItemInfo.set({ ...focusedItemInfo, item: processedItem?.item ?? null, index });
            this.scrollInView();
        }
    }

    scrollInView(index: number = -1) {
        const id = index !== -1 ? `${this.$id()}_${index}` : this.focusedItemId;
        const element = findSingle(this.rootmenu()?.el.nativeElement, `li[id="${id}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    onItemChange(event: MenubarItemClickEvent, type?: string) {
        const { processedItem, isFocus } = event;

        if (isEmpty(processedItem)) return;

        const { index, key, level, parentKey, items, item } = processedItem;
        const grouped = isNotEmpty(items);
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== parentKey && p.parentKey !== key);

        grouped && activeItemPath.push(processedItem);
        this.focusedItemInfo.set({ index, level, parentKey, item });

        grouped && (this.dirty = true);
        isFocus && focus(this.rootmenu()?.el.nativeElement);

        if (type === 'hover' && this.queryMatches()) {
            return;
        }

        this.activeItemPath.set(activeItemPath);
    }

    toggle(event: MouseEvent) {
        if (this.mobileActive) {
            this.mobileActive = false;
            ZIndexUtils.clear(this.rootmenu()?.el.nativeElement);
            this.hide();
        } else {
            this.mobileActive = true;
            ZIndexUtils.set('menu', this.rootmenu()?.el.nativeElement, this.config.zIndex.menu);
            setTimeout(() => {
                this.show();
            }, 0);
        }

        this.bindOutsideClickListener();
        event.preventDefault();
    }

    hide(_event?: Event, isFocus?: boolean) {
        if (this.mobileActive) {
            setTimeout(() => {
                focus(this.menubutton()?.nativeElement);
            }, 0);
        }

        this.activeItemPath.set([]);
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });

        isFocus && focus(this.rootmenu()?.el.nativeElement);
        this.dirty = false;
    }

    show() {
        const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
        this.focusedItemInfo.set({ index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '', item: processedItem?.item ?? null });
        focus(this.rootmenu()?.el.nativeElement);
    }

    onMenuMouseDown(_event: MouseEvent) {
        this.dirty = true;
    }

    onMenuFocus(event: FocusEvent) {
        this.focused = true;

        const relatedTarget = event.relatedTarget;
        const isFromOutside = !relatedTarget || !this.el.nativeElement.contains(relatedTarget);

        if (isFromOutside && this.focusedItemInfo().index === -1 && !this.activeItemPath().length && !this.dirty) {
            const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
            this.focusedItemInfo.set({ index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '', item: processedItem?.item ?? null });
        }

        this.onFocus.emit(event);
    }

    onMenuBlur(event: FocusEvent) {
        const relatedTarget = event.relatedTarget as HTMLElement | null;
        if (relatedTarget && this.el.nativeElement.contains(relatedTarget)) {
            return;
        }

        setTimeout(() => {
            const activeElement = this.document.activeElement;
            if (activeElement && this.el.nativeElement.contains(activeElement)) {
                return;
            }

            this.focused = false;
            this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
            this.searchValue = '';
            this.dirty = false;
            this.onBlur.emit(event);
        });
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

    findVisibleItem(index: number): ProcessedMenuItem | null {
        return isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
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

    isProcessedItemGroup(processedItem: ProcessedMenuItem): boolean {
        return processedItem && isNotEmpty(processedItem.items);
    }

    isSelected(processedItem: ProcessedMenuItem): boolean {
        return this.activeItemPath().some((p) => p.key === processedItem.key);
    }

    isValidSelectedItem(processedItem: ProcessedMenuItem): boolean {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }

    isValidItem(processedItem: ProcessedMenuItem): boolean {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
    }

    isItemDisabled(item: MenuItem): boolean {
        return this.getItemProp(item, 'disabled');
    }

    isItemSeparator(item: MenuItem): boolean {
        return this.getItemProp(item, 'separator');
    }

    isItemMatched(processedItem: ProcessedMenuItem): boolean {
        return this.isValidItem(processedItem) && !!this.getProccessedItemLabel(processedItem)?.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isProccessedItemGroup(processedItem: ProcessedMenuItem): boolean {
        return processedItem && isNotEmpty(processedItem.items);
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
            this.searchTimeout = null;
        }, 500);

        return matched;
    }

    getProccessedItemLabel(processedItem: ProcessedMenuItem): string | undefined {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }

    getItemLabel(item: MenuItem): string {
        return this.getItemProp(item, 'label');
    }

    onArrowDownKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const root = processedItem ? isEmpty(processedItem.parent) : null;

        if (root) {
            const grouped = this.isProccessedItemGroup(processedItem);

            if (grouped) {
                this.onItemChange({ originalEvent: event, processedItem });
                this.focusedItemInfo.set({ index: -1, level: processedItem.level + 1, parentKey: processedItem.key, item: processedItem.item });
                this.onArrowRightKey(event);
            }
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowRightKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const parentItem = processedItem ? this.activeItemPath().find((p) => p.key === processedItem.parentKey) : null;

        if (parentItem) {
            const grouped = this.isProccessedItemGroup(processedItem);

            if (grouped) {
                this.onItemChange({ originalEvent: event, processedItem });
                this.focusedItemInfo.set({ index: -1, level: processedItem.level + 1, parentKey: processedItem.key, item: processedItem.item });
                this.onArrowDownKey(event);
            }
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowUpKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const root = isEmpty(processedItem.parent);

        if (root) {
            const grouped = this.isProccessedItemGroup(processedItem);

            if (grouped) {
                this.onItemChange({ originalEvent: event, processedItem });
                this.focusedItemInfo.set({ index: -1, level: processedItem.level + 1, parentKey: processedItem.key, item: processedItem.item });
                const itemIndex = this.findLastItemIndex();

                this.changeFocusedItemIndex(event, itemIndex);
            }
        } else {
            const parentItem = this.activeItemPath().find((p) => p.key === processedItem.parentKey);
            if (this.focusedItemInfo().index === 0) {
                this.focusedItemInfo.set({ index: -1, level: parentItem?.level ?? 0, parentKey: parentItem ? parentItem.parentKey : '', item: processedItem.item });
                this.searchValue = '';
                this.onArrowLeftKey(event);
                const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItemInfo().parentKey);
                this.activeItemPath.set(activeItemPath);
            } else {
                const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
                this.changeFocusedItemIndex(event, itemIndex);
            }
        }

        event.preventDefault();
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const processedItem = this.visibleItems[this.focusedItemInfo().index];
        const parentItem = processedItem ? this.activeItemPath().find((p) => p.key === processedItem.parentKey) : null;

        if (parentItem) {
            this.onItemChange({ originalEvent: event, processedItem: parentItem });
            const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItemInfo().parentKey);
            this.activeItemPath.set(activeItemPath);

            event.preventDefault();
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
            this.changeFocusedItemIndex(event, itemIndex);
            event.preventDefault();
        }
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
            const element = findSingle(this.rootmenu()?.el.nativeElement, `li[id="${`${this.focusedItemId}`}"]`) as HTMLElement | null;
            const anchorElement = element && ((findSingle(element, '[data-pc-section="itemlink"]') || findSingle(element, 'a,button')) as HTMLElement | null);

            anchorElement ? anchorElement.click() : element && element.click();
        }

        event.preventDefault();
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

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    if (!isTouchDevice()) {
                        this.hide(event, true);
                    }

                    this.mobileActive = false;
                });
            }
        }
    }

    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const rootEl = this.rootmenu()?.el.nativeElement;
                    const buttonEl = this.menubutton()?.nativeElement;
                    const isOutsideContainer = rootEl !== event.target && !rootEl?.contains(event.target);
                    const isOutsideMenuButton = this.mobileActive && buttonEl !== event.target && !buttonEl?.contains(event.target);

                    if (isOutsideContainer) {
                        isOutsideMenuButton ? (this.mobileActive = false) : this.hide();
                    }
                });
            }
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }

    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }

    onDestroy() {
        this.mouseLeaveSubscriber?.unsubscribe();
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        this.unbindMatchMediaListener();
    }
}

@NgModule({
    imports: [Menubar, SharedModule],
    exports: [Menubar, SharedModule]
})
export class MenubarModule {}
