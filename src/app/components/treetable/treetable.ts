import {NgModule,Component,Input,Output,EventEmitter,AfterContentInit,ElementRef,ContentChild,IterableDiffers,ChangeDetectorRef,ContentChildren,QueryList,Inject,forwardRef,OnInit,Renderer2,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from '../common/treenode';
import {Header,Footer,Column} from '../common/shared';
import {SharedModule} from '../common/shared';
import {Subscription} from 'rxjs/Subscription';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: '[pTreeRow]',
    template: `
        <div [class]="node.styleClass" [ngClass]="{'ui-treetable-row': true, 'ui-state-highlight':isSelected(),'ui-treetable-row-selectable':treeTable.selectionMode && node.selectable !== false}">
            <td *ngFor="let col of treeTable.columns; let i=index" [ngStyle]="col.bodyStyle||col.style" [class]="col.bodyStyleClass||col.styleClass" (click)="onRowClick($event)" (dblclick)="rowDblClick($event)" (touchend)="onRowTouchEnd()" (contextmenu)="onRowRightClick($event)">
                <a href="#" *ngIf="i == treeTable.toggleColumnIndex" class="ui-treetable-toggler fa fa-fw ui-clickable" [ngClass]="node.expanded ? treeTable.expandedIcon : treeTable.collapsedIcon"
                    [ngStyle]="{'margin-left':level*16 + 'px','visibility': isLeaf() ? 'hidden' : 'visible'}"
                    (click)="toggle($event)"
                    [title]="node.expanded ? labelCollapse : labelExpand">
                </a>
                <div class="ui-chkbox ui-treetable-checkbox" *ngIf="treeTable.selectionMode == 'checkbox' && i==0"><div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default">
                    <span class="ui-chkbox-icon ui-clickable fa" 
                        [ngClass]="{'fa-check':isSelected(),'fa-minus':node.partialSelected}"></span></div></div
                ><span *ngIf="!col.template">{{resolveFieldData(node.data,col.field)}}</span>
                <ng-container *ngTemplateOutlet="col.template; context: {$implicit: col, rowData: node}"></ng-container>
            </td>
        </div>
        <div *ngIf="node.children && node.expanded" class="ui-treetable-row" style="display:table-row">
            <td [attr.colspan]="treeTable.columns.length" class="ui-treetable-child-table-container">
                <table [class]="treeTable.tableStyleClass" [ngStyle]="treeTable.tableStyle">
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
    
    rowDblClick(event: MouseEvent) {
      this.treeTable.onRowDblclick.emit({originalEvent: event, node: this.node});
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
        <div [ngClass]="'ui-treetable ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-treetable-header ui-widget-header" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <div class="ui-treetable-tablewrapper">
                <table #tbl class="ui-widget-content" [class]="tableStyleClass" [ngStyle]="tableStyle">
                    <thead>
                        <tr class="ui-state-default">
                            <th #headerCell *ngFor="let col of columns; let lastCol=last "  [ngStyle]="col.headerStyle||col.style" [class]="col.headerStyleClass||col.styleClass" 
                                [ngClass]="'ui-state-default ui-unselectable-text'">
                                <span class="ui-column-title" *ngIf="!col.headerTemplate">{{col.header}}</span>
                                <span class="ui-column-title" *ngIf="col.headerTemplate">
                                    <ng-container *ngTemplateOutlet="col.headerTemplate; context: {$implicit: col}"></ng-container>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tfoot *ngIf="hasFooter()">
                        <tr>
                            <td *ngFor="let col of columns" [ngStyle]="col.footerStyle||col.style" [class]="col.footerStyleClass||col.styleClass" [ngClass]="{'ui-state-default':true}">
                                <span class="ui-column-footer" *ngIf="!col.footerTemplate">{{col.footer}}</span>
                                <span class="ui-column-footer" *ngIf="col.footerTemplate">
                                    <ng-container *ngTemplateOutlet="col.headerTemplate; context: {$implicit: col}"></ng-container>
                                </span>
                            </td>
                        </tr>
                    </tfoot>
                    <tbody pTreeRow *ngFor="let node of value" class="ui-treetable-data ui-widget-content" [node]="node" [level]="0" [labelExpand]="labelExpand" [labelCollapse]="labelCollapse"></tbody>
                </table>
            </div>
            
            <div class="ui-treetable-footer ui-widget-header" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class TreeTable implements AfterContentInit {

    @Input() value: TreeNode[];
        
    @Input() selectionMode: string;
    
    @Input() selection: any;
        
    @Input() style: any;
        
    @Input() styleClass: string;

    @Input() labelExpand: string = "Expand";
    
    @Input() labelCollapse: string = "Collapse";
    
    @Input() metaKeySelection: boolean = true;
    
    @Input() contextMenu: any;

    @Input() toggleColumnIndex: number = 0;

    @Input() tableStyle: any;

    @Input() tableStyleClass: string;
    
    @Input() collapsedIcon: string = "fa-caret-right";
    
    @Input() expandedIcon: string = "fa-caret-down";
        
    @Output() onRowDblclick: EventEmitter<any> = new EventEmitter();    
    
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();
    
    @Output() onContextMenuSelect: EventEmitter<any> = new EventEmitter();
        
    @ContentChild(Header) header: Header;

    @ContentChild(Footer) footer: Footer;
    
    @ContentChildren(Column) cols: QueryList<Column>;
    
    @ViewChild('tbl') tableViewChild: ElementRef;
    
    public rowTouched: boolean;
        
    public columns: Column[];
        
    columnsSubscription: Subscription;
    
    constructor (public el: ElementRef, public domHandler: DomHandler,public changeDetector: ChangeDetectorRef,public renderer: Renderer2) {}

    ngAfterContentInit() {
        this.initColumns();
        
        this.columnsSubscription = this.cols.changes.subscribe(_ => {
            this.initColumns();
            this.changeDetector.markForCheck();
        });
    }
    
    initColumns(): void {
        this.columns = this.cols.toArray();
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
}

@NgModule({
    imports: [CommonModule],
    exports: [TreeTable,SharedModule],
    declarations: [TreeTable,UITreeRow]
})
export class TreeTableModule { }