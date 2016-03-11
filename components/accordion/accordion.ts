import {Component,ElementRef,AfterContentInit,Input,Output,EventEmitter} from 'angular2/core';
import {AccordionTab} from './accordiontab';

@Component({
    selector: 'p-accordion',
    template: `
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [attr.style]="style" [attr.class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
})
export class Accordion {
    
    @Input() multiple: boolean;
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: string;
    
    @Input() styleClass: string;
    
    public tabs: AccordionTab[] = [];

    constructor(private el: ElementRef) {}

    addTab(tab: AccordionTab) {
        this.tabs.push(tab);
    }    
}