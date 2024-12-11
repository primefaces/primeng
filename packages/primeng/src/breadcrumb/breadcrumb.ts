import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, inject, Input, NgModule, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem, SharedModule } from 'primeng/api';
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
    imports: [RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule, NgStyle, NgClass, NgTemplateOutlet],
    template: `
        <nav [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'" [attr.data-pc-name]="'breadcrumb'" [attr.data-pc-section]="'root'">
            <ol [attr.data-pc-section]="'menu'" class="p-breadcrumb-list">
                @if (home) {
                    <li [class]="home.styleClass" [attr.id]="home.id" [ngClass]="{ 'p-breadcrumb-home-item': true, 'p-disabled': home.disabled }" [ngStyle]="home.style" pTooltip [tooltipOptions]="home.tooltipOptions" [attr.data-pc-section]="'home'">
                        @if (!home.routerLink) {
                            <a
                                [href]="home.url ? home.url : null"
                                [attr.aria-label]="homeAriaLabel"
                                class="p-breadcrumb-item-link"
                                (click)="onClick($event, home)"
                                [target]="home.target"
                                [attr.title]="home.title"
                                [attr.tabindex]="home.disabled ? null : '0'"
                            >
                                @if (home.icon) {
                                    <span class="p-breadcrumb-item-icon" [ngClass]="home.icon" [ngStyle]="home?.style"></span>
                                }
                                @if (!home.icon) {
                                    <HomeIcon [styleClass]="'p-breadcrumb-item-icon'" />
                                }
                                @if (home.label) {
                                    @if (home.escape !== false) {
                                        <span class="p-breadcrumb-item-label">{{ home.label }}</span>
                                    } @else {
                                        <span class="p-breadcrumb-item-label" [innerHTML]="home.label"></span>
                                    }
                                }
                            </a>
                        }
                        @if (home.routerLink) {
                            <a
                                [routerLink]="home.routerLink"
                                [attr.aria-label]="homeAriaLabel"
                                [queryParams]="home.queryParams"
                                [routerLinkActiveOptions]="home.routerLinkActiveOptions || { exact: false }"
                                class="p-breadcrumb-item-link"
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
                                @if (home.icon) {
                                    <span class="p-breadcrumb-item-icon" [ngClass]="home.icon" [ngStyle]="home.iconStyle"></span>
                                }
                                @if (!home.icon) {
                                    <HomeIcon [styleClass]="'p-breadcrumb-item-icon'" />
                                }
                                @if (home.label) {
                                    @if (home.escape !== false) {
                                        <span class="p-breadcrumb-item-label">{{ home.label }}</span>
                                    } @else {
                                        <span class="p-breadcrumb-item-label" [innerHTML]="home.label"></span>
                                    }
                                }
                            </a>
                        }
                    </li>
                }
                @if (model && home) {
                    <li class="p-breadcrumb-separator" [attr.data-pc-section]="'separator'">
                        @if (!separator) {
                            <ChevronRightIcon />
                        }
                        <ng-template *ngTemplateOutlet="separator"></ng-template>
                    </li>
                }
                @for (menuitem of model; track menuitem; let end = $last) {
                    <li
                        [class]="menuitem.styleClass"
                        [attr.id]="menuitem.id"
                        [ngStyle]="menuitem.style"
                        [ngClass]="{ 'p-breadcrumb-item': true, 'p-disabled': menuitem.disabled }"
                        pTooltip
                        [tooltipOptions]="menuitem.tooltipOptions"
                        [attr.data-pc-section]="'menuitem'"
                    >
                        @if (item) {
                            <ng-template *ngTemplateOutlet="item; context: { $implicit: menuitem }"></ng-template>
                        } @else {
                            @if (!menuitem?.routerLink) {
                                <a
                                    [attr.href]="menuitem?.url ? menuitem?.url : null"
                                    class="p-breadcrumb-item-link"
                                    (click)="onClick($event, item)"
                                    [target]="menuitem?.target"
                                    [attr.title]="menuitem?.title"
                                    [attr.tabindex]="menuitem?.disabled ? null : '0'"
                                >
                                    @if (!item) {
                                        @if (menuitem?.icon) {
                                            <span class="p-breadcrumb-item-icon" [ngClass]="menuitem?.icon" [ngStyle]="menuitem?.iconStyle"></span>
                                        }
                                        @if (menuitem?.label) {
                                            @if (menuitem?.escape !== false) {
                                                <span class="p-breadcrumb-item-label'">{{ menuitem?.label }}</span>
                                            } @else {
                                                <span class="p-breadcrumb-item-label'" [innerHTML]="menuitem?.label"></span>
                                            }
                                        }
                                    }
                                </a>
                            }
                            @if (menuitem?.routerLink) {
                                <a
                                    [routerLink]="menuitem?.routerLink"
                                    [queryParams]="menuitem?.queryParams"
                                    [routerLinkActiveOptions]="menuitem?.routerLinkActiveOptions || { exact: false }"
                                    class="p-breadcrumb-item-link"
                                    (click)="onClick($event, item)"
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
                                    @if (menuitem?.icon) {
                                        <span class="p-breadcrumb-item-icon" [ngClass]="menuitem?.icon" [ngStyle]="menuitem?.iconStyle"></span>
                                    }
                                    @if (menuitem?.label) {
                                        @if (menuitem?.escape !== false) {
                                            <span class="p-breadcrumb-item-label'">{{ menuitem?.label }}</span>
                                        } @else {
                                            <span class="p-breadcrumb-item-label'" [innerHTML]="menuitem?.label"></span>
                                        }
                                    }
                                </a>
                            }
                        }
                    </li>
                    @if (!end) {
                        <li class="p-breadcrumb-separator" [attr.data-pc-section]="'separator'">
                            @if (!separator) {
                                <ChevronRightIcon />
                            }
                            <ng-template *ngTemplateOutlet="separator"></ng-template>
                        </li>
                    }
                }
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

    onHomeClick(event: MouseEvent | any) {
        if (this.home) {
            this.onClick(event, this.home);
        }
    }

    /**
     * Defines template option for item.
     * @group Templates
     */
    @ContentChild('item') item: TemplateRef<any> | undefined;

    /**
     * Defines template option for separator.
     * @group Templates
     */
    @ContentChild('separator') separator: TemplateRef<any> | undefined;
}

@NgModule({
    imports: [Breadcrumb, SharedModule],
    exports: [Breadcrumb, SharedModule]
})
export class BreadcrumbModule {}
