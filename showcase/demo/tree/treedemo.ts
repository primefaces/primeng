import {Component,OnInit,ViewChild} from '@angular/core';
import {NodeService} from '../service/nodeservice';
import {Message,MenuItem,TreeNode} from '../../../components/common/api';
import {Tree} from '../../../components/tree/tree';


@Component({
    templateUrl: 'showcase/demo/tree/treedemo.html'
})
export class TreeDemo implements OnInit {
    
    msgs: Message[];

    @ViewChild('expandingTree')
    expandingTree: Tree;

    filesTree1: TreeNode[];
    filesTree2: TreeNode[];
    filesTree3: TreeNode[];
    filesTree4: TreeNode[];
    filesTree5: TreeNode[];
    filesTree6: TreeNode[];
    filesTree7: TreeNode[];
    filesTree8: TreeNode[];
    
    lazyFiles: TreeNode[];
    
    selectedFile: TreeNode;
    
    selectedFile2: TreeNode;
    
    selectedFile3: TreeNode;
    
    selectedFiles: TreeNode[];
    
    selectedFiles2: TreeNode[];
    
    items: MenuItem[];
        
    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFiles().then(files => this.filesTree1 = files);
        this.nodeService.getFiles().then(files => this.filesTree2 = files);
        this.nodeService.getFiles().then(files => this.filesTree3 = files);
        this.nodeService.getFiles().then(files => this.filesTree4 = files);
        this.nodeService.getFiles().then(files => this.filesTree5 = files);
        this.nodeService.getFiles().then(files => this.filesTree6 = files);
        this.nodeService.getFiles().then(files => this.filesTree7 = files);
        this.nodeService.getFiles().then(files => {
            this.filesTree8 = [{
                label: 'Root',
                children: files
            }];
        });

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

    nodeExpandMessage(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Expanded', detail: event.node.label});
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

    expandAll(){
        this.filesTree6.forEach( node => {
            this.expandRecursive(node, true);
        } );
    }

    collapseAll(){
        this.filesTree6.forEach( node => {
            this.expandRecursive(node, false);
        } );
    }
    
    private expandRecursive(node:TreeNode, isExpand:boolean){
        node.expanded = isExpand;
        if(node.children){
            node.children.forEach( childNode => {
                this.expandRecursive(childNode, isExpand);
            } );
        }
    }
}
