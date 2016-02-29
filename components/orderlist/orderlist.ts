import {Component,ElementRef,AfterViewInit,Input,Output,EventEmitter,ContentChild,TemplateRef} from 'angular2/core';
import {Button} from '../button/button';

@Component({
    selector: 'p-orderList',
    template: `
        <div class="ui-orderlist ui-grid ui-widget">
            <div class="ui-grid-row">
                <div class="ui-orderlist-controls ui-grid-col-2">
                    <button type="button" pButton icon="fa-angle-up" (click)="moveUp()"></button>
                    <button type="button" pButton icon="fa-angle-double-up" (click)="moveTop()"></button>
                    <button type="button" pButton icon="fa-angle-down" (click)="moveDown()"></button>
                    <button type="button" pButton icon="fa-angle-double-down" (click)="moveBottom()"></button>
                </div>
                <div class="ui-grid-col-10">
                    <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                    <ul class="ui-widget-content ui-orderlist-list ui-corner-bottom">
                        <template ngFor [ngForOf]="value" [ngForTemplate]="itemTemplate"></template>
                    </ul>
                </div>
            </div>
        </div>
    `,
    directives: [Button]
})
export class OrderList implements AfterViewInit {

    @Input() value: any[];
    
    @Input() header: string;

    @ContentChild(TemplateRef) itemTemplate: TemplateRef;

    ngAfterViewInit() {
        
    }
}