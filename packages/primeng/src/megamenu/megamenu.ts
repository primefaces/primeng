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
    inject,
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
import { MegaMenuItem, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { AngleDownIcon, AngleRightIcon, BarsIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { VoidListener } from 'primeng/ts-helpers';
import { MegaMenuFocusedItemInfo, MegaMenuItemClickEvent, MegaMenuItemMouseEnterEvent, MegaMenuItemTemplateContext, MegaMenuOrientation, MegaMenuPassThrough, ProcessedMegaMenuItem } from 'primeng/types/megamenu';
import { ZIndexUtils } from 'primeng/utils';
import { MegaMenuStyle } from './style/megamenustyle';

const MEGAMENU_INSTANCE = new InjectionToken<MegaMenu>('MEGAMENU_INSTANCE');
const MEGAMENU_SUB_INSTANCE = new InjectionToken<MegaMenuSub>('MEGAMENU_SUB_INSTANCE');

@Component({
    selector: 'p-megaMenuSub, p-megamenu-sub, ul[pMegaMenuSub]',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, Ripple, TooltipModule, AngleDownIcon, AngleRightIcon, BadgeModule, SharedModule, Bind],
    template: `
        @if (submenu()) {
            <li [class]="cn(cx('submenuLabel'), getItemProp(submenu(), 'class'))" [style]="getItemProp(submenu(), 'style')" role="presentation" [pBind]="ptm('submenuLabel')">
                {{ getItemLabel(submenu()) }}
            </li>
        }
        @for (processedItem of items(); track processedItem.key; let index = $index) {
            @if (isItemVisible(processedItem)) {
                @if (isSeparator(processedItem)) {
                    <li [attr.id]="getItemId(processedItem)" [style]="getItemProp(processedItem, 'style')" [class]="cn(cx('separator'), this.getItemProp(processedItem, 'class'))" role="separator" [pBind]="ptm('separator')"></li>
                } @else {
                    <li
                        #listItem
                        role="menuitem"
                        [attr.id]="getItemId(processedItem)"
                        [attr.data-p-active]="isItemActive(processedItem)"
                        [attr.data-p-focused]="isItemFocused(processedItem)"
                        [attr.data-p-disabled]="isItemDisabled(processedItem)"
                        [attr.aria-label]="getItemLabel(processedItem)"
                        [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                        [attr.aria-haspopup]="getAriaHasPopup(processedItem)"
                        [attr.aria-expanded]="getAriaExpanded(processedItem)"
                        [attr.aria-level]="level() + 1"
                        [attr.aria-setsize]="getAriaSetSize()"
                        [attr.aria-posinset]="getAriaPosInset(index)"
                        [style]="getItemProp(processedItem, 'style')"
                        [class]="cn(cx('item', { processedItem }), getItemProp(processedItem, 'styleClass'))"
                        pTooltip
                        [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                        [pBind]="getPTOptions(processedItem, index, 'item')"
                        [pTooltipUnstyled]="unstyled()"
                    >
                        <div [class]="cx('itemContent')" [pBind]="getPTOptions(processedItem, index, 'itemContent')" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({ $event, processedItem })">
                            @if (!itemTemplate()) {
                                @if (!hasRouterLink(processedItem)) {
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
                                        @if (hasIcon(processedItem)) {
                                            <span
                                                [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                                [style]="getItemProp(processedItem, 'iconStyle')"
                                                [attr.tabindex]="-1"
                                                [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                                            >
                                            </span>
                                        }
                                        @if (shouldEscape(processedItem)) {
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
                                        @if (hasBadge(processedItem)) {
                                            <p-badge [class]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" [unstyled]="unstyled()" />
                                        }
                                        @if (isItemGroup(processedItem)) {
                                            @if (!hasSubmenuIcon()) {
                                                @if (isHorizontalOrMobile()) {
                                                    <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" aria-hidden="true" />
                                                } @else {
                                                    <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" aria-hidden="true" />
                                                }
                                            }
                                            <ng-container *ngTemplateOutlet="megaMenu.submenuiconTemplate()" />
                                        }
                                    </a>
                                } @else {
                                    <a
                                        [routerLink]="getItemProp(processedItem, 'routerLink')"
                                        [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                        [attr.title]="getItemProp(processedItem, 'title')"
                                        [attr.tabindex]="-1"
                                        [queryParams]="getItemProp(processedItem, 'queryParams')"
                                        [routerLinkActive]="'p-megamenu-item-link-active'"
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
                                        [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                                        pRipple
                                    >
                                        @if (hasIcon(processedItem)) {
                                            <span
                                                [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                                [style]="getItemProp(processedItem, 'iconStyle')"
                                                [attr.tabindex]="-1"
                                                [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                                            ></span>
                                        }
                                        @if (shouldEscape(processedItem)) {
                                            <span [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))" [style]="getItemProp(processedItem, 'labelStyle')" [pBind]="getPTOptions(processedItem, index, 'itemLabel')">{{
                                                getItemLabel(processedItem)
                                            }}</span>
                                        } @else {
                                            <span
                                                [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                                [style]="getItemProp(processedItem, 'labelStyle')"
                                                [innerHTML]="getItemLabel(processedItem)"
                                                [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                            ></span>
                                        }
                                        @if (hasBadge(processedItem)) {
                                            <p-badge [class]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" [unstyled]="unstyled()" />
                                        }
                                        @if (isItemGroup(processedItem)) {
                                            @if (!hasSubmenuIcon()) {
                                                @if (isHorizontal()) {
                                                    <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" aria-hidden="true" />
                                                } @else {
                                                    <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" aria-hidden="true" />
                                                }
                                            }
                                            <ng-container *ngTemplateOutlet="megaMenu.submenuiconTemplate()" />
                                        }
                                    </a>
                                }
                            } @else {
                                <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: processedItem.item }" />
                            }
                        </div>
                        @if (isVisibleItemGroup(processedItem)) {
                            <div [class]="cx('overlay')" [pBind]="ptm('overlay')">
                                <div [class]="cx('grid')" [pBind]="ptm('grid')">
                                    @for (col of processedItem.items; track col) {
                                        <div [class]="cx('column', { processedItem })" [pBind]="ptm('column')">
                                            @for (submenu of col; track submenu.key) {
                                                <ul
                                                    pMegaMenuSub
                                                    [id]="getSubListId(submenu)"
                                                    [submenu]="submenu"
                                                    [items]="submenu.items"
                                                    [itemTemplate]="itemTemplate()"
                                                    [mobileActive]="mobileActive()"
                                                    [menuId]="menuId()"
                                                    [focusedItemId]="focusedItemId()"
                                                    [level]="level() + 1"
                                                    [root]="false"
                                                    [orientation]="orientation()"
                                                    (itemClick)="itemClick.emit($event)"
                                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                                    [pt]="pt()"
                                                    [unstyled]="unstyled()"
                                                ></ul>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </li>
                }
            }
        }
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: MEGAMENU_SUB_INSTANCE, useExisting: MegaMenuSub },
        { provide: PARENT_INSTANCE, useExisting: MegaMenuSub }
    ],
    host: {
        '[class]': 'hostClass()',
        '[style]': 'sx("rootList")',
        '[style.display]': 'hostDisplay()',
        '[attr.role]': 'root() ? "menubar" : "menu"',
        '[attr.id]': 'id()',
        '[attr.aria-orientation]': 'orientation()',
        '[tabindex]': 'tabindex()',
        '[attr.aria-activedescendant]': 'focusedItemId()',
        '[attr.data-pc-section]': 'hostDataPcSection()',
        '(keydown)': 'menuKeydown.emit($event)',
        '(focus)': 'menuFocus.emit($event)',
        '(blur)': 'menuBlur.emit($event)',
        '(mousedown)': 'menuMouseDown.emit($event)'
    },
    hostDirectives: [Bind]
})
export class MegaMenuSub extends BaseComponent<MegaMenuPassThrough> {
    bindDirectiveInstance = inject(Bind, { self: true });

    $pcMegaMenu: MegaMenu | undefined = inject(MEGAMENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    $pcMegaMenuSub: MegaMenuSub | undefined = inject(MEGAMENU_SUB_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    id = input<string>();

    items = input<ProcessedMegaMenuItem[]>();

    itemTemplate = input<TemplateRef<MegaMenuItemTemplateContext>>();

    menuId = input<string>();

    ariaLabel = input<string>();

    ariaLabelledBy = input<string>();

    level = input(0, { transform: numberAttribute });

    focusedItemId = input<string>();

    disabled = input(false, { transform: booleanAttribute });

    orientation = input<MegaMenuOrientation>();

    activeItem = input<ProcessedMegaMenuItem | null>();

    submenu = input<ProcessedMegaMenuItem>();

    queryMatches = input(false, { transform: booleanAttribute });

    mobileActive = input(false, { transform: booleanAttribute });

    scrollHeight = input<string>();

    tabindex = input(0, { transform: numberAttribute });

    root = input(false, { transform: booleanAttribute });

    itemClick = output<MegaMenuItemClickEvent>();

    itemMouseEnter = output<MegaMenuItemMouseEnterEvent>();

    menuFocus = output<FocusEvent>();

    menuBlur = output<FocusEvent>();

    menuKeydown = output<KeyboardEvent>();

    menuMouseDown = output<MouseEvent>();

    megaMenu: MegaMenu = inject(forwardRef(() => MegaMenu));

    _componentStyle = inject(MegaMenuStyle);

    hostClass = computed(() => (this.root() ? this.cx('rootList') : this.cx('submenu')));

    hostDisplay = computed(() => (this.isSubmenuVisible(this.submenu()) ? null : 'none'));

    hostDataPcSection = computed(() => (this.root() ? 'rootlist' : 'submenu'));

    isHorizontalOrMobile = computed(() => this.orientation() === 'horizontal' || this.mobileActive());

    isHorizontal = computed(() => this.orientation() === 'horizontal');

    isSeparator(processedItem: ProcessedMegaMenuItem) {
        return this.getItemProp(processedItem, 'separator');
    }

    hasRouterLink(processedItem: ProcessedMegaMenuItem) {
        return this.getItemProp(processedItem, 'routerLink');
    }

    hasIcon(processedItem: ProcessedMegaMenuItem) {
        return this.getItemProp(processedItem, 'icon');
    }

    shouldEscape(processedItem: ProcessedMegaMenuItem) {
        return this.getItemProp(processedItem, 'escape');
    }

    hasBadge(processedItem: ProcessedMegaMenuItem) {
        return this.getItemProp(processedItem, 'badge');
    }

    isVisibleItemGroup(processedItem: ProcessedMegaMenuItem) {
        return this.isItemVisible(processedItem) && this.isItemGroup(processedItem);
    }

    getAriaHasPopup(processedItem: ProcessedMegaMenuItem) {
        return this.isItemGroup(processedItem) && !this.getItemProp(processedItem, 'to') ? 'menu' : undefined;
    }

    getAriaExpanded(processedItem: ProcessedMegaMenuItem) {
        return this.isItemGroup(processedItem) ? this.isItemActive(processedItem) : undefined;
    }

    getRouterLinkActiveOptions(processedItem: ProcessedMegaMenuItem) {
        return this.getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false };
    }

    hasSubmenuIcon = computed(() => !!this.megaMenu.submenuiconTemplate());

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm(this.root() ? 'rootList' : 'submenu'));
    }

    onItemClick(event: Event, processedItem: ProcessedMegaMenuItem) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }

    getItemProp(processedItem: ProcessedMegaMenuItem | undefined, name: string, params: { originalEvent: Event; item: MegaMenuItem } | null = null): any {
        return processedItem && processedItem.item ? resolve(processedItem.item[name], params) : undefined;
    }

    getItemId(processedItem: ProcessedMegaMenuItem): string {
        return processedItem.item && processedItem.item?.id ? processedItem.item.id : `${this.menuId()}_${processedItem.key}`;
    }

    getSubListId(processedItem: ProcessedMegaMenuItem) {
        return `${this.getItemId(processedItem)}_list`;
    }

    getItemLabel(processedItem: ProcessedMegaMenuItem | undefined): string {
        return this.getItemProp(processedItem, 'label');
    }

    isSubmenuVisible(submenu: ProcessedMegaMenuItem | undefined) {
        if (this.submenu() && !this.root()) {
            return this.isItemVisible(submenu);
        } else {
            return true;
        }
    }

    isItemVisible(processedItem: ProcessedMegaMenuItem | undefined): boolean {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem: ProcessedMegaMenuItem) {
        const activeItem = this.activeItem();
        return isNotEmpty(activeItem) && activeItem ? activeItem.key === processedItem.key : false;
    }

    isItemDisabled(processedItem: ProcessedMegaMenuItem): boolean {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemFocused(processedItem: ProcessedMegaMenuItem): boolean {
        return this.focusedItemId() === this.getItemId(processedItem);
    }

    isItemGroup(processedItem: ProcessedMegaMenuItem): boolean {
        return isNotEmpty(processedItem.items);
    }

    getAriaSetSize() {
        return this.items()?.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index: number) {
        return (
            index -
            (this.items()
                ?.slice(0, index)
                .filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length || 0) +
            1
        );
    }

    onItemMouseEnter(param: { $event: Event; processedItem: ProcessedMegaMenuItem }) {
        const { $event, processedItem } = param;
        this.itemMouseEnter.emit({ originalEvent: $event, processedItem });
    }

    getPTOptions(processedItem: ProcessedMegaMenuItem, index: number, key: string) {
        const ptContext = {
            context: {
                item: processedItem.item,
                index,
                active: this.isItemActive(processedItem),
                focused: this.isItemFocused(processedItem),
                disabled: this.isItemDisabled(processedItem)
            }
        };

        return this.ptm(key, ptContext);
    }
}
/**
 * MegaMenu is navigation component that displays submenus together.
 * @group Components
 */
@Component({
    selector: 'p-megaMenu, p-megamenu, p-mega-menu',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, MegaMenuSub, TooltipModule, BarsIcon, BadgeModule, SharedModule, Bind],
    template: `
        @if (startTemplate()) {
            <div [class]="cx('start')" [pBind]="ptm('start')">
                <ng-container *ngTemplateOutlet="startTemplate()" />
            </div>
        }
        @if (!buttonTemplate()) {
            @if (model()?.length) {
                <a
                    #menubutton
                    role="button"
                    tabindex="0"
                    [class]="cx('button')"
                    [attr.aria-haspopup]="true"
                    [attr.aria-expanded]="mobileActive()"
                    [attr.aria-controls]="$id()"
                    [attr.aria-label]="navigationAriaLabel"
                    [pBind]="ptm('button')"
                    (click)="menuButtonClick($event)"
                    (keydown)="menuButtonKeydown($event)"
                >
                    @if (!buttoniconTemplate()) {
                        <svg data-p-icon="bars" [pBind]="ptm('buttonIcon')" />
                    }
                    <ng-container *ngTemplateOutlet="buttoniconTemplate()" />
                </a>
            }
        }
        <ng-container *ngTemplateOutlet="buttonTemplate()" />
        <ul
            pMegaMenuSub
            #rootmenu
            [itemTemplate]="itemTemplate()"
            [items]="processedItems()"
            [attr.id]="$id() + '_list'"
            [menuId]="$id()"
            [root]="true"
            [orientation]="orientation()"
            [ariaLabel]="ariaLabel()"
            [disabled]="disabled()"
            [tabindex]="rootMenuTabindex()"
            [activeItem]="activeItem()"
            [level]="0"
            [ariaLabelledBy]="ariaLabelledBy()"
            [focusedItemId]="activeFocusedItemId()"
            [mobileActive]="mobileActive()"
            (itemClick)="onItemClick($event)"
            (menuFocus)="onMenuFocus($event)"
            (menuBlur)="onMenuBlur($event)"
            (menuKeydown)="onKeyDown($event)"
            (menuMouseDown)="onMenuMouseDown($event)"
            (itemMouseEnter)="onItemMouseEnter($event)"
            [queryMatches]="queryMatches()"
            [scrollHeight]="scrollHeight()"
            [pt]="pt()"
            [unstyled]="unstyled()"
        ></ul>
        @if (endTemplate()) {
            <div [class]="cx('end')" [pBind]="ptm('end')">
                <ng-container *ngTemplateOutlet="endTemplate()" />
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MegaMenuStyle, { provide: MEGAMENU_INSTANCE, useExisting: MegaMenu }, { provide: PARENT_INSTANCE, useExisting: MegaMenu }],
    host: {
        '[class]': 'cx("root")',
        '[id]': '$id()'
    },
    hostDirectives: [Bind]
})
export class MegaMenu extends BaseComponent<MegaMenuPassThrough> {
    componentName = 'MegaMenu';

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * An array of menuitems.
     * @group Props
     */
    model = input<MegaMenuItem[]>();

    /**
     * Defines the orientation.
     * @group Props
     */
    orientation = input<MegaMenuOrientation>('horizontal');

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
     * The breakpoint to define the maximum width boundary.
     * @group Props
     */
    breakpoint = input('960px');

    /**
     * Height of the viewport, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = input('20rem');

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
     * Defines template option for menu icon.
     * @group Templates
     */
    menuiconTemplate = contentChild<TemplateRef<void>>('menuicon', { descendants: false });

    /**
     * Defines template option for submenu icon.
     * @group Templates
     */
    submenuiconTemplate = contentChild<TemplateRef<void>>('submenuicon', { descendants: false });

    /**
     * Custom item template.
     * @param {MegaMenuItemTemplateContext} context - item context.
     * @see {@link MegaMenuItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<MegaMenuItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom menu button template on responsive mode.
     * @group Templates
     */
    buttonTemplate = contentChild<TemplateRef<void>>('button', { descendants: false });

    /**
     * Custom menu button icon template on responsive mode.
     * @group Templates
     */
    buttoniconTemplate = contentChild<TemplateRef<void>>('buttonicon', { descendants: false });

    menubuttonViewChild = viewChild<ElementRef>('menubutton');

    rootmenu = viewChild<MegaMenuSub>('rootmenu');

    outsideClickListener: VoidListener;

    resizeListener: ((event: Event) => void) | null = null;

    dirty: boolean = false;

    focused = signal(false);

    activeItem = signal<ProcessedMegaMenuItem | null>(null);

    focusedItemInfo = signal<MegaMenuFocusedItemInfo>({ index: -1, level: 0, parentKey: '', item: null });

    searchValue: string = '';

    searchTimeout: ReturnType<typeof setTimeout> | null = null;

    _componentStyle = inject(MegaMenuStyle);

    private matchMediaListener: (() => void) | null = null;

    private query: MediaQueryList | null = null;

    queryMatches = signal<boolean>(false);

    mobileActive = signal(false);

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    processedItems = computed<ProcessedMegaMenuItem[]>(() => this.createProcessedItems(this.model() || []));

    visibleItems = computed<ProcessedMegaMenuItem[]>(() => {
        const activeItemValue = this.activeItem();
        const processedItem = isNotEmpty(activeItemValue) ? activeItemValue : null;

        return processedItem
            ? (processedItem.items as ProcessedMegaMenuItem[][]).reduce((items: ProcessedMegaMenuItem[], col) => {
                  col.forEach((submenu) => {
                      (submenu.items as ProcessedMegaMenuItem[]).forEach((a) => {
                          items.push(a);
                      });
                  });

                  return items;
              }, [])
            : this.processedItems();
    });

    focusedItemId = computed(() => {
        const focusedItem = this.focusedItemInfo();
        return focusedItem?.item && focusedItem.item?.id ? focusedItem.item.id : isNotEmpty(focusedItem.key) ? `${this.$id()}_${focusedItem.key}` : null;
    });

    rootMenuTabindex = computed(() => (!this.disabled() ? this.tabindex() : -1));

    activeFocusedItemId = computed(() => (this.focused() ? this.focusedItemId() : undefined));

    get navigationAriaLabel(): string | undefined {
        return this.config.translation?.aria?.navigation;
    }

    constructor() {
        super();
        effect(() => {
            const activeItem = this.activeItem();
            if (isNotEmpty(activeItem)) {
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
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    bindMatchMediaListener() {
        if (isPlatformBrowser(this.platformId) && !this.matchMediaListener) {
            const query = window.matchMedia(`(max-width: ${this.breakpoint()})`);

            this.query = query;
            this.queryMatches.set(query.matches);

            this.matchMediaListener = () => {
                this.queryMatches.set(query.matches);
                this.mobileActive.set(false);
            };

            query.addEventListener('change', this.matchMediaListener);
        }
    }

    unbindMatchMediaListener() {
        if (this.matchMediaListener && this.query) {
            this.query.removeEventListener('change', this.matchMediaListener);
            this.matchMediaListener = null;
        }
    }

    createProcessedItems(items: MegaMenuItem[], level = 0, parent: ProcessedMegaMenuItem | Record<string, never> = {}, parentKey = '', columnIndex?: number): ProcessedMegaMenuItem[] {
        const processedItems: ProcessedMegaMenuItem[] = [];

        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + (columnIndex !== undefined ? columnIndex + '_' : '') + index;
                const newItem: ProcessedMegaMenuItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey,
                    columnIndex: columnIndex !== undefined ? columnIndex : (parent as ProcessedMegaMenuItem).columnIndex !== undefined ? (parent as ProcessedMegaMenuItem).columnIndex : index
                };

                newItem.items =
                    level === 0 && item.items && item.items.length > 0
                        ? item.items.map((_items, _index) => this.createProcessedItems(_items as MegaMenuItem[], level + 1, newItem, key, _index))
                        : this.createProcessedItems((item.items || []) as MegaMenuItem[], level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }

    getItemProp(item: MegaMenuItem, name: string) {
        return item ? resolve(item[name]) : undefined;
    }

    onItemClick(event: MegaMenuItemClickEvent) {
        this.dirty = true;
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);

        if (selected) {
            const { index, key, parentKey, item } = processedItem;

            this.activeItem.set(null);
            this.focusedItemInfo.set({ index, level: 0, key, parentKey, item });

            this.dirty = !root;
            if (!this.mobileActive()) {
                focus(this.rootmenu()?.el?.nativeElement, { preventScroll: true });
            }
        } else {
            if (grouped) {
                this.onItemChange(event);
            } else {
                this.hide(originalEvent);
            }
        }
    }

    onItemMouseEnter(event: MegaMenuItemMouseEnterEvent) {
        if (!this.mobileActive() && this.dirty) {
            this.onItemChange(event);
        }
    }

    menuButtonClick(event: MouseEvent) {
        this.toggle(event);
    }

    menuButtonKeydown(event: KeyboardEvent) {
        (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') && this.menuButtonClick(event as unknown as MouseEvent);
    }

    toggle(event: MouseEvent) {
        if (this.mobileActive()) {
            this.mobileActive.set(false);
            ZIndexUtils.clear(this.rootmenu()?.el.nativeElement);
            this.hide();
        } else {
            this.mobileActive.set(true);
            ZIndexUtils.set('menu', this.rootmenu()?.el.nativeElement, this.config.zIndex.menu);
            setTimeout(() => {
                this.show();
            }, 0);
        }

        this.bindOutsideClickListener();
        event.preventDefault();
    }

    show() {
        this.focusedItemInfo.set({ index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '', item: null });

        focus(this.rootmenu()?.el.nativeElement);
    }

    scrollInView(index: number = -1) {
        const id = index !== -1 ? `${this.$id()}_${index}` : this.focusedItemId();

        let element: HTMLElement | null | undefined;

        if (id === null && this.queryMatches()) {
            element = this.menubuttonViewChild()?.nativeElement;
        } else {
            element = findSingle(this.rootmenu()?.el?.nativeElement, `li[id="${id}"]`) as HTMLElement | null;
        }

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
        }
    }

    onItemChange(event: MegaMenuItemClickEvent | MegaMenuItemMouseEnterEvent) {
        const { processedItem } = event;

        if (isEmpty(processedItem)) return;

        const { index, key, parentKey, items, item } = processedItem;
        const grouped = isNotEmpty(items);

        if (grouped) {
            this.activeItem.set(processedItem);
        }
        this.focusedItemInfo.set({ index, level: 0, key, parentKey, item });

        grouped && (this.dirty = true);
        if ('isFocus' in event && event.isFocus) {
            focus(this.rootmenu()?.el?.nativeElement);
        }
    }

    hide(_event?: Event, isFocus?: boolean) {
        if (this.mobileActive()) {
            this.mobileActive.set(false);
            setTimeout(() => {
                focus(this.menubuttonViewChild()?.nativeElement);
                this.scrollInView();
            }, 100);
        }

        this.activeItem.set(null);
        this.focusedItemInfo.set({ index: -1, level: 0, key: '', parentKey: '', item: null });

        isFocus && focus(this.rootmenu()?.el?.nativeElement);
        this.dirty = false;
    }

    onMenuMouseDown(_event: MouseEvent) {
        this.dirty = true;
    }

    onMenuFocus(event: FocusEvent) {
        this.focused.set(true);

        const relatedTarget = event.relatedTarget as HTMLElement | null;
        const isFromOutside = !relatedTarget || !this.el.nativeElement.contains(relatedTarget);

        if (isFromOutside && this.focusedItemInfo().index === -1 && isEmpty(this.activeItem()) && !this.dirty) {
            const index = this.findFirstFocusedItemIndex();
            const processedItem = this.findVisibleItem(index);

            if (processedItem) {
                this.focusedItemInfo.set({ index, level: 0, key: processedItem.key, parentKey: processedItem.parentKey, item: processedItem.item });
            }
        }
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

            this.focused.set(false);
            this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '', item: null });
            this.searchValue = '';
            this.dirty = false;
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

    findFirstFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();

        return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
    }

    findFirstItemIndex() {
        return this.visibleItems().findIndex((processedItem) => this.isValidItem(processedItem));
    }

    findSelectedItemIndex() {
        return this.visibleItems().findIndex((processedItem) => this.isValidSelectedItem(processedItem));
    }

    isProcessedItemGroup(processedItem: ProcessedMegaMenuItem): boolean {
        return processedItem && isNotEmpty(processedItem.items);
    }

    isSelected(processedItem: ProcessedMegaMenuItem): boolean {
        const activeItemValue = this.activeItem();
        return isNotEmpty(activeItemValue) && activeItemValue ? activeItemValue.key === processedItem.key : false;
    }

    isValidSelectedItem(processedItem: ProcessedMegaMenuItem): boolean {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }

    isValidItem(processedItem: ProcessedMegaMenuItem): boolean {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
    }

    isItemDisabled(item: MegaMenuItem): boolean {
        return this.getItemProp(item, 'disabled');
    }

    isItemSeparator(item: MegaMenuItem): boolean {
        return this.getItemProp(item, 'separator');
    }

    isItemMatched(processedItem: ProcessedMegaMenuItem): boolean {
        return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isProccessedItemGroup(processedItem: ProcessedMegaMenuItem | null): boolean {
        return !!processedItem && isNotEmpty(processedItem.items);
    }

    searchItems(event: KeyboardEvent, char: string) {
        this.searchValue = (this.searchValue || '') + char;
        const visibleItemsList = this.visibleItems();

        let itemIndex = -1;
        let matched = false;

        if (this.focusedItemInfo().index !== -1) {
            itemIndex = visibleItemsList.slice(this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem));
            itemIndex = itemIndex === -1 ? visibleItemsList.slice(0, this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo().index;
        } else {
            itemIndex = visibleItemsList.findIndex((processedItem) => this.isItemMatched(processedItem));
        }

        if (itemIndex !== -1) {
            matched = true;
        }

        if (itemIndex === -1 && this.focusedItemInfo().index === -1) {
            itemIndex = this.findFirstFocusedItemIndex();
        }

        if (itemIndex !== -1) {
            this.changeFocusedItemInfo(event, itemIndex);
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

    getProccessedItemLabel(processedItem: ProcessedMegaMenuItem) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }

    getItemLabel(item: MegaMenuItem) {
        return this.getItemProp(item, 'label');
    }

    changeFocusedItemInfo(_event: KeyboardEvent, index: number) {
        const processedItem = this.findVisibleItem(index);
        if (isNotEmpty(processedItem) && processedItem) {
            const { key, parentKey, item } = processedItem;
            this.focusedItemInfo.set({ index, level: 0, key: key ? key : '', parentKey, item });
        }

        this.scrollInView();
    }

    onArrowDownKey(event: KeyboardEvent) {
        const activeItemValue = this.activeItem();
        if (this.orientation() === 'horizontal') {
            if (isNotEmpty(activeItemValue) && activeItemValue!.key === this.focusedItemInfo().key) {
                const { key, item } = activeItemValue!;
                this.focusedItemInfo.set({ index: -1, level: 0, key: '', parentKey: key, item });
            } else {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);

                if (grouped && processedItem) {
                    const { parentKey, key, item } = processedItem;
                    this.onItemChange({ originalEvent: event, processedItem });
                    this.focusedItemInfo.set({ index: -1, level: 0, key: key, parentKey: parentKey, item: item });
                    this.searchValue = '';
                }
            }
        }

        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemInfo(event, itemIndex);
        event.preventDefault();
    }

    onArrowRightKey(event: KeyboardEvent) {
        const activeItemValue = this.activeItem();
        const visibleItemsList = this.visibleItems();
        let processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);

        if (grouped && processedItem) {
            if (this.orientation() === 'vertical') {
                if (isNotEmpty(activeItemValue) && activeItemValue!.key === processedItem.key) {
                    this.focusedItemInfo.set({ index: -1, level: 0, key: '', parentKey: activeItemValue!.key, item: processedItem.item });
                } else {
                    processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                    const innerGrouped = this.isProccessedItemGroup(processedItem);

                    if (innerGrouped && processedItem) {
                        this.onItemChange({ originalEvent: event, processedItem });
                        this.focusedItemInfo.set({
                            index: -1,
                            level: 0,
                            key: processedItem.key,
                            parentKey: processedItem.parentKey,
                            item: processedItem.item
                        });
                        this.searchValue = '';
                    }
                }
            }

            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();

            this.changeFocusedItemInfo(event, itemIndex);
        } else if (processedItem) {
            const columnIndex = (processedItem.columnIndex || 0) + 1;
            const itemIndex = visibleItemsList.findIndex((item) => item.columnIndex === columnIndex);

            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }

        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        const activeItemValue = this.activeItem();
        if (event.altKey && this.orientation() === 'horizontal') {
            if (this.focusedItemInfo().index !== -1) {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);

                if (!grouped && isNotEmpty(activeItemValue) && processedItem) {
                    if (this.focusedItemInfo().index === 0) {
                        this.focusedItemInfo.set({
                            index: activeItemValue!.index,
                            level: 0,
                            key: activeItemValue!.key,
                            parentKey: activeItemValue!.parentKey,
                            item: processedItem.item
                        });
                        this.activeItem.set(null);
                    } else {
                        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
                    }
                }
            }

            event.preventDefault();
        } else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();

            this.changeFocusedItemInfo(event, itemIndex);
            event.preventDefault();
        }
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const activeItemValue = this.activeItem();
        const visibleItemsList = this.visibleItems();
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);

        if (grouped) {
            if (this.orientation() === 'horizontal') {
                const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();

                this.changeFocusedItemInfo(event, itemIndex);
            }
        } else if (processedItem) {
            if (this.orientation() === 'vertical' && isNotEmpty(activeItemValue)) {
                if (processedItem.columnIndex === 0) {
                    this.focusedItemInfo.set({
                        index: activeItemValue!.index,
                        level: 0,
                        key: activeItemValue!.key,
                        parentKey: activeItemValue!.parentKey,
                        item: processedItem.item
                    });
                    this.activeItem.set(null);
                }
            }

            const columnIndex = (processedItem.columnIndex || 0) - 1;
            const itemIndex = visibleItemsList.findIndex((item) => item.columnIndex === columnIndex);

            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }

        event.preventDefault();
    }

    onHomeKey(event: KeyboardEvent) {
        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        this.changeFocusedItemInfo(event, this.findLastItemIndex());
        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent) {
        this.onEnterKey(event);
    }

    onEscapeKey(event: KeyboardEvent) {
        const activeItemValue = this.activeItem();
        if (isNotEmpty(activeItemValue) && activeItemValue) {
            this.focusedItemInfo.set({ index: activeItemValue.index, level: 0, key: activeItemValue.key, parentKey: '', item: activeItemValue.item });
            this.activeItem.set(null);
        }

        event.preventDefault();
    }

    onTabKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
            const grouped = this.isProccessedItemGroup(processedItem);

            if (!grouped && processedItem) {
                this.onItemChange({ originalEvent: event, processedItem });
            }
        }

        this.hide();
    }

    onEnterKey(event: KeyboardEvent) {
        if (this.focusedItemInfo().index !== -1) {
            const element = findSingle(this.rootmenu()?.el?.nativeElement, `li[id="${`${this.focusedItemId()}`}"]`) as HTMLElement | null;
            const anchorElement = element && ((findSingle(element, '[data-pc-section="itemlink"]') || findSingle(element, 'a,button')) as HTMLElement | null);

            anchorElement ? anchorElement.click() : element && element.click();

            const processedItem = this.visibleItems()[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);

            !grouped && this.changeFocusedItemInfo(event, this.findFirstFocusedItemIndex());
        }

        event.preventDefault();
    }

    findVisibleItem(index: number) {
        const visibleItemsList = this.visibleItems();
        return isNotEmpty(visibleItemsList) ? visibleItemsList[index] : null;
    }

    findLastFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
    }

    findLastItemIndex() {
        return findLastIndex(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }

    findPrevItemIndex(index: number) {
        const visibleItemsList = this.visibleItems();
        const matchedItemIndex = index > 0 ? findLastIndex(visibleItemsList.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;

        return matchedItemIndex > -1 ? matchedItemIndex : index;
    }

    findNextItemIndex(index: number) {
        const visibleItemsList = this.visibleItems();
        const matchedItemIndex = index < visibleItemsList.length - 1 ? visibleItemsList.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;

        return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    }

    bindResizeListener() {
        if (isPlatformBrowser(this.platformId) && !this.resizeListener) {
            this.resizeListener = (event: Event) => {
                if (!isTouchDevice()) {
                    this.hide(event, true);
                }

                this.mobileActive.set(false);
            };

            window.addEventListener('resize', this.resizeListener);
        }
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                const isOutsideContainer = this.el?.nativeElement !== event.target && !this.el?.nativeElement.contains(event.target);

                if (isOutsideContainer) {
                    this.hide();
                }
            });
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
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null!;
        }
    }

    onDestroy() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
        this.unbindMatchMediaListener();
    }
}

@NgModule({
    imports: [MegaMenu, SharedModule],
    exports: [MegaMenu, SharedModule]
})
export class MegaMenuModule {}
