import {Component,ElementRef,AfterViewInit,DoCheck,Input,Output,EventEmitter,ContentChild,IterableDiffers,TemplateRef,ViewContainerRef} from '@angular/core';
import {Header} from '../common/header';
import {Footer} from '../common/footer';

@Component({
    selector: 'p-rowExpansionLoader',
    template: ``
})
export class RowExpansionLoader {
        
    @Input() template: TemplateRef<any>;
    
    @Input() rowData: any;
    
    constructor(private viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData
        });
    }
}