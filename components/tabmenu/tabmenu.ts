import {NgModule,Component,ElementRef,OnDestroy,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'p-tabMenu',
    template: `
        <div [ngClass]="'ui-tabmenu ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <ul class="ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                <li *ngFor="let item of model" 
                    [ngClass]="{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,
                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-hover':hoveredItem==item,'ui-state-active':activeItem==item}"
                    (mouseenter)="hoveredItem=item&&!item.disabled" (mouseleave)="hoveredItem=null">
                    <a [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" (click)="itemClick($event,item)">
                        <span class="ui-menuitem-icon fa" [ngClass]="item.icon"></span>
                        <span class="ui-menuitem-text">{{item.label}}</span>
                    </a>
                </li>
            </ul>
        </div>
    `,
    providers: [DomHandler]
})
export class TabMenu implements OnDestroy {

    @Input() model: MenuItem[];
    
    @Input() activeItem: MenuItem;

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    constructor(protected router: Router) {}
        
    hoveredItem: MenuItem;
    
    ngOnInit() {
        if(!this.activeItem && this.model && this.model.length) {
            this.activeItem = this.model[0];
        }
    }
    
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
        
        this.activeItem = item;
    }
    
    ngOnDestroy() {        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
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

}

@NgModule({
    imports: [CommonModule],
    exports: [TabMenu],
    declarations: [TabMenu]
})
export class TabMenuModule { }