import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    InjectionToken,
    Input,
    NgModule,
    numberAttribute,
    Output,
    QueryList,
    signal,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { equals, findLast, findSingle, focus, getAttribute, isEmpty, isNotEmpty, isPrintableCharacter, resolve, uuid } from '@primeuix/utils';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronDownIcon, ChevronRightIcon } from 'primeng/icons';
import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuPassThrough } from 'primeng/types/panelmenu';
import { PanelMenuStyle } from './style/panelmenustyle';

const PANELMENU_INSTANCE = new InjectionToken<PanelMenu>('PANELMENU_INSTANCE');
const PANELMENUSUB_INSTANCE = new InjectionToken<PanelMenuSub>('PANELMENUSUB_INSTANCE');

@Component({
    selector: 'ul[pPanelMenuSub]',
    imports: [CommonModule, RouterModule, TooltipModule, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule],
    standalone: true,
    template: `
        <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
            <li *ngIf="processedItem.separator" [class]="cn(cx('separator'), getItemProp(processedItem, 'styleClass'))" role="separator" [pBind]="ptm('separator')"></li>
            <li
                *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                role="treeitem"
                [attr.id]="getItemId(processedItem)"
                [attr.aria-label]="getItemProp(processedItem, 'label')"
                [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                [attr.aria-level]="level + 1"
                [attr.aria-setsize]="getAriaSetSize()"
                [attr.aria-posinset]="getAriaPosInset(index)"
                [class]="cn(cx('item', { processedItem }), getItemProp(processedItem, 'styleClass'))"
                [ngStyle]="getItemProp(processedItem, 'style')"
                [pTooltip]="getItemProp(processedItem, 'tooltip')"
                [pBind]="getPTOptions(processedItem, index, 'item')"
                [attr.data-p-disabled]="isItemDisabled(processedItem)"
                [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
            >
                <div [class]="cx('itemContent')" [pBind]="getPTOptions(processedItem, index, 'itemContent')" (click)="onItemClick($event, processedItem)">
                    <ng-container *ngIf="!itemTemplate">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            [class]="cx('itemLink')"
                            [target]="getItemProp(processedItem, 'target')"
                            [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                        >
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!panelMenu.submenuIconTemplate && !panelMenu._submenuIconTemplate">
                                    <svg
                                        data-p-icon="chevron-down"
                                        [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                        *ngIf="isItemActive(processedItem)"
                                        [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                        [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                    />
                                    <svg
                                        data-p-icon="chevron-right"
                                        [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                        *ngIf="!isItemActive(processedItem)"
                                        [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                        [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                    />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate || panelMenu._submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'))" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')" [pBind]="getPTOptions(processedItem, index, 'itemIcon')"></span>
                            <span [class]="cx('itemLabel')" *ngIf="processedItem.item?.escape !== false; else htmlLabel" [pBind]="getPTOptions(processedItem, index, 'itemLabel')">{{ getItemProp(processedItem, 'label') }}</span>
                            <ng-template #htmlLabel><span [class]="cx('itemLabel')" [innerHTML]="getItemProp(processedItem, 'label')" [pBind]="getPTOptions(processedItem, index, 'itemLabel')"></span></ng-template>
                        </a>
                        <a
                            *ngIf="getItemProp(processedItem, 'routerLink')"
                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                            [routerLinkActive]="'p-panelmenu-item-link-active'"
                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                            [class]="cx('itemLink')"
                            [target]="getItemProp(processedItem, 'target')"
                            [attr.title]="getItemProp(processedItem, 'title')"
                            [fragment]="getItemProp(processedItem, 'fragment')"
                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                            [state]="getItemProp(processedItem, 'state')"
                            [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            [pBind]="getPTOptions(processedItem, index, 'itemLink')"
                        >
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!panelMenu.submenuIconTemplate && !panelMenu._submenuIconTemplate">
                                    <svg
                                        data-p-icon="chevron-down"
                                        *ngIf="isItemActive(processedItem)"
                                        [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                        [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                        [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                    />
                                    <svg
                                        data-p-icon="chevron-right"
                                        *ngIf="!isItemActive(processedItem)"
                                        [class]="cn(cx('submenuIcon'), getItemProp(processedItem, 'icon'))"
                                        [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                        [pBind]="getPTOptions(processedItem, index, 'submenuIcon')"
                                    />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate && panelMenu._submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'))" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')" [pBind]="getPTOptions(processedItem, index, 'itemIcon')"></span>
                            <span *ngIf="getItemProp(processedItem, 'label')" [class]="cx('itemLabel')" [innerHTML]="getItemProp(processedItem, 'label')" [pBind]="getPTOptions(processedItem, index, 'itemLabel')"></span>

                            <span [class]="cn(cx('badge'), getItemProp(processedItem, 'badgeStyleClass'))" *ngIf="processedItem.badge">{{ processedItem.badge }}</span>
                        </a>
                    </ng-container>
                    <ng-container *ngIf="itemTemplate">
                        <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                    </ng-container>
                </div>
                <div [@submenu]="getAnimation(processedItem)">
                    <ul
                        pPanelMenuSub
                        *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem) && isItemExpanded(processedItem)"
                        [id]="getItemId(processedItem) + '_list'"
                        [panelId]="panelId"
                        [items]="processedItem?.items"
                        [itemTemplate]="itemTemplate"
                        [transitionOptions]="transitionOptions"
                        [focusedItemId]="focusedItemId"
                        [activeItemPath]="activeItemPath"
                        [level]="level + 1"
                        [pt]="pt()"
                        [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                        (itemToggle)="onItemToggle($event)"
                    ></ul>
                </div>
            </li>
        </ng-template>
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
    providers: [PanelMenuStyle, { provide: PANELMENUSUB_INSTANCE, useExisting: PanelMenuSub }, { provide: PARENT_INSTANCE, useExisting: PanelMenuSub }],
    host: {
        '[class]': 'root ? cn(cx("rootList"), cx("submenu")) : cx("submenu")',
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
    @Input() panelId: string | undefined;

    @Input() focusedItemId: string | undefined;

    @Input() items: any[];

    @Input() itemTemplate: TemplateRef<any> | undefined;

    @Input({ transform: numberAttribute }) level: number = 0;

    @Input() activeItemPath: any[];

    @Input({ transform: booleanAttribute }) root: boolean | undefined;

    @Input({ transform: numberAttribute }) tabindex: number | undefined;

    @Input() transitionOptions: string | undefined;

    @Input({ transform: booleanAttribute }) parentExpanded: boolean | undefined;

    @Output() itemToggle: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuKeyDown: EventEmitter<any> = new EventEmitter<any>();

    listViewChild: ElementRef = inject(ElementRef);

    panelMenu: PanelMenu = inject(forwardRef(() => PanelMenu));

    _componentStyle = inject(PanelMenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcPanelMenu: PanelMenu | undefined = inject(PANELMENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm(this.root ? 'rootList' : 'submenu'));
    }

    getPTOptions(processedItem: any, index: number, key: string) {
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

    getItemId(processedItem) {
        return processedItem.item?.id ?? `${this.panelId}_${processedItem.key}`;
    }

    getItemKey(processedItem) {
        return this.getItemId(processedItem);
    }

    getItemClass(processedItem) {
        return {
            'p-panelmenu-item': true,
            'p-disabled': this.isItemDisabled(processedItem),
            'p-focus': this.isItemFocused(processedItem)
        };
    }

    getItemProp(processedItem, name?, params?): any {
        return processedItem && processedItem.item ? resolve(processedItem.item[name], params) : undefined;
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
        return isNotEmpty(processedItem.items);
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
    selector: 'ul[pPanelMenuList]',
    imports: [CommonModule, PanelMenuSub, RouterModule, TooltipModule, SharedModule],
    standalone: true,
    template: `
        <ul
            pPanelMenuSub
            #submenu
            [root]="root"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
            [pt]="pt()"
        ></ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PanelMenuList extends BaseComponent {
    @Input() panelId: string | undefined;

    @Input() id: string | undefined;

    @Input() items: any[];

    @Input() itemTemplate: TemplateRef<any> | undefined;

    @Input({ transform: booleanAttribute }) parentExpanded: boolean | undefined;

    @Input({ transform: booleanAttribute }) expanded: boolean | undefined;

    @Input() transitionOptions: string | undefined;

    @Input({ transform: booleanAttribute }) root: boolean | undefined;

    @Input({ transform: numberAttribute }) tabindex: number | undefined;

    @Input() activeItem: any;

    @Output() itemToggle: EventEmitter<any> = new EventEmitter<any>();

    @Output() headerFocus: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('submenu') subMenuViewChild: PanelMenuSub;

    searchTimeout: any;

    searchValue: any;

    focused: boolean | undefined;

    focusedItem = signal<any>(null);

    activeItemPath = signal<any[]>([]);

    processedItems = signal<any[]>([]);

    visibleItems = computed(() => {
        const processedItems = this.processedItems();
        return this.flatItems(processedItems);
    });

    get focusedItemId() {
        const focusedItem = this.focusedItem();
        return focusedItem && focusedItem.item?.id ? focusedItem.item.id : isNotEmpty(this.focusedItem()) ? `${this.panelId}_${this.focusedItem().key}` : undefined;
    }

    onChanges(changes: SimpleChanges) {
        this.processedItems.set(this.createProcessedItems(changes?.items?.currentValue || this.items || []));
    }

    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? resolve(processedItem.item[name]) : undefined;
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
        return isNotEmpty(processedItem.items);
    }

    isElementInPanel(event, element) {
        const panel = event.currentTarget.closest('[data-pc-name="panelmenu"]');

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
        return findLast(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }

    findItemByEventTarget(target: EventTarget): undefined | any {
        let parentNode = target as ParentNode & Element;

        while (parentNode && parentNode.tagName?.toLowerCase() !== 'li') {
            parentNode = parentNode?.parentNode as Element;
        }

        return parentNode?.id && this.visibleItems().find((processedItem: any) => this.isValidItem(processedItem) && `${this.panelId}_${processedItem.key}` === parentNode.id);
    }

    createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
        const processedItems: any = [];
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
        processedItems = processedItems || this.processedItems();
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
                    (processedFlattenItems as any[]).push(processedItem);
                    this.flatItems(processedItem.items, processedFlattenItems);
                }
            });

        return processedFlattenItems;
    }

    changeFocusedItem(event) {
        const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;

        if (isNotEmpty(this.focusedItem()) && this.focusedItem().key !== processedItem.key) {
            this.focusedItem.set(processedItem);
            this.scrollInView();
        } else if (allowHeaderFocus) {
            this.headerFocus.emit({ originalEvent, focusOnNext, selfCheck });
        }
    }

    scrollInView() {
        const element = findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);

        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    onFocus(event) {
        if (!this.focused) {
            this.focused = true;
            const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findItemByEventTarget(event.target) || this.findFirstItem() : this.findLastItem());
            if (event.relatedTarget !== null) this.focusedItem.set(focusedItem);
        }
    }

    onBlur(event) {
        const target = event.relatedTarget;

        if (this.focused && !this.el.nativeElement.contains(target)) {
            this.focused = false;
            this.focusedItem.set(null);
            this.searchValue = '';
        }
    }

    onItemToggle(event) {
        const { processedItem, expanded } = event;

        // Update the original item object's 'expanded' property
        if (processedItem.item) {
            processedItem.item.expanded = !processedItem.item.expanded;
        }

        // Recreate processedItems with updated 'expanded' states
        this.processedItems.set(this.createProcessedItems(this.items || [], 0, {}, ''));

        // Update activeItemPath
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
        if (expanded) {
            activeItemPath.push(processedItem);
        }
        this.activeItemPath.set(activeItemPath);

        // Update focusedItem
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
                if (!metaKey && isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }

                break;
        }
    }

    onArrowDownKey(event) {
        const processedItem = isNotEmpty(this.focusedItem()) ? this.findNextItem(this.focusedItem()) : this.findFirstItem();
        this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true });
        event.preventDefault();
    }
    onArrowUpKey(event) {
        const processedItem = isNotEmpty(this.focusedItem()) ? this.findPrevItem(this.focusedItem()) : this.findLastItem();

        this.changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true });
        event.preventDefault();
    }

    onArrowLeftKey(event) {
        if (isNotEmpty(this.focusedItem())) {
            const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);

            if (matched) {
                const activeItemPath = this.activeItemPath().filter((p) => p.key !== this.focusedItem().key);
                this.activeItemPath.set(activeItemPath);
            } else {
                const focusedItem = isNotEmpty(this.focusedItem().parent) ? this.focusedItem().parent : this.focusedItem();
                this.focusedItem.set(focusedItem);
            }

            event.preventDefault();
        }
    }

    onArrowRightKey(event) {
        if (isNotEmpty(this.focusedItem())) {
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
        if (isNotEmpty(this.focusedItem())) {
            const element = <any>findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && (<HTMLElement>findSingle(element, 'a') || <HTMLElement>findSingle(element, 'button'));

            anchorElement ? anchorElement.click() : element && element.click();
        }

        event.preventDefault();
    }

    onSpaceKey(event) {
        this.onEnterKey(event);
    }

    findNextItem(processedItem) {
        const index = this.visibleItems().findIndex((item: any) => item.key === processedItem.key);

        const matchedItem =
            index < this.visibleItems().length - 1
                ? this.visibleItems()
                      .slice(index + 1)
                      .find((pItem) => this.isValidItem(pItem))
                : undefined;
        return matchedItem || processedItem;
    }

    findPrevItem(processedItem) {
        const index = this.visibleItems().findIndex((item: any) => item.key === processedItem.key);
        const matchedItem = index > 0 ? findLast(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;

        return matchedItem || processedItem;
    }

    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;

        let matchedItem = null;
        let matched = false;

        if (isNotEmpty(this.focusedItem())) {
            const focusedItemIndex = this.visibleItems().findIndex((processedItem: any) => processedItem.key === this.focusedItem().key);

            matchedItem =
                this.visibleItems()
                    .slice(focusedItemIndex)
                    .find((processedItem: any) => this.isItemMatched(processedItem)) || null;
            matchedItem = isEmpty(matchedItem)
                ? this.visibleItems()
                      .slice(0, focusedItemIndex)
                      .find((processedItem: any) => this.isItemMatched(processedItem)) || null
                : matchedItem;
        } else {
            matchedItem = this.visibleItems().find((processedItem: any) => this.isItemMatched(processedItem)) || null;
        }

        if (isNotEmpty(matchedItem)) {
            matched = true;
        }

        if (isEmpty(matchedItem) && isEmpty(this.focusedItem())) {
            matchedItem = this.findFirstItem() || null;
        }

        if (isNotEmpty(matchedItem)) {
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
    selector: 'p-panelMenu, p-panelmenu, p-panel-menu',
    imports: [CommonModule, PanelMenuList, RouterModule, TooltipModule, ChevronDownIcon, ChevronRightIcon, SharedModule, BindModule],
    standalone: true,
    template: `
        <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
            <div *ngIf="isItemVisible(item)" [class]="cn(cx('panel'), getItemProp(item, 'headerClass'))" [ngStyle]="getItemProp(item, 'style')" [pBind]="ptm('panel')">
                <div
                    [class]="cn(cx('header', { item }), getItemProp(item, 'styleClass'))"
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
                    [pBind]="getPTOptions('header', item, i)"
                    (click)="onHeaderClick($event, item, i)"
                    (keydown)="onHeaderKeyDown($event, item, i)"
                >
                    <div [class]="cx('headerContent')" [pBind]="getPTOptions('headerContent', item, i)">
                        <ng-container *ngIf="!itemTemplate && !_itemTemplate">
                            <a
                                *ngIf="!getItemProp(item, 'routerLink')"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.tabindex]="-1"
                                [target]="getItemProp(item, 'target')"
                                [attr.title]="getItemProp(item, 'title')"
                                [class]="cx('headerLink')"
                                [pBind]="getPTOptions('headerLink', item, i)"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!headerIconTemplate && !_headerIconTemplate">
                                        <svg data-p-icon="chevron-down" [class]="cx('submenuIcon')" *ngIf="isItemActive(item)" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                        <svg data-p-icon="chevron-right" [class]="cx('submenuIcon')" *ngIf="!isItemActive(item)" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="headerIconTemplate || _headerIconTemplate"></ng-template>
                                </ng-container>
                                <span [class]="cn(cx('headerIcon'), item.icon)" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')" [pBind]="getPTOptions('headerIcon', item, i)"></span>
                                <span [class]="cx('headerLabel')" *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel" [pBind]="getPTOptions('headerLabel', item, i)">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlLabel><span [class]="cx('headerLabel')" [innerHTML]="getItemProp(item, 'label')" [pBind]="getPTOptions('headerLabel', item, i)"></span></ng-template>
                                <span [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))" *ngIf="getItemProp(item, 'badge')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                        <a
                            *ngIf="getItemProp(item, 'routerLink')"
                            [routerLink]="getItemProp(item, 'routerLink')"
                            [queryParams]="getItemProp(item, 'queryParams')"
                            [routerLinkActive]="'p-panelmenu-item-link-active'"
                            [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                            [target]="getItemProp(item, 'target')"
                            [class]="cx('headerLink')"
                            [attr.tabindex]="-1"
                            [fragment]="getItemProp(item, 'fragment')"
                            [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(item, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(item, 'replaceUrl')"
                            [state]="getItemProp(item, 'state')"
                            [pBind]="getPTOptions('headerLink', item, i)"
                        >
                            <ng-container *ngIf="isItemGroup(item)">
                                <ng-container *ngIf="!headerIconTemplate && !_headerIconTemplate">
                                    <svg data-p-icon="chevron-down" [class]="cx('submenuIcon')" *ngIf="isItemActive(item)" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                    <svg data-p-icon="chevron-right" [class]="cx('submenuIcon')" *ngIf="!isItemActive(item)" [pBind]="getPTOptions('submenuIcon', item, i)" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="headerIconTemplate || _headerIconTemplate"></ng-template>
                            </ng-container>
                            <span [class]="cn(cx('headerIcon'), item.icon)" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')" [pBind]="getPTOptions('headerIcon', item, i)"></span>
                            <span [class]="cx('headerLabel')" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel" [pBind]="getPTOptions('headerLabel', item, i)">{{ getItemProp(item, 'label') }}</span>
                            <ng-template #htmlRouteLabel><span [class]="cx('headerLabel')" [innerHTML]="getItemProp(item, 'label')" [pBind]="getPTOptions('headerLabel', item, i)"></span></ng-template>
                            <span *ngIf="getItemProp(item, 'badge')" [class]="cn(cx('badge'), getItemProp(item, 'badgeStyleClass'))">{{ getItemProp(item, 'badge') }}</span>
                        </a>
                    </div>
                </div>
                <div
                    *ngIf="isItemGroup(item)"
                    [class]="cx('contentContainer', { processedItem: item })"
                    [@rootItem]="getAnimation(item)"
                    (@rootItem.done)="onToggleDone()"
                    role="region"
                    [attr.id]="getContentId(item, i)"
                    [attr.aria-labelledby]="getHeaderId(item, i)"
                    [pBind]="ptm('contentContainer')"
                >
                    <div [class]="cx('content')" [pBind]="ptm('content')">
                        <ul
                            pPanelMenuList
                            [panelId]="getPanelId(i, item)"
                            [items]="getItemProp(item, 'items')"
                            [itemTemplate]="itemTemplate || _itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [root]="true"
                            [activeItem]="activeItem()"
                            [tabindex]="tabindex"
                            [parentExpanded]="isItemActive(item)"
                            (headerFocus)="updateFocusedHeader($event)"
                            [pt]="pt()"
                        ></ul>
                    </div>
                </div>
            </div>
        </ng-container>
    `,
    animations: [
        trigger('rootItem', [
            state(
                'hidden',
                style({
                    height: '0',
                    visibility: 'hidden'
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                    visibility: '*'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PanelMenuStyle, { provide: PANELMENU_INSTANCE, useExisting: PanelMenu }, { provide: PARENT_INSTANCE, useExisting: PanelMenu }],
    host: {
        '[class]': 'cn(cx("root"), styleClass)'
    },
    hostDirectives: [Bind]
})
export class PanelMenu extends BaseComponent<PanelMenuPassThrough> {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
    /**
     * Style class of the component.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether multiple tabs can be activated at the same time or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) multiple: boolean = false;
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
    @Input({ transform: numberAttribute }) tabindex: number | undefined = 0;

    @ViewChild('container') containerViewChild: ElementRef | undefined;
    /**
     * Template option of submenu icon.
     * @group Templates
     */
    @ContentChild('submenuicon', { descendants: false }) submenuIconTemplate: TemplateRef<any> | undefined;
    /**
     * Template option of header icon.
     * @group Templates
     */
    @ContentChild('headericon', { descendants: false }) headerIconTemplate: TemplateRef<any> | undefined;
    /**
     * Template option of item.
     * @group Templates
     */
    @ContentChild('item', { descendants: false }) itemTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _submenuIconTemplate: TemplateRef<any> | undefined;

    _headerIconTemplate: TemplateRef<any> | undefined;

    _itemTemplate: TemplateRef<any> | undefined;

    public animating: boolean | undefined;

    activeItem = signal<any>(null);

    _componentStyle = inject(PanelMenuStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcPanelMenu: PanelMenu | undefined = inject(PANELMENU_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    getPTOptions(key: string, item: any, index: number) {
        return this.ptm(key, {
            context: {
                item: item,
                index,
                active: this.isItemActive(item)
            }
        });
    }

    onInit() {
        this.id = this.id || uuid('pn_id_');
    }

    onAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this._submenuIconTemplate = item.template;
                    break;

                case 'headericon':
                    this._headerIconTemplate = item.template;
                    break;

                case 'item':
                    this._itemTemplate = item.template;
                    break;

                default:
                    this._itemTemplate = item.template;
                    break;
            }
        });
    }

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
        this.cd.markForCheck();
    }

    changeActiveItem(event, item, index?: number, selfActive = false) {
        if (!this.isItemDisabled(item)) {
            const activeItem = selfActive ? item : this.activeItem && equals(item, this.activeItem) ? null : item;
            this.activeItem.set(activeItem);
        }
    }

    getAnimation(item: MenuItem) {
        return item.expanded ? { value: 'visible', params: { transitionParams: this.animating ? this.transitionOptions : '0ms', height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }

    getItemProp(item, name): any {
        return item ? resolve(item[name]) : undefined;
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
        return isNotEmpty(item.items);
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
        const panelElement = originalEvent.currentTarget.closest('.p-panelmenu-panel');
        const header = selfCheck ? findSingle(panelElement, '.p-panelmenu-header') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);

        header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    }

    changeFocusedHeader(event, element) {
        element && focus(element);
    }

    findNextHeader(panelElement, selfCheck = false) {
        const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
        const headerElement = findSingle(nextPanelElement, '.p-panelmenu-header');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
    }

    findPrevHeader(panelElement, selfCheck = false) {
        const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
        const headerElement = findSingle(prevPanelElement, '.p-panelmenu-header');

        return headerElement ? (getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
    }

    findFirstHeader() {
        return this.containerViewChild?.nativeElement ? this.findNextHeader(this.containerViewChild.nativeElement.firstElementChild, true) : null;
    }

    findLastHeader() {
        return this.containerViewChild?.nativeElement ? this.findPrevHeader(this.containerViewChild.nativeElement.lastElementChild, true) : null;
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
        focus(event.currentTarget as HTMLElement);
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
        const rootList = getAttribute(event.currentTarget, 'data-p-highlight') === true ? <any>findSingle(event.currentTarget.nextElementSibling, 'ul.p-panelmenu-root-list') : null;

        rootList ? focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }

    onHeaderArrowUpKey(event) {
        const prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
        const rootList = getAttribute(prevHeader, 'data-p-highlight') === true ? <any>findSingle(prevHeader.nextElementSibling, 'ul.p-panelmenu-root-list') : null;

        rootList ? focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
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
        const headerAction = <any>findSingle(event.currentTarget, 'a.p-panelmenu-header-link');

        headerAction ? headerAction.click() : this.onHeaderClick(event, item, index);
        event.preventDefault();
    }
}
@NgModule({
    imports: [PanelMenu, SharedModule],
    exports: [PanelMenu, SharedModule]
})
export class PanelMenuModule {}
