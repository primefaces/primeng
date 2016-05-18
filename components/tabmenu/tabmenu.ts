import {Component,ElementRef,OnDestroy,Input,Output,EventEmitter} from '@angular/core';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../api/menumodel';
import {Location} from '@angular/common';
import {Router} from '@angular/router-deprecated';

@Component({
    selector: 'p-tabMenu',
    template: `
        <div [ngClass]="'ui-tabmenu ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <ul class="ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                <li *ngFor="let item of model" 
                    [ngClass]="{'ui-tabmenuitem ui-state-default ui-corner-top':true,
                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-hover':hoveredItem==item,'ui-state-active':activeItem==item}"
                    (mouseenter)="hoveredItem=item" (mouseleave)="hoveredItem=null">
                    <a [href]="getItemUrl(item)"class="ui-menuitem-link ui-corner-all" (click)="itemClick($event,item)">
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
    
    constructor(private router: Router, private location: Location) {}
        
    hoveredItem: MenuItem;
    
    ngOnInit() {
        if(!this.activeItem && this.model && this.model.length) {
            this.activeItem = this.model[0];
        }
    }
    
    itemClick(event, item: MenuItem) {
        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit(event);
        }

        if(!item.url) {
            event.preventDefault();
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
    
    getItemUrl(item: MenuItem): string {
        if(item.url) {
            if(Array.isArray(item.url))
                return this.location.prepareExternalUrl(this.router.generate(item.url).toLinkUrl());
            else
                return item.url;
        }
        else {
            return '#';
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