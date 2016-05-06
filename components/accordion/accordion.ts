import {Component,ElementRef,AfterContentInit,Input,Output,EventEmitter} from '@angular/core';
import {AccordionTab} from './accordiontab';

@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
})
export class Accordion {
    
    @Input() multiple: boolean;
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: any;
    
    @Input() styleClass: string;
    
    public tabs: AccordionTab[] = [];

    constructor(private el: ElementRef) {}

    addTab(tab: AccordionTab) {
        this.tabs.push(tab);
    }    
}