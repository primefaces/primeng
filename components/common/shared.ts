import {NgModule,EventEmitter,Directive,ViewContainerRef,Input,Output,ContentChild,TemplateRef,OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
    selector: 'header',
    template: '<ng-content></ng-content>'
})
export class Header {}

@Component({
    selector: 'footer',
    template: '<ng-content></ng-content>'
})
export class Footer {}

@Directive({
    selector: '[pTemplateWrapper]'
})
export class TemplateWrapper implements OnInit {
    
    @Input() item: any;
    
    @Input('pTemplateWrapper') templateRef: TemplateRef<any>;
    
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item
        });
    }
}

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

@Component({
    selector: 'p-columnTemplateLoader',
    template: ``
})
export class ColumnTemplateLoader {
        
    @Input() column: any;
    
    @Input() rowData: any;
    
    @Input() rowIndex: number;
    
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.column.template, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Header,Footer,Column,TemplateWrapper,ColumnTemplateLoader],
    declarations: [Header,Footer,Column,TemplateWrapper,ColumnTemplateLoader]
})
export class SharedModule { }