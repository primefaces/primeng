import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';

export class BasePanelMenuItem {
    activeItemPath = signal<any[]>([]);

    activeItem = signal<any>(null);

    visibleItems = signal<any>(null);

    currentItems = signal<any>(null);

    constructor(private ref: ChangeDetectorRef) {}

    handleClick(event: Event, item: any, flatItems?: any) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        item.expanded = !item.expanded;

        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== item.parentKey);
        if (item.expanded) {
            activeItemPath.push(item);
            this.activeItem.set(item);
            console.log('new', this.currentItems()?.items, flatItems(this.currentItems()?.items));
            this.visibleItems.set(flatItems(this.currentItems()?.items));
            //const visibleItems = this.activeItem() && ObjectUtils.isNotEmpty(this.activeItem().items) ? this.activeItem().items : this.visibleItems();

            //this.visibleItems.set(visibleItems);
        } else {
            this.activeItem.set(null);
            // this.visibleItems.set(null);
        }
        // this.focusedItem.set(item);
        // console.log('visibleItems', this.visibleItems())
        this.activeItemPath.set(activeItemPath);
        this.ref.detectChanges();

        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }
}

@Component({
    selector: 'p-panelMenuSub',
    template: `
        <ul
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root, 'p-submenu-expanded': expanded }"
            [@submenu]="getAnimation()"
            role="tree"
            [tabindex]="-1"
            [attr.data-pc-section]="'menu'"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-child let-index="index" [ngForOf]="item?.items">
                <li *ngIf="child.separator" class="p-menu-separator" role="separator"></li>
                <li
                    *ngIf="!child.separator"
                    class="p-menuitem"
                    role="treeitem"
                    [attr.aria-label]="getItemProp(child, 'label')"
                    [attr.aria-expanded]="child.expanded"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngClass]="child.styleClass"
                    [class.p-hidden]="child.visible === false"
                    [class.p-focus]="isItemFocused(child)"
                    [ngStyle]="child.style"
                    pTooltip
                    [tooltipOptions]="child.tooltipOptions"
                >
                    <div class="p-menuitem-content" (click)="handleClick($event, child, panelMenu.flatItems.bind(this))" (keydown)="onItemKeyDown($event)">
                        <a
                            *ngIf="!getItemProp(child, 'routerLink')"
                            [attr.href]="getItemProp(child, 'url')"
                            class="p-menuitem-link"
                            [attr.tabindex]="-1"
                            [ngClass]="{ 'p-disabled': getItemProp(child, 'disabled') }"
                            [target]="getItemProp(child, 'target')"
                            [attr.data-pc-section]="'action'"
                        >
                            <ng-container *ngIf="isItemGroup(child)">
                                <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                    <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="child.expanded" [ngStyle]="getItemProp(child, 'iconStyle')" />
                                    <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!child.expanded" [ngStyle]="getItemProp(child, 'iconStyle')" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon" [ngStyle]="getItemProp(child, 'iconStyle')"></span>
                            <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{ getItemProp(child, 'label') }}</span>
                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(child, 'label')"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        </a>
                        <a
                            *ngIf="getItemProp(child, 'routerLink')"
                            [routerLink]="getItemProp(child, 'routerLink')"
                            [queryParams]="getItemProp(child, 'queryParams')"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="getItemProp(child, 'routerLinkActiveOptions') || { exact: false }"
                            class="p-menuitem-link"
                            [ngClass]="{ 'p-disabled': getItemProp(child, 'disabled') }"
                            [attr.tabindex]="-1"
                            [target]="getItemProp(child, 'target')"
                            [attr.title]="getItemProp(child, 'title')"
                            [fragment]="getItemProp(child, 'fragment')"
                            [queryParamsHandling]="getItemProp(child, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(child, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(child, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(child, 'replaceUrl')"
                            [state]="getItemProp(child, 'state')"
                            [attr.data-pc-section]="'action'"
                        >
                            <ng-container *ngIf="isItemGroup(child)">
                                <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                    <AngleDownIcon *ngIf="child.expanded" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(child, 'iconStyle')" />
                                    <AngleRightIcon *ngIf="!child.expanded" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(child, 'iconStyle')" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon" [ngStyle]="getItemProp(child, 'iconStyle')"></span>
                            <span class="p-menuitem-text" *ngIf="getItemProp(child, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(child, 'label') }}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(child, 'label')"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="getItemProp(child, 'badgeStyleClass')">{{ getItemProp(child, 'badge') }}</span>
                        </a>
                    </div>
                    <p-panelMenuSub
                        *ngIf="isItemGroup(child)"
                        [item]="child"
                        [parentExpanded]="expanded && parentExpanded"
                        [expanded]="child.expanded"
                        [transitionOptions]="transitionOptions"
                        [focusedItem]="focusedItem"
                        [level]="level + 1"
                        [panelId]="panelId"
                    ></p-panelMenuSub>
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
    @Output() menuFocus: EventEmitter<any> = new EventEmitter<any>();
    @Output() menuBlur: EventEmitter<any> = new EventEmitter<any>();
    @Output() menuKeyDown: EventEmitter<any> = new EventEmitter<any>();

    @Input() focusedItem: any;

    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }

    isItemGroup(item) {
        return ObjectUtils.isNotEmpty(item.items);
    }

    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }

    isItemActive(processedItem) {
        return this.activeItemPath().some((path) => path.key === processedItem.key);
    }

    isItemFocused(processedItem) {
        return ObjectUtils.equals(processedItem, this.focusedItem);
    }

    getItemId(processedItem) {
        return `${this.panelId}_${processedItem.key}`;
    }

    getAriaSetSize() {
        return this.item?.items.filter((item) => this.isItemVisible(item) && !this.getItemProp(item, 'separator')).length;
    }

    getAriaPosInset(index) {
        return index - this.item?.items.slice(0, index).filter((item) => this.isItemVisible(item) && this.getItemProp(item, 'separator')).length + 1;
    }

    @Input() item: any;

    @Input() expanded: boolean | undefined;

    @Input() parentExpanded: boolean | undefined;

    @Input() transitionOptions: string | undefined;

    @Input() root: boolean | undefined;

    @Input() panelId: string | undefined;

    @Input() id: string | undefined;

    @Input() focused: boolean | undefined;

    @Input() level: number = 0;

    @Input() tabindex: number;

    focusedItemId: string | undefined;

    constructor(ref: ChangeDetectorRef, public panelMenu: PanelMenu) {}

    getAnimation() {
        return this.expanded ? { value: 'visible', params: { transitionParams: this.transitionOptions, height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }

    activeItemPath = signal<any[]>([]);

    activeItem = signal<any>(null);

    visibleItems = signal<any>(null);

    currentItems = signal<any>(null);

    handleClick(event: Event, item: any, flatItems: any) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        item.expanded = !item.expanded;

        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== item.parentKey);
        if (item.expanded) {
            activeItemPath.push(item);
            this.activeItem.set(item);
            console.log('new', this.currentItems()?.items, flatItems(this.currentItems()?.items));
            this.visibleItems.set(flatItems(this.currentItems()?.items));
            //const visibleItems = this.activeItem() && ObjectUtils.isNotEmpty(this.activeItem().items) ? this.activeItem().items : this.visibleItems();

            //this.visibleItems.set(visibleItems);
        } else {
            this.activeItem.set(null);
            // this.visibleItems.set(null);
        }
        // this.focusedItem.set(item);
        // console.log('visibleItems', this.visibleItems())
        this.activeItemPath.set(activeItemPath);

        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
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
            <ng-container *ngFor="let item of processedItems; let f = first; let l = last; let i = index">
                <div *ngIf="isItemVisible(item)" class="p-panelmenu-panel" [ngClass]="getItemProp(item, 'headerClass')" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': isItemActive(item), 'p-disabled': isItemDisabled(item) }"
                        [class]="getItemProp(item, 'styleClass')"
                        [ngStyle]="getItemProp(item, 'style')"
                        pTooltip
                        [id]="getHeaderId(i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, tooltipOptions)"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.arial-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [attr.data-pc-section]="'header'"
                        (click)="handleClick($event, item, flatItems.bind(this))"
                        (keydown)="onHeaderKeyDown($event)"
                        (focus)="onHeaderFocus($event, item, i)"
                        (blur)="onHeaderBlur($event, item, i)"
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
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="getItemProp(item, 'icon')" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
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
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="getItemProp(item, 'icon')" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        *ngIf="isItemGroup(item)"
                        class="p-toggleable-content"
                        [ngClass]="{ 'p-panelmenu-expanded': item.expanded }"
                        [@rootItem]="getAnimation(item)"
                        (@rootItem.done)="onToggleDone()"
                        role="region"
                        [id]="getContentId(i)"
                        [attr.aria-labelledby]="getHeaderId(i)"
                        [attr.data-pc-section]="'toggleablecontent'"
                    >
                        <div class="p-panelmenu-content" [attr.data-pc-section]="'menucontent'">
                            <p-panelMenuSub
                                [id]="getPanelId(i) + '_list'"
                                [panelId]="getPanelId(i)"
                                [item]="item"
                                [parentExpanded]="item.expanded"
                                [expanded]="true"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [focusedItem]="this.focusedItem()"
                                (menuFocus)="onMenuFocus($event, item)"
                                (menuBlur)="onMenuBlur($event)"
                                (menuKeyDown)="onMenuKeyDown($event)"
                            ></p-panelMenuSub>
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
    activeItemPath = signal<any[]>([]);

    activeItem = signal<any>(null);

    visibleItems = signal<any>(null);

    currentItems = signal<any>(null);

    handleClick(event: Event, item: any, flatItems?: any) {
        if (!this.multiple) {
            for (let modelItem of this.processedItems!) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        this.animating = true;
        DomHandler.focus(event.currentTarget as HTMLElement);

        if (item.disabled) {
            event.preventDefault();
            return;
        }

        item.expanded = !item.expanded;

        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== item.parentKey);
        if (item.expanded) {
            activeItemPath.push(item);
            this.activeItem.set(item);
            console.log('new', this.currentItems()?.items, flatItems(this.currentItems()?.items));
            this.visibleItems.set(flatItems(this.currentItems()?.items));
            //const visibleItems = this.activeItem() && ObjectUtils.isNotEmpty(this.activeItem().items) ? this.activeItem().items : this.visibleItems();

            //this.visibleItems.set(visibleItems);
        } else {
            this.activeItem.set(null);
            // this.visibleItems.set(null);
        }
        // this.focusedItem.set(item);
        // console.log('visibleItems', this.visibleItems())
        this.activeItemPath.set(activeItemPath);

        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }

    onHeaderFocus(event, item, index) {
        // const visibleItems = this.visibleItems();
        // let visibleItems = this.visibleItems();

        // if (visibleItems && visibleItems.length > 0 && item.expanded) {
        //     this.visibleItems.set(item.items);
        // }
        this.focusedItem.set(null);
    }

    onHeaderBlur(event, item, index) {
        // console.log(event)
        // if (!this.isElementInPanel(event, event.relatedTarget)) {
        //     const prevActivePanel = this.findPreviousExpandedPanel(index);
        //     if (index !== 0 && ObjectUtils.isNotEmpty(prevActivePanel) && prevActivePanel.items && prevActivePanel.items.length) {
        //         this.visibleItems.set(prevActivePanel.items);
        //     }
        // }
    }

    findPreviousExpandedPanel(index) {
        for (let i = index - 1; i >= 0; i--) {
            if (this.processedItems[i].expanded === true) {
                return this.processedItems[i];
            }
        }
    }

    findNextExpandedPanel(index) {
        for (let i = index + 1; i >= 0; i++) {
            if (this.processedItems[i].expanded === true) {
                return this.processedItems[i];
            }
        }
    }

    searchValue: string = '';
    searchTimeout: any;

    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
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

        if (ObjectUtils.isEmpty(matchedItem) && ObjectUtils.isEmpty(this.focusedItem)) {
            matchedItem = this.findFirstMenuItem();
        }

        if (ObjectUtils.isNotEmpty(matchedItem)) {
            this.changeFocusedMenuItem({
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

    onMenuKeyDown(event) {
        // console.log('menukeydown')
        const metaKey = event.metaKey || event.ctrlKey;

        switch (event.code) {
            case 'ArrowDown':
                this.onMenuArrowDownKey(event);
                break;

            case 'ArrowUp':
                this.onMenuArrowUpKey(event);
                break;

            case 'ArrowRight':
                this.onMenuArrowRighKey(event);
                break;

            case 'Home':
                this.onMenuHomeKey(event);
                break;

            case 'End':
                this.onMenuEndKey(event);
                break;

            case 'Space':
                this.onMenuSpaceKey(event);
                break;

            case 'Enter':
                this.onMenuEnterKey(event);
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

    onMenuEnterKey(event) {
        this.handleClick(event, this.focusedItem(), this.flatItems.bind(this));

        event.preventDefault();
    }

    onMenuSpaceKey(event) {
        this.onMenuEnterKey(event);
    }

    onMenuHomeKey(event) {
        this.changeFocusedMenuItem({ originalEvent: event, processedItem: this.findFirstMenuItem(), allowHeaderFocus: false });
        event.preventDefault();
    }

    onMenuEndKey(event) {
        this.changeFocusedMenuItem({ originalEvent: event, processedItem: this.findLastMenuItem(), focusOnNext: true, allowHeaderFocus: false });
        event.preventDefault();
    }

    onMenuArrowUpKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findPrevMenuItem(this.focusedItem()) : this.findLastMenuItem();
        // console.log(processedItem)
        this.changeFocusedMenuItem({ originalEvent: event, processedItem, selfCheck: true });
        event.preventDefault();
    }

    onMenuArrowDownKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findNextMenuItem(this.focusedItem()) : this.findFirstMenuItem();

        this.changeFocusedMenuItem({ originalEvent: event, processedItem, focusOnNext: true });
        event.preventDefault();
    }

    onMenuArrowRighKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const grouped = this.isItemGroup(this.focusedItem());

            if (grouped) {
                this.handleClick(event, this.focusedItem(), this.flatItems.bind(this));
                const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
                if (matched) {
                    this.onMenuArrowDownKey(event);
                } else {
                    const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItem().parentKey);
                    activeItemPath.push(this.focusedItem);

                    this.activeItemPath.set(activeItemPath);
                }
            }

            this.handleClick(event, this.focusedItem(), this.flatItems.bind(this));
            event.preventDefault();
        }
    }

    findNextMenuItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem =
            index < this.visibleItems().length - 1
                ? this.visibleItems()
                      .slice(index + 1)
                      .find((pItem) => this.isValidItem(pItem))
                : undefined;
        return matchedItem || processedItem;
    }

    findPrevMenuItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index > 0 ? ObjectUtils.findLast(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;
        return matchedItem || processedItem;
    }

    findFirstMenuItem() {
        return this.visibleItems().find((processedItem) => this.isValidItem(processedItem));
    }

    changeFocusedMenuItem(event) {
        const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;

        if (ObjectUtils.isNotEmpty(this.focusedItem()) && this.focusedItem().key !== processedItem.key) {
            this.focusedItem.set(processedItem);
            // this.scrollInView();
        } else if (allowHeaderFocus) {
            this.updateFocusedHeader({ originalEvent, focusOnNext, selfCheck });
        }
    }

    isVisibleItem(processedItem) {
        return !!processedItem && (processedItem.level === 1 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    }

    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem);
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

    focusedItem = signal<any>(null);

    onMenuFocus(event, item) {
        this.visibleItems.set(this.flatItems(item.items));
        this.currentItems.set(item);

        const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findFirstMenuItem() : this.findLastMenuItem());

        this.focusedItem.set(focusedItem);
    }

    changeVisibleItems(items) {
        let updated = [];

        items.forEach((item) => {
            if (!item.expanded) {
                updated.push(item);
            } else {
                let itemCopy = { ...item };
                delete itemCopy.items;
                updated.push(itemCopy);
                if (Array.isArray(item.items)) {
                    updated.push(...this.changeVisibleItems(item.items));
                }
            }
        });

        return updated;
    }

    findLastMenuItem() {
        return ObjectUtils.findLast(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }

    isElementInPanel(event, element) {
        const panel = event.currentTarget.closest('[data-pc-section="panel"]');

        return panel && panel.contains(element);
    }

    onMenuBlur(event) {
        if (!this.isElementInPanel(event, event.relatedTarget)) {
            // console.log(this.focusedItem())
        }
        // this.focusedItem.set(null);
    }

    _processedItems: any[];

    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model || []);
        }
        return this._processedItems;
    }

    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
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

    @Input() id: string | undefined;

    @Input() tabindex: number;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @ViewChild('container') containerViewChild: ElementRef | undefined;

    submenuIconTemplate: TemplateRef<any> | undefined;

    public animating: boolean | undefined;

    _visibleItems: any[];

    constructor(ref: ChangeDetectorRef, public el: ElementRef) {
        effect(() => {
            const activeItem = this.activeItem();

            this._visibleItems = this.flatItems(this.processedItems);
        });
    }

    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }

    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }

    getItemLabel(item) {
        return this.getItemProp(item, 'label');
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

    getPanelId(index) {
        return `${this.id}_${index}`;
    }

    getPanelKey(index) {
        return this.getPanelId(index);
    }

    getHeaderId(index) {
        return `${this.getPanelId(index)}_header`;
    }

    getContentId(index) {
        return `${this.getPanelId(index)}_content`;
    }

    createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
        const processedItems = [];

        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem = {
                    ...item,
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

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
            }
        });
    }

    collapseAll() {
        for (let item of this.model!) {
            if (item.expanded) {
                item.expanded = false;
            }
        }
    }

    onToggleDone() {
        this.animating = false;
    }

    onHeaderKeyDown(event: KeyboardEvent, item: any): void {
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
                this.onHeaderEnterKey(event, item);
                break;

            default:
                break;
        }
    }

    onHeaderEnterKey(event, item) {
        const headerAction = DomHandler.findSingle(event.currentTarget, '[data-pc-section="headeraction"]');

        headerAction ? headerAction.click() : this.handleClick(event, item);
        event.preventDefault();
    }

    onHeaderArrowDownKey(event) {
        const rootList = DomHandler.getAttribute(event.currentTarget, 'data-p-highlight') === true ? DomHandler.findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;

        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }

    onHeaderArrowUpKey(event) {
        let prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
        const rootList = DomHandler.getAttribute(prevHeader, 'data-p-highlight') === true ? DomHandler.findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;

        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
        event.preventDefault();
    }

    updateFocusedHeader(event) {
        const { originalEvent, focusOnNext, selfCheck } = event;
        const panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
        const header = selfCheck ? DomHandler.findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);

        header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    }

    onHeaderHomeKey(event) {
        this.changeFocusedHeader(event, this.findFirstHeader());
        event.preventDefault();
    }

    onHeaderEndKey(event) {
        this.changeFocusedHeader(event, this.findLastHeader());
        event.preventDefault();
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

    changeFocusedHeader(event, element) {
        element && DomHandler.focus(element);
    }

    isItemActive(item) {
        return item.expanded || item?.parent?.expanded;
    }

    getAnimation(item: MenuItem) {
        return item.expanded ? { value: 'visible', params: { transitionParams: this.animating ? this.transitionOptions : '0ms', height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon],
    exports: [PanelMenu, RouterModule, TooltipModule, SharedModule],
    declarations: [PanelMenu, PanelMenuSub]
})
export class PanelMenuModule {}
