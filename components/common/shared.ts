import {NgModule,EventEmitter,Directive,ViewContainerRef,Input,Output,ContentChildren,ContentChild,TemplateRef,OnInit,AfterContentInit,QueryList} from '@angular/core';
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
    selector: '[pTemplate]',
    host: {
    }
})
export class PrimeTemplate {
    
    @Input() type: string;
    
    constructor(protected template: TemplateRef<any>) {}
}

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
export class Column implements AfterContentInit{
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
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    @ContentChild(TemplateRef) template: TemplateRef<any>;
    
    protected headerTemplate: TemplateRef<any>;
    protected bodyTemplate: TemplateRef<any>;    
    protected footerTemplate: TemplateRef<any>;
    
    ngAfterContentInit():void {
        this.templates.forEach((item) => {
            switch(item.type) {
                case 'header':
                    this.headerTemplate = item.template;
                break;
                
                case 'body':
                    this.bodyTemplate = item.template;
                break;
                
                case 'footer':
                    this.footerTemplate = item.template;
                break;
                
                default:
                    this.bodyTemplate = item.template;
                break;
            }
        });
    }
}

@Component({
    selector: 'p-columnBodyTemplateLoader',
    template: ``
})
export class ColumnBodyTemplateLoader {
        
    @Input() column: any;
        
    @Input() rowData: any;
    
    @Input() rowIndex: number;
    
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }
}

@Component({
    selector: 'p-columnHeaderTemplateLoader',
    template: ``
})
export class ColumnHeaderTemplateLoader {
        
    @Input() column: any;
            
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    }
}

@Component({
    selector: 'p-columnFooterTemplateLoader',
    template: ``
})
export class ColumnFooterTemplateLoader {
        
    @Input() column: any;
            
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        let view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    }
}

@Component({
    selector: 'p-templateLoader',
    template: ``
})
export class TemplateLoader {
        
    @Input() template: TemplateRef<any>;
            
    constructor(protected viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        if(this.template) {
            this.viewContainer.createEmbeddedView(this.template, {});
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Header,Footer,Column,TemplateWrapper,ColumnHeaderTemplateLoader,ColumnBodyTemplateLoader,ColumnFooterTemplateLoader,PrimeTemplate,TemplateLoader],
    declarations: [Header,Footer,Column,TemplateWrapper,ColumnHeaderTemplateLoader,ColumnBodyTemplateLoader,ColumnFooterTemplateLoader,PrimeTemplate,TemplateLoader]
})
export class SharedModule { }