import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation, effect, signal } from '@angular/core';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { PanelMenuNew } from './panelmenu_new';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-panelMenuSub',
    standalone: true,
    imports: [AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon, TooltipModule, CommonModule],
    template: `
        <ul
            #list
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root}"
            role="tree"
            [tabindex]="-1"
            [attr.data-pc-section]="'menu'"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
                <li *ngIf="processedItem.separator" class="p-menu-separator" role="separator"></li>
                <li
                    *ngIf="!processedItem.separator"
                    class="p-menuitem"
                    role="treeitem"
                    [id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="processedItem.expanded"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngClass]="processedItem.styleClass"
                    [class.p-hidden]="processedItem.visible === false"
                    [class.p-focus]="isItemFocused(processedItem)"
                    [ngStyle]="processedItem.style"
                    pTooltip
                    [tooltipOptions]="processedItem.tooltipOptions"
                >
                    <div class="p-menuitem-content" (click)="onItemClick($event, processedItem)">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            class="p-menuitem-link"
                            [attr.tabindex]="-1"
                            [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [target]="getItemProp(processedItem, 'target')"
                            [attr.data-pc-section]="'action'"
                        >
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                    <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="processedItem.expanded" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!processedItem.expanded" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                            <span class="p-menuitem-text" *ngIf="processedItem.escape !== false; else htmlLabel">{{ getItemProp(processedItem, 'label') }}</span>
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
                            [attr.tabindex]="-1"
                            [target]="getItemProp(processedItem, 'target')"
                            [attr.title]="getItemProp(processedItem, 'title')"
                            [fragment]="getItemProp(processedItem, 'fragment')"
                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                            [state]="getItemProp(processedItem, 'state')"
                            [attr.data-pc-section]="'action'"
                        >
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                    <AngleDownIcon *ngIf="processedItem.expanded" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    <AngleRightIcon *ngIf="!processedItem.expanded" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                            <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(processedItem, 'label') }}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                        </a>
                    </div>
                    <div class="p-toggleable-content" [@submenu]="getAnimation(processedItem)">
                        <p-panelMenuSub
                            *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)"
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem.items"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
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

    @Input() level: number = 0;

    @Input() activeItemPath: any[];

    @Input() root: boolean | undefined;

    @Input() tabindex: number | undefined;

    @Input() transitionOptions: string | undefined;

    @Output() itemToggle: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuFocus: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuBlur: EventEmitter<any> = new EventEmitter<any>();

    @Output() menuKeyDown: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('list') listViewChild: ElementRef;

    constructor(public panelMenu: PanelMenuNew, public el: ElementRef) {}
    
    getItemId(processedItem) {
        return `${this.panelId}_${processedItem.key}`;
    }

    getItemKey(processedItem) {
        return this.getItemId(processedItem);
    }

    getItemProp(processedItem, name?, params?) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }

    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }

    isItemActive(processedItem) {
        // return this.activeItemPath.some((path) => path.key === processedItem.key);
        return processedItem.expanded
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
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemToggle.emit({ processedItem, expanded: !this.isItemActive(processedItem) });
    }

    onItemToggle(event) {
        this.itemToggle.emit(event);
    }
}