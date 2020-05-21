import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    templateUrl: './treetableflexscrolldemo.html'
})
export class TreeTableFlexScrollDemo {
    
    virtualFiles: TreeNode[];

    cols: any[];

    ngOnInit() {
        this.virtualFiles = Array.from({length: 1000}).map((_,i) => this.createNode(i, 10));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    createNode(i: number, children: number): TreeNode {
        let node: TreeNode = {
            data: {name: 'Node ' + i, type: 'virtual node', size: Math.ceil(Math.random() * 10000) + 'kb'},
            children: Array.from({length: children}).map((_,j) => {
                return { 
                    data: {name: 'Node ' + i + '.' + j, type: 'virtual child node', size: Math.ceil(Math.random() * 10000) + 'kb'}
                }
            })
        };

        return node;
    }
}