import { NgModule, Component, ElementRef, Input, Renderer2, OnDestroy,ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'p-menubarSub',
    template: `
        <ul [ngClass]="{'p-submenu-list': !root, 'p-menubar-root-list': root}"
            (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'p-menuitem':true, 'p-menuitem-active':listItem==activeItem, 'p-hidden': child.visible === false}"
                        (mouseenter)="onItemMouseEnter($event,listItem,child)" (click)="onItemMenuClick($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" [attr.data-automationid]="child.automationId" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" (click)="itemClick($event, child)"
                         [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass" 
                         [attr.tabindex]="child.disabled ? null : '0'" [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text">{{child.label}}</span>
                        <span class="p-submenu-icon pi" *ngIf="child.items" [ngClass]="{'pi-angle-down':root,'pi-angle-right':!root}"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [attr.data-automationid]="child.automationId" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'" role="menuitem"
                        (click)="itemClick($event, child)" [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text">{{child.label}}</span>
                        <span class="p-submenu-icon pi" *ngIf="child.items" [ngClass]="{'pi-angle-down':root,'pi-angle-right':!root}"></span>
                    </a>
                    <p-menubarSub [parentActive]="listItem==activeItem" [item]="child" *ngIf="child.items" [autoDisplay]="true"></p-menubarSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MenubarSub implements OnDestroy {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() autoDisplay: boolean;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

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

    _parentActive:boolean;

    documentClickListener: any;

    menuClick: boolean;
  
    menuHoverActive: boolean = false;

    activeItem: any;

    activeMenu: any;

    constructor(public renderer: Renderer2, private cd: ChangeDetectorRef) { }

    onItemMenuClick(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
            this.menuClick = true;

        if (!this.autoDisplay) {
            if (menuitem.disabled) {
                return;
            }
            
            this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            let nextElement = <HTMLLIElement>item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = <HTMLUListElement>nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }

                if (this.root) {
                    sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px'
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }

            this.menuHoverActive = this.activeMenu ? (!this.activeMenu.isEqualNode(item)) : true;
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null: item) : item;
            this.bindEventListener();
        }
    }

    bindEventListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click',(event) => {
                if (!this.menuClick) {
                    this.activeItem = null;
                    this.menuHoverActive = false;
                    this.activeMenu = false;
                    this.cd.markForCheck();
                }
                this.menuClick = false;
            });
        }
    }

    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (this.autoDisplay || (!this.autoDisplay && this.root && this.menuHoverActive)) {
            if (menuitem.disabled) {
                return;
            }

            if ((this.activeItem && !this.activeItem.isEqualNode(item) || !this.activeItem)) {
                this.activeItem = item;
                let nextElement = <HTMLLIElement>item.children[0].nextElementSibling;
                if (nextElement) {
                    let sublist = <HTMLUListElement>nextElement.children[0];
                    sublist.style.zIndex = String(++DomHandler.zindex);

                    if (this.root) {
                        sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                        sublist.style.left = '0px'
                    }
                    else {
                        sublist.style.top = '0px';
                        sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                    }
                }
                this.activeMenu = item;
            }
        }
    }


    itemClick(event, item: MenuItem)  {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (!item.url) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }

        this.activeItem = null;
    }

    listClick(event) {
        if (this.autoDisplay) {
            this.activeItem = null;
        }
    }

    ngOnDestroy() {
      if (this.documentClickListener) {
        this.documentClickListener();
        this.documentClickListener = null;
      }

    }
}

@Component({
    selector: 'p-menubar',
    template: `
        <div [ngClass]="{'p-menubar p-component':true}" [class]="styleClass" [ngStyle]="style">
            <div class="p-menubar-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <p-menubarSub [item]="model" root="root" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex"></p-menubarSub>
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
    styleUrls: ['./menubar.css']
})
export class Menubar implements AfterContentInit {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    private _autoDisplay: boolean;

    @Input() get autoDisplay(): boolean {
        return this._autoDisplay;
    }
    set autoDisplay(_autoDisplay: boolean) {
        console.log("AutoDisplay property is deprecated and functionality is not available.");
    }

    startTemplate: TemplateRef<any>;

    endTemplate: TemplateRef<any>;

    constructor(public el: ElementRef, public renderer: Renderer2) { }

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
}

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [Menubar, RouterModule],
    declarations: [Menubar, MenubarSub]
})
export class MenubarModule { }
