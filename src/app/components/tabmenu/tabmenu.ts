import {NgModule,Component,ElementRef,Input,Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/menuitem';
import {Location} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-tabMenu',
    template: `
        <div [ngClass]="'ui-tabmenu ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <ul class="ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                <li *ngFor="let item of model" 
                    [ngClass]="{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,
                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-active':activeItem==item}">
                    <a *ngIf="!item.routerLink" [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" (click)="itemClick($event,item)"
                        [attr.target]="item.target">
                        <span class="ui-menuitem-icon fa" [ngClass]="item.icon"></span>
                        <span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                    <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [routerLinkActive]="'ui-state-active'"  [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" (click)="itemClick($event,item)"
                        [attr.target]="item.target">
                        <span class="ui-menuitem-icon fa" [ngClass]="item.icon"></span>
                        <span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                </li>
            </ul>
        </div>
    `,
    providers: [DomHandler]
})
export class TabMenu {

    @Input() model: MenuItem[];
    
    @Input() activeItem: MenuItem;

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;
                
    ngOnInit() {
        if(!this.activeItem && this.model && this.model.length) {
            this.activeItem = this.model[0];
        }
    }
    
    itemClick(event: Event, item: MenuItem) {
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
        
        this.activeItem = item;
    }
}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [TabMenu,RouterModule],
    declarations: [TabMenu]
})
export class TabMenuModule { }