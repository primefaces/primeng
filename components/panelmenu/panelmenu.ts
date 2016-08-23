import {NgModule,Component,ElementRef,OnDestroy,Input,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from '../common/api';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'p-panelMenuSub',
    template: `
        <ul class="ui-menu-list ui-helper-reset" [style.display]="expanded ? 'block' : 'none'">
            <li *ngFor="let child of item.items" class="ui-menuitem ui-corner-all" [ngClass]="{'ui-menu-parent':child.items}">
                <a #link [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" 
                    [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-hover':(hoveredLink==link)}" (click)="onClick($event,child)"
                    (mouseenter)="hoveredLink=link" (mouseleave)="hoveredLink=null">
                    <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!child.expanded,'fa-caret-down':child.expanded}" *ngIf="child.items"></span>
                    <span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"></span>
                    <span class="ui-menuitem-text">{{child.label}}</span>
                </a>
                <p-panelMenuSub [item]="child" [expanded]="child.expanded" *ngIf="child.items"></p-panelMenuSub>
            </li>
        </ul>
    `
})
export class PanelMenuSub {
    
    @Input() item: MenuItem;
    
    @Input() expanded: boolean;
    
    constructor(protected router: Router) {}
                
    onClick(event, item: MenuItem) {
        if(item.items) {
            item.expanded = !item.expanded;
            event.preventDefault();
        }
        else {
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
        }
    }
}

@Component({
    selector: 'p-panelMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-panelmenu ui-widget'">
            <div *ngFor="let item of model" class="ui-panelmenu-panel">
                <div tabindex="0" [ngClass]="{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-all':!item.expanded,
                    'ui-state-active ui-corner-top':item.expanded,'ui-state-hover':(item == hoveredItem)}" (click)="headerClick($event,item)">
                    <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!item.expanded,'fa-caret-down':item.expanded}"></span>
                    <a [href]="item.url||'#'" [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}"
                        (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
                        <span class="ui-menuitem-icon fa fa-fw" [ngClass]="item.icon" *ngIf="item.icon"></span>
                        <span>{{item.label}}</span>
                    </a>
                </div>
                <div class="ui-panelmenu-content ui-widget-content" [style.display]="item.expanded ? 'block' : 'none'">
                    <p-panelMenuSub [item]="item" [expanded]="true"></p-panelMenuSub>
                </div>
            </div>
        </div>
    `
})
export class PanelMenu {
    
    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    headerClick(event, item ) {
        item.expanded = !item.expanded;
        event.preventDefault();
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

}

@NgModule({
    imports: [CommonModule],
    exports: [PanelMenu],
    declarations: [PanelMenu,PanelMenuSub]
})
export class PanelMenuModule { }
