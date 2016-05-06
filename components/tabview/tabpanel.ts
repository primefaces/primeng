import {Component,Input} from '@angular/core';
import {TabView} from './tabview';

@Component({
    selector: 'p-tabPanel',
    template: `
        <div class="ui-tabview-panel ui-widget-content" [style.display]="selected ? 'block' : 'none'" *ngIf="!closed">
            <ng-content></ng-content>
        </div>
    `,
})
export class TabPanel {

    @Input() header: string;

    @Input() selected: boolean;
    
    @Input() disabled: boolean;
    
    @Input() closable: boolean;
    
    @Input() headerStyle: any;
    
    @Input() headerStyleClass: string;
    
    public hoverHeader: boolean;
    
    public closed: boolean;
}