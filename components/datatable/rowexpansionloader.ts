import {Component,ElementRef,AfterViewInit,DoCheck,Input,Output,EventEmitter,ContentChild,IterableDiffers,TemplateRef,ViewContainerRef} from '@angular/core';
import {Header} from '../common';
import {Footer} from '../common';

@Component({
    selector: 'p-rowExpansionLoader',
    template: ``
})
export class RowExpansionLoader {
        
    @Input() template: TemplateRef<any>;
    
    @Input() rowData: any;
    
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData
        });
    }
}