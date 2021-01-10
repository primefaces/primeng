import {Component,OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {MenuItem,TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './treecontextmenudemo.html',
    providers: [MessageService]
})
export class TreeContextMenuDemo implements OnInit {

    files: TreeNode[];

    selectedFile: TreeNode;

    items: MenuItem[];
    
    constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files = files);

        this.items = [
            {label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedFile)},
            {label: 'Unselect', icon: 'pi pi-times', command: (event) => this.unselectFile()}
        ];
    }

    viewFile(file: TreeNode) {
        this.messageService.add({severity: 'info', summary: 'Node Details', detail: file.label});
    }
    
    unselectFile() {
        this.selectedFile = null;
    }
}