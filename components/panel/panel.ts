import {Component,Input,Output,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-panel',
    template: `
        <div [ngClass]="'ui-panel ui-widget ui-widget-content ui-corner-all'" [attr.style]="style" [attr.class]="styleClass">
            <div class="ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all">
                <span class="ui-panel-title">{{header}}</span>
                <a *ngIf="toggleable" class="ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default" href="#"
                    [ngClass]="{'ui-state-hover':hoverToggler}" (mouseenter)="hoverToggler=true" (mouseleave)="hoverToggler=false" (click)="toggle($event)">
                    <span class="fa fa-fw" [ngClass]="{'fa-minus': !collapsed,'fa-plus':collapsed}"></span>
                </a>
            </div>
            <div class="ui-panel-content ui-widget-content" [style.display]="collapsed ? 'none' : 'block'">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class Panel {

    @Input() toggleable: boolean;

    @Input() header: string;

    @Input() collapsed: boolean = false;
    
    @Input() style: string;
        
    @Input() styleClass: string;

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    private hoverToggler: boolean;
    
    toggle(event) {
        this.onBeforeToggle.emit({originalEvent: event, collapsed: this.collapsed});
        
        if(this.toggleable) {            
            if(this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        
        this.onAfterToggle.emit({originalEvent: event, collapsed: this.collapsed});   
        
        event.preventDefault();
    }
    
    expand(event) {
        this.collapsed = false;
    }
    
    collapse(event) {
        this.collapsed = true;
    }

}