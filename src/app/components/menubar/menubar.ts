import { NgModule, Component, ElementRef, Input, Renderer2, OnDestroy,ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, ContentChildren, QueryList, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { MenuItem, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'p-menubarSub',
    template: `
        <ul [ngClass]="{'p-submenu-list': !root, 'p-menubar-root-list': root}" [attr.role]="root ? 'menubar' : 'menu'">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'p-menuitem':true, 'p-menuitem-active': child === activeItem, 'p-hidden': child.visible === false}" [ngStyle]="child.style" [class]="child.styleClass" role="none" pTooltip [tooltipOptions]="child.tooltipOptions">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" [attr.data-automationid]="child.automationId" [target]="child.target" [attr.title]="child.title" [attr.id]="child.id" role="menuitem"
                        (click)="onItemClick($event, child)" (mouseenter)="onItemMouseEnter($event,child)"
                         [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}" [attr.tabindex]="child.disabled ? null : '0'" [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem" pRipple>
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{child.label}}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{child.badge}}</span>
                        <span class="p-submenu-icon pi" *ngIf="child.items" [ngClass]="{'pi-angle-down':root,'pi-angle-right':!root}"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [attr.data-automationid]="child.automationId" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        [target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'" role="menuitem"
                        (click)="onItemClick($event, child)" (mouseenter)="onItemMouseEnter($event,child)"
                        [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state" pRipple>
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{child.badge}}</span>
                        <span class="p-submenu-icon pi" *ngIf="child.items" [ngClass]="{'pi-angle-down':root,'pi-angle-right':!root}"></span>
                    </a>
                    <p-menubarSub [parentActive]="child === activeItem" [item]="child" *ngIf="child.items" [mobileActive]="mobileActive" [autoDisplay]="autoDisplay" (leafClick)="onLeafClick()"></p-menubarSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'p-element'
    }
})
export class MenubarSub implements OnDestroy {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() mobileActive: boolean;

    @Input() autoDisplay: boolean;

    @Input() get parentActive():boolean
    {
        return this._parentActive;
    }
    set parentActive(value) {
        if (!this.root) {
            this._parentActive = value;

            if (!value)
                this.activeItem = null;
        }
    }

    @Output() leafClick: EventEmitter<any> = new EventEmitter();

    _parentActive: boolean;

    documentClickListener: any;

    menuHoverActive: boolean = false;

    activeItem: any;

    constructor(public el: ElementRef, public renderer: Renderer2, private cd: ChangeDetectorRef) { }

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
            }
            else {
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

    onItemMouseEnter(event, item) {
        if (item.disabled || this.mobileActive) {
            event.preventDefault();
            return;
        }

        if (this.root) {
            if (this.activeItem || this.autoDisplay) {
                this.activeItem = item;
                this.bindDocumentClickListener();
            }
        }
        else {
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
        if (!this.documentClickListener) {
            this.documentClickListener = (event) => {
                if (this.el && !this.el.nativeElement.contains(event.target)) {
                    this.activeItem = null;
                    this.cd.markForCheck();
                    this.unbindDocumentClickListener();
                }
            };

            document.addEventListener('click', this.documentClickListener);
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
}

@Component({
    selector: 'p-menubar',
    template: `
        <div [ngClass]="{'p-menubar p-component':true, 'p-menubar-mobile-active': mobileActive}" [class]="styleClass" [ngStyle]="style">
            <div class="p-menubar-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <a #menubutton tabindex="0" class="p-menubar-button" (click)="toggle($event)">
                <i class="pi pi-bars"></i>
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
        'class': 'p-element'
    }
})
export class Menubar implements AfterContentInit, OnDestroy {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() autoDisplay: boolean;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('menubutton') menubutton: ElementRef;

    @ViewChild('rootmenu') rootmenu: MenubarSub;

    startTemplate: TemplateRef<any>;

    endTemplate: TemplateRef<any>;

    mobileActive: boolean;

    outsideClickListener: any;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public config: PrimeNGConfig) { }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'start':
                    this.startTemplate = item.template;
                break;

                case 'end':
                    this.endTemplate = item.template;
                break;
            }
        });
    }

    toggle(event) {
        if (this.mobileActive) {
            this.hide();
            ZIndexUtils.clear(this.rootmenu.el.nativeElement);
        }
        else {
            this.mobileActive = true;
            ZIndexUtils.set('menu', this.rootmenu.el.nativeElement, this.config.zIndex.menu);
        }

        this.bindOutsideClickListener();
        event.preventDefault();
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event) => {
                if (this.mobileActive && this.rootmenu.el.nativeElement !== event.target && !this.rootmenu.el.nativeElement.contains(event.target)
                    && this.menubutton.nativeElement !== event.target && !this.menubutton.nativeElement.contains(event.target)) {
                    this.hide();
                }
            };
            document.addEventListener('click', this.outsideClickListener);
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
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindOutsideClickListener();
    }
}

@NgModule({
    imports: [CommonModule,RouterModule,RippleModule,TooltipModule,SharedModule],
    exports: [Menubar,RouterModule,TooltipModule,SharedModule],
    declarations: [Menubar,MenubarSub]
})
export class MenubarModule { }
