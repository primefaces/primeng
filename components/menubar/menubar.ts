import {Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer,EventEmitter} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'p-menubarSub',
    template: `
        <ul [ngClass]="{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}" class="ui-menu-list"
            (click)="listClick($event)">
            <template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li #item [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}"
                    (mouseenter)="onItemMouseEnter($event, item)" (mouseleave)="onItemMouseLeave($event, item)">
                    <a #link [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [ngClass]="{'ui-state-hover':link==activeLink}" (click)="itemClick($event, child)">
                        <span class="ui-submenu-icon fa fa-fw" *ngIf="child.items" [ngClass]="{'fa-caret-down':root,'fa-caret-right':!root}"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-menubarSub class="ui-submenu" [item]="child" *ngIf="child.items"></p-menubarSub>
                </li>
            </template>
        </ul>
    `,
    directives: [MenubarSub],
    providers: [DomHandler]
})
export class MenubarSub {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    constructor(private domHandler: DomHandler, private router: Router) {}
    
    activeItem: any;
    
    activeLink: any;
            
    onItemMouseEnter(event, item) {
        this.activeItem = item;
        this.activeLink = item.children[0];
        let nextElement =  item.children[0].nextElementSibling;
        if(nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
            
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
    
    onItemMouseLeave(event, link) {
        this.activeItem = null;
        this.activeLink = null;
    }
    
    itemClick(event, item: MenuItem) {
        if(!item.url||item.routerLink) {
            event.preventDefault();
        }
        
        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit(event);
        }

        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }
        
        this.activeItem = null;
        this.activeLink = null;
    }
        
    listClick(event) {
        this.activeItem = null;
        this.activeLink = null;
    }

}

@Component({
    selector: 'p-menubar',
    template: `
        <div [ngClass]="{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}" 
            [class]="styleClass" [ngStyle]="style">
            <p-menubarSub [item]="model" root="root"></p-menubarSub>
        </div>
    `,
    providers: [DomHandler],
    directives: [MenubarSub]
})
export class Menubar implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
            
    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {}
    
    unsubscribe(item: any) {
        if(item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        
        if(item.items) {
            for(let childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }
        
    ngOnDestroy() {        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }

}