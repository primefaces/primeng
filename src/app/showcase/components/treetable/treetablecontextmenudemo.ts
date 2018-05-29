import { Component } from '@angular/core';
import { TreeNode, Message, MenuItem } from '../../../components/common/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetablecontextmenudemo.html'
})
export class TreeTableContextMenuDemo {

    files: TreeNode[];

    selectedNode: TreeNode;

    cols: any[];

    msgs: Message[];

    items: MenuItem[];

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.items = [
            { label: 'View', icon: 'fa-search', command: (event) => this.viewFile(this.selectedNode) },
            { label: 'Toggle', icon: 'fa-toggle-on', command: (event) => this.toggleFile(this.selectedNode) }
        ];
    }

    viewFile(node) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
    }

    toggleFile(node) {
        node.expanded = !node.expanded;
        this.files = [...this.files];
    }
}