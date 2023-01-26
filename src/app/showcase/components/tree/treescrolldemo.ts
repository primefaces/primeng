import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treescrolldemo.html'
})
export class TreeScrollDemo implements OnInit {
    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    dialogVisible: boolean;

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFiles().then((files) => (this.files1 = files));
        this.files2 = Array.from({ length: 100 }).map((_, i) => this.createNode(i, 2));
        this.files3 = Array.from({ length: 50 }).map((_, i) => this.createNode(i, 1000));
    }

    createNode(i: number, children: number): TreeNode {
        let node: TreeNode = {
            label: 'Node ' + i,
            data: 'Node ' + i,
            key: 'node-key' + i,
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder',
            children: Array.from({ length: children }).map((_, j) => {
                return {
                    label: 'Node ' + i + '.' + j,
                    key: 'node-key' + i + j,
                    data: 'Node ' + i + '.' + j,
                    icon: 'pi pi-file'
                };
            })
        };

        return node;
    }

    showDialog() {
        this.dialogVisible = true;
    }
}
