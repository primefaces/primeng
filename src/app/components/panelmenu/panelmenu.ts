import {NgModule,Component,ElementRef,OnDestroy,Input} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {MenuItem} from '../common/menuitem';
import {RouterModule} from '@angular/router';

export class BasePanelMenuItem {
        
    handleClick(event, item) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        item.expanded = !item.expanded;
        
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
}

@Component({
    selector: 'p-panelMenuSub',
    template: `
        <ul class="ui-menu-list ui-helper-reset" [@submenu]="expanded ? 'visible' : 'hidden'">
            <ng-template ngFor let-child [ngForOf]="item.items">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content">
                <li *ngIf="!child.separator" class="ui-menuitem ui-corner-all" [ngClass]="{'ui-menu-parent':child.items}" [class]="child.styleClass" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.tabindex]="item.expanded ? null : '-1'"
                        [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-disabled':child.disabled}" 
                        (click)="handleClick($event,child)" [attr.target]="child.target">
                        <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!child.expanded,'fa-caret-down':child.expanded}" *ngIf="child.items"></span
                        ><span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"></span
                        ><span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" 
                        [ngClass]="{'ui-menuitem-link-hasicon':child.icon&&child.items,'ui-state-disabled':child.disabled}" [attr.tabindex]="item.expanded ? null : '-1'" 
                        (click)="handleClick($event,child)" [attr.target]="child.target">
                        <span class="ui-panelmenu-icon fa fa-fw" [ngClass]="{'fa-caret-right':!child.expanded,'fa-caret-down':child.expanded}" *ngIf="child.items"></span
                        ><span class="ui-menuitem-icon fa fa-fw" [ngClass]="child.icon" *ngIf="child.icon"></span
                        ><span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-panelMenuSub [item]="child" [expanded]="child.expanded" *ngIf="child.items"></p-panelMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class PanelMenuSub extends BasePanelMenuItem {
    
    @Input() item: MenuItem;
    
    @Input() expanded: boolean;
}

@Component({
    selector: 'p-panelMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-panelmenu ui-widget'">
            <div *ngFor="let item of model;let f=first;let l=last;" class="ui-panelmenu-panel">
                <div [ngClass]="{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-top':f,'ui-corner-bottom':l&&!item.expanded,
                    'ui-state-active':item.expanded,'ui-state-disabled':item.disabled}" [class]="item.styleClass" [ngStyle]="item.style">
                    <a *ngIf="!item.routerLink" [href]="item.url||'#'" [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}" (click)="handleClick($event,item)"
                        [attr.target]="item.target">
                        <span *ngIf="item.items" class="ui-panelmenu-icon fa" [ngClass]="{'fa-caret-right':!item.expanded,'fa-caret-down':item.expanded}"></span
                        ><span class="ui-menuitem-icon fa" [ngClass]="item.icon" *ngIf="item.icon"></span
                        ><span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                    <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" [ngClass]="{'ui-panelmenu-headerlink-hasicon':item.icon}" (click)="handleClick($event,item)"
                        [attr.target]="item.target">
                        <span *ngIf="item.items" class="ui-panelmenu-icon fa" [ngClass]="{'fa-caret-right':!item.expanded,'fa-caret-down':item.expanded}"></span
                        ><span class="ui-menuitem-icon fa" [ngClass]="item.icon" *ngIf="item.icon"></span
                        ><span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                </div>
                <div *ngIf="item.items" class="ui-panelmenu-content-wrapper" [@rootItem]="item.expanded ? 'visible' : 'hidden'"  (@rootItem.done)="onToggleDone($event)"
                    [ngClass]="{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}">
                    <div class="ui-panelmenu-content ui-widget-content">
                        <p-panelMenuSub [item]="item" [expanded]="true"></p-panelMenuSub>
                    </div>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('rootItem', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class PanelMenu extends BasePanelMenuItem {
    
    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    public animating: boolean;
                
    handleClick(event, item) {
        this.animating = true;
        super.handleClick(event, item);
    }
    
    onToggleDone() {
        this.animating = false;
    }

}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [PanelMenu,RouterModule],
    declarations: [PanelMenu,PanelMenuSub]
})
export class PanelMenuModule { }
