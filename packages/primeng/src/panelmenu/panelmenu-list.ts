import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, input, numberAttribute, output, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MotionOptions } from '@primeuix/motion';
import { findLast, findSingle, isEmpty, isNotEmpty, isPrintableCharacter, resolve } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuItemTemplateContext, ProcessedMenuItem } from 'primeng/types/panelmenu';
import { PanelMenuSub } from './panelmenu-sub';

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
