import {NgModule,Component,Input,Output,EventEmitter,trigger,state,transition,style,animate} from '@angular/core';
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
            <div class="ui-panel-content-wrapper" [@panelContent]="collapsed ? 'hidden' : 'visible'" 
                [ngClass]="{'ui-panel-content-wrapper-overflown': collapsed||animating}">
                <div class="ui-panel-content ui-widget-content">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('panelContent', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class Panel {

    @Input() toggleable: boolean;

    @Input() header: string;

    @Input() collapsed: boolean = false;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Output() collapsedChange: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    protected hoverToggler: boolean;
    
    protected animating: boolean;
    
    toggle(event) {
        this.animating = true;
        this.onBeforeToggle.emit({originalEvent: event, collapsed: this.collapsed});
        
        if(this.toggleable) {            
            if(this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        
        this.onAfterToggle.emit({originalEvent: event, collapsed: this.collapsed});   
        
        //TODO: Use onDone of animate callback instead with RC6
        setTimeout(() => {
            this.animating = false;
        }, 400);
        
        event.preventDefault();
    }
    
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Panel],
    declarations: [Panel]
})
export class PanelModule { }