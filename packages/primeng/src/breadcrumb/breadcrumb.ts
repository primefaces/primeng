import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, inject, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ChevronRightIcon, HomeIcon } from 'primeng/icons';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbItemClickEvent } from './breadcrumb.interface';
import { BreadCrumbStyle } from './style/breadcrumbstyle';

/**
 * Breadcrumb provides contextual information about page hierarchy.
 * @group Components
 */
@Component({
    selector: 'p-breadcrumb',
    standalone: true,
    imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule],
    template: `
        <nav [class]="cn(cx('root'), styleClass)" [style]="style" [attr.data-pc-name]="'breadcrumb'" [attr.data-pc-section]="'root'">
            <ol [attr.data-pc-section]="'menu'" [class]="cx('list')">
                <li [attr.id]="home.id" [class]="cn(cx('homeItem'), home.styleClass)" [ngStyle]="home.style" *ngIf="home && home.visible !== false" pTooltip [tooltipOptions]="home.tooltipOptions" [attr.data-pc-section]="'home'">
                    @if (itemTemplate || _itemTemplate) {
                        <ng-template *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: home }"></ng-template>
                    } @else {
                        <a
                            [href]="home.url ? home.url : null"
                            *ngIf="!home.routerLink"
                            [attr.aria-label]="homeAriaLabel"
                            [class]="cx('itemLink')"
                            (click)="onClick($event, home)"
                            [target]="home.target"
                            [attr.title]="home.title"
                            [attr.tabindex]="home.disabled ? null : '0'"
                        >
                            <span *ngIf="home.icon" [class]="cn(cx('itemIcon'), home.icon)" [ngStyle]="home?.style"></span>
                            <svg data-p-icon="home" *ngIf="!home.icon" [class]="cx('itemIcon')" />
                            <ng-container *ngIf="home.label">
                                <span *ngIf="home.escape !== false; else htmlHomeLabel" [class]="cx('itemLabel')">{{ home.label }}</span>
                                <ng-template #htmlHomeLabel><span [class]="cx('itemLabel')" [innerHTML]="home.label"></span></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="home.routerLink"
                            [routerLink]="home.routerLink"
                            [attr.aria-label]="homeAriaLabel"
                            [queryParams]="home.queryParams"
                            [routerLinkActiveOptions]="home.routerLinkActiveOptions || { exact: false }"
                            [class]="cx('itemLink')"
                            (click)="onClick($event, home)"
                            [target]="home.target"
                            [attr.title]="home.title"
                            [attr.tabindex]="home.disabled ? null : '0'"
                            [fragment]="home.fragment"
                            [queryParamsHandling]="home.queryParamsHandling"
                            [preserveFragment]="home.preserveFragment"
                            [skipLocationChange]="home.skipLocationChange"
                            [replaceUrl]="home.replaceUrl"
                            [state]="home.state"
                        >
                            <span *ngIf="home.icon" [class]="cn(cx('itemIcon'), home.icon)" [style]="home.iconStyle"></span>
                            <svg data-p-icon="home" *ngIf="!home.icon" [class]="cx('itemIcon')" />
                            <ng-container *ngIf="home.label">
                                <span *ngIf="home.escape !== false; else htmlHomeRouteLabel" [class]="cx('itemLabel')">{{ home.label }}</span>
                                <ng-template #htmlHomeRouteLabel><span [class]="cx('itemLabel')" [innerHTML]="home.label"></span></ng-template>
                            </ng-container>
                        </a>
                    }
                </li>
                <li *ngIf="model && home" [class]="cx('separator')" [attr.data-pc-section]="'separator'">
                    <svg data-p-icon="chevron-right" *ngIf="!separatorTemplate && !_separatorTemplate" />
                    <ng-template *ngTemplateOutlet="separatorTemplate || _separatorTemplate"></ng-template>
                </li>
                <ng-template ngFor let-menuitem let-end="last" [ngForOf]="model">
                    <li
                        *ngIf="menuitem.visible !== false"
                        [class]="cn(cx('item', { menuitem }), menuitem.styleClass)"
                        [attr.id]="menuitem.id"
                        [style]="menuitem.style"
                        pTooltip
                        [tooltipOptions]="menuitem.tooltipOptions"
                        [attr.data-pc-section]="'menuitem'"
                    >
                        @if (itemTemplate || _itemTemplate) {
                            <ng-template *ngTemplateOutlet="itemTemplate || _itemTemplate; context: { $implicit: menuitem }"></ng-template>
                        } @else {
                            <a
                                *ngIf="!menuitem?.routerLink"
                                [attr.href]="menuitem?.url ? menuitem?.url : null"
                                [class]="cx('itemLink')"
                                (click)="onClick($event, menuitem)"
                                [target]="menuitem?.target"
                                [attr.title]="menuitem?.title"
                                [attr.tabindex]="menuitem?.disabled ? null : '0'"
                            >
                                <ng-container *ngIf="!itemTemplate && !_itemTemplate">
                                    <span *ngIf="menuitem?.icon" [class]="cn(cx('itemIcon'), menuitem?.icon)" [style]="menuitem?.iconStyle"></span>
                                    <ng-container *ngIf="menuitem?.label">
                                        <span *ngIf="menuitem?.escape !== false; else htmlLabel" [class]="cx('itemLabel')">{{ menuitem?.label }}</span>
                                        <ng-template #htmlLabel><span [class]="cx('itemLabel')" [innerHTML]="menuitem?.label"></span></ng-template>
                                    </ng-container>
                                </ng-container>
                            </a>
                            <a
                                *ngIf="menuitem?.routerLink"
                                [routerLink]="menuitem?.routerLink"
                                [queryParams]="menuitem?.queryParams"
                                [routerLinkActiveOptions]="menuitem?.routerLinkActiveOptions || { exact: false }"
                                [class]="cx('itemLink')"
                                (click)="onClick($event, menuitem)"
                                [target]="menuitem?.target"
                                [attr.title]="menuitem?.title"
                                [attr.tabindex]="menuitem?.disabled ? null : '0'"
                                [fragment]="menuitem?.fragment"
                                [queryParamsHandling]="menuitem?.queryParamsHandling"
                                [preserveFragment]="menuitem?.preserveFragment"
                                [skipLocationChange]="menuitem?.skipLocationChange"
                                [replaceUrl]="menuitem?.replaceUrl"
                                [state]="menuitem?.state"
                            >
                                <span *ngIf="menuitem?.icon" [class]="cn(cx('itemIcon'), menuitem?.icon)" [style]="menuitem?.iconStyle"></span>
                                <ng-container *ngIf="menuitem?.label">
                                    <span *ngIf="menuitem?.escape !== false; else htmlRouteLabel" [class]="cx('itemLabel')">{{ menuitem?.label }}</span>
                                    <ng-template #htmlRouteLabel><span [class]="cx('itemLabel')" [innerHTML]="menuitem?.label"></span></ng-template>
                                </ng-container>
                            </a>
                        }
                    </li>
                    <li *ngIf="!end && menuitem.visible !== false" [class]="cx('separator')" [attr.data-pc-section]="'separator'">
                        <svg data-p-icon="chevron-right" *ngIf="!separatorTemplate && !_separatorTemplate" />
                        <ng-template *ngTemplateOutlet="separatorTemplate || _separatorTemplate"></ng-template>
                    </li>
                </ng-template>
            </ol>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BreadCrumbStyle]
})
export class Breadcrumb extends BaseComponent implements AfterContentInit {
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
     * MenuItem configuration for the home icon.
     * @group Props
     */
    @Input() home: MenuItem | undefined;
    /**
     * Defines a string that labels the home icon for accessibility.
     * @group Props
     */
    @Input() homeAriaLabel: string | undefined;
    /**
     * Fired when an item is selected.
     * @param {BreadcrumbItemClickEvent} event - custom click event.
     * @group Emits
     */
    @Output() onItemClick: EventEmitter<BreadcrumbItemClickEvent> = new EventEmitter<BreadcrumbItemClickEvent>();

    _componentStyle = inject(BreadCrumbStyle);

    constructor(private router: Router) {
        super();
    }

    onClick(event: MouseEvent, item: MenuItem) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }

        this.onItemClick.emit({
            originalEvent: event,
            item: item
        });
    }

    /**
     * Defines template option for item.
     * @group Templates
     */
    @ContentChild('item') itemTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for separator.
     * @group Templates
     */
    @ContentChild('separator') separatorTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _separatorTemplate: TemplateRef<any> | undefined;

    _itemTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'separator':
                    this._separatorTemplate = item.template;
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
}

@NgModule({
    imports: [Breadcrumb, SharedModule],
    exports: [Breadcrumb, SharedModule]
})
export class BreadcrumbModule {}
