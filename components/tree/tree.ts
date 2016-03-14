import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {TreeNode} from '../api/treenode';
import {UITreeNode} from './uitreenode';

@Component({
    selector: 'p-tree',
    template: `
        <div class="ui-tree ui-widget ui-widget-content ui-corner-all">
            <ul class="ui-tree-container">
                <p-treeNode *ngFor="#node of value" [node]="node"></p-treeNode>
            </ul>
        </div>
    `,
    directives: [UITreeNode]
})
export class Tree {

    @Input() value: TreeNode[];
        
    @Input() selectionMode: string;
    
    @Input() selection: any;
    
    @Output() selectionChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();
    
    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();
}