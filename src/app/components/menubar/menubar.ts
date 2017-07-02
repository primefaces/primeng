import {NgModule,Component,ElementRef,AfterViewInit,Input,Output,Renderer2} from '@angular/core';
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
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem}"
                    (mouseenter)="onItemMouseEnter($event,listItem,child)" (mouseleave)="onItemMouseLeave($event)">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw" *ngIf="child.items" [ngClass]="{'fa-caret-down':root,'fa-caret-right':!root}"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw" *ngIf="child.items" [ngClass]="{'fa-caret-down':root,'fa-caret-right':!root}"></span>
                    </a>
                    <p-menubarSub class="ui-submenu" [item]="child" *ngIf="child.items"></p-menubarSub>
                </li>
            </ng-template>
            <li class="ui-menuitem ui-menuitem-custom ui-widget ui-corner-all">
                <ng-content></ng-content>
            </li>
        </ul>
    `,
    providers: [DomHandler]
})
export class MenubarSub {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    constructor(public domHandler: DomHandler) {}
    
    activeItem: any;
    
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if(menuitem.disabled) {
            return;
        }
        
        this.activeItem = item;
        let nextElement =  <HTMLLIElement> item.children[0].nextElementSibling;
        if(nextElement) {
            let sublist = <HTMLUListElement> nextElement.children[0];
            sublist.style.zIndex = String(++DomHandler.zindex);
            
            if(this.root) {
                sublist.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                sublist.style.left = '0px'
            }
            else {
                sublist.style.top = '0px';
                sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    }
    
    onItemMouseLeave(event: Event) {
        this.activeItem = null;
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
        this.activeItem = null;
    }

}

@Component({
    selector: 'p-menubar',
    template: `
        <div [ngClass]="{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}" 
            [class]="styleClass" [ngStyle]="style">
            <p-menubarSub [item]="model" root="root">
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
            
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [Menubar,RouterModule],
    declarations: [Menubar,MenubarSub]
})
export class MenubarModule { }