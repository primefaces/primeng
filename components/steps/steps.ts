import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from '../common/api';
import {Router} from '@angular/router';

@Component({
    selector: 'p-steps',
    template: `
        <div [ngClass]="{'ui-steps ui-widget ui-helper-clearfix':true,'ui-steps-readonly':readonly}" [ngStyle]="style" [class]="styleClass">
            <ul role="tablist">
                <li *ngFor="let item of model; let i = index" class="ui-steps-item" #menuitem
                    [ngClass]="{'ui-state-highlight':(i === activeIndex),'ui-state-default':(i !== activeIndex),
                        'ui-state-disabled':item.disabled||(i !== activeIndex && readonly)}">
                    <a class="ui-menuitem-link" (click)="itemClick($event, item, i)" [attr.target]="item.target">
                        <span class="ui-steps-number">{{i + 1}}</span>
                        <span class="ui-steps-title">{{item.label}}</span>
                    </a>
                </li>
            </ul>
        </div>
    `
})
export class Steps {
    
    @Input() activeIndex: number = 0;
    
    @Input() model: MenuItem[];
    
    @Input() readonly: boolean =  true;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();
    
    constructor(public router: Router) {}
    
    itemClick(event: Event, item: MenuItem, i: number) {
        if(this.readonly || item.disabled) {
            return;
        }
        
        this.activeIndexChange.emit(i);
        
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
                item: item,
                index: i
            });
        }
        
        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    }
    
}

@NgModule({
    imports: [CommonModule],
    exports: [Steps],
    declarations: [Steps]
})
export class StepsModule { }
