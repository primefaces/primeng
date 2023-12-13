import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    computed,
    forwardRef,
    signal
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';

@Component({
    selector: 'p-panelMenuSub',
    template: `
        <ul
            #list
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root }"
            role="tree"
            [tabindex]="-1"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="'menu'"
            [attr.aria-hidden]="!parentExpanded"
            (focus)="menuFocus.emit($event)"
            (focusout)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
                <li *ngIf="processedItem.separator" class="p-menuitem-separator" role="separator"></li>
                <li
                    *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                    [ngClass]="getItemClass(processedItem)"
                    role="treeitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    [class.p-hidden]="processedItem.visible === false"
                    [class.p-focus]="isItemFocused(processedItem) && !isItemDisabled(processedItem)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [pTooltip]="getItemProp(processedItem, 'tooltip')"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" (click)="onItemClick($event, processedItem)">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="processedItem.item?.escape !== false; else htmlLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="processedItem.badgeStyleClass">{{ processedItem.badge }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.title]="getItemProp(processedItem, 'title')"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon *ngIf="isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon *ngIf="!isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div class="p-toggleable-content" [@submenu]="getAnimation(processedItem)">
                        <p-panelMenuSub
                            *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem.items"
                            [itemTemplate]="itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
                            [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                            (itemToggle)="onItemToggle($event)"
                        ></p-panelMenuSub>
                    </div>
                </li>
            </ng-template>
        </ul>
    `,
    animations: [
        trigger('submenu', [
            state(
                'hidden',
                style({
                    height: '0'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class PanelMenuSub {
    @Input() panelId: string | undefined;

    @Input() focusedItemId: string | undefined;

    @Input() items: any[];

    @Input() itemTemplate: HTMLElement | undefined;

    @Input() level: number = 0;

    @Input() activeItemPath: any[];

    @Input() root: boolean | undefined;

    @Input() tabindex: number | undefined;

    @Input() transitionOptions: string | undefined;

    @Input() parentExpanded: boolean | undefined;

    @Output() itemToggle: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuKeyDown: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('list') listViewChild: ElementRef;

    constructor(@Inject(forwardRef(() => PanelMenu)) public panelMenu: PanelMenu, public el: ElementRef) {}

    getItemId(processedItem) {
        return processedItem.item?.id ?? `${this.panelId}_${processedItem.key}`;
    }

    getItemKey(processedItem) {
        return this.getItemId(processedItem);
    }

    getItemClass(processedItem) {
        return {
            'p-menuitem': true,
            'p-disabled': this.isItemDisabled(processedItem)
        };
    }

    getItemProp(processedItem, name?, params?) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }

    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }

    isItemExpanded(processedItem) {
        return processedItem.expanded;
    }

    isItemActive(processedItem) {
        return this.isItemExpanded(processedItem) || this.activeItemPath.some((path) => path && path.key === processedItem.key);
    }

    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }

    isItemFocused(processedItem) {
        return this.focusedItemId === this.getItemId(processedItem);
    }

    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }

    getAnimation(processedItem) {
        return this.isItemActive(processedItem) ? { value: 'visible', params: { transitionParams: this.transitionOptions, height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }

    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }

    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }

    onItemClick(event, processedItem) {
        if (!this.isItemDisabled(processedItem)) {
            this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
            this.itemToggle.emit({ processedItem, expanded: !this.isItemActive(processedItem) });
        }
    }

    onItemToggle(event) {
        this.itemToggle.emit(event);
    }
}

@Component({
    selector: 'p-panelMenuList',
    template: `
        <p-panelMenuSub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems"
            [parentExpanded]="parentExpanded"
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
    @Input() set model(value: MenuItem[] | undefined) {
        this._model = value;
        this._processedItems = this.createProcessedItems(this._model || []);
    }
    get model(): MenuItem[] | undefined {
        return this._model;
    }
    @Input() panelId: string | undefined;

    @Input() id: string | undefined;

    @Input() items: any[];

    @Input() itemTemplate: HTMLElement | undefined;

    @Input() parentExpanded: boolean | undefined;

    @Input() expanded: boolean | undefined;

    @Input() transitionOptions: string | undefined;

    @Input() root: boolean | undefined;

    @Input() tabindex: number | undefined;

    @Input() activeItem: any;

    @Output() itemToggle: EventEmitter<any> = new EventEmitter<any>();

    @Output() headerFocus: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('submenu') subMenuViewChild: PanelMenuSub;

    searchTimeout: any;

    searchValue: any;

    focused: boolean | undefined;

    focusedItem = signal<any>(null);

    activeItemPath = signal<any[]>([]);

    _model: any;

    _processedItems: any[];

    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model || []);
        }
        return this._processedItems;
    }

    visibleItems = computed(() => {
        const processedItems = this.processedItems;
        return this.flatItems(processedItems);
    });

    get focusedItemId() {
        const focusedItem = this.focusedItem();
        return focusedItem && focusedItem.item?.id ? focusedItem.item.id : ObjectUtils.isNotEmpty(this.focusedItem()) ? `${this.panelId}_${this.focusedItem().key}` : undefined;
    }

    // ngOnChanges(changes: SimpleChanges) {
    //     if (changes && changes.items && changes.items.currentValue) {
    //         this._processedItems = this.createProcessedItems(changes.items.currentValue || []);
    //     }
    // }

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
        const panel = event.currentTarget.closest('[data-pc-section="panel"]');

        return panel && panel.contains(element);
    }

    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }

    isVisibleItem(processedItem) {
        return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    }

    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem) && !processedItem.separator;
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
                    icon: item.icon,
                    expanded: item.expanded,
                    separator: item.separator,
                    item,
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

    findProcessedItemByItemKey(key, processedItems?, level = 0) {
        processedItems = processedItems || this.processedItems;
        if (processedItems && processedItems.length) {
            for (let i = 0; i < processedItems.length; i++) {
                const processedItem = processedItems[i];

                if (this.getItemProp(processedItem, 'key') === key) return processedItem;
                const matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
                if (matchedItem) return matchedItem;
            }
        }
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
        const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    onFocus(event) {
        this.focused = true;
        const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findFirstItem() : this.findLastItem());
        if (event.relatedTarget !== null) this.focusedItem.set(focusedItem);
    }

    onBlur(event) {
        this.focused = false;
        this.focusedItem.set(null);
        this.searchValue = '';
    }

    onItemToggle(event) {
        this.focused = true;
        const { processedItem, expanded } = event;
        processedItem.expanded = !processedItem.expanded;

        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
        expanded && activeItemPath.push(processedItem);

        this.activeItemPath.set(activeItemPath);
        const processedItems = this.processedItems;
        const newProcessedItems = processedItems.map((item) => (item === processedItem ? processedItem : item));
        this._processedItems = newProcessedItems;
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
            const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
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

        const matchedItem =
            index < this.visibleItems().length - 1
                ? this.visibleItems()
                      .slice(index + 1)
                      .find((pItem) => this.isValidItem(pItem))
                : undefined;
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

        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const focusedItemIndex = this.visibleItems().findIndex((processedItem) => processedItem.key === this.focusedItem().key);

            matchedItem = this.visibleItems()
                .slice(focusedItemIndex)
                .find((processedItem) => this.isItemMatched(processedItem));
            matchedItem = ObjectUtils.isEmpty(matchedItem)
                ? this.visibleItems()
                      .slice(0, focusedItemIndex)
                      .find((processedItem) => this.isItemMatched(processedItem))
                : matchedItem;
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

/**
 * PanelMenu is a hybrid of Accordion and Tree components.
 * @group Components
 */
@Component({
    selector: 'p-panelMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'" #container>
            <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
                <div *ngIf="isItemVisible(item)" class="p-panelmenu-panel" [ngClass]="getItemProp(item, 'headerClass')" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': isItemActive(item), 'p-disabled': isItemDisabled(item) }"
                        [class]="getItemProp(item, 'styleClass')"
                        [ngStyle]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
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
                        [attr.data-pc-section]="'header'"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div class="p-panelmenu-header-content">
                            <a
                                *ngIf="!getItemProp(item, 'routerLink')"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.tabindex]="-1"
                                [target]="getItemProp(item, 'target')"
                                [attr.title]="getItemProp(item, 'title')"
                                class="p-panelmenu-header-action"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(item, 'routerLink')"
                                [routerLink]="getItemProp(item, 'routerLink')"
                                [queryParams]="getItemProp(item, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(item, 'target')"
                                class="p-panelmenu-header-action"
                                [attr.tabindex]="-1"
                                [fragment]="getItemProp(item, 'fragment')"
                                [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                [state]="getItemProp(item, 'state')"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        *ngIf="isItemGroup(item)"
                        class="p-toggleable-content"
                        [ngClass]="{ 'p-panelmenu-expanded': isItemActive(item) }"
                        [@rootItem]="getAnimation(item)"
                        (@rootItem.done)="onToggleDone()"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [attr.data-pc-section]="'toggleablecontent'"
                    >
                        <div class="p-panelmenu-content" [attr.data-pc-section]="'menucontent'">
                            <p-panelMenuList
                                [model]="model"
                                [panelId]="getPanelId(i, item)"
                                [items]="getItemProp(item, 'items')"
                                [itemTemplate]="itemTemplate"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [activeItem]="activeItem()"
                                [tabindex]="tabindex"
                                [parentExpanded]="isItemActive(item)"
                                (headerFocus)="updateFocusedHeader($event)"
                            ></p-panelMenuList>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
    animations: [
        trigger('rootItem', [
            state(
                'hidden',
                style({
                    height: '0'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panelmenu.css'],
    host: {
        class: 'p-element'
    }
})
export class PanelMenu implements AfterContentInit {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() set model(value: MenuItem[] | undefined) {
        this._model = value;
    }
    get model(): MenuItem[] | undefined {
        return this._model;
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @group Props
     */
    @Input() multiple: boolean = false;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Current id state as a string.
     * @group Props
     */
    @Input() id: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    @Input() tabindex: number | undefined = 0;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @ViewChild('container') containerViewChild: ElementRef | undefined;

    submenuIconTemplate: TemplateRef<any> | undefined;

    itemTemplate: TemplateRef<any> | undefined;

    public animating: boolean | undefined;

    activeItem = signal<any>(null);

    _model: MenuItem[] | undefined;

    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }

    constructor(private cd: ChangeDetectorRef) {}

    /**
     * Collapses open panels.
     * @group Method
     */
    collapseAll() {
        for (let item of this.model!) {
            if (item.expanded) {
                item.expanded = false;
            }
        }

        this.cd.detectChanges();
    }

    onToggleDone() {
        this.animating = false;
    }

    changeActiveItem(event, item, index?: number, selfActive = false) {
        if (!this.isItemDisabled(item)) {
            const activeItem = selfActive ? item : this.activeItem && ObjectUtils.equals(item, this.activeItem) ? null : item;
            this.activeItem.set(activeItem);
        }
    }

    getAnimation(item: MenuItem) {
        return item.expanded ? { value: 'visible', params: { transitionParams: this.animating ? this.transitionOptions : '0ms', height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }

    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }

    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }

    isItemActive(item) {
        return item.expanded;
    }

    isItemVisible(item) {
        return this.getItemProp(item, 'visible') !== false;
    }

    isItemDisabled(item) {
        return this.getItemProp(item, 'disabled');
    }

    isItemGroup(item) {
        return ObjectUtils.isNotEmpty(item.items);
    }

    getPanelId(index, item?) {
        return item && item.id ? item.id : `${this.id}_${index}`;
    }

    getHeaderId(item, index) {
        return item.id ? item.id + '_header' : `${this.getPanelId(index)}_header`;
    }

    getContentId(item, index) {
        return item.id ? item.id + '_content' : `${this.getPanelId(index)}_content`;
    }

    updateFocusedHeader(event) {
        const { originalEvent, focusOnNext, selfCheck } = event;
        const panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
        const header = selfCheck ? DomHandler.findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);

        header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    }

    changeFocusedHeader(event, element) {
        element && DomHandler.focus(element);
    }

    findNextHeader(panelElement, selfCheck = false) {
        const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextPanelElement, '[data-pc-section="header"]');

        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
    }

    findPrevHeader(panelElement, selfCheck = false) {
        const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevPanelElement, '[data-pc-section="header"]');

        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
    }

    findFirstHeader() {
        return this.findNextHeader(this.containerViewChild.nativeElement.firstElementChild, true);
    }

    findLastHeader() {
        return this.findPrevHeader(this.containerViewChild.nativeElement.lastElementChild, true);
    }

    onHeaderClick(event, item, index) {
        if (this.isItemDisabled(item)) {
            event.preventDefault();

            return;
        }

        if (item.command) {
            item.command({ originalEvent: event, item });
        }

        if (!this.multiple) {
            for (let modelItem of this.model!) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }

        item.expanded = !item.expanded;
        this.changeActiveItem(event, item, index);
        this.animating = true;
        DomHandler.focus(event.currentTarget as HTMLElement);
    }

    onHeaderKeyDown(event, item, index) {
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

    onHeaderArrowDownKey(event) {
        const rootList = DomHandler.getAttribute(event.currentTarget, 'data-p-highlight') === true ? DomHandler.findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;

        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }

    onHeaderArrowUpKey(event) {
        const prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
        const rootList = DomHandler.getAttribute(prevHeader, 'data-p-highlight') === true ? DomHandler.findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;

        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
        event.preventDefault();
    }

    onHeaderHomeKey(event) {
        this.changeFocusedHeader(event, this.findFirstHeader());
        event.preventDefault();
    }

    onHeaderEndKey(event) {
        this.changeFocusedHeader(event, this.findLastHeader());
        event.preventDefault();
    }

    onHeaderEnterKey(event, item, index) {
        const headerAction = DomHandler.findSingle(event.currentTarget, '[data-pc-section="headeraction"]');

        headerAction ? headerAction.click() : this.onHeaderClick(event, item, index);
        event.preventDefault();
    }
}
@NgModule({
    imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon],
    exports: [PanelMenu, RouterModule, TooltipModule, SharedModule],
    declarations: [PanelMenu, PanelMenuSub, PanelMenuList]
})
export class PanelMenuModule {}
