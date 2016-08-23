import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-panel',
    template: `
        <div [ngClass]="'ui-panel ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all">
                <span class="ui-panel-title" *ngIf="header">{{header}}</span>
                <ng-content select="header"></ng-content>
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
    
    @Input() style: any;
        
    @Input() styleClass: string;

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    protected hoverToggler: boolean;
    
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

@NgModule({
    imports: [CommonModule],
    exports: [Panel],
    declarations: [Panel]
})
export class PanelModule { }