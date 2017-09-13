import {NgModule,EventEmitter,Directive,ViewContainerRef,Input,Output,ContentChildren,ContentChild,TemplateRef,OnInit,OnChanges,OnDestroy,AfterContentInit,QueryList,SimpleChanges,EmbeddedViewRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
    selector: 'p-header',
    template: '<ng-content></ng-content>'
})
export class Header {}

@Component({
    selector: 'p-footer',
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
    
    @Input('pTemplate') name: string;
    
    constructor(public template: TemplateRef<any>) {}
    
    getType(): string {
        return this.name;
    }
}

@Directive({
    selector: '[pTemplateWrapper]'
})
export class TemplateWrapper implements OnInit, OnDestroy {
    
    @Input() item: any;
    
    @Input() index: number;
    
    @Input('pTemplateWrapper') templateRef: TemplateRef<any>;
    
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    }
	
    ngOnDestroy() {
		this.view.destroy();
	}
}

@Component({
    selector: 'p-column',
    template: ``
})
export class Column implements AfterContentInit{
    @Input() field: string;
    @Input() colId: string;
    @Input() sortField: string;
    @Input() filterField: string;
    @Input() header: string;
    @Input() footer: string;
    @Input() sortable: any;
    @Input() editable: boolean;
    @Input() filter: boolean;
    @Input() filterMatchMode: string;
    @Input() filterType: string = 'text';
    @Input() rowspan: number;
    @Input() colspan: number;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() hidden: boolean;
    @Input() expander: boolean;
    @Input() selectionMode: string;
    @Input() filterPlaceholder: string;
    @Input() filterMaxlength: number;
    @Input() frozen: boolean;
    @Output() sortFunction: EventEmitter<any> = new EventEmitter();
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    @ContentChild(TemplateRef) template: TemplateRef<any>;
    
    public headerTemplate: TemplateRef<any>;
    public bodyTemplate: TemplateRef<any>;    
    public footerTemplate: TemplateRef<any>;
    public filterTemplate: TemplateRef<any>;
    public editorTemplate: TemplateRef<any>;
    
    ngAfterContentInit():void {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                break;
                
                case 'body':
                    this.bodyTemplate = item.template;
                break;
                
                case 'footer':
                    this.footerTemplate = item.template;
                break;
                
                case 'filter':
                    this.filterTemplate = item.template;
                break;
                
                case 'editor':
                    this.editorTemplate = item.template;
                break;
                
                default:
                    this.bodyTemplate = item.template;
                break;
            }
        });
    }
}

@Component({
    selector: 'p-row',
    template: ``
})
export class Row {
    
    @ContentChildren(Column) columns: QueryList<Column>;
    
}

@Component({
    selector: 'p-headerColumnGroup',
    template: ``
})
export class HeaderColumnGroup {
        
    @ContentChildren(Row) rows: QueryList<any>;
}

@Component({
    selector: 'p-footerColumnGroup',
    template: ``
})
export class FooterColumnGroup {
        
    @ContentChildren(Row) rows: QueryList<any>;
}

@Component({
    selector: 'p-columnBodyTemplateLoader',
    template: ``
})
export class ColumnBodyTemplateLoader implements OnInit, OnChanges, OnDestroy {
        
    @Input() column: any;
        
    @Input() rowData: any;
    
    @Input() rowIndex: number;
    
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if(!this.view) {
            return;
        }
        
        if('rowIndex' in changes) {
            this.view.context.rowIndex = changes['rowIndex'].currentValue;
        }
    }
	
    ngOnDestroy() {
		this.view.destroy();
	}
}

@Component({
    selector: 'p-columnHeaderTemplateLoader',
    template: ``
})
export class ColumnHeaderTemplateLoader implements OnInit, OnDestroy {
        
    @Input() column: any;
            
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    }
	
    ngOnDestroy() {
		this.view.destroy();
	}
}

@Component({
    selector: 'p-columnFooterTemplateLoader',
    template: ``
})
export class ColumnFooterTemplateLoader implements OnInit, OnDestroy {
        
    @Input() column: any;
    
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    }
	
    ngOnDestroy() {
		this.view.destroy();
	}
}

@Component({
    selector: 'p-columnFilterTemplateLoader',
    template: ``
})
export class ColumnFilterTemplateLoader implements OnInit, OnDestroy {
        
    @Input() column: any;
            
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    }
	
    ngOnDestroy() {
		this.view.destroy();
	}
}

@Component({
    selector: 'p-columnEditorTemplateLoader',
    template: ``
})
export class ColumnEditorTemplateLoader implements OnInit, OnDestroy {
            
    @Input() column: any;
    
    @Input() rowData: any;
    
    @Input() rowIndex: any;
            
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }
	
    ngOnDestroy() {
		this.view.destroy();
	}
}

@Component({
    selector: 'p-templateLoader',
    template: ``
})
export class TemplateLoader implements OnInit, OnDestroy {
        
    @Input() template: TemplateRef<any>;
    
    @Input() data: any;
            
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        if(this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    }
	
    ngOnDestroy() {
		if (this.view) this.view.destroy();
	}
}

@NgModule({
    imports: [CommonModule],
    exports: [Header,Footer,Column,TemplateWrapper,ColumnHeaderTemplateLoader,ColumnBodyTemplateLoader,ColumnFooterTemplateLoader,ColumnFilterTemplateLoader,PrimeTemplate,TemplateLoader,Row,HeaderColumnGroup,FooterColumnGroup,ColumnEditorTemplateLoader],
    declarations: [Header,Footer,Column,TemplateWrapper,ColumnHeaderTemplateLoader,ColumnBodyTemplateLoader,ColumnFooterTemplateLoader,ColumnFilterTemplateLoader,PrimeTemplate,TemplateLoader,Row,HeaderColumnGroup,FooterColumnGroup,ColumnEditorTemplateLoader]
})
export class SharedModule { }
