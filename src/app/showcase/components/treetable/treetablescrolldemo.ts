import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetablescrolldemo.html'
})
export class TreeTableScrollDemo {
    
    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    files4: TreeNode[];

    files5: TreeNode[];

    virtualFiles: TreeNode[];

    cols: any[];

    frozenCols: any[];

    scrollableCols: any[];

    dialogVisible: boolean;

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files3 = files);
        this.nodeService.getFilesystem().then(files => this.files4 = files);
        this.nodeService.getFilesystem().then(files => this.files5 = files);
        this.files2 = Array.from({length: 100}).map((_,i) => this.createNode(i, 5));
        this.virtualFiles = Array.from({length: 1000}).map((_,i) => this.createNode(i, 100));

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.scrollableCols = [
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.frozenCols = [
            { field: 'name', header: 'Name' }
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

    showDialog() {
        this.dialogVisible = true;
    }
}