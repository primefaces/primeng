import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TooltipModule } from 'primeng/tooltip';

export class BasePanelMenuItem {
    constructor(private ref: ChangeDetectorRef) {}

    handleClick(event: Event, item: MenuItem) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        item.expanded = !item.expanded;
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
        <ul [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-submenu': root, 'p-submenu-expanded': expanded }" [@submenu]="getAnimation()" role="tree">
            <ng-template ngFor let-child [ngForOf]="item?.items">
                <li *ngIf="child.separator" class="p-menu-separator" role="separator"></li>
                <li *ngIf="!child.separator" class="p-menuitem" [ngClass]="child.styleClass" [class.p-hidden]="child.visible === false" [ngStyle]="child.style" pTooltip [tooltipOptions]="child.tooltipOptions">
                    <a
                        *ngIf="!child.routerLink"
                        (keydown)="onItemKeyDown($event)"
                        [attr.href]="child.url"
                        class="p-menuitem-link"
                        [attr.tabindex]="!item.expanded || !parentExpanded ? null : child.disabled ? null : '0'"
                        [attr.id]="child.id"
                        [ngClass]="{ 'p-disabled': child.disabled }"
                        role="treeitem"
                        [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event, child)"
                        [target]="child.target"
                        [attr.title]="child.title"
                    >
                        <ng-container *ngIf="child.items">
                            <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                <AngleDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="child.expanded" [ngStyle]="child.iconStyle" />
                                <AngleRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!child.expanded" [ngStyle]="child.iconStyle" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{ child.label }}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                    </a>
                    <a
                        *ngIf="child.routerLink"
                        (keydown)="onItemKeyDown($event)"
                        [routerLink]="child.routerLink"
                        [queryParams]="child.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        [ngClass]="{ 'p-disabled': child.disabled }"
                        [attr.tabindex]="!item.expanded || !parentExpanded ? null : child.disabled ? null : '0'"
                        [attr.id]="child.id"
                        role="treeitem"
                        [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event, child)"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [fragment]="child.fragment"
                        [queryParamsHandling]="child.queryParamsHandling"
                        [preserveFragment]="child.preserveFragment"
                        [skipLocationChange]="child.skipLocationChange"
                        [replaceUrl]="child.replaceUrl"
                        [state]="child.state"
                    >
                        <ng-container *ngIf="child.items">
                            <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                <AngleDownIcon *ngIf="child.expanded" [styleClass]="'p-panelmenu-icon'" [ngStyle]="child.iconStyle" />
                                <AngleRightIcon *ngIf="!child.expanded" [styleClass]="'p-panelmenu-icon'" [ngStyle]="child.iconStyle" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{ child.label }}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                    </a>
                    <p-panelMenuSub [item]="child" [parentExpanded]="expanded && parentExpanded" [expanded]="child.expanded" [transitionOptions]="transitionOptions" *ngIf="child.items"></p-panelMenuSub>
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
export class PanelMenuSub extends BasePanelMenuItem {
    @Input() item: MenuItem | undefined;

    @Input() expanded: boolean | undefined;

    @Input() parentExpanded: boolean | undefined;

    @Input() transitionOptions: string | undefined;

    @Input() root: boolean | undefined;

    constructor(ref: ChangeDetectorRef, public panelMenu: PanelMenu) {
        super(ref);
    }

    onItemKeyDown(event: KeyboardEvent) {
        let listItem = event.currentTarget as HTMLElement;

        switch (event.code) {
            case 'Space':
            case 'Enter':
                if (listItem && !DomHandler.hasClass(listItem, 'p-disabled')) {
                    listItem.click();
                }

                event.preventDefault();
                break;

            default:
                break;
        }
    }

