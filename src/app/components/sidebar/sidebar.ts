import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-sidebar',
    template: `
        <div [ngClass]="{'ui-sidebar ui-widget ui-widget-content ui-shadow':true, 'ui-sidebar-active': visible, 
            'ui-sidebar-left': (position === 'left'), 'ui-sidebar-right': (position === 'right'), 'ui-sidebar-full': fullScreen}"
            [@panelState]="visible ? 'visible' : 'hidden'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
    animations: [
        trigger('panelState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('300ms ease-in')),
            transition('hidden => visible', animate('300ms ease-out'))
        ])
    ]
})
export class Sidebar {

    @Input() visible: boolean;
    
    @Input() position: string = 'left';
    
    @Input() fullScreen: boolean;
    
    @Output() visibleChange:EventEmitter<any> = new EventEmitter();
    
}

@NgModule({
    imports: [CommonModule],
    exports: [Sidebar],
    declarations: [Sidebar]
})
export class SidebarModule { }
