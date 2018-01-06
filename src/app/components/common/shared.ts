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
        
    @Input() index: number;
    
    @Input('pTemplateWrapper') templateRef: TemplateRef<any>;
    
    view: EmbeddedViewRef<any>;

    _item: any;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.render();
    }

    set item(item: any) {
        this._item = item;

        if(this.view) {
            this.view.destroy();
            this.render();
        }
    }

    @Input() get item(): any {
        return this._item;
    }

    render() {
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
    template: ''
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
    @Input() excludeGlobalFilter: boolean;
    @Input() rowspan: number;
    @Input() colspan: number;
    @Input() scope: string;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() exportable: boolean = true;
    @Input() headerStyle: any;
    @Input() headerStyleClass: string;
    @Input() bodyStyle: any;
    @Input() bodyStyleClass: string;
    @Input() footerStyle: any;
    @Input() footerStyleClass: string;
    @Input() hidden: boolean;
    @Input() expander: boolean;
    @Input() selectionMode: string;
    @Input() filterPlaceholder: string;
    @Input() filterMaxlength: number;
    @Input() frozen: boolean;
    @Input() resizable: boolean = true;
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
    
    @Input() frozen: boolean;
        
    @ContentChildren(Row) rows: QueryList<any>;
}

@Component({
    selector: 'p-footerColumnGroup',
    template: ``
})
export class FooterColumnGroup {
        
    @Input() frozen: boolean;
        
    @ContentChildren(Row) rows: QueryList<any>;
}

@Component({
    selector: 'p-templateLoader',
    template: ``
})
export class TemplateLoader implements OnInit, OnDestroy {
        
    @Input() template: TemplateRef<any>;
    
    _data: any;
            
    view: EmbeddedViewRef<any>;
    
    constructor(public viewContainer: ViewContainerRef) {}
    
    ngOnInit() {
        this.render();
    }
    
    render() {
        if(this.view) {
            this.view.destroy();
        }
        
        if(this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    }
    
    @Input() get data(): any {
        return this._data;
    }

    set data(val: any) {
        this._data = val;
        this.render();
    }
	
    ngOnDestroy() {
		if (this.view) {
            this.view.destroy();
        }
	}
}

@NgModule({
    imports: [CommonModule],
    exports: [Header,Footer,Column,TemplateWrapper,PrimeTemplate,TemplateLoader,Row,HeaderColumnGroup,FooterColumnGroup],
    declarations: [Header,Footer,Column,TemplateWrapper,PrimeTemplate,TemplateLoader,Row,HeaderColumnGroup,FooterColumnGroup]
})
export class SharedModule { }
