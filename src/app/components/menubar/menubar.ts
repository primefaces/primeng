import { NgModule, Component, ElementRef, Input, Renderer2, OnDestroy,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'p-menubarSub',
    template: `
        <ul [ngClass]="{'ui-menubar-root-list':root, 'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}"
            (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-corner-all':true,
                        'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                        (mouseenter)="onItemMouseEnter($event,listItem,child)" (mouseleave)="onItemMouseLeave($event)" (click)="onItemMenuClick($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" [attr.data-automationid]="child.automationId" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" (click)="itemClick($event, child)"
                         [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw" *ngIf="child.items" [ngClass]="{'pi-caret-down':root,'pi-caret-right':!root}"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [attr.data-automationid]="child.automationId" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        (click)="itemClick($event, child)" [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw" *ngIf="child.items" [ngClass]="{'pi-caret-down':root,'pi-caret-right':!root}"></span>
                    </a>
                    <p-menubarSub class="ui-submenu" [item]="child" *ngIf="child.items" [autoDisplay]="true"></p-menubarSub>
                </li>
            </ng-template>
        </ul>
    `,
    providers: [DomHandler]
})
export class MenubarSub implements OnDestroy {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() autoDisplay: boolean;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    documentClickListener: any;

    menuClick: boolean;
  
    menuHoverActive: boolean = false;

    activeItem: any;

    hideTimeout: any;
    
    activeMenu: any;

    constructor(public domHandler: DomHandler, public renderer: Renderer2, private cd: ChangeDetectorRef) { }

    onItemMenuClick(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (!this.autoDisplay) {

            if (menuitem.disabled) {
                return;
            }
            
            this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item)? null: item) : item;
            let nextElement = <HTMLLIElement>item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = <HTMLUListElement>nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }

                if (this.root) {
                    sublist.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px'
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }

            this.menuClick = true;
            this.menuHoverActive = this.activeMenu ? (!this.activeMenu.isEqualNode(item)) : true;
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item)? null: item) : item;
            this.bindEventListener();
        }
    }

    bindEventListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click',(event) => {
                if (!this.menuClick) {
                    this.activeItem = null;
                    this.menuHoverActive = false;
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

            if(this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }

            this.activeItem = this.activeItem ? (this.activeItem.isEqualNode(item)? null: item) : item;
            let nextElement = <HTMLLIElement>item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = <HTMLUListElement>nextElement.children[0];
                sublist.style.zIndex = String(++DomHandler.zindex);

                if (this.root) {
                    sublist.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px'
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
  
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item)? null: item) : item;
        }
    }

    onItemMouseLeave(event: Event) {
        if (this.autoDisplay) {
            this.hideTimeout = setTimeout(() => {
                this.activeItem = null;
                this.cd.markForCheck();
            }, 250);
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
      if(this.documentClickListener) {
        this.documentClickListener();
        this.documentClickListener = null;
      }

    }

}

@Component({
    selector: 'p-menubar',
    template: `
        <div [ngClass]="{'ui-menubar ui-widget ui-widget-content ui-corner-all':true}" [class]="styleClass" [ngStyle]="style">
            <p-menubarSub [item]="model" root="root" [autoDisplay]="autoDisplay" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex">
                <ng-content></ng-content>
            </p-menubarSub>
            <div class="ui-menubar-custom">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Menubar {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() autoDisplay: boolean = true;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) { }
}

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [Menubar, RouterModule],
    declarations: [Menubar, MenubarSub]
})
export class MenubarModule { }
