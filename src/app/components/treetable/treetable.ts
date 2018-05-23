import { NgModule, AfterContentInit, Component, Input, Output, EventEmitter, ContentChildren, TemplateRef, QueryList} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../common/treenode';
import { Subscription } from 'rxjs';
import { DomHandler } from '../dom/domhandler';
import { PaginatorModule } from '../paginator/paginator';
import { PrimeTemplate } from '../common/shared';

@Component({
    selector: 'p-treeTable',
    template: `
        <div #container [ngStyle]="style" [class]="styleClass"
                [ngClass]="{'ui-treetable ui-widget': true, 'ui-table-auto-layout': autoLayout}">
            <div *ngIf="captionTemplate" class="ui-treetable-caption ui-widget-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div class="ui-treetable-wrapper" *ngIf="!scrollable">
                <table #table class="ui-treetable-table">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="ui-treetable-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tfoot class="ui-treetable-tfoot">
                        <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                    <tbody class="ui-treetable-tbody" [pTreeTableBody]="columns" [pTreeTableBodyTemplate]="bodyTemplate"></tbody>
                </table>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div *ngIf="summaryTemplate" class="ui-treetable-summary ui-widget-header">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class TreeTable implements AfterContentInit{

    @Input() columns: any[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() autoLayout: boolean;

    @Input() scrollable: boolean;

    @Input() lazy: boolean = false;

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() first: number = 0;

    @Input() totalRecords: number = 0;

    @Input() pageLinks: number = 5;

    @Input() rowsPerPageOptions: number[];

    @Input() alwaysShowPaginator: boolean = true;

    @Input() paginatorPosition: string = 'bottom';

    @Input() paginatorDropdownAppendTo: any;

    @Input() rowTrackBy: Function = (index: number, item: any) => item;

    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    _value: TreeNode[] = [];

    serializedValue: any[];

    colGroupTemplate: TemplateRef<any>;

    captionTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    bodyTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    summaryTemplate: TemplateRef<any>;

    emptyMessageTemplate: TemplateRef<any>;

    paginatorLeftTemplate: TemplateRef<any>;

    paginatorRightTemplate: TemplateRef<any>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                break;

                case 'header':
                    this.headerTemplate = item.template;
                break;

                case 'body':
                    this.bodyTemplate = item.template;
                break;

                case 'footer':
                    this.footerTemplate = item.template;
                break;

                case 'summary':
                    this.summaryTemplate = item.template;
                break;

                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                break;

                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                break;

                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                break;
            }
        });
    }

    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
        this._value = val;

        if (!this.lazy) {
            this.totalRecords = (this._value ? this._value.length : 0);
        }

        this.updateSerializedValue();
    }

    updateSerializedValue() {
        this.serializedValue = [];

        if(this.paginator)
            this.serializePageNodes();
        else
            this.serializeNodes(null, this.value, 0);
    }

    serializeNodes(parent, nodes, level) {
        if(nodes && nodes.length) {
            for(let node of nodes) {
                this.serializedValue.push({
                    node: node,
                    parent: parent,
                    level: level
                });

                this.serializeNodes(node, node.children, level + 1);
            }
        }
    }

    serializePageNodes() {
        this.serializedValue = []; 
        if(this.value && this.value.length) {
            for(let i = this.first; i < (this.first + this.rows); i++) {
                let node = this.value[i];
    
                this.serializedValue.push({
                    node: node,
                    parent: null,
                    level: 0
                });
    
                this.serializeNodes(node, node.children, 1);
            }
        }
    }

    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;

        /*if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }*/

        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });

        this.serializePageNodes();
    }

    isEmpty() {
        return this.value == null || this.value.length == 0;
    }
}

@Component({
    selector: '[pTreeTableBody]',
    template: `
        <ng-template ngFor let-serializedNode let-rowIndex="index" [ngForOf]="tt.serializedValue" [ngForTrackBy]="tt.rowTrackBy">
            <ng-container *ngIf="!serializedNode.parent || serializedNode.parent.expanded">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: serializedNode, rowData: serializedNode.node.data, columns: columns}"></ng-container>
            </ng-container>
        </ng-template>
        <ng-container *ngIf="tt.isEmpty()">
            <ng-container *ngTemplateOutlet="tt.emptyMessageTemplate; context: {$implicit: columns}"></ng-container>
        </ng-container>
    `
})
export class TreeTableBody {

    @Input("pTreeTableBody") columns: any[];

    @Input("pTreeTableBodyTemplate") template: TemplateRef<any>;

    constructor(public tt: TreeTable) {}
}

@Component({
    selector: 'p-treeTableToggler',
    template: `
        <a href="#" class="ui-treetable-toggler" (click)="onClick($event)" [style.visibility]="rowNode.node.children && rowNode.node.children.length ? 'visible' : 'hidden'" [style.marginLeft]="rowNode.level * 16 + 'px'">
            <i [ngClass]="rowNode.node.expanded ? 'fa fa-fw fa-chevron-circle-down' : 'fa fa-fw fa-chevron-circle-right'"></i>
        </a>
    `
})
export class TreeTableToggler {

    @Input() rowNode: any;

    constructor(public tt: TreeTable) {}

    onClick(event: Event) {
        this.rowNode.node.expanded = !this.rowNode.node.expanded;

        if(this.rowNode.node.expanded) {
            this.tt.onNodeExpand.emit({
                originalEvent: event,
                node: this.rowNode.node
            })
        }
        event.preventDefault();
    }
}



@NgModule({
    imports: [CommonModule,PaginatorModule],
    exports: [TreeTable,TreeTableToggler],
    declarations: [TreeTable,TreeTableBody,TreeTableToggler]
})
export class TreeTableModule { }