import { NgModule, AfterContentInit, OnInit, OnDestroy, HostListener, Injectable, Directive, Component, Input, Output, EventEmitter, ContentChildren, TemplateRef, QueryList, ElementRef, NgZone} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../common/treenode';
import { Subject, Subscription, Observable } from 'rxjs';
import { DomHandler } from '../dom/domhandler';
import { PaginatorModule } from '../paginator/paginator';
import { PrimeTemplate } from '../common/shared';
import { SortMeta } from '../common/sortmeta';
import { ObjectUtils } from '../utils/objectutils';

@Injectable()
export class TreeTableService {

    private sortSource = new Subject<SortMeta|SortMeta[]>();
    private selectionSource = new Subject();
    private contextMenuSource = new Subject<any>();
    private valueSource = new Subject<any>();
    private totalRecordsSource = new Subject<any>();

    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    valueSource$ = this.valueSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();

    onSort(sortMeta: SortMeta|SortMeta[]) {
        this.sortSource.next(sortMeta);
    }

    onSelectionChange() {
        this.selectionSource.next();
    }

    onContextMenu(data: any) {
        this.contextMenuSource.next(data);
    }

    onValueChange(value: any) {
        this.valueSource.next(value);
    }

    onTotalRecordsChange(value: number) {
        this.totalRecordsSource.next(value);
    }
}

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
    providers: [DomHandler,ObjectUtils,TreeTableService]
})
export class TreeTable implements AfterContentInit, OnInit {

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

    @Input() defaultSortOrder: number = 1;

    @Input() sortMode: string = 'single';
    
    @Input() resetPageOnSort: boolean = true;

    @Input() customSort: boolean;

    @Input() rowTrackBy: Function = (index: number, item: any) => item;

    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Output() sortFunction: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    _value: TreeNode[] = [];

    serializedValue: any[];

    _multiSortMeta: SortMeta[];

    _sortField: string;

    _sortOrder: number = 1;

    colGroupTemplate: TemplateRef<any>;

    captionTemplate: TemplateRef<any>;

    headerTemplate: TemplateRef<any>;

    bodyTemplate: TemplateRef<any>;

    footerTemplate: TemplateRef<any>;

    summaryTemplate: TemplateRef<any>;

    emptyMessageTemplate: TemplateRef<any>;

    paginatorLeftTemplate: TemplateRef<any>;

    paginatorRightTemplate: TemplateRef<any>;

    initialized: boolean;

