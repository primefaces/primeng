import {NgModule,Component,Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from '../common/menuitem';
import {Location} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-breadcrumb',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all'">
            <ul>
                <li class="ui-breadcrumb-home fa fa-home" *ngIf="!home || (!home.icon && !home.url && !home.routerLink)"></li>
                <li class="ui-breadcrumb-home {{icon}}" *ngIf="home && home.icon && !home.url && !home.routerLink"></li>
                <li class="ui-breadcrumb-home" *ngIf="home && (home.url || home.routerLink)">
                    <a *ngIf="!home.routerLink" [href]="home.url||'#'" class="ui-menuitem-link" (click)="itemClick($event, home)" 
                        [ngClass]="{'ui-state-disabled':home.disabled}" [attr.target]="home.target" [attr.title]="home.title">
                        <span [class]="icon"></span>
                    </a>
                    <a *ngIf="home.routerLink" [routerLink]="home.routerLink" [queryParams]="home.queryParams" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="home.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link" (click)="itemClick($event, home)" 
                        [ngClass]="{'ui-state-disabled':home.disabled}" [attr.target]="home.target" [attr.title]="home.title">
                        <span [class]="icon"></span>
                    </a>
                </li>
                <li class="ui-breadcrumb-chevron fa fa-chevron-right" *ngIf="model"></li>
                <ng-template ngFor let-item let-end="last" [ngForOf]="model">
                    <li role="menuitem">
                        <a *ngIf="!item.routerLink" [href]="item.url||'#'" class="ui-menuitem-link" (click)="itemClick($event, item)" 
                            [ngClass]="{'ui-state-disabled':item.disabled}" [attr.target]="item.target" [attr.title]="item.title">
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link" (click)="itemClick($event, item)" 
                            [ngClass]="{'ui-state-disabled':item.disabled}" [attr.target]="item.target" [attr.title]="item.title">
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                    <li class="ui-breadcrumb-chevron fa fa-chevron-right" *ngIf="!end"></li>
                </ng-template>
            </ul>
        </div>
    `
})
export class Breadcrumb {

    get icon(): string {
        if (this.home.icon) {
            return 'fa ' + this.home.icon;
        } else {
            return 'fa fa-home';
        }
    }

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() home: MenuItem;
        
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
    }
    
    onHomeClick(event) {
        if(this.home) {
            this.itemClick(event, this.home);
        }
    }
}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [Breadcrumb,RouterModule],
    declarations: [Breadcrumb]
})
export class BreadcrumbModule { }