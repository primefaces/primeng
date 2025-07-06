import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, NgModule, numberAttribute, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { find, findSingle } from '@primeuix/utils';
import { MenuItem, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { TooltipModule } from 'primeng/tooltip';
import { Nullable } from 'primeng/ts-helpers';
import { Subscription } from 'rxjs';
import { StepsStyle } from './style/stepsstyle';

/**
 * Steps components is an indicator for the steps in a wizard workflow.
 * @group Components
 */
@Component({
    selector: 'p-steps',
    standalone: true,
    imports: [CommonModule, RouterModule, TooltipModule, SharedModule],
    template: `
        <nav [class]="cn(cx('root'), styleClass)" [ngStyle]="style" [attr.data-pc-name]="'steps'">
            <ul #list [attr.data-pc-section]="'menu'" [class]="cx('list')">
                @for (item of model; track item.label; let i = $index) {
                    <li
                        *ngIf="item.visible !== false"
                        [class]="cx('item', { item, index: i })"
                        #menuitem
                        [ngStyle]="item.style"
                        [attr.aria-current]="isActive(item, i) ? 'step' : undefined"
                        [attr.id]="item.id"
                        pTooltip
                        [tooltipOptions]="item.tooltipOptions"
                        [attr.data-pc-section]="'menuitem'"
                    >
                        <a
                            role="link"
                            *ngIf="isClickableRouterLink(item); else elseBlock"
                            [routerLink]="item.routerLink"
                            [queryParams]="item.queryParams"
                            [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                            [class]="cx('itemLink')"
                            (click)="onItemClick($event, item, i)"
                            (keydown)="onItemKeydown($event, item, i)"
                            [target]="item.target"
                            [attr.tabindex]="getItemTabIndex(item, i)"
                            [attr.aria-expanded]="i === activeIndex"
                            [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                            [fragment]="item.fragment"
                            [queryParamsHandling]="item.queryParamsHandling"
                            [preserveFragment]="item.preserveFragment"
                            [skipLocationChange]="item.skipLocationChange"
                            [replaceUrl]="item.replaceUrl"
                            [state]="item.state"
                            [attr.ariaCurrentWhenActive]="exact ? 'step' : undefined"
                        >
                            <span [class]="cx('itemNumber')">{{ i + 1 }}</span>
                            <span [class]="cx('itemLabel')" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                            <ng-template #htmlLabel><span [class]="cx('itemLabel')" [innerHTML]="item.label"></span></ng-template>
                        </a>
                        <ng-template #elseBlock>
                            <a
                                role="link"
                                [attr.href]="item.url"
                                [class]="cx('itemLink')"
                                (click)="onItemClick($event, item, i)"
                                (keydown)="onItemKeydown($event, item, i)"
                                [target]="item.target"
                                [attr.tabindex]="getItemTabIndex(item, i)"
                                [attr.aria-expanded]="i === activeIndex"
                                [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                                [attr.ariaCurrentWhenActive]="exact && (!item.disabled || readonly) ? 'step' : undefined"
                            >
                                <span [class]="cx('itemNumber')">{{ i + 1 }}</span>
                                <span [class]="cx('itemLabel')" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                                <ng-template #htmlRouteLabel><span [class]="cx('itemLabel')" [innerHTML]="item.label"></span></ng-template>
                            </a>
                        </ng-template>
                    </li>
                }
            </ul>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [StepsStyle]
})
export class Steps extends BaseComponent implements OnInit, OnDestroy {
    /**
     * Index of the active item.
     * @group Props
     */
    @Input({ transform: numberAttribute }) activeIndex: number = 0;
    /**
     * An array of menu items.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
    /**
     * Whether the items are clickable or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) readonly: boolean = true;
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
     * Whether to apply 'router-link-active-exact' class if route exactly matches the item path.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) exact: boolean = true;
    /**
     * Callback to invoke when the new step is selected.
     * @param {number} number - current index.
     * @group Emits
     */
    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('list', { static: false }) listViewChild: Nullable<ElementRef>;

    router = inject(Router);

    route = inject(ActivatedRoute);

    _componentStyle = inject(StepsStyle);

    subscription: Subscription | undefined;

    ngOnInit() {
        super.ngOnInit();
        this.subscription = this.router.events.subscribe(() => this.cd.markForCheck());
    }

    onItemClick(event: Event, item: MenuItem, i: number) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            return;
        }

        this.activeIndexChange.emit(i);

        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    }

    onItemKeydown(event: KeyboardEvent, item: MenuItem, i: number) {
        switch (event.code) {
            case 'ArrowRight': {
                this.navigateToNextItem(event.target);
                event.preventDefault();
                break;
            }

            case 'ArrowLeft': {
                this.navigateToPrevItem(event.target);
                event.preventDefault();
                break;
            }

            case 'Home': {
                this.navigateToFirstItem(event.target);
                event.preventDefault();
                break;
            }

            case 'End': {
                this.navigateToLastItem(event.target);
                event.preventDefault();
                break;
            }

            case 'Tab':
                if (i !== this.activeIndex) {
                    const siblings = <any>find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
                    siblings[i].children[0].tabIndex = '-1';
                    siblings[this.activeIndex].children[0].tabIndex = '0';
                }
                break;

            case 'Enter':
            case 'Space': {
                this.onItemClick(event, item, i);
                event.preventDefault();
                break;
            }

            default:
                break;
        }
    }

    navigateToNextItem(target) {
        const nextItem = this.findNextItem(target);

        nextItem && this.setFocusToMenuitem(target, nextItem);
    }

    navigateToPrevItem(target) {
        const prevItem = this.findPrevItem(target);

        prevItem && this.setFocusToMenuitem(target, prevItem);
    }

    navigateToFirstItem(target) {
        const firstItem = this.findFirstItem();

        firstItem && this.setFocusToMenuitem(target, firstItem);
    }

    navigateToLastItem(target) {
        const lastItem = this.findLastItem();

        lastItem && this.setFocusToMenuitem(target, lastItem);
    }

    findNextItem(item) {
        const nextItem = item.parentElement.nextElementSibling;

        return nextItem ? nextItem.children[0] : null;
    }

    findPrevItem(item) {
        const prevItem = item.parentElement.previousElementSibling;

        return prevItem ? prevItem.children[0] : null;
    }

    findFirstItem() {
        const firstSibling = findSingle(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');

        return firstSibling ? firstSibling.children[0] : null;
    }

    findLastItem() {
        const siblings = find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');

        return siblings ? siblings[siblings.length - 1].children[0] : null;
    }

    setFocusToMenuitem(target, focusableItem) {
        target.tabIndex = '-1';
        focusableItem.tabIndex = '0';
        focusableItem.focus();
    }

    isClickableRouterLink(item: MenuItem) {
        return item.routerLink && !this.readonly && !item.disabled;
    }

    isItemDisabled(item: MenuItem, index: number): boolean {
        return item.disabled || (this.readonly && !this.isActive(item, index));
    }

    isActive(item: MenuItem, index: number) {
        if (item.routerLink) {
            let routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];

            return this.router.isActive(this.router.createUrlTree(routerLink, { relativeTo: this.route }).toString(), false);
        }

        return index === this.activeIndex;
    }

    getItemTabIndex(item: MenuItem, index: number): string {
        if (item.disabled) {
            return '-1';
        }

        if (!item.disabled && this.activeIndex === index) {
            return item.tabindex || '0';
        }

        return item.tabindex ?? '-1';
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Steps, SharedModule],
    exports: [Steps, SharedModule]
})
export class StepsModule {}
