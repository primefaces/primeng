import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, inject, InjectionToken, input, numberAttribute, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isNotEmpty, resolve } from '@primeuix/utils';
import { MegaMenuItem, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { AngleDownIcon, AngleRightIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MegaMenuItemClickEvent, MegaMenuItemMouseEnterEvent, MegaMenuItemTemplateContext, MegaMenuOrientation, MegaMenuPassThrough, ProcessedMegaMenuItem } from 'primeng/types/megamenu';
import { MegaMenuStyle } from './style/megamenustyle';
import type { MegaMenu } from './megamenu';

export const MEGAMENU_INSTANCE = new InjectionToken<MegaMenu>('MEGAMENU_INSTANCE');
export const MEGAMENU_SUB_INSTANCE = new InjectionToken<MegaMenuSub>('MEGAMENU_SUB_INSTANCE');

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
        '[attr.role]': 'hostRole()',
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

    megaMenu = inject<MegaMenu>(MEGAMENU_INSTANCE);

    _componentStyle = inject(MegaMenuStyle);

    hostClass = computed(() => (this.root() ? this.cx('rootList') : this.cx('submenu')));

    hostDisplay = computed(() => (this.isSubmenuVisible(this.submenu()) ? null : 'none'));

    hostRole = computed(() => (this.root() ? 'menubar' : 'menu'));

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
