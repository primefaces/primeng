
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input,  Output, SimpleChanges, ViewChild, ViewEncapsulation, computed, effect, signal } from '@angular/core';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { PanelMenuSub } from './panelmenu_sub';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

@Component({
    selector: 'p-panelMenuList',
    standalone: true,
    imports: [PanelMenuSub, CommonModule],
    template: `
        <p-panelMenuSub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [focusedItemId]="focused ? focusedItemId() : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [activeItemPath]="activeItemPath()"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
        ></p-panelMenuSub>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panelmenu.css'],
    host: {
        class: 'p-element'
    }
})
export class PanelMenuList {
    @Input() panelId: string | undefined;

    @Input() id: string | undefined;

    @Input() items: any[];

    @Input() parentExpanded: boolean | undefined;

    @Input() expanded: boolean | undefined;

    @Input() transitionOptions: string | undefined;

    @Input() root: boolean | undefined;

    @Input() tabindex: number | undefined;

    @Output() itemToggle: EventEmitter<any> = new EventEmitter<any>();
    
    @Output() headerFocus: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('submenu') subMenuViewChild: PanelMenuSub;

    searchTimeout: any;

    searchValue: any;

    focused = signal<boolean>(false);

    focusedItem = signal<any>(null);

    activeItemPath = signal<any[]> ([]);

    processedItems = signal<any[]>([]);

    visibleItems = computed(() => {
        const processedItems = this.processedItems();
        return this.flatItems(processedItems);
    })

    focusedItemId = computed(() => {
        const focusedItem = this.focusedItem();
        return ObjectUtils.isNotEmpty(focusedItem) ? `${this.panelId}_${focusedItem.key}` : null;
    })

    ngOnChanges(changes: SimpleChanges) {
        if(changes && changes.items && changes.items.currentValue) {
            this.processedItems.set(this.createProcessedItems(changes.items.currentValue || []))
        }
    }

    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    }

    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    
    isItemActive(processedItem) {
        return this.activeItemPath().some((path) => path.key === processedItem.parentKey);
    }
    
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }


    isElementInPanel(event, element) {
        const panel = event.currentTarget.closest('.p-panelmenu-panel');

        return panel && panel.contains(element);
    }
    
    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isVisibleItem(processedItem) {
        return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    }

    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem);
    }

    findFirstItem() {
        return this.visibleItems().find((processedItem) => this.isValidItem(processedItem));
    }

    findLastItem() {
        return ObjectUtils.findLast(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }

    createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
        const processedItems = [];

        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem = {
                    item: {...item, expanded: item.expanded === undefined ? false : item.expanded},
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };

                newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });

        return processedItems;
    }

    flatItems(processedItems, processedFlattenItems = []) {
        processedItems &&
            processedItems.forEach((processedItem) => {
                if (this.isVisibleItem(processedItem)) {
                    processedFlattenItems.push(processedItem);
                    this.flatItems(processedItem.items, processedFlattenItems);
                }
            });

        return processedFlattenItems;
    }

    changeFocusedItem(event) {
        const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;

        if (ObjectUtils.isNotEmpty(this.focusedItem()) && this.focusedItem().key !== processedItem.key) {
            this.focusedItem.set(processedItem);
            this.scrollInView();
        } else if (allowHeaderFocus) {
            this.headerFocus.emit({ originalEvent, focusOnNext, selfCheck });
        }
    }

    scrollInView() {
        const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId()}`}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }
    
    onFocus(event) {
        this.focused.set(true);
        const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findFirstItem() : this.findLastItem());
        this.focusedItem.set(focusedItem);
    }

    onBlur(event) {
        this.focused.set(true);
        this.focusedItem.set(null);
        this.searchValue = '';
    }

    onItemToggle(event) {
        const { processedItem, expanded } = event;
        processedItem.expanded = !processedItem.expanded;

        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
        expanded && activeItemPath.push(processedItem);

        this.processedItems.mutate(value => value.map(i => i === processedItem ? processedItem : i ));
        this.focusedItem.set(processedItem);
    }

    onKeyDown(event) {
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
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }

                break;
        }
    }

    onArrowDownKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findNextItem(this.focusedItem()) : this.findFirstItem();

        this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true });
        event.preventDefault();
    }
    onArrowUpKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findPrevItem(this.focusedItem()) : this.findLastItem();

        this.changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true });
        event.preventDefault();
    }

    onArrowLeftKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);

            if (matched) {
                const activeItemPath = this.activeItemPath().filter((p) => p.key !== this.focusedItem().key);
                this.activeItemPath.set(activeItemPath);
            } else {
                const focusedItem = ObjectUtils.isNotEmpty(this.focusedItem().parent) ? this.focusedItem().parent : this.focusedItem();
                this.focusedItem.set(focusedItem);
            }

            event.preventDefault();
        }
    }

    onArrowRightKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const grouped = this.isItemGroup(this.focusedItem());

            if (grouped) {
                const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);

                if (matched) {
                    this.onArrowDownKey(event);
                } else {
                    const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItem().parentKey);
                    activeItemPath.push(this.focusedItem());

                    this.activeItemPath.set(activeItemPath);
                }
            }

            event.preventDefault();
        }
    }

    onHomeKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findFirstItem(), allowHeaderFocus: false });
        event.preventDefault();
    }

    onEndKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findLastItem(), focusOnNext: true, allowHeaderFocus: false });
        event.preventDefault();
    }

    onEnterKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId()}`}"]`);
            const anchorElement = element && (DomHandler.findSingle(element, '[data-pc-section="action"]') || DomHandler.findSingle(element, 'a,button'));

            anchorElement ? anchorElement.click() : element && element.click();
        }

        event.preventDefault();
    }

    onSpaceKey(event) {
        this.onEnterKey(event);
    }

    findNextItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index < this.visibleItems().length - 1 ? this.visibleItems().slice(index + 1).find((pItem) => this.isValidItem(pItem)) : undefined;

        return matchedItem || processedItem;
    }

    findPrevItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index > 0 ? ObjectUtils.findLast(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;

        return matchedItem || processedItem;
    }

    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;

        let matchedItem = null;
        let matched = false;

        if (ObjectUtils.isNotEmpty(this.focusedItem)) {
            const focusedItemIndex = this.visibleItems().findIndex((processedItem) => processedItem.key === this.focusedItem().key);

            matchedItem = this.visibleItems().slice(focusedItemIndex).find((processedItem) => this.isItemMatched(processedItem));
            matchedItem = ObjectUtils.isEmpty(matchedItem) ? this.visibleItems().slice(0, focusedItemIndex).find((processedItem) => this.isItemMatched(processedItem)) : matchedItem;
        } else {
            matchedItem = this.visibleItems().find((processedItem) => this.isItemMatched(processedItem));
        }

        if (ObjectUtils.isNotEmpty(matchedItem)) {
            matched = true;
        }

        if (ObjectUtils.isEmpty(matchedItem) && ObjectUtils.isEmpty(this.focusedItem())) {
            matchedItem = this.findFirstItem();
        }

        if (ObjectUtils.isNotEmpty(matchedItem)) {
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