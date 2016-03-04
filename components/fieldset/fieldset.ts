import {Component,Input,Output,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-fieldset',
    template: `
        <fieldset class="ui-fieldset ui-widget ui-widget-content ui-corner-all" [ngClass]="{'ui-fieldset-toggleable': toggleable}">
            <legend class="ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text" 
                (mouseenter)="onLegendMouseenter($event)" (mouseleave)="onLegendMouseleave($event)" (click)="toggle($event)"[ngClass]="{'ui-state-hover':hover}">
                <span *ngIf="toggleable" class="ui-fieldset-toggler fa fa-w" [ngClass]="{'fa-minus': !collapsed,'fa-plus':collapsed}"></span>
                {{legend}}
            </legend>
            <div class="ui-fieldset-content" [style.display]="collapsed ? 'none' : 'block'">
                <ng-content></ng-content>
            </div>
        </fieldset>
    `,
})
export class Fieldset {

    @Input() legend: string;

    @Input() toggleable: boolean;

    @Input() collapsed: boolean = false;

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    private hover: boolean;
    
    onLegendMouseenter(event) {
        if(this.toggleable) {
            this.hover = true;
        }
    } 
    
    onLegendMouseleave(event) {
        if(this.toggleable) {
            this.hover = false;
        }
    }
    
    toggle(event) {
        if(this.toggleable) {
            this.onBeforeToggle.next({originalEvent: event, collapsed: this.collapsed});
            
            if(this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
                
            this.onAfterToggle.next({originalEvent: event, collapsed: this.collapsed});   
        }
    }
    
    expand(event) {
        this.collapsed = false;
    }
    
    collapse(event) {
        this.collapsed = true;
    }

}