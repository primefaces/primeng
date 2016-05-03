import {Component,ElementRef,AfterViewInit,DoCheck,Input,Output,EventEmitter,ContentChild,IterableDiffers,TemplateRef} from '@angular/core';
import {Header} from '../common/header';
import {Footer} from '../common/footer';

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
    @Input() style: string;
    @Input() styleClass: string;
    @Input() hidden: boolean;
    @Input() expander: boolean;
    @Output() sortFunction: EventEmitter<any> = new EventEmitter();
    @ContentChild(TemplateRef) template: TemplateRef<any>;
    
}