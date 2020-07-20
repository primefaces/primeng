import {Component,OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './treeselectiondemo.html',
    providers: [MessageService]
})
export class TreeSelectionDemo implements OnInit {

    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    selectedFile: TreeNode;

    selectedFiles1: TreeNode;

    selectedFiles2: TreeNode;
    
    constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files1 = files);
        this.nodeService.getFiles().then(files => this.files2 = files);
        this.nodeService.getFiles().then(files => this.files3 = files);
    }

    nodeSelect(event) {
        this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
    }
    
    nodeUnselect(event) {
        this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }
}