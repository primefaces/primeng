import { NgModule, Component, Input, ElementRef, ContentChild, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef, AfterContentInit, ContentChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'p-dock',
    template: `
        <div [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass">
            <ul #list class="p-dock-list" role="menu" (mouseleave)="onListMouseLeave()">
                <li *ngFor="let item of model; let i = index" [ngClass]="itemClass(i)" (mouseenter)="onItemMouseEnter(i)">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" pRipple [routerLink]="item.routerLink" [queryParams]="item.queryParams"
                        [ngClass]="{'p-disabled':item.disabled}" class="p-dock-action"  role="menuitem" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" (click)="onItemClick($event, item)" (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"  pTooltip [tooltipOptions]="item.tooltipOptions"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon"></span>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                    </a>
                    <ng-template #elseBlock>
                        <a [tooltipPosition]="item.tooltipPosition" [attr.href]="item.url||null" class="p-dock-action"  role="menuitem" pRipple (click)="onItemClick($event, item)"  pTooltip [tooltipOptions]="item.tooltipOptions"
                            [ngClass]="{'p-disabled':item.disabled}" (keydown.enter)="onItemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-dock-action-icon" *ngIf="item.icon && !itemTemplate" [ngClass]="item.icon"></span>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dock.css']
})
export class Dock implements AfterContentInit {

    @Input() id: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() model: any[] = null;

    @Input() position: string = "bottom";

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    itemTemplate: TemplateRef<any>;

    currentIndex: number;

    constructor(private el: ElementRef, public cd: ChangeDetectorRef) {
        this.currentIndex = -3;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    onListMouseLeave() {
        this.currentIndex = -3;
        this.cd.markForCheck();
    }

    onItemMouseEnter(index) {
        this.currentIndex = index;

        if (index === 1) {

        }

        this.cd.markForCheck();
    }

    onItemClick(e, item) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }
    }

    get containerClass() {
        return {
            ['p-dock p-component ' + ` p-dock-${this.position}`]: true
        };
    }

    isClickableRouterLink(item: any) {
        return item.routerLink && !item.disabled;
    }

    itemClass(index) {
        return {
            'p-dock-item': true,
            'p-dock-item-second-prev': (this.currentIndex - 2) === index,
            'p-dock-item-prev': (this.currentIndex - 1) === index,
            'p-dock-item-current': this.currentIndex === index,
            'p-dock-item-next': (this.currentIndex + 1) === index,
            'p-dock-item-second-next': (this.currentIndex + 2) === index
        }
    }

}

@NgModule({
    imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
    exports: [Dock, SharedModule, TooltipModule, RouterModule],
    declarations: [Dock]
})
export class DockModule { }
