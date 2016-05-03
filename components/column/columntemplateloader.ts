import {Component,ElementRef,AfterViewInit,DoCheck,Input,Output,EventEmitter,ContentChild,IterableDiffers,TemplateRef,ViewContainerRef} from '@angular/core';
import {Header} from '../common/header';
import {Footer} from '../common/footer';

@Component({
    selector: 'p-columnTemplateLoader',
    template: ``
})
export class ColumnTemplateLoader {
        
    @Input() column: any;
    
    @Input() rowData: any;
    
    @Input() rowIndex: number;
    
    constructor(private viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.column.template, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }
}