    getAnimation() {
        return this.expanded ? { value: 'visible', params: { transitionParams: this.transitionOptions, height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
}

@Component({
    selector: 'p-panelMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'">
            <ng-container *ngFor="let item of model; let f = first; let l = last">
                <div class="p-panelmenu-panel" *ngIf="visible(item)">
                    <div [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': item.expanded, 'p-disabled': item.disabled }" [class]="item.styleClass" [ngStyle]="item.style" pTooltip [tooltipOptions]="item.tooltipOptions">
                        <a
                            *ngIf="!item.routerLink"
                            [attr.href]="item.url"
                            (click)="handleClick($event, item)"
                            (keydown)="onItemKeyDown($event)"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [attr.id]="item.id"
                            [target]="item.target"
                            [attr.title]="item.title"
                            class="p-panelmenu-header-link"
                            [attr.aria-expanded]="item.expanded"
                            [attr.id]="item.id + '_header'"
                            [attr.aria-controls]="item.id + '_content'"
                        >
                            <!--
                                <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{ 'pi-chevron-right': !item.expanded, 'pi-chevron-down': item.expanded }"></span>
                             -->
                            <ng-container *ngIf="item.items">
                                <ng-container *ngIf="!submenuIconTemplate">
                                    <ChevronDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="item.expanded" />
                                    <ChevronRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!item.expanded" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ item.badge }}</span>
                        </a>
                        <a
                            *ngIf="item.routerLink"
                            [routerLink]="item.routerLink"
                            [queryParams]="item.queryParams"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                            (click)="handleClick($event, item)"
                            (keydown)="onItemKeyDown($event)"
                            [target]="item.target"
                            [attr.title]="item.title"
                            class="p-panelmenu-header-link"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment"
                            [queryParamsHandling]="item.queryParamsHandling"
                            [preserveFragment]="item.preserveFragment"
                            [skipLocationChange]="item.skipLocationChange"
                            [replaceUrl]="item.replaceUrl"
                            [state]="item.state"
                        >
                            <!-- 
                                <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{ 'pi-chevron-right': !item.expanded, 'pi-chevron-down': item.expanded }"></span>
                            -->
                            <ng-container *ngIf="item.items">
                                <ng-container *ngIf="!submenuIconTemplate">
                                    <ChevronDownIcon [styleClass]="'p-panelmenu-icon'" *ngIf="item.expanded" />
                                    <ChevronRightIcon [styleClass]="'p-panelmenu-icon'" *ngIf="!item.expanded" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                            </ng-container>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ item.badge }}</span>
                        </a>
                    </div>
                    <div *ngIf="item.items" class="p-toggleable-content" [ngClass]="{ 'p-panelmenu-expanded': item.expanded }" [@rootItem]="getAnimation(item)" (@rootItem.done)="onToggleDone()">
                        <div class="p-panelmenu-content" role="region" [attr.id]="item.id + '_content'" [attr.aria-labelledby]="item.id + '_header'">
                            <p-panelMenuSub [item]="item" [parentExpanded]="item.expanded" [expanded]="true" [transitionOptions]="transitionOptions" [root]="true"></p-panelMenuSub>
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
export class PanelMenu extends BasePanelMenuItem implements AfterContentInit {
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
    @Input() multiple: boolean = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    submenuIconTemplate: TemplateRef<any> | undefined;

    public animating: boolean | undefined;

    constructor(ref: ChangeDetectorRef) {
        super(ref);
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

    handleClick(event: MouseEvent, item: MenuItem) {
        if (!this.multiple) {
            for (let modelItem of this.model!) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }

        this.animating = true;
        super.handleClick(event, item);
    }

    onToggleDone() {
        this.animating = false;
    }

    onItemKeyDown(event: KeyboardEvent) {
        let listItem = event.currentTarget as HTMLElement;

        switch (event.code) {
            case 'Space':
            case 'Enter':
                if (listItem && !DomHandler.hasClass(listItem, 'p-disabled')) {
                    listItem.click();
                }

                event.preventDefault();
                break;

            default:
                break;
        }
    }

    visible(item: MenuItem) {
        return item.visible !== false;
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
