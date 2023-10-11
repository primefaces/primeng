import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { Nullable } from 'primeng/ts-helpers';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
/**
 * Steps components is an indicator for the steps in a wizard workflow.
 * @group Components
 */
@Component({
    selector: 'p-steps',
    template: `
        <nav [ngClass]="{ 'p-steps p-component': true, 'p-readonly': readonly }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'steps'">
            <ul #list role="tablist" [attr.data-pc-section]="'menu'">
                <li
                    *ngFor="let item of model; let i = index"
                    class="p-steps-item"
                    #menuitem
                    [ngStyle]="item.style"
                    [class]="item.styleClass"
                    role="presentation"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i)) }"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        role="tab"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="onItemClick($event, item, i)"
                        (keydown)="onItemKeydown($event, item, i)"
                        [target]="item.target"
                        [attr.id]="item.id"
                        [attr.tabindex]="getItemTabIndex(item, i)"
                        [attr.aria-selected]="i === activeIndex"
                        [attr.aria-expanded]="i === activeIndex"
                        [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [ariaCurrentWhenActive]="exact ? 'step' : undefined"
                    >
                        <span class="p-steps-number">{{ i + 1 }}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            [attr.href]="item.url"
                            class="p-menuitem-link"
                            role="tab"
                            (click)="onItemClick($event, item, i)"
                            (keydown)="onItemKeydown($event, item, i)"
                            [target]="item.target"
                            [attr.id]="item.id"
                            [attr.tabindex]="getItemTabIndex(item, i)"
                            [attr.aria-selected]="i === activeIndex"
                            [attr.aria-expanded]="i === activeIndex"
                            [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                            [ariaCurrentWhenActive]="exact && (!item.disabled || readonly) ? 'step' : undefined"
                        >
                            <span class="p-steps-number">{{ i + 1 }}</span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./steps.css'],
    host: {
        class: 'p-element'
    }
})
export class Steps implements OnInit, OnDestroy {
    /**
     * Index of the active item.
     * @group Props
     */
    @Input() activeIndex: number = 0;
    /**
     * An array of menu items.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
    /**
     * Whether the items are clickable or not.
     * @group Props
     */
    @Input() readonly: boolean = true;
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
    @Input() exact: boolean = true;
    /**
     * Callback to invoke when the new step is selected.
     * @param {number} number - current index.
     * @group Emits
     */
    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('list', { static: false }) listViewChild: Nullable<ElementRef>;

    constructor(private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

    subscription: Subscription | undefined;

    ngOnInit() {
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
                    const siblings = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
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
        const firstSibling = DomHandler.findSingle(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');

        return firstSibling ? firstSibling.children[0] : null;
    }
    findLastItem() {
        const siblings = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');

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
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, TooltipModule],
    exports: [Steps, RouterModule, TooltipModule],
    declarations: [Steps]
})
export class StepsModule {}
