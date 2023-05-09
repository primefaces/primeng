import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Injectable,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ZIndexUtils } from 'primeng/utils';
import { MenuItem, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { debounce, filter, interval, Subject, Subscription } from 'rxjs';
import { BarsIcon } from 'primeng/icons/bars';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';

@Injectable()
export class MenubarService {
    autoHide: boolean;

    autoHideDelay: number;

    readonly mouseLeaves = new Subject<boolean>();

    readonly mouseLeft$ = this.mouseLeaves.pipe(
        debounce(() => interval(this.autoHideDelay)),
        filter((mouseLeft) => this.autoHide && mouseLeft)
    );
}

@Component({
    selector: 'p-menubarSub',
    template: `
        <ul [ngClass]="{ 'p-submenu-list': !root, 'p-menubar-root-list': root }" [attr.role]="root ? 'menubar' : 'menu'">
            <ng-template ngFor let-child [ngForOf]="root ? item : item.items">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{ 'p-hidden': child.visible === false }" role="separator"></li>
                <li
                    *ngIf="!child.separator"
                    #listItem
                    [ngClass]="{ 'p-menuitem': true, 'p-menuitem-active': child === activeItem, 'p-hidden': child.visible === false }"
                    [ngStyle]="child.style"
                    [class]="child.styleClass"
                    role="none"
                    pTooltip
                    [tooltipOptions]="child.tooltipOptions"
                >
                    <a
                        *ngIf="!child.routerLink"
                        [attr.href]="child.url"
                        [attr.data-automationid]="child.automationId"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [attr.id]="child.id"
                        role="menuitem"
                        (click)="onItemClick($event, child)"
                        (mouseenter)="onItemMouseEnter($event, child)"
                        (mouseleave)="onItemMouseLeave($event, child)"
                        [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': child.disabled }"
                        [attr.tabindex]="child.disabled ? null : '0'"
                        [attr.aria-haspopup]="item.items != null"
                        [attr.aria-expanded]="item === activeItem"
                        pRipple
                    >
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{ child.label }}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        <ng-container *ngIf="child.items">
                            <ng-container *ngIf="!menubar.submenuIconTemplate">
                                <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="root" />
                                <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!root" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="menubar.submenuIconTemplate"></ng-template>
                        </ng-container>
                    </a>
                    <a
                        *ngIf="child.routerLink"
                        [routerLink]="child.routerLink"
                        [attr.data-automationid]="child.automationId"
                        [queryParams]="child.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions || { exact: false }"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [attr.id]="child.id"
                        [attr.tabindex]="child.disabled ? null : '0'"
                        role="menuitem"
                        (click)="onItemClick($event, child)"
                        (mouseenter)="onItemMouseEnter($event, child)"
                        (mouseleave)="onItemMouseLeave($event, child)"
                        [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': child.disabled }"
                        [fragment]="child.fragment"
                        [queryParamsHandling]="child.queryParamsHandling"
                        [preserveFragment]="child.preserveFragment"
                        [skipLocationChange]="child.skipLocationChange"
                        [replaceUrl]="child.replaceUrl"
                        [state]="child.state"
                        pRipple
                    >
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{ child.label }}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        <ng-container *ngIf="child.items">
                            <ng-container *ngIf="!menubar.submenuIconTemplate">
                                <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="root" />
                                <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!root" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="menubar.submenuIconTemplate"></ng-template>
                        </ng-container>
                    </a>
                    <p-menubarSub [parentActive]="child === activeItem" [item]="child" *ngIf="child.items" [mobileActive]="mobileActive" [autoDisplay]="autoDisplay" (leafClick)="onLeafClick()"></p-menubarSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class MenubarSub implements OnInit, OnDestroy {
    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() mobileActive: boolean;

    @Input() autoDisplay: boolean;

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }
    set parentActive(value) {
        if (!this.root) {
            this._parentActive = value;

            if (!value) this.activeItem = null;
        }
    }

    @Output() leafClick: EventEmitter<any> = new EventEmitter();

    _parentActive: boolean;

    documentClickListener: (event?: Event) => void | null;

    menuHoverActive: boolean = false;

    activeItem: any;

    mouseLeaveSubscriber: Subscription;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        public el: ElementRef,
        public renderer: Renderer2,
        private cd: ChangeDetectorRef,
        private menubarService: MenubarService,
        private menubar: Menubar
    ) {}

    ngOnInit() {
        this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => {
            this.activeItem = null;
            this.cd.markForCheck();
            this.unbindDocumentClickListener();
        });
    }

    onItemClick(event, item) {
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

        if (item.items) {
            if (this.activeItem && item === this.activeItem) {
                this.activeItem = null;
                this.unbindDocumentClickListener();
            } else {
                this.activeItem = item;
                if (this.root) {
                    this.bindDocumentClickListener();
                }
            }
        }

        if (!item.items) {
            this.onLeafClick();
        }
    }

    onItemMouseLeave(event, item) {
        this.menubarService.mouseLeaves.next(true);
    }

    onItemMouseEnter(event, item) {
        this.menubarService.mouseLeaves.next(false);

        if (item.disabled || this.mobileActive) {
            event.preventDefault();
            return;
        }

        if (this.root) {
            if (this.activeItem || this.autoDisplay) {
                this.activeItem = item;
                this.bindDocumentClickListener();
            }
        } else {
            this.activeItem = item;
            this.bindDocumentClickListener();
        }
    }

    onLeafClick() {
        this.activeItem = null;
        if (this.root) {
            this.unbindDocumentClickListener();
        }

        this.leafClick.emit();
    }

    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener) {
                this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    if (this.el && !this.el.nativeElement.contains(event.target)) {
                        this.activeItem = null;
                        this.cd.markForCheck();
                        this.unbindDocumentClickListener();
                    }
                });
            }
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        this.mouseLeaveSubscriber.unsubscribe();
        this.unbindDocumentClickListener();
    }
}

@Component({
    selector: 'p-menubar',
    template: `
        <div [ngClass]="{ 'p-menubar p-component': true, 'p-menubar-mobile-active': mobileActive }" [class]="styleClass" [ngStyle]="style">
            <div class="p-menubar-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <a #menubutton tabindex="0" *ngIf="model && model.length > 0" class="p-menubar-button" (click)="toggle($event)">
                <BarsIcon *ngIf="!menuIconTemplate" />
                <ng-template *ngTemplateOutlet="menuIconTemplate"></ng-template>
            </a>
            <p-menubarSub #rootmenu [item]="model" root="root" [baseZIndex]="baseZIndex" (leafClick)="onLeafClick()" [autoZIndex]="autoZIndex" [mobileActive]="mobileActive" [autoDisplay]="autoDisplay"></p-menubarSub>
            <div class="p-menubar-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-menubar-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./menubar.css'],
    host: {
        class: 'p-element'
    },
    providers: [MenubarService]
})
export class Menubar implements AfterContentInit, OnDestroy, OnInit {
    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() autoDisplay: boolean;

    @Input() autoHide: boolean;

    @Input() autoHideDelay: number = 100;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('menubutton') menubutton: ElementRef;

    @ViewChild('rootmenu') rootmenu: MenubarSub;

    startTemplate: TemplateRef<any>;

    endTemplate: TemplateRef<any>;

    menuIconTemplate: TemplateRef<any>;

    submenuIconTemplate: TemplateRef<any>;

    mobileActive: boolean;

    outsideClickListener: (event?: Event) => void | null;

    mouseLeaveSubscriber: Subscription;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        public config: PrimeNGConfig,
        private menubarService: MenubarService
    ) {}

    ngOnInit(): void {
        this.menubarService.autoHide = this.autoHide;
        this.menubarService.autoHideDelay = this.autoHideDelay;
        this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => this.unbindOutsideClickListener());
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this.startTemplate = item.template;
                    break;

                case 'end':
                    this.endTemplate = item.template;
                    break;

                case 'menuicon':
                    this.menuIconTemplate = item.template;
                    break;

                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
            }
        });
    }

    toggle(event) {
        if (this.mobileActive) {
            this.hide();
            ZIndexUtils.clear(this.rootmenu.el.nativeElement);
        } else {
            this.mobileActive = true;
            ZIndexUtils.set('menu', this.rootmenu.el.nativeElement, this.config.zIndex.menu);
        }

        this.bindOutsideClickListener();
        event.preventDefault();
    }

    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    if (
                        this.mobileActive &&
                        this.rootmenu.el.nativeElement !== event.target &&
                        !this.rootmenu.el.nativeElement.contains(event.target) &&
                        this.menubutton.nativeElement !== event.target &&
                        !this.menubutton.nativeElement.contains(event.target)
                    ) {
                        this.hide();
                    }
                });
            }
        }
    }

    hide() {
        this.mobileActive = false;
        this.cd.markForCheck();
        ZIndexUtils.clear(this.rootmenu.el.nativeElement);
        this.unbindOutsideClickListener();
    }

    onLeafClick() {
        this.hide();
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }

    ngOnDestroy() {
        this.mouseLeaveSubscriber.unsubscribe();
        this.unbindOutsideClickListener();
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, BarsIcon, AngleDownIcon, AngleRightIcon],
    exports: [Menubar, RouterModule, TooltipModule, SharedModule],
    declarations: [Menubar, MenubarSub]
})
export class MenubarModule {}
