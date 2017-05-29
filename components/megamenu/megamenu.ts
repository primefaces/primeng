import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer2,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {Location} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-megaMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style"
            [ngClass]="{'ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-megamenu-vertical': orientation == 'vertical'}">
            <ul class="ui-menu-list ui-helper-reset ui-menubar-root-list">
                <ng-template ngFor let-category [ngForOf]="model">
                    <li #item [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':category.items,'ui-menuitem-active':item==activeItem}"
                        (mouseenter)="onItemMouseEnter($event, item, category)" (mouseleave)="onItemMouseLeave($event, item)">
                        <a class="ui-menuitem-link ui-corner-all ui-submenu-link" [ngClass]="{'ui-state-disabled':category.disabled}">
                            <span class="ui-menuitem-icon fa fa-fw" [ngClass]="category.icon"></span>
                            <span class="ui-menuitem-text">{{category.label}}</span>
                            <span class="ui-submenu-icon fa fa-fw" [ngClass]="{'fa-caret-down':orientation=='horizontal','fa-caret-right':orientation=='vertical'}"></span>
                        </a>
                        <div class="ui-megamenu-panel ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow">
                            <div class="ui-g">
                                <ng-template ngFor let-column [ngForOf]="category.items">
                                    <div [class]="getColumnClass(category)">
                                        <ng-template ngFor let-submenu [ngForOf]="column">
                                            <ul class="ui-menu-list ui-helper-reset">
                                                <li class="ui-widget-header ui-corner-all"><h3>{{submenu.label}}</h3></li>
                                                <li *ngFor="let item of submenu.items" class="ui-menuitem ui-widget ui-corner-all">
                                                    <a *ngIf="!item.routerLink" [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target"
                                                        [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                        <span class="ui-menuitem-text">{{item.label}}</span>
                                                    </a>
                                                    <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target"
                                                        [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                        <span class="ui-menuitem-text">{{item.label}}</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </ng-template>
                                    </div>
                                </ng-template>
                            </div>
                        </div>
                    </li>
                </ng-template>
            </ul>
        </div>
    `,
    providers: [DomHandler]
})
export class MegaMenu implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() orientation: string = 'horizontal';
    
    activeItem: any;
                
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
    
    onItemMouseEnter(event, item, menuitem: MenuItem) {
        if(menuitem.disabled) {
            return;
        }
        
        this.activeItem = item;
        let submenu =  item.children[0].nextElementSibling;
        if(submenu) {
            submenu.style.zIndex = ++DomHandler.zindex;

            if(this.orientation === 'horizontal')  {
                submenu.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                submenu.style.left = '0px';
            }
            else if(this.orientation === 'vertical')  {
                submenu.style.top = '0px';
                submenu.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    }
    
    onItemMouseLeave(event, link) {
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
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }
                        
        this.activeItem = null;
    }
    
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
    
    getColumnClass(menuitem: MenuItem) {
        let length = menuitem.items ? menuitem.items.length: 0;
        let columnClass;
        switch(length) {
            case 2:
                columnClass= 'ui-g-6';
            break;
            
            case 3:
                columnClass= 'ui-g-4';
            break;
            
            case 4:
                columnClass= 'ui-g-3';
            break;
            
            case 6:
                columnClass= 'ui-g-2';
            break;
                        
            default:
                columnClass= 'ui-g-12';
            break;
        }
        
        return columnClass;
    }
}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [MegaMenu,RouterModule],
    declarations: [MegaMenu]
})
export class MegaMenuModule { }