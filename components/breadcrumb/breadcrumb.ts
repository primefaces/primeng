import {NgModule,Component,Input,OnDestroy,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from '../common/api';
import {Location} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-breadcrumb',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all'">
            <ul>
                <li class="ui-breadcrumb-home fa fa-home" *ngIf="!home"></li>
                <li class="ui-breadcrumb-home" *ngIf="home">
                    <a *ngIf="!home.routerLink" [href]="home.url||'#'" class="ui-menuitem-link" (click)="itemClick($event, home)" 
                        [ngClass]="{'ui-state-disabled':home.disabled}" [attr.target]="home.target">
                        <span class="fa fa-home"></span>
                    </a>
                    <a *ngIf="home.routerLink" [routerLink]="home.routerLink" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="home.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link" (click)="itemClick($event, home)" 
                        [ngClass]="{'ui-state-disabled':home.disabled}" [attr.target]="home.target">
                        <span class="fa fa-home"></span>
                    </a>
                </li>
                <li class="ui-breadcrumb-chevron fa fa-chevron-right" *ngIf="model"></li>
                <ng-template ngFor let-item let-end="last" [ngForOf]="model">
                    <li role="menuitem">
                        <a *ngIf="!item.routerLink" [href]="item.url||'#'" class="ui-menuitem-link" (click)="itemClick($event, item)" 
                            [ngClass]="{'ui-state-disabled':item.disabled}" [attr.target]="item.target">
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link" (click)="itemClick($event, item)" 
                            [ngClass]="{'ui-state-disabled':item.disabled}" [attr.target]="item.target">
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                    <li class="ui-breadcrumb-chevron fa fa-chevron-right" *ngIf="!end"></li>
                </ng-template>
            </ul>
        </div>
    `
})
export class Breadcrumb implements OnDestroy {

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
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit({
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
        
    ngOnDestroy() {
        if(this.model) {
            for(let item of this.model) {
                if(item.eventEmitter) {
                    item.eventEmitter.unsubscribe();
                }
            }
        }
    }

}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [Breadcrumb,RouterModule],
    declarations: [Breadcrumb]
})
export class BreadcrumbModule { }