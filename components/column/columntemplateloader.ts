import {Component,ElementRef,AfterViewInit,DoCheck,Input,Output,EventEmitter,ContentChild,IterableDiffers,TemplateRef,ViewContainerRef} from 'angular2/core';
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
        let view = this.viewContainer.createEmbeddedView(this.column.template);
        view.setLocal('\$implicit', this.column);
        view.setLocal('rowData', this.rowData);
        view.setLocal('rowIndex', this.rowIndex);
    }
}