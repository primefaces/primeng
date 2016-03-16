import {Component,Input,Output,EventEmitter,Inject,forwardRef,Host} from 'angular2/core';
import {TreeTable} from './treetable';
import {TreeNode} from '../api/treenode';

@Component({
    selector: '[pTreeRow]',
    template: `
        <div style="display:table-row;border-bottom:0px transparent" [ngClass]="{'ui-state-hover':hover&&treeTable.selectionMode,'ui-state-highlight':isSelected(node)}">
            <td *ngFor="#col of treeTable.columns; #i=index" [attr.style]="col.style" [attr.class]="col.styleClass"
                (mouseenter)="hover=true" (mouseleave)="hover=false" (click)="onRowClick($event)">
                <span *ngIf="i==0" class="ui-treetable-toggler fa fa-fw ui-c" [ngClass]="{'fa-caret-down':expanded,'fa-caret-right':!expanded}"
                    [ngStyle]="{'margin-left':level*16 + 'px','visibility': isLeaf() ? 'hidden' : 'visible'}"
                    (click)="toggle($event)"></span>
                <span>{{node.data[col.field]}}</span>
            </td>
        </div>
        <div [style.display]="expanded ? 'table-row' : 'none'" *ngIf="node.children">
            <td [attr.colspan]="treeTable.columns.length" style="padding:0px;border:0px none;">
                <table>
                    <tbody pTreeRow *ngFor="#childNode of node.children" [node]="childNode" [level]="level+1"></tbody>
                </table>
            </td>
        </div>
    `,
    directives: [UITreeRow]
})
export class UITreeRow {

    @Input() node: TreeNode;
    
    @Input() level: number = 0;
                
    expanded: boolean = false;
    
    hover: boolean;
    
    constructor(@Inject(forwardRef(() => TreeTable)) private treeTable:TreeTable) {}
    
    toggle(event) {
        if(this.expanded)
            this.treeTable.onNodeCollapse.next({originalEvent: event, node: this.node});
        else
            this.treeTable.onNodeExpand.next({originalEvent: event, node: this.node});
            
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