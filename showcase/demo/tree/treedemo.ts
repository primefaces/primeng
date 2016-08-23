import {Component,OnInit} from '@angular/core';
import {NodeService} from '../service/nodeservice';
import {Message,MenuItem,TreeNode} from '../../../components/common/api';

@Component({
    templateUrl: 'showcase/demo/tree/treedemo.html'
})
export class TreeDemo implements OnInit {
    
    msgs: Message[];
    
    files: TreeNode[];
    
    lazyFiles: TreeNode[];
    
    selectedFile: TreeNode;
    
    selectedFile2: TreeNode;
    
    selectedFiles: TreeNode[];
    
    items: MenuItem[];
        
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.files = files);
        this.nodeService.getLazyFiles().then(files => this.lazyFiles = files);
        
        this.items = [
            {label: 'View', icon: 'fa-search', command: (event) => this.viewFile(this.selectedFile2)},
            {label: 'Unselect', icon: 'fa-close', command: (event) => this.unselectFile()}
        ];
    }
    
    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
    }
    
    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }
    
    nodeExpand(event) {
        if(event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);
        }
    }
    
    viewFile(file: TreeNode) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected with Right Click', detail: file.label});
    }
    
    unselectFile() {
        this.selectedFile2 = null;
    }
}