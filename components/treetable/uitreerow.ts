import {Component,Input,Output,EventEmitter,Inject,forwardRef,Host} from '@angular/core';
import {TreeTable} from './treetable';
import {TreeNode} from '../common';
import {ColumnTemplateLoader} from '../column/columntemplateloader';

@Component({
    selector: '[pTreeRow]',
    template: `
        <div class="ui-treetable-row" [ngClass]="{'ui-state-hover':hover&&treeTable.selectionMode,'ui-state-highlight':isSelected(node)}">
            <td *ngFor="let col of treeTable.columns; let i=index" [ngStyle]="col.style" [class]="col.styleClass"
                (mouseenter)="hover=true" (mouseleave)="hover=false" (click)="onRowClick($event)">
                <span *ngIf="i==0" class="ui-treetable-toggler fa fa-fw ui-c" [ngClass]="{'fa-caret-down':expanded,'fa-caret-right':!expanded}"
                    [ngStyle]="{'margin-left':level*16 + 'px','visibility': isLeaf() ? 'hidden' : 'visible'}"
                    (click)="toggle($event)"></span>
                <span *ngIf="!col.template">{{node.data[col.field]}}</span>
                <p-columnTemplateLoader [column]="col" [rowData]="node" *ngIf="col.template"></p-columnTemplateLoader>
            </td>
        </div>
        <div *ngIf="node.children" class="ui-treetable-row" [style.display]="expanded ? 'table-row' : 'none'">
            <td [attr.colspan]="treeTable.columns.length" class="ui-treetable-child-table-container">
                <table>
                    <tbody pTreeRow *ngFor="let childNode of node.children" [node]="childNode" [level]="level+1"></tbody>
                </table>
            </td>
        </div>
    `,
    directives: [UITreeRow,ColumnTemplateLoader]
})
export class UITreeRow {

    @Input() node: TreeNode;
    
    @Input() level: number = 0;
                
    expanded: boolean = false;
    
    hover: boolean;
    
    constructor(@Inject(forwardRef(() => TreeTable)) protected treeTable:TreeTable) {}
    
    toggle(event) {
        if(this.expanded)
            this.treeTable.onNodeCollapse.emit({originalEvent: event, node: this.node});
        else
            this.treeTable.onNodeExpand.emit({originalEvent: event, node: this.node});
            
        this.expanded = !this.expanded;
    }
    
    isLeaf() {
        return this.node.leaf == false ? false : !(this.node.children&&this.node.children.length);
    }
    
    isSelected() {
        return this.treeTable.isSelected(this.node);
    }
    
    onRowClick(event) {
        this.treeTable.onRowClick(event, this.node);
    }
}