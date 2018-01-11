import {NgModule,Component,ElementRef,Input,Renderer2,OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/menuitem';
import {Location} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-menubarSub',
    template: `
        <ul [ngClass]="{'ui-menubar-root-list ui-helper-clearfix':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}" class="ui-menu-list"
            (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,
                        'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                        (mouseenter)="onItemMouseEnter($event,listItem,child)" (mouseleave)="onItemMouseLeave($event)" (click)="onItemMenuClick($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" (click)="itemClick($event, child)"
                         [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass">
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw" *ngIf="child.items" [ngClass]="{'fa-caret-down':root,'fa-caret-right':!root}"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        (click)="itemClick($event, child)" [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass">
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw" *ngIf="child.items" [ngClass]="{'fa-caret-down':root,'fa-caret-right':!root}"></span>
                    </a>
                    <p-menubarSub class="ui-submenu" [item]="child" *ngIf="child.items" [autoDisplay]="true"></p-menubarSub>
                </li>
            </ng-template>
            <li class="ui-menuitem ui-menuitem-custom ui-widget ui-corner-all">
                <ng-content></ng-content>
            </li>
        </ul>
    `,
    providers: [DomHandler]
})
export class MenubarSub implements OnDestroy{

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    @Input() autoDisplay: boolean;
  
    documentClickListener: any;
    
    menuClick: boolean;
    
    constructor(public domHandler: DomHandler) {}
    
    activeItem: any;
  
    onItemMenuClick(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (!this.autoDisplay) {
          
            if (menuitem.disabled) {
              return;
            }
            
            this.activeItem = item;
            let nextElement = <HTMLLIElement> item.children[0].nextElementSibling;
            if (nextElement) {
              let sublist = <HTMLUListElement> nextElement.children[0];
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
            
            this.menuClick = true;
            this.bindEventListener();
        }
    }
    
    bindEventListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = (event) => {
                if (!this.menuClick) {
                  this.activeItem = null;
                }
              this.menuClick = false;
            };
        
            document.addEventListener('click', this.documentClickListener);
        }
    }
    
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (this.autoDisplay) {
            if (menuitem.disabled) {
              return;
            }
        
            this.activeItem = item;
            let nextElement = <HTMLLIElement> item.children[0].nextElementSibling;
            if (nextElement) {
              let sublist = <HTMLUListElement> nextElement.children[0];
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
        }
    }
    
    onItemMouseLeave(event: Event) {
        if (this.autoDisplay) {
          this.activeItem = null;
        }
    }
    
    itemClick(event, item: MenuItem) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url) {
            event.preventDefault();
        }
        
        if(item.command) {
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
    
    ngOnDestroy(){
        if(this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
        }
      
    }

}

@Component({
    selector: 'p-menubar',
    template: `
        <div [ngClass]="{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}"
            [class]="styleClass" [ngStyle]="style">
            <p-menubarSub [item]="model" root="root" [autoDisplay]="autoDisplay">
                <ng-content></ng-content>
            </p-menubarSub>
        </div>
    `,
    providers: [DomHandler]
})
export class Menubar {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() autoDisplay: boolean = true;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [Menubar,RouterModule],
    declarations: [Menubar,MenubarSub]
})
export class MenubarModule { }
