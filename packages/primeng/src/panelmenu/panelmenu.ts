import { NgTemplateOutlet } from '@angular/common';
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
import { MotionOptions } from '@primeuix/motion';
import { equals, findLast, findSingle, focus, getAttribute, isEmpty, isNotEmpty, isPrintableCharacter, resolve, uuid } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronRightIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuItemTemplateContext, PanelMenuPassThrough, ProcessedMenuItem } from 'primeng/types/panelmenu';
import { PanelMenuStyle } from './style/panelmenustyle';

const PANELMENU_INSTANCE = new InjectionToken<PanelMenu>('PANELMENU_INSTANCE');
const PANELMENUSUB_INSTANCE = new InjectionToken<PanelMenuSub>('PANELMENUSUB_INSTANCE');

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

    panelMenu = inject<PanelMenu>(forwardRef(() => PanelMenu));

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

@Component({
    selector: 'ul[pPanelMenuList]',
    imports: [PanelMenuSub, RouterModule, TooltipModule, SharedModule],
    standalone: true,
    template: `
        <ul
            pPanelMenuSub
            #submenu
            [root]="root()"
            [id]="panelId() + '_list'"
            [panelId]="panelId()"
            [tabindex]="tabindex()"
            [itemTemplate]="itemTemplate()"
            [focusedItemId]="activeFocusedItemId()"
            [activeItemPath]="activeItemPath()"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded()"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
            [pt]="pt()"
            [unstyled]="unstyled()"
            [motionOptions]="motionOptions()"
        ></ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PanelMenuList extends BaseComponent {
    panelId = input<string>();

    id = input<string>();

    items = input<MenuItem[]>([]);

    itemTemplate = input<TemplateRef<PanelMenuItemTemplateContext>>();

    parentExpanded = input(false, { transform: booleanAttribute });

    expanded = input(false, { transform: booleanAttribute });

    root = input(false, { transform: booleanAttribute });

    tabindex = input<number | undefined>();

    activeItem = input<MenuItem>();

    motionOptions = input<MotionOptions>();

    itemToggle = output<{ processedItem: ProcessedMenuItem; expanded: boolean }>();

    headerFocus = output<{ originalEvent: Event; focusOnNext?: boolean; selfCheck?: boolean }>();

    subMenuViewChild = viewChild<PanelMenuSub>('submenu');

    searchTimeout: ReturnType<typeof setTimeout> | null = null;

    searchValue = '';

    focused = signal(false);

    focusedItem = signal<ProcessedMenuItem | null>(null);

    activeItemPath = signal<ProcessedMenuItem[]>([]);

    processedItems = signal<ProcessedMenuItem[]>([]);

    visibleItems = computed(() => {
        const processedItems = this.processedItems();
        return this.flatItems(processedItems);
    });

    focusedItemId = computed(() => {
        const focusedItem = this.focusedItem();
        return focusedItem?.item?.id ? focusedItem.item.id : isNotEmpty(focusedItem) ? `${this.panelId()}_${focusedItem!.key}` : undefined;
    });

    activeFocusedItemId = computed(() => (this.focused() ? this.focusedItemId() : undefined));

    constructor() {
        super();
        effect(() => {
            const items = this.items();
            if (items) {
                this.processedItems.set(this.createProcessedItems(items));
            }
        });
    }

    getItemProp(processedItem: ProcessedMenuItem, name: string) {
        return processedItem && processedItem.item ? resolve((processedItem.item as any)[name]) : undefined;
    }

    getItemLabel(processedItem: ProcessedMenuItem) {
        return this.getItemProp(processedItem, 'label');
    }

    isItemVisible(processedItem: ProcessedMenuItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemDisabled(processedItem: ProcessedMenuItem) {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemActive(processedItem: ProcessedMenuItem) {
        return this.activeItemPath().some((path) => path.key === processedItem.parentKey);
    }

    isItemGroup(processedItem: ProcessedMenuItem) {
        return isNotEmpty(processedItem.items);
    }

    isElementInPanel(event: FocusEvent, element: EventTarget | null) {
        const panel = (event.currentTarget as HTMLElement)?.closest('[data-pc-name="panelmenu"]');

        return panel && element && panel.contains(element as Node);
    }

    isItemMatched(processedItem: ProcessedMenuItem) {
        return this.isValidItem(processedItem) && this.getItemLabel(processedItem)?.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isVisibleItem(processedItem: ProcessedMenuItem) {
        return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    }

    isValidItem(processedItem: ProcessedMenuItem) {
        return !!processedItem && !this.isItemDisabled(processedItem) && !processedItem.separator;
    }

    findFirstItem(): ProcessedMenuItem | undefined {
        return this.visibleItems().find((processedItem) => this.isValidItem(processedItem));
    }

    findLastItem(): ProcessedMenuItem | undefined {
        return findLast(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }

    findItemByEventTarget(target: EventTarget): ProcessedMenuItem | undefined {
        let parentNode = target as ParentNode & Element;

        while (parentNode && parentNode.tagName?.toLowerCase() !== 'li') {
            parentNode = parentNode?.parentNode as Element;
        }

        return parentNode?.id ? this.visibleItems().find((processedItem) => this.isValidItem(processedItem) && `${this.panelId()}_${processedItem.key}` === parentNode.id) : undefined;
    }

    createProcessedItems(items: MenuItem[], level = 0, parent: ProcessedMenuItem | {} = {}, parentKey = ''): ProcessedMenuItem[] {
        const processedItems: ProcessedMenuItem[] = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem: ProcessedMenuItem = {
                    icon: item.icon,
                    expanded: item.expanded,
                    separator: item.separator,
                    item,
                    index,
                    level,
                    key,
                    parent: parent as ProcessedMenuItem,
                    parentKey
                };

                newItem.items = this.createProcessedItems(item.items || [], level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }

    findProcessedItemByItemKey(key: string, processedItems?: ProcessedMenuItem[], level = 0): ProcessedMenuItem | undefined {
        processedItems = processedItems || this.processedItems();
        if (processedItems && processedItems.length) {
            for (let i = 0; i < processedItems.length; i++) {
                const processedItem = processedItems[i];

                if (this.getItemProp(processedItem, 'key') === key) return processedItem;
                const matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
                if (matchedItem) return matchedItem;
            }
        }
        return undefined;
    }

    flatItems(processedItems: ProcessedMenuItem[], processedFlattenItems: ProcessedMenuItem[] = []): ProcessedMenuItem[] {
        processedItems &&
            processedItems.forEach((processedItem) => {
                if (this.isVisibleItem(processedItem)) {
                    processedFlattenItems.push(processedItem);
                    this.flatItems(processedItem.items || [], processedFlattenItems);
                }
            });

        return processedFlattenItems;
    }

    changeFocusedItem(event: { originalEvent: Event; processedItem: ProcessedMenuItem; focusOnNext?: boolean; selfCheck?: boolean; allowHeaderFocus?: boolean }) {
        const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;
        const currentFocusedItem = this.focusedItem();

        if (isNotEmpty(currentFocusedItem) && currentFocusedItem!.key !== processedItem.key) {
            this.focusedItem.set(processedItem);
            this.scrollInView();
        } else if (allowHeaderFocus) {
            this.headerFocus.emit({ originalEvent, focusOnNext, selfCheck });
        }
    }

    scrollInView() {
        const element = findSingle(this.subMenuViewChild()?.listViewChild.nativeElement, `li[id="${this.focusedItemId()}"]`);

        if (element) {
            element.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
        }
    }

    onFocus(event: FocusEvent) {
        if (!this.focused()) {
            this.focused.set(true);
            const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findItemByEventTarget(event.target!) || this.findFirstItem() : this.findLastItem());
            if (event.relatedTarget !== null) this.focusedItem.set(focusedItem ?? null);
        }
    }

    onBlur(event: FocusEvent) {
        const target = event.relatedTarget;

        if (this.focused() && !this.el.nativeElement.contains(target)) {
            this.focused.set(false);
            this.focusedItem.set(null);
            this.searchValue = '';
        }
    }

    onItemToggle(event: { processedItem: ProcessedMenuItem; expanded: boolean }) {
        const { processedItem, expanded } = event;

        // Update the original item object's 'expanded' property
        if (processedItem.item) {
            processedItem.item.expanded = expanded;
        }

        // Update the expanded property in the existing processedItem
        processedItem.expanded = expanded;

        // Trigger signal update without recreating the entire tree
        this.processedItems.update((items) => [...items]);

        // Update activeItemPath
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
        if (expanded) {
            activeItemPath.push(processedItem);
        }
        this.activeItemPath.set(activeItemPath);

        // Update focusedItem
        this.focusedItem.set(processedItem);
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
            case 'Tab':
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
        const currentFocusedItem = this.focusedItem();
        const processedItem = isNotEmpty(currentFocusedItem) ? this.findNextItem(currentFocusedItem!) : this.findFirstItem();
        if (processedItem) {
            this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true });
        }
        event.preventDefault();
    }

    onArrowUpKey(event: KeyboardEvent) {
        const currentFocusedItem = this.focusedItem();
        const processedItem = isNotEmpty(currentFocusedItem) ? this.findPrevItem(currentFocusedItem!) : this.findLastItem();

        if (processedItem) {
            this.changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true });
        }
        event.preventDefault();
    }

    onArrowLeftKey(event: KeyboardEvent) {
        const currentFocusedItem = this.focusedItem();
        if (isNotEmpty(currentFocusedItem)) {
            const matched = this.activeItemPath().some((p) => p.key === currentFocusedItem!.key);

            if (matched) {
                const activeItemPath = this.activeItemPath().filter((p) => p.key !== currentFocusedItem!.key);
                this.activeItemPath.set(activeItemPath);
            } else {
                const focusedItem = isNotEmpty(currentFocusedItem!.parent) ? currentFocusedItem!.parent : currentFocusedItem;
                this.focusedItem.set(focusedItem ?? null);
            }

            event.preventDefault();
        }
    }

    onArrowRightKey(event: KeyboardEvent) {
        const currentFocusedItem = this.focusedItem();
        if (isNotEmpty(currentFocusedItem)) {
            const grouped = this.isItemGroup(currentFocusedItem!);

            if (grouped) {
                const matched = this.activeItemPath().some((p) => p.key === currentFocusedItem!.key);

                if (matched) {
                    this.onArrowDownKey(event);
                } else {
                    const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== currentFocusedItem!.parentKey);
                    activeItemPath.push(currentFocusedItem!);

                    this.activeItemPath.set(activeItemPath);
                }
            }

            event.preventDefault();
        }
    }

    onHomeKey(event: KeyboardEvent) {
        const processedItem = this.findFirstItem();
        if (processedItem) {
            this.changeFocusedItem({ originalEvent: event, processedItem, allowHeaderFocus: false });
        }
        event.preventDefault();
    }

    onEndKey(event: KeyboardEvent) {
        const processedItem = this.findLastItem();
        if (processedItem) {
            this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true, allowHeaderFocus: false });
        }
        event.preventDefault();
    }

    onEnterKey(event: KeyboardEvent) {
        if (isNotEmpty(this.focusedItem())) {
            const element = findSingle(this.subMenuViewChild()?.listViewChild.nativeElement, `li[id="${this.focusedItemId()}"]`) as HTMLElement | null;
            const anchorElement = element && ((findSingle(element, 'a') as HTMLElement) || (findSingle(element, 'button') as HTMLElement));

            anchorElement ? anchorElement.click() : element?.click();
        }

        event.preventDefault();
    }

    onSpaceKey(event: KeyboardEvent) {
        this.onEnterKey(event);
    }

    findNextItem(processedItem: ProcessedMenuItem): ProcessedMenuItem {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);

        const matchedItem =
            index < this.visibleItems().length - 1
                ? this.visibleItems()
                      .slice(index + 1)
                      .find((pItem) => this.isValidItem(pItem))
                : undefined;
        return matchedItem || processedItem;
    }

    findPrevItem(processedItem: ProcessedMenuItem): ProcessedMenuItem {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index > 0 ? findLast(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;

        return matchedItem || processedItem;
    }

    searchItems(event: KeyboardEvent, char: string) {
        this.searchValue = (this.searchValue || '') + char;

        let matchedItem: ProcessedMenuItem | undefined = undefined;
        let matched = false;

        const currentFocusedItem = this.focusedItem();
        if (isNotEmpty(currentFocusedItem)) {
            const focusedItemIndex = this.visibleItems().findIndex((processedItem) => processedItem.key === currentFocusedItem!.key);

            matchedItem =
                this.visibleItems()
                    .slice(focusedItemIndex)
                    .find((processedItem) => this.isItemMatched(processedItem)) || undefined;
            matchedItem = isEmpty(matchedItem)
                ? this.visibleItems()
                      .slice(0, focusedItemIndex)
                      .find((processedItem) => this.isItemMatched(processedItem)) || undefined
                : matchedItem;
        } else {
            matchedItem = this.visibleItems().find((processedItem) => this.isItemMatched(processedItem)) || undefined;
        }

        if (isNotEmpty(matchedItem)) {
            matched = true;
        }

        if (isEmpty(matchedItem) && isEmpty(this.focusedItem())) {
            matchedItem = this.findFirstItem() || undefined;
        }

        if (matchedItem) {
            this.changeFocusedItem({
                originalEvent: event,
                processedItem: matchedItem,
                allowHeaderFocus: false
            });
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
}

/**
 * PanelMenu is a hybrid of Accordion and Tree components.
 * @group Components
 */
@Component({
    selector: 'p-panelmenu, p-panel-menu',
    imports: [NgTemplateOutlet, PanelMenuList, RouterModule, TooltipModule, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule, MotionModule],
    standalone: true,
    template: `
        @for (item of model(); track item; let i = $index) {
            @if (isItemVisible(item)) {
                <div [class]="cn(cx('panel'), getItemProp(item, 'headerClass'))" [style]="getItemProp(item, 'style')" [pBind]="ptm('panel')">
                    <div
                        [class]="cn(cx('header', { item }), getItemProp(item, 'styleClass'))"
                        [style]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [pTooltipUnstyled]="unstyled()"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [pBind]="getPTOptions('header', item, i)"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div [class]="cx('headerContent')" [pBind]="getPTOptions('headerContent', item, i)">
                            @if (!itemTemplate()) {
                                @if (!getItemProp(item, 'routerLink')) {
                                    <a
                                        [attr.href]="getItemProp(item, 'url')"
                                        [attr.tabindex]="-1"
                                        [target]="getItemProp(item, 'target')"
                                        [attr.title]="getItemProp(item, 'title')"
                                        [attr.data-automationid]="getItemProp(item, 'automationId')"
                                        [class]="cn(cx('headerLink'), getItemProp(item, 'linkClass'))"
                                        [style]="getItemProp(item, 'linkStyle')"
                                        [pBind]="getPTOptions('headerLink', item, i)"
                                    >
                                        @if (isItemGroup(item)) {
                                            @if (!headerIconTemplate()) {
                                                @if (isItemActive(item)) {
                                                    <svg data-p-icon="chevron-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                                } @else {
                                                    <svg data-p-icon="chevron-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                                }
                                            }
                                            <ng-container *ngTemplateOutlet="headerIconTemplate()"></ng-container>
                                        }
                                        @if (hasIcon(item)) {
                                            <span [class]="cn(cx('headerIcon'), item.icon, getItemProp(item, 'iconClass'))" [style]="getItemProp(item, 'iconStyle')" [pBind]="getPTOptions('headerIcon', item, i)"></span>
                                        }
                                        @if (shouldEscapeLabel(item)) {
                                            <span [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))" [style]="getItemProp(item, 'labelStyle')" [pBind]="getPTOptions('headerLabel', item, i)">{{ getItemProp(item, 'label') }}</span>
                                        } @else {
                                            <span
                                                [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))"
                                                [style]="getItemProp(item, 'labelStyle')"
                                                [innerHTML]="getItemProp(item, 'label')"
                                                [pBind]="getPTOptions('headerLabel', item, i)"
                                            ></span>
                                        }
                                        @if (hasBadge(item)) {
                                            <span [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))">{{ getItemProp(item, 'badge') }}</span>
                                        }
                                    </a>
                                }
                            }
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(item)"></ng-container>
                            @if (getItemProp(item, 'routerLink')) {
                                <a
                                    [routerLink]="getItemProp(item, 'routerLink')"
                                    [queryParams]="getItemProp(item, 'queryParams')"
                                    [routerLinkActive]="'p-panelmenu-item-link-active'"
                                    [routerLinkActiveOptions]="getRouterLinkActiveOptions(item)"
                                    [target]="getItemProp(item, 'target')"
                                    [attr.title]="getItemProp(item, 'title')"
                                    [attr.data-automationid]="getItemProp(item, 'automationId')"
                                    [class]="cn(cx('headerLink'), getItemProp(item, 'linkClass'))"
                                    [style]="getItemProp(item, 'linkStyle')"
                                    [attr.tabindex]="-1"
                                    [fragment]="getItemProp(item, 'fragment')"
                                    [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                    [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                    [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                    [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                    [state]="getItemProp(item, 'state')"
                                    [pBind]="getPTOptions('headerLink', item, i)"
                                >
                                    @if (isItemGroup(item)) {
                                        @if (!headerIconTemplate()) {
                                            @if (isItemActive(item)) {
                                                <svg data-p-icon="chevron-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                            } @else {
                                                <svg data-p-icon="chevron-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="headerIconTemplate()"></ng-container>
                                    }
                                    @if (hasIcon(item)) {
                                        <span [class]="cn(cx('headerIcon'), item.icon, getItemProp(item, 'iconClass'))" [style]="getItemProp(item, 'iconStyle')" [pBind]="getPTOptions('headerIcon', item, i)"></span>
                                    }
                                    @if (shouldEscapeLabel(item)) {
                                        <span [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))" [style]="getItemProp(item, 'labelStyle')" [pBind]="getPTOptions('headerLabel', item, i)">{{ getItemProp(item, 'label') }}</span>
                                    } @else {
                                        <span [class]="cn(cx('headerLabel'), getItemProp(item, 'labelClass'))" [style]="getItemProp(item, 'labelStyle')" [innerHTML]="getItemProp(item, 'label')" [pBind]="getPTOptions('headerLabel', item, i)"></span>
                                    }
                                    @if (hasBadge(item)) {
                                        <span [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))">{{ getItemProp(item, 'badge') }}</span>
                                    }
                                </a>
                            }
                        </div>
                    </div>
                    <div
                        [class]="cx('contentContainer', { processedItem: item })"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [pBind]="ptm('contentContainer')"
                        pMotionName="p-collapsible"
                        [pMotion]="isItemActive(item)"
                        [pMotionOptions]="computedMotionOptions()"
                    >
                        <div [class]="cx('contentWrapper')" [pBind]="ptm('contentWrapper')">
                            <div [class]="cx('content')" [pBind]="ptm('content')">
                                <ul
                                    pPanelMenuList
                                    [panelId]="getPanelId(i, item)"
                                    [items]="getItemProp(item, 'items')"
                                    [itemTemplate]="itemTemplate()"
                                    [root]="true"
                                    [activeItem]="activeItem()"
                                    [tabindex]="tabindex()"
                                    [parentExpanded]="isItemActive(item)"
                                    (headerFocus)="updateFocusedHeader($event)"
                                    [pt]="pt()"
                                    [unstyled]="unstyled()"
                                    [motionOptions]="computedMotionOptions()"
                                ></ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PanelMenuStyle, { provide: PANELMENU_INSTANCE, useExisting: PanelMenu }, { provide: PARENT_INSTANCE, useExisting: PanelMenu }],
    host: {
        '[class]': 'cx("root")'
    },
    hostDirectives: [Bind]
})
export class PanelMenu extends BaseComponent<PanelMenuPassThrough> {
    componentName = 'PanelMenu';

    /**
     * An array of menuitems.
     * @group Props
     */
    model = input<MenuItem[]>();
    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @group Props
     */
    multiple = input(false, { transform: booleanAttribute });
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
     * Current id state as a string.
     * @group Props
     */
    id = input<string>();
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = input(0, { transform: numberAttribute });

    /**
     * Template option of submenu icon.
     * @group Templates
     */
    submenuIconTemplate = contentChild<TemplateRef<void>>('submenuicon', { descendants: false });
    /**
     * Template option of header icon.
     * @group Templates
     */
    headerIconTemplate = contentChild<TemplateRef<void>>('headericon', { descendants: false });
    /**
     * Template option of item.
     * @param {PanelMenuItemTemplateContext} context - item context.
     * @see {@link PanelMenuItemTemplateContext}
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<PanelMenuItemTemplateContext>>('item', { descendants: false });

    activeItem = signal<MenuItem | null>(null);

    _componentStyle = inject(PanelMenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcPanelMenu: PanelMenu | undefined = inject(PANELMENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    private _internalId = uuid('pn_id_');

    $id = computed(() => this.id() || this._internalId);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    getPTOptions(key: string, item: MenuItem, index: number) {
        return this.ptm(key, {
            context: {
                item: item,
                index,
                active: this.isItemActive(item)
            }
        });
    }

    /**
     * Collapses open panels.
     * @group Method
     */
    collapseAll() {
        const items = this.model();
        if (items) {
            for (let item of items) {
                if (item.expanded) {
                    item.expanded = false;
                }
            }
        }

        this.cd.detectChanges();
    }

    changeActiveItem(_event: Event, item: MenuItem, _index?: number, selfActive = false) {
        if (!this.isItemDisabled(item)) {
            const activeItemValue = this.activeItem();
            const activeItem = selfActive ? item : activeItemValue && equals(item, activeItemValue) ? null : item;
            this.activeItem.set(activeItem);
        }
    }

    getItemProp(item: MenuItem, name: string): any {
        return item ? resolve((item as any)[name]) : undefined;
    }

    getItemLabel(item: MenuItem) {
        return this.getItemProp(item, 'label');
    }

    isItemActive(item: MenuItem) {
        return item.expanded;
    }

    isItemVisible(item: MenuItem) {
        return this.getItemProp(item, 'visible') !== false;
    }

    isItemDisabled(item: MenuItem) {
        return this.getItemProp(item, 'disabled');
    }

    isItemGroup(item: MenuItem) {
        return isNotEmpty(item.items);
    }

    getRouterLinkActiveOptions(item: MenuItem) {
        return this.getItemProp(item, 'routerLinkActiveOptions') || { exact: false };
    }

    hasIcon(item: MenuItem) {
        return !!item.icon;
    }

    shouldEscapeLabel(item: MenuItem) {
        return this.getItemProp(item, 'escape') !== false;
    }

    hasBadge(item: MenuItem) {
        return !!this.getItemProp(item, 'badge');
    }

    getItemTemplateContext(item: MenuItem) {
        return { $implicit: item };
    }

    getPanelId(index: number, item?: MenuItem) {
        return item && item.id ? item.id : `${this.$id()}_${index}`;
    }

    getHeaderId(item: MenuItem, index: number) {
        return item.id ? item.id + '_header' : `${this.getPanelId(index)}_header`;
    }

    getContentId(item: MenuItem, index: number) {
        return item.id ? item.id + '_content' : `${this.getPanelId(index)}_content`;
    }

    updateFocusedHeader(event: { originalEvent: Event; focusOnNext?: boolean; selfCheck?: boolean }) {
        const { originalEvent, focusOnNext, selfCheck } = event;
        const panelElement = (originalEvent.currentTarget as HTMLElement)?.closest('[data-pc-section="panel"]');
        if (!panelElement) return;
        const header = selfCheck ? findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);

        header ? this.changeFocusedHeader(header as HTMLElement) : focusOnNext ? this.onHeaderHomeKey(originalEvent as KeyboardEvent) : this.onHeaderEndKey(originalEvent as KeyboardEvent);
    }

    changeFocusedHeader(element: HTMLElement | null) {
        element && focus(element);
    }

    findNextHeader(panelElement: Element | null, selfCheck = false): Element | null {
        const nextPanelElement = selfCheck ? panelElement : panelElement?.nextElementSibling;
        if (!nextPanelElement) return null;
        const headerElement = findSingle(nextPanelElement, '[data-pc-section="header"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
    }

    findPrevHeader(panelElement: Element | null, selfCheck = false): Element | null {
        const prevPanelElement = selfCheck ? panelElement : panelElement?.previousElementSibling;
        if (!prevPanelElement) return null;
        const headerElement = findSingle(prevPanelElement, '[data-pc-section="header"]');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
    }

    findFirstHeader(): HTMLElement | null {
        return this.el.nativeElement ? (this.findNextHeader(this.el.nativeElement.firstElementChild, true) as HTMLElement | null) : null;
    }

    findLastHeader(): HTMLElement | null {
        return this.el.nativeElement ? (this.findPrevHeader(this.el.nativeElement.lastElementChild, true) as HTMLElement | null) : null;
    }

    onHeaderClick(event: MouseEvent, item: MenuItem, index: number) {
        if (this.isItemDisabled(item)) {
            event.preventDefault();

            return;
        }

        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        if (!this.multiple()) {
            const items = this.model();
            if (items) {
                for (let modelItem of items) {
                    if (item !== modelItem && modelItem.expanded) {
                        modelItem.expanded = false;
                    }
                }
            }
        }

        item.expanded = !item.expanded;
        this.changeActiveItem(event, item, index);
        focus(event.currentTarget as HTMLElement);
    }

    onHeaderKeyDown(event: KeyboardEvent, item: MenuItem, index: number) {
        switch (event.code) {
            case 'ArrowDown':
                this.onHeaderArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onHeaderArrowUpKey(event);
                break;

            case 'Home':
                this.onHeaderHomeKey(event);
                break;

            case 'End':
                this.onHeaderEndKey(event);
                break;

            case 'Enter':
            case 'Space':
                this.onHeaderEnterKey(event, item, index);
                break;

            default:
                break;
        }
    }

    onHeaderArrowDownKey(event: KeyboardEvent) {
        const currentTarget = event.currentTarget as Element;
        const nextSibling = currentTarget.nextElementSibling;
        const rootList = getAttribute(currentTarget, 'data-p-highlight') === true && nextSibling ? (findSingle(nextSibling, '[data-pc-section="rootlist"]') as HTMLElement | null) : null;

        rootList ? focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }

    onHeaderArrowUpKey(event: KeyboardEvent) {
        const prevHeader = this.findPrevHeader((event.currentTarget as Element).parentElement) || this.findLastHeader();
        const nextSibling = prevHeader?.nextElementSibling;
        const rootList = prevHeader && getAttribute(prevHeader, 'data-p-highlight') === true && nextSibling ? (findSingle(nextSibling, '[data-pc-section="rootlist"]') as HTMLElement | null) : null;

        rootList ? focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
        event.preventDefault();
    }

    onHeaderHomeKey(event: KeyboardEvent) {
        this.changeFocusedHeader(this.findFirstHeader());
        event.preventDefault();
    }

    onHeaderEndKey(event: KeyboardEvent) {
        this.changeFocusedHeader(this.findLastHeader());
        event.preventDefault();
    }

    onHeaderEnterKey(event: KeyboardEvent, item: MenuItem, index: number) {
        const headerAction = findSingle(event.currentTarget as Element, '[data-pc-section="headerlink"]') as HTMLElement | null;

        headerAction ? headerAction.click() : this.onHeaderClick(event as unknown as MouseEvent, item, index);
        event.preventDefault();
    }
}
@NgModule({
    imports: [PanelMenu, SharedModule],
    exports: [PanelMenu, SharedModule]
})
export class PanelMenuModule {}
