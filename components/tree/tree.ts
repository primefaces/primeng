import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {TreeNode} from '../api/treenode';

@Component({
    selector: 'p-tree',
    template: `
        
    `
})
export class Tree {

    @Input() value: TreeNode[];
}