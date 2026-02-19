import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, ElementRef, inject, InjectionToken, input, numberAttribute, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MotionOptions } from '@primeuix/motion';
import { isNotEmpty, resolve } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronRightIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuItemTemplateContext, ProcessedMenuItem } from 'primeng/types/panelmenu';
import { PanelMenuStyle } from './style/panelmenustyle';
import type { PanelMenu } from './panelmenu';

export const PANELMENU_INSTANCE = new InjectionToken<PanelMenu>('PANELMENU_INSTANCE');
export const PANELMENUSUB_INSTANCE = new InjectionToken<PanelMenuSub>('PANELMENUSUB_INSTANCE');

@Component({
    selector: 'ul[pPanelMenuSub]',
    imports: [NgTemplateOutlet, RouterModule, TooltipModule, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule, MotionModule],
    standalone: true,
    template: `
        @for (processedItem of items(); track processedItem; let index = $index) {
            @if (isSeparator(processedItem)) {
                <li [class]="cn(cx('separator'), getItemProp(processedItem, 'styleClass'))" role="separator" [pBind]="ptm('separator')"></li>
            } @else if (isItemVisible(processedItem)) {
                <li
                    role="treeitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="getAriaExpanded(processedItem)"
                    [attr.aria-level]="level() + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [class]="cn(cx('item', { processedItem }), getItemProp(processedItem, 'styleClass'))"
                    [style]="getItemProp(processedItem, 'style')"
                    [pTooltip]="getItemProp(processedItem, 'tooltip')"
                    [pTooltipUnstyled]="unstyled()"
                    [pBind]="getPTOptions(processedItem, index, 'item')"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div [class]="cx('itemContent')" [pBind]="getPTOptions(processedItem, index, 'itemContent')" (click)="onItemClick($event, processedItem)">
                        @if (!itemTemplate()) {
                            @if (!getItemProp(processedItem, 'routerLink')) {
                                <a
                                    [attr.href]="getItemProp(processedItem, 'url')"
                                    [attr.title]="getItemProp(processedItem, 'title')"
                                    [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                    [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                                    [style]="getItemProp(processedItem, 'linkStyle')"
                                    [target]="getItemProp(processedItem, 'target')"
                                    [attr.tabindex]="getItemTabindex()"
                                    [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                                >
                                    @if (isItemGroup(processedItem)) {
                                        @if (!panelMenu.submenuIconTemplate()) {
                                            @if (isItemActive(processedItem)) {
                                                <svg
                                                    data-p-icon="chevron-down"
                                                    [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                                    [style]="getItemProp(processedItem, 'iconStyle')"
                                                    [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                                />
                                            } @else {
                                                <svg
                                                    data-p-icon="chevron-right"
                                                    [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                                    [style]="getItemProp(processedItem, 'iconStyle')"
                                                    [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                                />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="panelMenu.submenuIconTemplate()"></ng-container>
                                    }
                                    @if (hasIcon(processedItem)) {
                                        <span
                                            [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                            [style]="getItemProp(processedItem, 'iconStyle')"
                                            [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                                        ></span>
                                    }
                                    @if (shouldEscapeLabel(processedItem)) {
                                        <span [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))" [style]="getItemProp(processedItem, 'labelStyle')" [pBind]="getPTOptions(processedItem, index, 'itemLabel')">{{
                                            getItemProp(processedItem, 'label')
                                        }}</span>
                                    } @else {
                                        <span
                                            [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                            [style]="getItemProp(processedItem, 'labelStyle')"
                                            [innerHTML]="getItemProp(processedItem, 'label')"
                                            [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                        ></span>
                                    }
                                </a>
                            } @else {
                                <a
                                    [routerLink]="getItemProp(processedItem, 'routerLink')"
                                    [queryParams]="getItemProp(processedItem, 'queryParams')"
                                    [routerLinkActive]="'p-panelmenu-item-link-active'"
                                    [routerLinkActiveOptions]="getRouterLinkActiveOptions(processedItem)"
                                    [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                                    [style]="getItemProp(processedItem, 'linkStyle')"
                                    [target]="getItemProp(processedItem, 'target')"
                                    [attr.title]="getItemProp(processedItem, 'title')"
                                    [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                    [fragment]="getItemProp(processedItem, 'fragment')"
                                    [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                    [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                    [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                    [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                    [state]="getItemProp(processedItem, 'state')"
                                    [attr.tabindex]="getItemTabindex()"
                                    [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                                >
                                    @if (isItemGroup(processedItem)) {
                                        @if (!panelMenu.submenuIconTemplate()) {
                                            @if (isItemActive(processedItem)) {
                                                <svg
                                                    data-p-icon="chevron-down"
                                                    [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                                    [style]="getItemProp(processedItem, 'iconStyle')"
                                                    [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                                />
                                            } @else {
                                                <svg
                                                    data-p-icon="chevron-right"
                                                    [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                                    [style]="getItemProp(processedItem, 'iconStyle')"
                                                    [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                                />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="panelMenu.submenuIconTemplate()"></ng-container>
                                    }
                                    @if (hasIcon(processedItem)) {
                                        <span
                                            [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                            [style]="getItemProp(processedItem, 'iconStyle')"
                                            [pBind]="getPTOptions(processedItem, index, 'itemIcon')"
                                        ></span>
                                    }
                                    @if (getItemProp(processedItem, 'label')) {
                                        <span
                                            [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                            [style]="getItemProp(processedItem, 'labelStyle')"
                                            [innerHTML]="getItemProp(processedItem, 'label')"
                                            [pBind]="getPTOptions(processedItem, index, 'itemLabel')"
                                        ></span>
                                    }
                                    @if (hasBadge(processedItem)) {
                                        <span [class]="cn(cx('badge'), getItemProp(processedItem, 'badgeStyleClass'))">{{ processedItem.badge }}</span>
                                    }
                                </a>
                            }
                        } @else {
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(processedItem)"></ng-container>
                        }
                    </div>

                    <div
                        [class]="cx('contentContainer', { processedItem: processedItem })"
                        pMotionName="p-collapsible"
                        [pMotion]="isItemVisible(processedItem) && isItemGroup(processedItem) && isItemExpanded(processedItem)"
                        [pMotionOptions]="motionOptions()"
                    >
                        <div [class]="cx('contentWrapper')" [pBind]="ptm('contentWrapper')">
                            <ul
                                pPanelMenuSub
                                [id]="getItemId(processedItem) + '_list'"
                                [panelId]="panelId()"
                                [items]="processedItem?.items"
                                [itemTemplate]="itemTemplate()"
                                [focusedItemId]="focusedItemId()"
                                [activeItemPath]="activeItemPath()"
                                [level]="level() + 1"
                                [pt]="pt()"
                                [unstyled]="unstyled()"
                                [parentExpanded]="parentExpanded() && isItemExpanded(processedItem)"
                                (itemToggle)="onItemToggle($event)"
                                [motionOptions]="motionOptions()"
                            ></ul>
                        </div>
                    </div>
                </li>
            }
        }
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [PanelMenuStyle, { provide: PANELMENUSUB_INSTANCE, useExisting: PanelMenuSub }, { provide: PARENT_INSTANCE, useExisting: PanelMenuSub }],
    host: {
        '[class]': 'hostClass()',
        role: 'tree',
        '[tabindex]': '-1',
        '[attr.aria-activedescendant]': 'focusedItemId',
        '[attr.aria-hidden]': '!parentExpanded',
        '(focusin)': 'menuFocus.emit($event)',
        '(focusout)': 'menuBlur.emit($event)',
        '(keydown)': 'menuKeyDown.emit($event)'
    },
    hostDirectives: [Bind]
})
export class PanelMenuSub extends BaseComponent {
    panelId = input<string>();

    focusedItemId = input<string>();

    items = input<ProcessedMenuItem[]>([]);

    itemTemplate = input<TemplateRef<PanelMenuItemTemplateContext>>();

    level = input(0, { transform: numberAttribute });

    activeItemPath = input<ProcessedMenuItem[]>([]);

    root = input(false, { transform: booleanAttribute });

    tabindex = input<number | undefined>();

    parentExpanded = input(false, { transform: booleanAttribute });

    motionOptions = input<MotionOptions>();

    itemToggle = output<{ processedItem: ProcessedMenuItem; expanded: boolean }>();

    menuFocus = output<FocusEvent>();

    menuBlur = output<FocusEvent>();

    menuKeyDown = output<KeyboardEvent>();

    hostClass = computed(() => (this.root() ? this.cn(this.cx('rootList'), this.cx('submenu')) : this.cx('submenu')));

    listViewChild: ElementRef = inject(ElementRef);

    panelMenu = inject<PanelMenu>(PANELMENU_INSTANCE);

    _componentStyle = inject(PanelMenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcPanelMenu: PanelMenu | undefined = inject(PANELMENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm(this.root() ? 'rootList' : 'submenu'));
    }

    getPTOptions(processedItem: ProcessedMenuItem, index: number, key: string) {
        return this.ptm(key, {
            context: {
                item: processedItem.item,
                index,
                active: this.isItemActive(processedItem),
                focused: this.isItemFocused(processedItem),
                disabled: this.isItemDisabled(processedItem)
            }
        });
    }

    getItemId(processedItem: ProcessedMenuItem) {
        return processedItem.item?.id ?? `${this.panelId()}_${processedItem.key}`;
    }

    getItemKey(processedItem: ProcessedMenuItem) {
        return this.getItemId(processedItem);
    }

    getItemClass(processedItem: ProcessedMenuItem) {
        return {
            'p-panelmenu-item': true,
            'p-disabled': this.isItemDisabled(processedItem),
            'p-focus': this.isItemFocused(processedItem)
        };
    }

    getItemProp(processedItem: ProcessedMenuItem, name: string, params?: any): any {
        return processedItem && processedItem.item ? resolve((processedItem.item as any)[name], params) : undefined;
    }

    getItemLabel(processedItem: ProcessedMenuItem) {
        return this.getItemProp(processedItem, 'label');
    }

    isItemExpanded(processedItem: ProcessedMenuItem) {
        return processedItem.expanded;
    }

    isItemActive(processedItem: ProcessedMenuItem) {
        return this.isItemExpanded(processedItem) || this.activeItemPath().some((path) => path && path.key === processedItem.key);
    }

    isItemVisible(processedItem: ProcessedMenuItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemDisabled(processedItem: ProcessedMenuItem) {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemFocused(processedItem: ProcessedMenuItem) {
        return this.focusedItemId() === this.getItemId(processedItem);
    }

    isItemGroup(processedItem: ProcessedMenuItem) {
        return isNotEmpty(processedItem.items);
    }

    getAriaExpanded(processedItem: ProcessedMenuItem) {
        return this.isItemGroup(processedItem) ? this.isItemActive(processedItem) : undefined;
    }

    getItemTabindex() {
        return this.parentExpanded() ? '0' : '-1';
    }

    getRouterLinkActiveOptions(processedItem: ProcessedMenuItem) {
        return this.getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false };
    }

    isSeparator(processedItem: ProcessedMenuItem) {
        return processedItem.separator;
    }

    hasIcon(processedItem: ProcessedMenuItem) {
        return !!processedItem.icon;
    }

    hasBadge(processedItem: ProcessedMenuItem) {
        return !!processedItem.badge;
    }

    shouldEscapeLabel(processedItem: ProcessedMenuItem) {
        return processedItem.item?.escape !== false;
    }

    getItemTemplateContext(processedItem: ProcessedMenuItem) {
        return { $implicit: processedItem.item };
    }

    getAriaSetSize() {
        return this.items().filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index: number) {
        return (
            index -
            this.items()
                .slice(0, index)
                .filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length +
            1
        );
    }

    onItemClick(event: MouseEvent, processedItem: ProcessedMenuItem) {
        if (!this.isItemDisabled(processedItem)) {
            this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
            this.itemToggle.emit({ processedItem, expanded: !this.isItemActive(processedItem) });
        }
    }

    onItemToggle(event: { processedItem: ProcessedMenuItem; expanded: boolean }) {
        this.itemToggle.emit(event);
    }
}
