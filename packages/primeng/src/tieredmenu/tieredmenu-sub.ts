import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, effect, ElementRef, inject, input, numberAttribute, output, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { isNotEmpty, nestedPosition, resolve } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { AngleRight as AngleRightIcon } from '@primeicons/angular/angle-right';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import type { CSSProperties } from 'primeng/types/shared';
import { TieredMenuItemClickEvent, TieredMenuItemMouseEnterEvent, TieredMenuItemTemplateContext, TieredMenuPassThrough, TieredMenuProcessedItem } from 'primeng/types/tieredmenu';
import { TieredMenuStyle } from './style/tieredmenustyle';
import type { TieredMenu } from './tieredmenu';
import { TIEREDMENU_INSTANCE, TIEREDMENUSUB_INSTANCE } from './tieredmenu-token';

@Component({
    selector: 'p-tieredmenusub',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, Ripple, TooltipModule, AngleRightIcon, SharedModule, BindModule, MotionModule],
    template: `
        @if (render()) {
            <ul
                #sublist
                role="menu"
                [class]="getListClass()"
                [id]="menuId() + '_list'"
                [tabindex]="tabindex()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledBy]="ariaLabelledBy()"
                [attr.aria-activedescendant]="focusedItemId()"
                [attr.aria-orientation]="'vertical'"
                [pBind]="_ptm(getListSection())"
                (keydown)="menuKeydown.emit($event)"
                (focus)="menuFocus.emit($event)"
                (blur)="menuBlur.emit($event)"
                [style]="inlineStyles()"
                [pMotion]="getMotionState()"
                [pMotionDisabled]="root()"
                [pMotionAppear]="true"
                [pMotionName]="'p-anchored-overlay'"
                [pMotionOptions]="motionOptions()"
                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                (pMotionOnAfterLeave)="onAfterLeave()"
            >
                @for (processedItem of items(); track processedItem; let index = $index) {
                    @if (isSeparator(processedItem)) {
                        <li
                            [attr.id]="getItemId(processedItem)"
                            [style]="getItemProp(processedItem, 'style')"
                            [class]="cn(cx('separator'), getItemProp(processedItem, 'class'), getItemProp(processedItem, 'styleClass'))"
                            role="separator"
                            [pBind]="_ptm('separator')"
                        ></li>
                    } @else if (isMenuItem(processedItem)) {
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
                            [attr.aria-setsize]="getAriaSetSize()"
                            [attr.aria-posinset]="getAriaPosInset(index)"
                            [style]="getItemProp(processedItem, 'style')"
                            [class]="cn(cx('item', { processedItem }), getItemProp(processedItem, 'styleClass'))"
                            [pBind]="getPTOptions(processedItem, index, 'item')"
                            [pTooltip]="getItemProp(processedItem, 'tooltip')"
                            [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
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
                                                    [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                                                    [attr.tabindex]="-1"
                                                ></span>
                                            }
                                            @if (shouldEscapeLabel(processedItem)) {
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
                                                <span [class]="cn(cx('itemBadge'), getItemProp(processedItem, 'badgeStyleClass'))">{{ getItemProp(processedItem, 'badge') }}</span>
                                            }
                                            @if (isItemGroup(processedItem)) {
                                                @if (!tieredMenu.submenuIconTemplate()) {
                                                    <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" [attr.aria-hidden]="true" />
                                                }
                                                <ng-container *ngTemplateOutlet="tieredMenu.submenuIconTemplate()"></ng-container>
                                            }
                                        </a>
                                    } @else {
                                        <a
                                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                            [attr.title]="getItemProp(processedItem, 'title')"
                                            [attr.tabindex]="-1"
                                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                                            [routerLinkActive]="'p-tieredmenu-item-link-active'"
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
                                                    [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                                                    [attr.aria-hidden]="true"
                                                    [attr.tabindex]="-1"
                                                ></span>
                                            }
                                            @if (shouldEscapeLabel(processedItem)) {
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
                                                <span [class]="cn(cx('itemBadge'), getItemProp(processedItem, 'badgeStyleClass'))">{{ getItemProp(processedItem, 'badge') }}</span>
                                            }
                                            @if (isItemGroup(processedItem)) {
                                                @if (!tieredMenu.submenuIconTemplate()) {
                                                    <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, index, 'submenuIcon')" [attr.aria-hidden]="true" />
                                                }
                                                <ng-container *ngTemplateOutlet="tieredMenu.submenuIconTemplate()"></ng-container>
                                            }
                                        </a>
                                    }
                                } @else {
                                    <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(processedItem)"></ng-container>
                                }
                            </div>

                            @if (shouldShowSubmenu(processedItem)) {
                                <p-tieredmenusub
                                    [items]="processedItem.items"
                                    [itemTemplate]="itemTemplate()"
                                    [autoDisplay]="autoDisplay()"
                                    [menuId]="menuId()"
                                    [visible]="isSubmenuVisible(processedItem)"
                                    [activeItemPath]="activeItemPath()"
                                    [focusedItemId]="focusedItemId()"
                                    [ariaLabelledBy]="getItemId(processedItem)"
                                    [level]="level() + 1"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                    [pt]="pt()"
                                    [motionOptions]="motionOptions()"
                                    [unstyled]="unstyled()"
                                ></p-tieredmenusub>
                            }
                        </li>
                    }
                }
            </ul>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: TIEREDMENUSUB_INSTANCE, useExisting: TieredMenuSub },
        { provide: PARENT_INSTANCE, useExisting: TieredMenuSub }
    ],
    hostDirectives: [Bind]
})
export class TieredMenuSub extends BaseComponent<TieredMenuPassThrough> {
    visible = input(false);

    items = input<TieredMenuProcessedItem[]>([]);

    itemTemplate = input<TemplateRef<TieredMenuItemTemplateContext>>();

    root = input(false, { transform: booleanAttribute });

    autoDisplay = input(false, { transform: booleanAttribute });

    autoZIndex = input(true, { transform: booleanAttribute });

    baseZIndex = input(0, { transform: numberAttribute });

    popup = input(false, { transform: booleanAttribute });

    menuId = input<string>();

    ariaLabel = input<string>();

    ariaLabelledBy = input<string>();

    level = input(0, { transform: numberAttribute });

    focusedItemId = input<string>();

    activeItemPath = input<TieredMenuProcessedItem[]>([]);

    motionOptions = input<MotionOptions[]>();

    tabindex = input(0, { transform: numberAttribute });

    inlineStyles = input<CSSProperties>();

    itemClick = output<TieredMenuItemClickEvent>();

    itemMouseEnter = output<TieredMenuItemMouseEnterEvent>();

    menuFocus = output<FocusEvent>();

    menuBlur = output<FocusEvent>();

    menuKeydown = output<KeyboardEvent>();

    sublistViewChild = viewChild<ElementRef>('sublist');

    render = signal<boolean>(false);

    _componentStyle = inject(TieredMenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcTieredMenu: TieredMenu | undefined = inject(TIEREDMENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    $pcTieredMenuSub: TieredMenuSub | undefined = inject(TIEREDMENUSUB_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    tieredMenu = inject<TieredMenu>(TIEREDMENU_INSTANCE);

    constructor() {
        super();
        effect(() => {
            const isVisible = this.visible();
            if (isVisible || this.root()) {
                this.render.set(true);
            }
        });
    }

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host']));
    }

    positionSubmenu(sublist: HTMLElement) {
        if (isPlatformBrowser(this.tieredMenu.platformId)) {
            if (sublist) {
                nestedPosition(sublist, this.level());
            }
        }
    }

    getItemProp(processedItem: TieredMenuProcessedItem, name: string, params: Record<string, unknown> | null = null) {
        return processedItem && processedItem.item ? resolve(processedItem.item[name as keyof MenuItem], params) : undefined;
    }

    getItemId(processedItem: TieredMenuProcessedItem): string {
        return processedItem.item?.id ?? `${this.menuId()}_${processedItem.key}`;
    }

    getItemKey(processedItem: TieredMenuProcessedItem): string {
        return this.getItemId(processedItem);
    }

    getItemLabel(processedItem: TieredMenuProcessedItem): string {
        return this.getItemProp(processedItem, 'label') as string;
    }

    getAriaSetSize() {
        return this.items().filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index: number) {
        return (
            index -
            this.items()
                .slice(0, index)
                .filter((processedItem) => {
                    const isItemVisible = this.isItemVisible(processedItem);
                    const isVisibleSeparator = isItemVisible && this.getItemProp(processedItem, 'separator');
                    return !isItemVisible || isVisibleSeparator;
                }).length +
            1
        );
    }

    isItemVisible(processedItem: TieredMenuProcessedItem): boolean {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem: TieredMenuProcessedItem): boolean {
        if (this.activeItemPath()) {
            return this.activeItemPath().some((path) => path.key === processedItem.key);
        }
        return false;
    }

    isItemDisabled(processedItem: TieredMenuProcessedItem): boolean {
        return !!this.getItemProp(processedItem, 'disabled');
    }

    isItemFocused(processedItem: TieredMenuProcessedItem): boolean {
        return this.focusedItemId() === this.getItemId(processedItem);
    }

    isItemGroup(processedItem: TieredMenuProcessedItem): boolean {
        return isNotEmpty(processedItem.items);
    }

    hasIcon(processedItem: TieredMenuProcessedItem): boolean {
        return !!this.getItemProp(processedItem, 'icon');
    }

    hasBadge(processedItem: TieredMenuProcessedItem): boolean {
        return !!this.getItemProp(processedItem, 'badge');
    }

    shouldEscapeLabel(processedItem: TieredMenuProcessedItem): boolean {
        return this.getItemProp(processedItem, 'escape') !== false;
    }

    getRouterLinkActiveOptions(processedItem: TieredMenuProcessedItem) {
        return this.getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false };
    }

    getItemTemplateContext(processedItem: TieredMenuProcessedItem): TieredMenuItemTemplateContext {
        return { $implicit: processedItem.item, hasSubmenu: !!this.getItemProp(processedItem, 'items') };
    }

    getAriaHaspopup(processedItem: TieredMenuProcessedItem) {
        return this.isItemGroup(processedItem) && !this.getItemProp(processedItem, 'to') ? 'menu' : undefined;
    }

    getAriaExpanded(processedItem: TieredMenuProcessedItem) {
        return this.isItemGroup(processedItem) ? this.isItemActive(processedItem) : undefined;
    }

    shouldShowSubmenu(processedItem: TieredMenuProcessedItem): boolean {
        return this.isItemVisible(processedItem) && this.isItemGroup(processedItem);
    }

    isSubmenuVisible(processedItem: TieredMenuProcessedItem): boolean {
        return this.isItemActive(processedItem) && this.isItemGroup(processedItem);
    }

    hasRouterLink(processedItem: TieredMenuProcessedItem): boolean {
        return !!this.getItemProp(processedItem, 'routerLink');
    }

    isSeparator(processedItem: TieredMenuProcessedItem): boolean {
        return this.isItemVisible(processedItem) && !!this.getItemProp(processedItem, 'separator');
    }

    isMenuItem(processedItem: TieredMenuProcessedItem): boolean {
        return this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator');
    }

    getListClass() {
        return this.root() ? this.cx('rootList') : this.cx('submenu');
    }

    getListSection() {
        return this.root() ? 'rootList' : 'submenu';
    }

    getMotionState() {
        return this.root() ? true : this.visible();
    }

    getAriaDisabled(processedItem: TieredMenuProcessedItem) {
        return this.isItemDisabled(processedItem) || undefined;
    }

    // TODO: will be removed later. Helper method to get PT from parent ContextMenu if available, otherwise use own PT
    _ptm(section: string, options?: Record<string, unknown>) {
        return this.$pcTieredMenu ? this.$pcTieredMenu.ptm(section, options) : this.ptm(section, options);
    }

    getPTOptions(processedItem: TieredMenuProcessedItem, index: number, key: string) {
        return this._ptm(key, {
            context: {
                item: processedItem.item,
                index,
                active: this.isItemActive(processedItem),
                focused: this.isItemFocused(processedItem),
                disabled: this.isItemDisabled(processedItem)
            }
        });
    }

    onItemMouseEnter(param: { $event: Event; processedItem: TieredMenuProcessedItem }) {
        if (this.autoDisplay()) {
            const { $event, processedItem } = param;
            this.itemMouseEnter.emit({ originalEvent: $event, processedItem });
        }
    }

    onItemClick(event: Event, processedItem: TieredMenuProcessedItem) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }

    onBeforeEnter(event: MotionEvent) {
        this.positionSubmenu(event.element as HTMLElement);
    }

    onAfterLeave() {
        this.render.set(false);
    }
}
