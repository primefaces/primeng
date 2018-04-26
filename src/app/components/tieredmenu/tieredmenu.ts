import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/menuitem';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-tieredMenuSub',
    template: `
        <ul [ngClass]="{'ui-widget-content ui-corner-all ui-shadow ui-submenu-list': !root}" (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                    [class]="child.styleClass" [ngStyle]="child.style"
                    (mouseenter)="onItemMouseEnter($event, listItem, child)" (mouseleave)="onItemMouseLeave($event)">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" 
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [href]="child.url||'#'" 
                        class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-tieredMenuSub class="ui-submenu" [item]="child" *ngIf="child.items" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex" [hideDelay]="hideDelay"></p-tieredMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    providers: [DomHandler]
})
export class TieredMenuSub {

    @Input() item: MenuItem;
    
    @Input() root: boolean;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() hideDelay: number = 250;
    
    constructor(public domHandler: DomHandler) {}
    
    activeItem: HTMLLIElement;

    hideTimeout: any;
                
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if(menuitem.disabled) {
            return;
        }

        if(this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        
        this.activeItem = item;
        let nextElement:  HTMLElement =  <HTMLElement> item.children[0].nextElementSibling;
        if(nextElement) {
            let sublist:  HTMLElement = <HTMLElement> nextElement.children[0];
            if(this.autoZIndex) {
                sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            }
            sublist.style.zIndex = String(++DomHandler.zindex);
                        
            sublist.style.top = '0px';
            sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
        }
    }
    
    onItemMouseLeave(event: Event) {
        this.hideTimeout = setTimeout(() => {
            this.activeItem = null;
        }, this.hideDelay);
    }
    
    itemClick(event: Event, item: MenuItem) {
        if(item.disabled) {
            event.preventDefault();
            return true;
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
    }
    
    listClick(event: Event) {
        this.activeItem = null;
    }
}

@Component({
    selector: 'p-tieredMenu',
    template: `
        <div [ngClass]="{'ui-tieredmenu ui-widget ui-widget-content ui-corner-all':true, 'ui-tieredmenu-dynamic ui-shadow':popup}" 
            [class]="styleClass" [ngStyle]="style">
            <p-tieredMenuSub [item]="model" root="root" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex" [hideDelay]="hideDelay"></p-tieredMenuSub>
        </div>
    `,
    providers: [DomHandler]
})
export class TieredMenu implements AfterViewInit,OnDestroy {

    @Input() model: MenuItem[];

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() hideDelay: number = 250
    
    container: any;
    
    documentClickListener: any;
    
    preventDocumentDefault: any;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        
        if(this.popup) {
            if(this.appendTo) {
                if(this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    this.domHandler.appendChild(this.container, this.appendTo);
            }
        }
    }
    
    toggle(event: Event) {
        if(this.container.offsetParent)
            this.hide();
        else
            this.show(event);
    }
    
    show(event: Event) {
        this.preventDocumentDefault = true;
        this.moveOnTop();
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.currentTarget);
        this.domHandler.fadeIn(this.container, 250);
        this.bindDocumentClickListener();
    }
    
    hide() {
        this.container.style.display = 'none';
        this.unbindDocumentClickListener();
    }

    moveOnTop() {
        if(this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    
    unbindDocumentClickListener() {
        if(this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    
    bindDocumentClickListener() {
        if(!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(!this.preventDocumentDefault) {
                    this.hide();
                }
                this.preventDocumentDefault = false;
            });
        }
    }

    ngOnDestroy() {
        if(this.popup) {
            if(this.documentClickListener) {
                this.unbindDocumentClickListener();
            }
            if(this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        }
    }

}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [TieredMenu,RouterModule],
    declarations: [TieredMenu,TieredMenuSub]
})
export class TieredMenuModule { }