    ngOnInit() {
        /*if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }*/
        this.initialized = true;
    }

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

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils, public zone: NgZone, public tableService: TreeTableService) {}

    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
        this._value = val;

        if (!this.lazy) {
            this.totalRecords = (this._value ? this._value.length : 0);

            if (this.sortMode == 'single' && this.sortField)
                this.sortSingle();
            else if (this.sortMode == 'multiple' && this.multiSortMeta)
                this.sortMultiple();
        }

        this.updateSerializedValue();
    }

    updateSerializedValue() {
        this.serializedValue = [];

        if(this.paginator)
            this.serializePageNodes();
        else
            this.serializeNodes(null, this.value, 0, true);
    }

    serializeNodes(parent, nodes, level, visible) {
        if(nodes && nodes.length) {
            for(let node of nodes) {
                const rowNode = {
                    node: node,
                    parent: parent,
                    level: level,
                    visible: visible && (parent ? parent.expanded : true)
                };
                this.serializedValue.push(rowNode);

                this.serializeNodes(node, node.children, level + 1, rowNode.visible);
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
                    level: 0,
                    visible: true
                });
    
                this.serializeNodes(node, node.children, 1, true);
            }
        }
    }

    @Input() get sortField(): string {
        return this._sortField;
    }

    set sortField(val: string) {
        this._sortField = val;

        //avoid triggering lazy load prior to lazy initialization at onInit
        if ( !this.lazy || this.initialized ) {
            if (this.sortMode === 'single') {
                this.sortSingle();
            }
        }
    }

    @Input() get sortOrder(): number {
        return this._sortOrder;
    }
    set sortOrder(val: number) {
        this._sortOrder = val;

         //avoid triggering lazy load prior to lazy initialization at onInit
        if ( !this.lazy || this.initialized ) {
            if (this.sortMode === 'single') {
                this.sortSingle();
            }
        }
    }

    @Input() get multiSortMeta(): SortMeta[] {
        return this._multiSortMeta;
    }

    set multiSortMeta(val: SortMeta[]) {
        this._multiSortMeta = val;
        if (this.sortMode === 'multiple') {
            this.sortMultiple();
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

    sort(event) {
        let originalEvent = event.originalEvent;

        if(this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            let sortMeta = this.getSortMeta(event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }]
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                }
                this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            
            this.sortMultiple();
        }
    }

    sortSingle() {
        if(this.sortField && this.sortOrder) {
            if(this.resetPageOnSort) {
                this.first = 0;
            }

            if(this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                this.sortNodes(this.value);
            }
    
            let sortMeta: SortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };
    
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
            this.updateSerializedValue();
        }
    }

    sortNodes(nodes) {
        if(!nodes || nodes.length === 0) {
            return;
        } 

        if(this.customSort) {
            this.sortFunction.emit({
                data: nodes,
                mode: this.sortMode,
                field: this.sortField,
                order: this.sortOrder
            });
        }
        else {
            nodes.sort((node1, node2) => {
                let value1 = this.objectUtils.resolveFieldData(node1.data, this.sortField);
                let value2 = this.objectUtils.resolveFieldData(node2.data, this.sortField);
                let result = null;

                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, {numeric: true});
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

                return (this.sortOrder * result);
            });
        }

        for(let node of nodes) {
            this.sortNodes(node.children);
        }
    }

    sortMultiple() {
        if(this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
               this.sortMultipleNodes(this.value);
            }
            
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
            this.updateSerializedValue();
        }
    }

    sortMultipleNodes(nodes) {
        if(!nodes || nodes.length === 0) {
            return;
        } 
        
        if(this.customSort) {
            this.sortFunction.emit({
                data: this.value,
                mode: this.sortMode,
                multiSortMeta: this.multiSortMeta
            });
        }
        else {
            this.value.sort((node1, node2) => {
                return this.multisortField(node1, node2, this.multiSortMeta, 0);
            });
        }

        for(let node of nodes) {
            this.sortMultipleNodes(node.children);
        }
    }

    multisortField(node1, node2, multiSortMeta, index) {
        let value1 = this.objectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
        let value2 = this.objectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2, undefined, {numeric: true}));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }

        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(node1, node2, multiSortMeta, index + 1)) : 0;
        }

        return (multiSortMeta[index].order * result);
    }

    getSortMeta(field: string) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (let i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
       
        return null;
    }

    isSorted(field: string) {
        if(this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if(this.sortMode === 'multiple') {
            let sorted = false;
            if(this.multiSortMeta) {
                for(let i = 0; i < this.multiSortMeta.length; i++) {
                    if(this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }

    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            multiSortMeta: this.multiSortMeta
        };
    }

    isEmpty() {
        return this.value == null || this.value.length == 0;
    }
}

@Component({
    selector: '[pTreeTableBody]',
    template: `
        <ng-template ngFor let-serializedNode let-rowIndex="index" [ngForOf]="tt.serializedValue" [ngForTrackBy]="tt.rowTrackBy">
            <ng-container *ngIf="serializedNode.visible">
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

@Directive({
    selector: '[pSortableColumn]',
    providers: [DomHandler],
    host: {
        '[class.ui-sortable-column]': 'true',
        '[class.ui-state-highlight]': 'sorted'
    }
})
export class SortableColumn implements OnInit, OnDestroy {

    @Input("pSortableColumn") field: string;

    @Input() pSortableColumnDisabled: boolean;

    sorted: boolean;
    
    subscription: Subscription;

    constructor(public tt: TreeTable, public domHandler: DomHandler) {
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.sortSource$.subscribe(sortMeta => {
                this.updateSortState();
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }

    updateSortState() {
        this.sorted = this.tt.isSorted(this.field);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.tt.sort({
                originalEvent: event,
                field: this.field
            });

            this.domHandler.clearSelection();
        }
    }

    isEnabled() {
        return this.pSortableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-sortIcon',
    template: `
        <a href="#" (click)="onClick($event)" [attr.aria-label]=" sortOrder === 1 ? ariaLabelAsc : sortOrder === -1 ? ariaLabelDesc : '' ">
            <i class="ui-sortable-column-icon fa fa-fw fa-sort" [ngClass]="{'fa-sort-asc': sortOrder === 1, 'fa-sort-desc': sortOrder === -1}"></i>
        </a>
    `
})
export class SortIcon implements OnInit, OnDestroy {

    @Input() field: string;
    
    @Input() ariaLabelDesc: string;
    
    @Input() ariaLabelAsc: string;

    subscription: Subscription;

    sortOrder: number;

    constructor(public dt: TreeTable) {
        this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
        });
    }

    ngOnInit() {
        this.updateSortState();
    }
    
    onClick(event){
        event.preventDefault();
    }

    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            let sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order: 0;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

@Component({
    selector: 'p-treeTableToggler',
    template: `
        <a href="#" class="ui-treetable-toggler" *ngIf="rowNode.level !== 0 || rowNode.node.children && rowNode.node.children.length" (click)="onClick($event)" [style.visibility]="rowNode.node.children && rowNode.node.children.length ? 'visible' : 'hidden'" [style.marginLeft]="rowNode.level * 16 + 'px'">
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
            });
        }
        else {
            //this.collapseNodeChildren(this.rowNode.node.children);
            this.tt.onNodeCollapse.emit({
                originalEvent: event,
                node: this.rowNode.node
            });
        }
        this.tt.updateSerializedValue();
        event.preventDefault();
    }

    /*collapseNodeChildren(nodes) {
        if(nodes && nodes.length) {
            for(let node of nodes) {
                node.expanded = false;
                
                this.collapseNodeChildren(node.children);
            }
        }
    }*/
}

@NgModule({
    imports: [CommonModule,PaginatorModule],
    exports: [TreeTable,TreeTableToggler,SortableColumn,SortIcon],
    declarations: [TreeTable,TreeTableBody,TreeTableToggler,SortableColumn,SortIcon]
})
export class TreeTableModule { }