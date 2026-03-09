import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, numberAttribute, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isNotEmpty, resolve } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent } from 'primeng/basecomponent';
import { BindModule } from 'primeng/bind';
import { AngleDown as AngleDownIcon } from '@primeicons/angular/angle-down';
import { AngleRight as AngleRightIcon } from '@primeicons/angular/angle-right';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarItemClickEvent, MenubarItemMouseEnterEvent, MenubarItemTemplateContext, MenubarPassThrough, ProcessedMenuItem } from 'primeng/types/menubar';
import type { CSSProperties } from 'primeng/types/shared';
import { Subscription } from 'rxjs';
import { MenubarService } from './menubar.service';
import { MenuBarStyle } from './style/menubarstyle';

@Component({
    selector: 'p-menubarsub, [pMenubarSub]',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, Ripple, TooltipModule, AngleDownIcon, AngleRightIcon, BadgeModule, SharedModule, BindModule],
    template: `
        @for (processedItem of items(); track processedItem) {
            @if (isItemVisible(processedItem) && getItemProp(processedItem, 'separator')) {
                <li [attr.id]="getItemId(processedItem)" [style]="getItemProp(processedItem, 'style')" [class]="cn(cx('separator'), processedItem?.styleClass)" role="separator" [pBind]="ptm('separator')"></li>
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
                        @if (!itemTemplate()) {
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
                                        @if (!submenuiconTemplate()) {
                                            @if (root()) {
                                                <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            } @else {
                                                <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="submenuiconTemplate()"></ng-container>
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
                                        @if (!submenuiconTemplate()) {
                                            @if (root()) {
                                                <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            } @else {
                                                <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="submenuiconTemplate()"></ng-container>
                                    }
                                </a>
                            }
                        } @else {
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(processedItem.item, root())"></ng-container>
                        }
                    </div>
                    @if (isItemVisible(processedItem) && isItemGroup(processedItem)) {
                        <ul
                            pMenubarSub
                            [itemTemplate]="itemTemplate()"
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
                            [submenuiconTemplate]="submenuiconTemplate()"
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
