import {Component,OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {TreeNode} from 'primeng/api';

@Component({
    templateUrl: './treescrolldemo.html'
})
export class TreeScrollDemo implements OnInit {

    files1: TreeNode[];

    files2: TreeNode[];
    
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.files1 = [];
        for (let i = 0; i < 50; i++) {
            this.files1.push(this.createNode(i));
        }
        this.nodeService.getFiles().then(files => this.files2 = files);
    }

    createNode(i: Number): TreeNode {
        let node: TreeNode = {
            label: 'Node ' + i,
            data: 'Node ' + i,
            expandedIcon: 'pi pi-folder-open',
            collapsedIcon: 'pi pi-folder'
        };

        let children = [];
        for (let j = 0; j < 1000; j++) {
            children.push({label: 'Node ' + i + '.' + j, data: 'Node ' + i + '.' + j, icon: 'pi pi-file-o'});
        }
        node.children = children;

        return node;
    }
}