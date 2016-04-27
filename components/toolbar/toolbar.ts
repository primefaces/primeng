import {Component,Input,Output,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-toolbar',
    template: `
        <div [ngClass]="'ui-toolbar ui-widget ui-widget-header ui-corner-all ui-helper-clearfix'" [attr.style]="style" [attr.class]="styleClass">
            <ng-content></ng-content>
        </div>
    `
})
export class Toolbar {
    
    @Input() style: string;
        
    @Input() styleClass: string;

}