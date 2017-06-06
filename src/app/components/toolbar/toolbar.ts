import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-toolbar',
    template: `
        <div [ngClass]="'ui-toolbar ui-widget ui-widget-header ui-corner-all ui-helper-clearfix'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `
})
export class Toolbar {
    
    @Input() style: any;
        
    @Input() styleClass: string;

}

@NgModule({
    imports: [CommonModule],
    exports: [Toolbar],
    declarations: [Toolbar]
})
export class ToolbarModule { }