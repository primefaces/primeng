import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';

@Component({
    selector: 'p-steps',
    template: `
        <div [ngClass]="{ 'p-steps p-component': true, 'p-readonly': readonly }" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li
                    *ngFor="let item of model; let i = index"
                    class="p-steps-item"
                    #menuitem
                    [ngStyle]="item.style"
                    [class]="item.styleClass"
                    role="tab"
                    [attr.aria-selected]="i === activeIndex"
                    [attr.aria-expanded]="i === activeIndex"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i)) }"
                >
                    <a
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        role="presentation"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="itemClick($event, item, i)"
                        (keydown.enter)="itemClick($event, item, i)"
                        [target]="item.target"
                        [attr.id]="item.id"
                        [attr.tabindex]="item.disabled || readonly ? null : item.tabindex ? item.tabindex : '0'"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                    >
                        <span class="p-steps-number">{{ i + 1 }}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            [attr.href]="item.url"
                            class="p-menuitem-link"
                            role="presentation"
                            (click)="itemClick($event, item, i)"
                            (keydown.enter)="itemClick($event, item, i)"
                            [target]="item.target"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) ? null : item.tabindex ? item.tabindex : '0'"
                        >
                            <span class="p-steps-number">{{ i + 1 }}</span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
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
     * An array of menuitems.
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
     * Callback to invoke when the new step is selected.
     * @param {number} number - current index.
     * @group Emits
     */
    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

    constructor(private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

    subscription: Subscription | undefined;

    ngOnInit() {
        this.subscription = this.router.events.subscribe(() => this.cd.markForCheck());
    }

    itemClick(event: Event, item: MenuItem, i: number) {
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
