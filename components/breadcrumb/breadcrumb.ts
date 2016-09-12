import {NgModule,Component,Input,OnDestroy,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from '../common/api';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'p-breadcrumb',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all'">
            <ul>
                <li class="fa fa-home"></li>
                <template ngFor let-item let-end="last" [ngForOf]="model">
                    <li role="menuitem">
                        <a [href]="item.url||'#'" class="ui-menuitem-link" (click)="itemClick($event, item)" [ngClass]="{'ui-state-disabled':item.disabled}">
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                    <li class="ui-breadcrumb-chevron fa fa-chevron-right" *ngIf="!end"></li>
                </template>
            </ul>
        </div>
    `
})
export class Breadcrumb implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    constructor(protected router: Router) {}
    
    itemClick(event, item: MenuItem) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url||item.routerLink) {
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
                
        if(item.routerLink) {
            this.router.navigate(item.routerLink);
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
    imports: [CommonModule],
    exports: [Breadcrumb],
    declarations: [Breadcrumb]
})
export class BreadcrumbModule { }