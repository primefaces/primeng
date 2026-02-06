import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MenuItem, SharedModule } from 'primeng/api';
import { Badge } from 'primeng/badge';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ChevronRightIcon, HomeIcon } from 'primeng/icons';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbItemClickEvent, BreadcrumbItemTemplateContext, BreadcrumbPassThrough } from 'primeng/types/breadcrumb';
import type { CSSProperties } from 'primeng/types/shared';
import { BreadCrumbStyle } from './style/breadcrumbstyle';

const BREADCRUMB_INSTANCE = new InjectionToken<Breadcrumb>('BREADCRUMB_INSTANCE');

/**
 * Breadcrumb provides contextual information about page hierarchy.
 * @group Components
 */
@Component({
    selector: 'p-breadcrumb',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, RouterLink, RouterLinkActive, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule, Bind, Badge],
    template: `
        <nav [pBind]="ptm('root')" [class]="cn(cx('root'), styleClass())" [style]="style()">
            <ol [class]="cx('list')" [pBind]="ptm('list')">
                @if (showHome()) {
                    @let homeItem = home()!;
                    <li [attr.id]="homeItem.id" [class]="cn(cx('homeItem'), homeItem.styleClass)" [style]="homeItem.style" pTooltip [tooltipOptions]="homeItem.tooltipOptions" [pBind]="ptm('homeItem')" [unstyled]="unstyled()">
                        @if (itemTemplate()) {
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: homeContext()"></ng-container>
                        } @else {
                            @if (!homeItem.routerLink) {
                                <a
                                    [href]="homeHref()"
                                    [attr.aria-label]="homeAriaLabel()"
                                    [class]="cn(cx('itemLink'), homeItem.linkClass)"
                                    [style]="homeItem.linkStyle"
                                    (click)="onClick($event, homeItem)"
                                    [target]="homeItem.target"
                                    [attr.title]="homeItem.title"
                                    [attr.tabindex]="homeTabindex()"
                                    [attr.data-automationid]="homeItem.automationId"
                                    [pBind]="ptm('itemLink')"
                                >
                                    @if (homeItem.icon) {
                                        <span [class]="cn(cx('itemIcon'), homeItem.icon, homeItem.iconClass)" [style]="homeItem.iconStyle" [pBind]="ptm('itemIcon')"></span>
                                    } @else {
                                        <svg data-p-icon="home" [class]="cx('itemIcon')" [pBind]="ptm('itemIcon')" />
                                    }
                                    @if (homeItem.label) {
                                        @if (homeItem.escape !== false) {
                                            <span [class]="cn(cx('itemLabel'), homeItem.labelClass)" [style]="homeItem.labelStyle" [pBind]="ptm('itemLabel')">{{ homeItem.label }}</span>
                                        } @else {
                                            <span [class]="cn(cx('itemLabel'), homeItem.labelClass)" [style]="homeItem.labelStyle" [innerHTML]="homeItem.label" [pBind]="ptm('itemLabel')"></span>
                                        }
                                    }
                                    @if (homeItem.badge) {
                                        <p-badge [class]="homeItem.badgeStyleClass" [value]="homeItem.badge" [pt]="ptm('pcBadge')" [unstyled]="unstyled()" />
                                    }
                                </a>
                            } @else {
                                <a
                                    [routerLink]="homeItem.routerLink"
                                    routerLinkActive="p-menuitem-link-active"
                                    [attr.aria-label]="homeAriaLabel()"
                                    [queryParams]="homeItem.queryParams"
                                    [routerLinkActiveOptions]="getRouterLinkActiveOptions(homeItem)"
                                    [class]="cn(cx('itemLink'), homeItem.linkClass)"
                                    [style]="homeItem.linkStyle"
                                    (click)="onClick($event, homeItem)"
                                    [target]="homeItem.target"
                                    [attr.title]="homeItem.title"
                                    [attr.tabindex]="homeTabindex()"
                                    [attr.data-automationid]="homeItem.automationId"
                                    [fragment]="homeItem.fragment"
                                    [queryParamsHandling]="homeItem.queryParamsHandling"
                                    [preserveFragment]="homeItem.preserveFragment"
                                    [skipLocationChange]="homeItem.skipLocationChange"
                                    [replaceUrl]="homeItem.replaceUrl"
                                    [state]="homeItem.state"
                                    [pBind]="ptm('itemLink')"
                                >
                                    @if (homeItem.icon) {
                                        <span [class]="cn(cx('itemIcon'), homeItem.icon, homeItem.iconClass)" [style]="homeItem.iconStyle" [pBind]="ptm('itemIcon')"></span>
                                    } @else {
                                        <svg data-p-icon="home" [class]="cx('itemIcon')" [pBind]="ptm('itemIcon')" />
                                    }
                                    @if (homeItem.label) {
                                        @if (homeItem.escape !== false) {
                                            <span [class]="cn(cx('itemLabel'), homeItem.labelClass)" [style]="homeItem.labelStyle" [pBind]="ptm('itemLabel')">{{ homeItem.label }}</span>
                                        } @else {
                                            <span [class]="cn(cx('itemLabel'), homeItem.labelClass)" [style]="homeItem.labelStyle" [innerHTML]="homeItem.label" [pBind]="ptm('itemLabel')"></span>
                                        }
                                    }
                                    @if (homeItem.badge) {
                                        <p-badge [class]="homeItem.badgeStyleClass" [value]="homeItem.badge" [pt]="ptm('pcBadge')" [unstyled]="unstyled()" />
                                    }
                                </a>
                            }
                        }
                    </li>
                }
                @if (showSeparator()) {
                    <li [class]="cx('separator')" [pBind]="ptm('separator')">
                        @if (!separatorTemplate()) {
                            <svg data-p-icon="chevron-right" [pBind]="ptm('separatorIcon')" />
                        } @else {
                            <ng-container *ngTemplateOutlet="separatorTemplate()"></ng-container>
                        }
                    </li>
                }
                @for (menuitem of model(); track menuitem.id || $index; let end = $last, i = $index) {
                    @if (menuitem.visible !== false) {
                        <li
                            [class]="cn(cx('item', { menuitem }), menuitem.styleClass)"
                            [attr.id]="menuitem.id"
                            [style]="menuitem.style"
                            pTooltip
                            [tooltipOptions]="menuitem.tooltipOptions"
                            [pBind]="getPTOptions(menuitem, i, 'item')"
                            [pTooltipUnstyled]="unstyled()"
                        >
                            @if (itemTemplate()) {
                                <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: menuitem }"></ng-container>
                            } @else {
                                @if (!menuitem.routerLink) {
                                    <a
                                        [attr.href]="getItemHref(menuitem)"
                                        [class]="cn(cx('itemLink'), menuitem.linkClass)"
                                        [style]="menuitem.linkStyle"
                                        (click)="onClick($event, menuitem)"
                                        [target]="menuitem.target"
                                        [attr.title]="menuitem.title"
                                        [attr.tabindex]="getItemTabindex(menuitem)"
                                        [attr.data-automationid]="menuitem.automationId"
                                        [pBind]="getPTOptions(menuitem, i, 'itemLink')"
                                    >
                                        @if (menuitem.icon) {
                                            <span [class]="cn(cx('itemIcon'), menuitem.icon, menuitem.iconClass)" [style]="menuitem.iconStyle" [pBind]="getPTOptions(menuitem, i, 'itemIcon')"></span>
                                        }
                                        @if (menuitem.label) {
                                            @if (menuitem.escape !== false) {
                                                <span [class]="cn(cx('itemLabel'), menuitem.labelClass)" [style]="menuitem.labelStyle" [pBind]="getPTOptions(menuitem, i, 'itemLabel')">{{ menuitem.label }}</span>
                                            } @else {
                                                <span [class]="cn(cx('itemLabel'), menuitem.labelClass)" [style]="menuitem.labelStyle" [innerHTML]="menuitem.label" [pBind]="getPTOptions(menuitem, i, 'itemLabel')"></span>
                                            }
                                        }
                                        @if (menuitem.badge) {
                                            <p-badge [class]="menuitem.badgeStyleClass" [value]="menuitem.badge" [pt]="getPTOptions(menuitem, i, 'pcBadge')" [unstyled]="unstyled()" />
                                        }
                                    </a>
                                } @else {
                                    <a
                                        [routerLink]="menuitem.routerLink"
                                        routerLinkActive="p-menuitem-link-active"
                                        [queryParams]="menuitem.queryParams"
                                        [routerLinkActiveOptions]="getRouterLinkActiveOptions(menuitem)"
                                        [class]="cn(cx('itemLink'), menuitem.linkClass)"
                                        [style]="menuitem.linkStyle"
                                        (click)="onClick($event, menuitem)"
                                        [target]="menuitem.target"
                                        [attr.title]="menuitem.title"
                                        [attr.tabindex]="getItemTabindex(menuitem)"
                                        [attr.data-automationid]="menuitem.automationId"
                                        [fragment]="menuitem.fragment"
                                        [queryParamsHandling]="menuitem.queryParamsHandling"
                                        [preserveFragment]="menuitem.preserveFragment"
                                        [skipLocationChange]="menuitem.skipLocationChange"
                                        [replaceUrl]="menuitem.replaceUrl"
                                        [state]="menuitem.state"
                                        [pBind]="getPTOptions(menuitem, i, 'itemLink')"
                                    >
                                        @if (menuitem.icon) {
                                            <span [class]="cn(cx('itemIcon'), menuitem.icon, menuitem.iconClass)" [style]="menuitem.iconStyle" [pBind]="getPTOptions(menuitem, i, 'itemIcon')"></span>
                                        }
                                        @if (menuitem.label) {
                                            @if (menuitem.escape !== false) {
                                                <span [class]="cn(cx('itemLabel'), menuitem.labelClass)" [style]="menuitem.labelStyle" [pBind]="getPTOptions(menuitem, i, 'itemLabel')">{{ menuitem.label }}</span>
                                            } @else {
                                                <span [class]="cn(cx('itemLabel'), menuitem.labelClass)" [style]="menuitem.labelStyle" [innerHTML]="menuitem.label" [pBind]="getPTOptions(menuitem, i, 'itemLabel')"></span>
                                            }
                                        }
                                        @if (menuitem.badge) {
                                            <p-badge [class]="menuitem.badgeStyleClass" [value]="menuitem.badge" [pt]="getPTOptions(menuitem, i, 'pcBadge')" [unstyled]="unstyled()" />
                                        }
                                    </a>
                                }
                            }
                        </li>
                        @if (!end) {
                            <li [class]="cx('separator')" [pBind]="ptm('separator')">
                                @if (!separatorTemplate()) {
                                    <svg data-p-icon="chevron-right" [pBind]="ptm('separatorIcon')" />
                                } @else {
                                    <ng-container *ngTemplateOutlet="separatorTemplate()"></ng-container>
                                }
                            </li>
                        }
                    }
                }
            </ol>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BreadCrumbStyle, { provide: BREADCRUMB_INSTANCE, useExisting: Breadcrumb }, { provide: PARENT_INSTANCE, useExisting: Breadcrumb }],
    hostDirectives: [Bind]
})
export class Breadcrumb extends BaseComponent<BreadcrumbPassThrough> {
    componentName = 'Breadcrumb';

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * An array of menuitems.
     * @group Props
     */
    model = input<MenuItem[]>();

    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<CSSProperties>();

    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();

    /**
     * MenuItem configuration for the home icon.
     * @group Props
     */
    home = input<MenuItem>();

    /**
     * Defines a string that labels the home icon for accessibility.
     * @group Props
     */
    homeAriaLabel = input<string>();

    /**
     * Fired when an item is selected.
     * @param {BreadcrumbItemClickEvent} event - custom click event.
     * @group Emits
     */
    onItemClick = output<BreadcrumbItemClickEvent>();

    /**
     * Custom item template.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<BreadcrumbItemTemplateContext>>('item');

    /**
     * Custom separator template.
     * @group Templates
     */
    separatorTemplate = contentChild<TemplateRef<void>>('separator');

    showHome = computed(() => this.home() && this.home()!.visible !== false);

    homeContext = computed<BreadcrumbItemTemplateContext>(() => ({ $implicit: this.home()! }));

    homeHref = computed(() => this.home()?.url ?? null);

    homeTabindex = computed(() => (this.home()?.disabled ? null : this.home()?.tabindex || '0'));

    showSeparator = computed(() => this.model() && this.home());

    _componentStyle = inject(BreadCrumbStyle);

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

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    getPTOptions(item: MenuItem, index: number, key: string) {
        return this.ptm(key, {
            context: {
                item,
                index
            }
        });
    }

    getItemHref(item: MenuItem) {
        return item.url ?? null;
    }

    getItemTabindex(item: MenuItem) {
        return item.disabled ? null : item.tabindex || '0';
    }

    getRouterLinkActiveOptions(item: MenuItem) {
        return item.routerLinkActiveOptions || { exact: false };
    }
}

@NgModule({
    imports: [Breadcrumb, SharedModule],
    exports: [Breadcrumb, SharedModule]
})
export class BreadcrumbModule {}
