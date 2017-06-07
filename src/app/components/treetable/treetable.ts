import {NgModule,Component,Input,Output,EventEmitter,AfterViewChecked,AfterContentInit,OnDestroy,ElementRef,ContentChild,IterableDiffers,ChangeDetectorRef,ContentChildren,QueryList,Inject,forwardRef,OnInit,Renderer2,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from '../common/treenode';
import {Header,Footer,Column} from '../common/shared';
import {SharedModule} from '../common/shared';
import {Subscription} from 'rxjs/Subscription';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: '[pTreeRow]',
    template: `
        <div class="ui-treetable-row" [ngClass]="{'ui-state-highlight':isSelected(),'ui-treetable-row-selectable':treeTable.selectionMode && node.selectable !== false}">
            <td *ngFor="let col of treeTable.columns; let i=index" [ngStyle]="col.style" [class]="col.styleClass" (click)="onRowClick($event)" (touchend)="onRowTouchEnd()" (contextmenu)="onRowRightClick($event)">
                <a href="#" *ngIf="i==0" class="ui-treetable-toggler fa fa-fw ui-c" [ngClass]="{'fa-caret-down':node.expanded,'fa-caret-right':!node.expanded}"
                    [ngStyle]="{'margin-left':level*16 + 'px','visibility': isLeaf() ? 'hidden' : 'visible'}"
                    (click)="toggle($event)"
                    [title]="node.expanded ? labelCollapse : labelExpand">
                </a>
                <div class="ui-chkbox ui-treetable-checkbox" *ngIf="treeTable.selectionMode == 'checkbox' && i==0"><div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default">
                    <span class="ui-chkbox-icon ui-c fa" 
                        [ngClass]="{'fa-check':isSelected(),'fa-minus':node.partialSelected}"></span></div></div
                ><span *ngIf="!col.template">{{resolveFieldData(node.data,col.field)}}</span>
                <p-columnBodyTemplateLoader [column]="col" [rowData]="node" *ngIf="col.template"></p-columnBodyTemplateLoader>
            </td>
        </div>
        <div *ngIf="node.children && node.expanded" class="ui-treetable-row" style="display:table-row">
            <td [attr.colspan]="treeTable.columns.length" class="ui-treetable-child-table-container">
                <table>
                    <tbody pTreeRow *ngFor="let childNode of node.children" [node]="childNode" [level]="level+1" [labelExpand]="labelExpand" [labelCollapse]="labelCollapse" [parentNode]="node"></tbody>
                </table>
            </td>
        </div>
    `
})
export class UITreeRow implements OnInit {

    @Input() node: TreeNode;
    
    @Input() parentNode: TreeNode;
    
    @Input() level: number = 0;

    @Input() labelExpand: string = "Expand";
    
    @Input() labelCollapse: string = "Collapse";
                
    constructor(@Inject(forwardRef(() => TreeTable)) public treeTable:TreeTable) {}
    
    ngOnInit() {
        this.node.parent = this.parentNode;
    }
    
    toggle(event: Event) {
        if(this.node.expanded)
            this.treeTable.onNodeCollapse.emit({originalEvent: event, node: this.node});
        else
            this.treeTable.onNodeExpand.emit({originalEvent: event, node: this.node});
            
        this.node.expanded = !this.node.expanded;
        
        event.preventDefault();
    }
    
    isLeaf() {
        return this.node.leaf == false ? false : !(this.node.children&&this.node.children.length);
    }
    
    isSelected() {
        return this.treeTable.isSelected(this.node);
    }
    
    onRowClick(event: MouseEvent) {
        this.treeTable.onRowClick(event, this.node);
    }
    
    onRowRightClick(event: MouseEvent) {
        this.treeTable.onRowRightClick(event, this.node);
    }
    
    onRowTouchEnd() {
        this.treeTable.onRowTouchEnd();
    }
    
