import {NgModule,Component,Input,ContentChildren,QueryList,AfterContentInit,AfterViewInit,AfterViewChecked,TemplateRef,ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RippleModule} from 'primeng/ripple';
import {PrimeTemplate, SharedModule, MenuItem} from 'primeng/api';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {DomHandler} from 'primeng/dom';
import {TooltipModule} from 'primeng/tooltip';

@Component({
    selector: 'p-tabMenu',
    template: `
        <div [ngClass]="{'p-tabmenu p-component': true, 'p-tabmenu-scrollable': scrollable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-tabmenu-nav-container">
                <button *ngIf="scrollable && !backwardIsDisabled" #prevBtn class="p-tabmenu-nav-prev p-tabmenu-nav-btn p-link" (click)="navBackward()" type="button" pRipple>
                    <span class="pi pi-chevron-left"></span>
                </button>
                <div #content class="p-tabmenu-nav-content" (scroll)="onScroll($event)">
                    <ul #navbar class="p-tabmenu-nav p-reset" role="tablist">
                        <li *ngFor="let item of model; let i = index" role="tab" [ngStyle]="item.style" [class]="item.styleClass" [attr.aria-selected]="isActive(item)" [attr.aria-expanded]="isActive(item)"
                            [ngClass]="{'p-tabmenuitem':true,'p-disabled':item.disabled,'p-highlight':isActive(item),'p-hidden': item.visible === false}" pTooltip [tooltipOptions]="item.tooltipOptions">
                            <a *ngIf="!item.routerLink" [attr.href]="item.url" class="p-menuitem-link" role="presentation" (click)="itemClick($event,item)" (keydown.enter)="itemClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'"
                                [target]="item.target" [attr.title]="item.title" [attr.id]="item.id" pRipple>
                                <ng-container *ngIf="!itemTemplate">
                                    <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                                    <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                                </ng-container>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                            </a>
                            <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}"
                                role="presentation" class="p-menuitem-link" (click)="itemClick($event,item)" (keydown.enter)="itemClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'"
                                [target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
                                [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state" pRipple>
                                <ng-container *ngIf="!itemTemplate">
                                    <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                                    <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                                </ng-container>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                            </a>
                        </li>
                        <li #inkbar class="p-tabmenu-ink-bar"></li>
                    </ul>
                </div>
                <button *ngIf="scrollable && !forwardIsDisabled" #nextBtn class="p-tabmenu-nav-next p-tabmenu-nav-btn p-link" (click)="navForward()" type="button" pRipple>
                    <span class="pi pi-chevron-right"></span>
                </button>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tabmenu.css'],
    host: {
        'class': 'p-element'
    }
})
export class TabMenu implements AfterContentInit,AfterViewInit,AfterViewChecked,OnDestroy {

    @Input() model: MenuItem[];

    @Input() activeItem: MenuItem;

    @Input() scrollable: boolean;

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @ViewChild('content') content: ElementRef;

    @ViewChild('navbar') navbar: ElementRef;

    @ViewChild('inkbar') inkbar: ElementRef;

    @ViewChild('prevBtn') prevBtn: ElementRef;

    @ViewChild('nextBtn') nextBtn: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    itemTemplate: TemplateRef<any>;

    tabChanged: boolean;

    backwardIsDisabled: boolean = true;

    forwardIsDisabled: boolean = false;

    private timerIdForInitialAutoScroll: number | null = null;

    constructor(private router: Router, private route:ActivatedRoute, private cd: ChangeDetectorRef) { }

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

    ngAfterViewInit() {
        this.updateInkBar();
        this.initAutoScrollForActiveItem();
    }

    ngAfterViewChecked() {
        if (this.tabChanged) {
            this.updateInkBar();
            this.tabChanged = false;
        }
    }

    ngOnDestroy(): void {
        this.clearAutoScrollHandler();
    }

    isActive(item: MenuItem) {
        if (item.routerLink){
            const routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];

            return this.router.isActive(this.router.createUrlTree(routerLink, {relativeTo: this.route}).toString(), false);
        }
            
        return item === this.activeItem;
    }

    itemClick(event: Event, item: MenuItem) {
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

        this.activeItem = item;
        this.tabChanged = true;
    }

    updateInkBar() {
        const tabHeader = DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
        if (tabHeader) {
            this.inkbar.nativeElement.style.width = DomHandler.getWidth(tabHeader) + 'px';
            this.inkbar.nativeElement.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
        }
    }

    getVisibleButtonWidths() {
        return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => el ? acc + DomHandler.getWidth(el) : acc, 0);
    }

    updateButtonState() {
        const content = this.content.nativeElement;
        const { scrollLeft, scrollWidth } = content;
        const width = DomHandler.getWidth(content);

        this.backwardIsDisabled = scrollLeft === 0;
        this.forwardIsDisabled = parseInt(scrollLeft) === scrollWidth - width;
    }


    updateScrollBar(index: number): void {
        const tabHeader = this.navbar.nativeElement.children[index];

        if (!tabHeader) {
            return;
        }

        tabHeader.scrollIntoView({ block: 'nearest', inline: 'center' });
    }

    onScroll(event) {
        this.scrollable && this.updateButtonState();

        event.preventDefault();
    }

    navBackward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft - width;
        content.scrollLeft = pos <= 0 ? 0 : pos;
    }

    navForward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft + width;
        const lastPos = content.scrollWidth - width;
        content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }

    private initAutoScrollForActiveItem(): void {
        if (!this.scrollable) {
            return;
        }

        this.clearAutoScrollHandler();
        // We have to wait for the rendering and then can scroll to element.
        this.timerIdForInitialAutoScroll = setTimeout(() => {
            const activeItem = this.model.findIndex(menuItem => this.isActive(menuItem));

            if (activeItem !== -1) {
                this.updateScrollBar(activeItem);
            }
        });
    }

    private clearAutoScrollHandler(): void {
        if (this.timerIdForInitialAutoScroll) {
            clearTimeout(this.timerIdForInitialAutoScroll);
            this.timerIdForInitialAutoScroll = null;
        }
    }
}

@NgModule({
    imports: [CommonModule,RouterModule,SharedModule,RippleModule,TooltipModule],
    exports: [TabMenu,RouterModule,SharedModule,TooltipModule],
    declarations: [TabMenu]
})
export class TabMenuModule { }
