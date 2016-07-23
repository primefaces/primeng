import {Component,ElementRef,AfterViewInit,DoCheck,Input,Output,EventEmitter,ContentChild,IterableDiffers,TemplateRef} from '@angular/core';
import {Header} from '../common';
import {Footer} from '../common';

@Component({
    selector: 'p-column',
    template: ``
})
export class Column {
    
    @Input() field: string;
    @Input() header: string;
    @Input() footer: string;
    @Input() sortable: any;
    @Input() editable: boolean;
    @Input() filter: boolean;
    @Input() filterMatchMode: string;
    @Input() rowspan: number;
    @Input() colspan: number;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() hidden: boolean;
    @Input() expander: boolean;
    @Input() selectionMode: string;
    @Output() sortFunction: EventEmitter<any> = new EventEmitter();
    @ContentChild(TemplateRef) template: TemplateRef<any>;
    
}