    resolveFieldData(data: any, field: string): any {
        if(data && field) {
            if(field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields: string[] = field.split('.');
                let value = data;
                for(var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }
}

@Component({
    selector: 'p-treeTable',
    template: `
        <div [ngClass]="{'ui-treetable ui-widget': true, 'ui-treetable-resizable':resizableColumns}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-treetable-header ui-widget-header" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <div class="ui-treetable-tablewrapper">
                <table #tbl class="ui-widget-content">
                    <thead>
                        <tr class="ui-state-default">
                            <th #headerCell *ngFor="let col of columns; let lastCol=last "  [ngStyle]="col.style" [class]="col.styleClass" 
                                [ngClass]="{'ui-state-default ui-unselectable-text': true, 'ui-resizable-column': resizableColumns}">
                                <span class="ui-column-resizer" *ngIf="resizableColumns && ((columnResizeMode == 'fit' && !lastCol) || columnResizeMode == 'expand')" (mousedown)="initColumnResize($event)"></span>
                                <span class="ui-column-title" *ngIf="!col.headerTemplate">{{col.header}}</span>
                                <span class="ui-column-title" *ngIf="col.headerTemplate">
                                    <p-columnHeaderTemplateLoader [column]="col"></p-columnHeaderTemplateLoader>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tfoot *ngIf="hasFooter()">
                        <tr>
                            <td *ngFor="let col of columns" [ngStyle]="col.style" [class]="col.styleClass" [ngClass]="{'ui-state-default':true}">
                                <span class="ui-column-footer" *ngIf="!col.footerTemplate">{{col.footer}}</span>
                                <span class="ui-column-footer" *ngIf="col.footerTemplate">
                                    <p-columnFooterTemplateLoader [column]="col"></p-columnFooterTemplateLoader>
                                </span>
                            </td>
                        </tr>
                    </tfoot>
                    <tbody pTreeRow *ngFor="let node of value" class="ui-treetable-data ui-widget-content" [node]="node" [level]="0" [labelExpand]="labelExpand" [labelCollapse]="labelCollapse"></tbody>
                </table>
            </div>
            
            <div class="ui-column-resizer-helper ui-state-highlight" style="display:none"></div>
            <div class="ui-treetable-footer ui-widget-header" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class TreeTable implements AfterViewChecked, AfterContentInit, OnDestroy {

    @Input() value: TreeNode[];
        
    @Input() selectionMode: string;
    
    @Input() selection: any;
        
    @Input() style: any;
        
    @Input() styleClass: string;

    @Input() labelExpand: string = "Expand";
    
    @Input() labelCollapse: string = "Collapse";
    
    @Input() metaKeySelection: boolean = true;
    
    @Input() contextMenu: any;
    
    @Input() resizableColumns: boolean;
    
    @Input() columnResizeMode: string = 'fit';
    
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();
    
    @Output() onContextMenuSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onColResize: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(Header) header: Header;

    @ContentChild(Footer) footer: Footer;
    
    @ContentChildren(Column) cols: QueryList<Column>;
    
    @ViewChild('tbl') tableViewChild: ElementRef;
    
    public rowTouched: boolean;
    
    public resizeColumn: any;
    
    public columnResizing: boolean;
    
    public lastResizerHelperX: number;
    
    public columnsChanged: boolean = false;
    
    public columns: Column[];
    
    public resizerHelper: any;
    
    columnsSubscription: Subscription;
    
    public documentColumnResizeListener: Function;
    
    public documentColumnResizeEndListener: Function;
    
    constructor (public el: ElementRef, public domHandler: DomHandler,public changeDetector: ChangeDetectorRef,public renderer: Renderer2) {}
    
    ngAfterViewChecked() {
        if(this.columnsChanged && this.el.nativeElement.offsetParent) {
            if(this.resizableColumns) {
                this.initResizableColumns();
            }

            this.columnsChanged = false;
        }
    }
    
    ngAfterContentInit() {
        this.initColumns();
        
        this.columnsSubscription = this.cols.changes.subscribe(_ => {
            this.initColumns();
            this.changeDetector.markForCheck();
        });
    }
    
    initColumns(): void {
        this.columns = this.cols.toArray();
        this.columnsChanged = true;
    }
    
    initResizableColumns() {
        this.resizerHelper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-column-resizer-helper');
        this.fixColumnWidths();
        
        this.documentColumnResizeListener = this.renderer.listen('document', 'mousemove', (event) => {
            if(this.columnResizing) {
                this.onColumnResize(event);
            }
        });
        
        this.documentColumnResizeEndListener = this.renderer.listen('document', 'mouseup', (event) => {
            if(this.columnResizing) {
                this.columnResizing = false;
                this.onColumnResizeEnd(event);
            }
        });
    }
    
    fixColumnWidths() {
        let columns = this.domHandler.find(this.el.nativeElement, 'th.ui-resizable-column');
        let bodyCols;
        
        for(let i = 0; i < columns.length; i++) {
            columns[i].style.width = columns[i].offsetWidth + 'px';
        }
    }
    
    onColumnResize(event) {
        let container = this.el.nativeElement.children[0];
        let containerLeft = this.domHandler.getOffset(container).left;
        this.domHandler.addClass(container, 'ui-unselectable-text');
        this.resizerHelper.style.height = container.offsetHeight + 'px';
        this.resizerHelper.style.top = 0 + 'px';
        if(event.pageX > containerLeft && event.pageX < (containerLeft + container.offsetWidth)) {
            this.resizerHelper.style.left = (event.pageX - containerLeft) + 'px';
        }
        
        this.resizerHelper.style.display = 'block';
    }
    
    onColumnResizeEnd(event) {
        let delta = this.resizerHelper.offsetLeft - this.lastResizerHelperX;
        let columnWidth = this.resizeColumn.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = this.resizeColumn.style.minWidth||15;

        if(columnWidth + delta > parseInt(minWidth)) {
            if(this.columnResizeMode === 'fit') {
                let nextColumn = this.resizeColumn.nextElementSibling;
                let nextColumnWidth = nextColumn.offsetWidth - delta;
                
                if(newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeColumn.style.width = newColumnWidth + 'px';
                    if(nextColumn) {
                        nextColumn.style.width = nextColumnWidth + 'px';
                    }
                }
            }
            else if(this.columnResizeMode === 'expand') {
                this.tableViewChild.nativeElement.parentElement.style.width = this.tableViewChild.nativeElement.parentElement.offsetWidth + delta + 'px';
                this.resizeColumn.style.width = newColumnWidth + 'px';
                let containerWidth = this.tableViewChild.nativeElement.parentElement.style.width;
                this.el.nativeElement.children[0].style.width = containerWidth;
            }    
            
            this.onColResize.emit({
                element: this.resizeColumn,
                delta: delta
            });
        }
                
        this.resizerHelper.style.display = 'none';
        this.resizeColumn = null;
        this.domHandler.removeClass(this.el.nativeElement.children[0], 'ui-unselectable-text');
    }
        
    onRowClick(event: MouseEvent, node: TreeNode) {
        let eventTarget = (<Element> event.target);
        if(eventTarget.className && eventTarget.className.indexOf('ui-treetable-toggler') === 0) {
            return;
        }
        else if(this.selectionMode) {
            if(node.selectable === false) {
                return;
            }
            
            let metaSelection = this.rowTouched ? false : this.metaKeySelection;
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
            
            if(this.isCheckboxSelectionMode()) {
                if(selected) {
                    this.propagateSelectionDown(node, false);
                    if(node.parent) {
                        this.propagateSelectionUp(node.parent, false);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({originalEvent: event, node: node});
                }
                else {
                    this.propagateSelectionDown(node, true);
                    if(node.parent) {
                        this.propagateSelectionUp(node.parent, true);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({originalEvent: event, node: node});
                }
            }
            else {
                if(metaSelection) {
                    let metaKey = (event.metaKey||event.ctrlKey);
                    
                    if(selected && metaKey) {
                        if(this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        }
                        else {
                            this.selection = this.selection.filter((val,i) => i!=index);
                            this.selectionChange.emit(this.selection);
                        }

                        this.onNodeUnselect.emit({originalEvent: event, node: node});
                    }
                    else {
                        if(this.isSingleSelectionMode()) {
                            this.selectionChange.emit(node);
                        }
                        else if(this.isMultipleSelectionMode()) {
                            this.selection = (!metaKey) ? [] : this.selection||[];
                            this.selection = [...this.selection,node];
                            this.selectionChange.emit(this.selection);
                        }

                        this.onNodeSelect.emit({originalEvent: event, node: node});
                    }
                }
                else {
                    if(this.isSingleSelectionMode()) {
                        if(selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({originalEvent: event, node: node});
                        }
                        else {
                            this.selection = node;
                            this.onNodeSelect.emit({originalEvent: event, node: node});
                        }
                    }
                    else {
                        if(selected) {
                            this.selection = this.selection.filter((val,i) => i!=index);
                            this.onNodeUnselect.emit({originalEvent: event, node: node});
                        }
                        else {
                            this.selection = [...this.selection||[],node];
                            this.onNodeSelect.emit({originalEvent: event, node: node});
                        }
                    }
                    
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        
        this.rowTouched = false;
    }
        
    onRowTouchEnd() {
        this.rowTouched = true;
    }
    
    onRowRightClick(event: MouseEvent, node: TreeNode) {
        if(this.contextMenu) {
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
            
            if(!selected) {
                if(this.isSingleSelectionMode()) {
                    this.selection = node;
                }
                else if(this.isMultipleSelectionMode()) {
                    this.selection = [node];
                    this.selectionChange.emit(this.selection);
                }
                
                this.selectionChange.emit(this.selection);
            }
            
            this.contextMenu.show(event);
            this.onContextMenuSelect.emit({originalEvent: event, node: node});
        }
    }
    
    initColumnResize(event) {
        let container = this.el.nativeElement.children[0];
        let containerLeft = this.domHandler.getOffset(container).left;
        this.resizeColumn = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizerHelperX = (event.pageX - containerLeft);
    }
    
    findIndexInSelection(node: TreeNode) {
        let index: number = -1;

        if(this.selectionMode && this.selection) {
            if(this.isSingleSelectionMode()) {
                index = (this.selection == node) ? 0 : - 1;
            }
            else {
                for(let i = 0; i  < this.selection.length; i++) {
                    if(this.selection[i] == node) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }
    
    propagateSelectionUp(node: TreeNode, select: boolean) {
        if(node.children && node.children.length) {
            let selectedCount: number = 0;
            let childPartialSelected: boolean = false;
            for(let child of node.children) {
                if(this.isSelected(child)) {
                    selectedCount++;
                }
                else if(child.partialSelected) {
                    childPartialSelected = true;
                }
            }
            
            if(select && selectedCount == node.children.length) {
                this.selection = [...this.selection||[],node];
                node.partialSelected = false;
            }
            else {                
                if(!select) {
                    let index = this.findIndexInSelection(node);
                    if(index >= 0) {
                        this.selection = this.selection.filter((val,i) => i!=index);
                    }
                }
                
                if(childPartialSelected || selectedCount > 0 && selectedCount != node.children.length)
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
        }
                
        let parent = node.parent;
        if(parent) {
            this.propagateSelectionUp(parent, select);
        }
    }
    
    propagateSelectionDown(node: TreeNode, select: boolean) {
        let index = this.findIndexInSelection(node);
        
        if(select && index == -1) {
            this.selection = [...this.selection||[],node];
        }
        else if(!select && index > -1) {
            this.selection = this.selection.filter((val,i) => i!=index);
        }
        
        node.partialSelected = false;
        
        if(node.children && node.children.length) {
            for(let child of node.children) {
                this.propagateSelectionDown(child, select);
            }
        }
    }
    
    isSelected(node: TreeNode) {
        return this.findIndexInSelection(node) != -1;         
    }
    
    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'single';
    }
    
    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'multiple';
    }
    
    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode == 'checkbox';
    }
    
    hasFooter() {
        if(this.columns) {
            let columnsArr = this.cols.toArray();
            for(let i = 0; i < columnsArr.length; i++) {
                if(columnsArr[i].footer) {
                    return true;
                }
            }
        }
        return false;
    }
    
    ngOnDestroy() {
        if(this.resizableColumns && this.documentColumnResizeListener && this.documentColumnResizeEndListener) {
            this.documentColumnResizeListener();
            this.documentColumnResizeEndListener();
        }
    }
}

@NgModule({
    imports: [CommonModule,SharedModule],
    exports: [TreeTable,SharedModule],
    declarations: [TreeTable,UITreeRow]
})
export class TreeTableModule { }