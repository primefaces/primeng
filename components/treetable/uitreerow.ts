import {Component,Input,Output,EventEmitter,Inject,forwardRef,Host} from 'angular2/core';
import {TreeTable} from './treetable';
import {TreeNode} from '../api/treenode';

@Component({
    selector: '[pTreeRow]',
    template: `
        <div style="display:table-row">
            <div *ngFor="#col of treeTable.columns; #i=index" style="display:table-cell" [attr.class]="col.styleClass">
                <span class="ui-treetable-toggler fa fa-fw ui-c" style="margin-left: 0px;" (click)="toggle($event)"
                    [ngClass]="{'fa-caret-down':expanded,'fa-caret-right':!expanded}" *ngIf="i==0"></span>
                <span>{{node.data[col.field]}}</span>
            </div>
        </div>
        <div style="display:table-row" *ngIf="node.children" >
            <div style="display:table-cell">
                <div style="display:table;width:100%">
                    <div pTreeRow style="display:table-row-group" *ngFor="#childNode of node.children" [node]="childNode"></div>
                </div>
            </div>
        </div>
    `,
    directives: [UITreeRow]
})
export class UITreeRow {

    @Input() node: TreeNode;
                
    expanded: boolean = false;
    
    constructor(@Inject(forwardRef(() => TreeTable)) private treeTable:TreeTable) {}
    
    toggle(event) {
        if(this.expanded)
            this.treeTable.onNodeCollapse.next({originalEvent: event, node: this.node});
        else
            this.treeTable.onNodeExpand.next({originalEvent: event, node: this.node});
            
        this.expanded = !this.expanded;
    }
}