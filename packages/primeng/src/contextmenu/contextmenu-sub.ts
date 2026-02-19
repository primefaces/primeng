import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, effect, ElementRef, inject, input, numberAttribute, output, Renderer2, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { calculateScrollbarWidth, getHiddenElementOuterWidth, getOffset, getOuterWidth, getViewport, isNotEmpty, resolve } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { BindModule } from 'primeng/bind';
import { AngleRightIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ContextMenuItemTemplateContext, ContextMenuPassThrough, ContextMenuProcessedItem } from 'primeng/types/contextmenu';
import { InjectionToken } from '@angular/core';
import type { ContextMenu } from './contextmenu';
import { ContextMenuStyle } from './style/contextmenustyle';

export const CONTEXTMENU_INSTANCE = new InjectionToken<ContextMenu>('CONTEXTMENU_INSTANCE');
export const CONTEXTMENUSUB_INSTANCE = new InjectionToken<ContextMenuSub>('CONTEXTMENUSUB_INSTANCE');

@Component({
    selector: 'p-contextmenu-sub',
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
                            [attr.aria-disabled]="getAriaDisabled(processedItem)"
                            [attr.aria-haspopup]="getAriaHaspopup(processedItem)"
                            [attr.aria-expanded]="getAriaExpanded(processedItem)"
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

    public contextMenu = inject<ContextMenu>(CONTEXTMENU_INSTANCE);

    queryMatches() {
        return this.contextMenu.queryMatches();
    }

    constructor() {
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

    getAriaDisabled(processedItem: ContextMenuProcessedItem) {
        return this.isItemDisabled(processedItem) || undefined;
    }

    getAriaHaspopup(processedItem: ContextMenuProcessedItem) {
        return this.isItemGroup(processedItem) && !this.getItemProp(processedItem, 'to') ? 'menu' : undefined;
    }

    getAriaExpanded(processedItem: ContextMenuProcessedItem) {
        return this.isItemGroup(processedItem) ? this.isItemActive(processedItem) : undefined;
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
