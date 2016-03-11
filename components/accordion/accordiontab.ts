import {Component,Input} from 'angular2/core';
import {Accordion} from './accordion';

@Component({
    selector: 'p-accordionTab',
    template: `
        <div class="ui-accordion-header ui-helper-reset ui-state-default" [ngClass]="{'ui-state-active': selected,'ui-state-hover':hover&&!disabled,'ui-state-disabled':disabled}"
            (click)="toggle($event)" (mouseenter)="hover = true" (mouseout)="hover=false">
            <span class="fa fa-fw" [ngClass]="{'fa-caret-down': selected, 'fa-caret-right': !selected}"></span>
            <a href="#">{{header}}</a>
        </div>
        <div class="ui-accordion-content ui-helper-reset ui-widget-content" [style.display]="selected ? 'block' : 'none'">
            <ng-content></ng-content>
        </div>
    `,
})
export class AccordionTab {

    @Input() header: string;
    
    @Input() selected: boolean;
    
    @Input() disabled: boolean;
        
    constructor(private accordion: Accordion) {
        this.accordion.addTab(this);
    }
    
    toggle(event) {
        if(this.disabled) {
            event.preventDefault();
            return;
        }
        
        let index = this.findTabIndex();
        
        if(this.selected) {
            this.selected = !this.selected;
            this.accordion.onClose.next({originalEvent: event, index: index});
        }
        else {
            if(!this.accordion.multiple) {
                for(var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                }
            }
            
            this.selected = true;
            
            this.accordion.onOpen.next({originalEvent: event, index: index});
        }

        event.preventDefault();
    }
    
    findTabIndex() {
        let index = -1;
        for(var i = 0; i < this.accordion.tabs.length; i++) {
            if(this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }
}