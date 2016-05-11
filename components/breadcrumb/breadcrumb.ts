import {Component,Input,OnDestroy,EventEmitter} from '@angular/core';
import {MenuElement,MenuItem} from '../api/menumodel';

@Component({
    selector: 'p-breadcrumb',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all'">
            <ul>
                <li class="fa fa-home"></li>
                <template ngFor let-item let-end="last" [ngForOf]="model">
                    <li role="menuitem">
                        <a [href]="item.url||'#'" class="ui-menuitem-link" (click)="itemClick($event, item)">
                            <span class="ui-menuitem-text">{{item.text}}</span>
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
    
    itemClick(event, item: MenuItem) {
        if(!item.eventEmitter) {
            item.eventEmitter = new EventEmitter();
            item.eventEmitter.subscribe(item.command);
        }
        
        item.eventEmitter.emit(event);
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