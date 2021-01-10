import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './treetableselectiondemo.html',
    providers: [MessageService]
})
export class TreeTableSelectionDemo {

    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    files4: TreeNode[];

    files5: TreeNode[];

    selectedNode1: TreeNode;

    selectedNode2: TreeNode;

    selectedNodes1: TreeNode[];

    selectedNodes2: TreeNode[];

    selectedNodes3: TreeNode[];

    cols: any[];

    constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files2 = files);
        this.nodeService.getFilesystem().then(files => this.files3 = files);
        this.nodeService.getFilesystem().then(files => this.files4 = files);
        this.nodeService.getFilesystem().then(files => this.files5 = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];
    }

    nodeSelect(event) {
        this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.data.name});
    }
    
    nodeUnselect(event) {
        this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.data.name});
    }
    
}
