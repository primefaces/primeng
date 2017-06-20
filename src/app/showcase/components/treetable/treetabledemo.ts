import {Component,OnInit} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {Message,TreeNode,MenuItem} from '../../../components/common/api';

@Component({
    templateUrl: './treetabledemo.html'
})
export class TreeTableDemo implements OnInit {
    
    msgs: Message[];
    
    files1: TreeNode[];
    
    files2: TreeNode[];
    
    files3: TreeNode[];
    
    files4: TreeNode[];
    
    files5: TreeNode[];
    
    files6: TreeNode[];
            
    lazyFiles: TreeNode[];
        
    selectedFile: TreeNode;
    
    selectedFile2: TreeNode;
    
    selectedFiles: TreeNode[];
    
    selectedFiles2: TreeNode[];
    
    items: MenuItem[];
        
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files2 = files);
        this.nodeService.getFilesystem().then(files => this.files3 = files);
        this.nodeService.getFilesystem().then(files => this.files4 = files);
        this.nodeService.getFilesystem().then(files => this.files5 = files);
        this.nodeService.getFilesystem().then(files => this.files6 = files);
        this.nodeService.getLazyFilesystem().then(files => this.lazyFiles = files);
        
        this.items = [
            {label: 'View', icon: 'fa-search', command: (event) => this.viewNode(this.selectedFile2)},
            {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteNode(this.selectedFile2)}
        ];
    }
    
    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.data.name});
    }
    
    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.data.name});
    }
    
    nodeExpand(event) {
        if(event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFilesystem().then(nodes => event.node.children = nodes);
        }
    }
    
    viewNode(node: TreeNode) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: node.data.name});
    }

    deleteNode(node: TreeNode) {
        node.parent.children = node.parent.children.filter( n => n.data !== node.data);
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Deleted', detail: node.data.name});
    }
}