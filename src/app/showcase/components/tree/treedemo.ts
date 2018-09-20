import {Component,OnInit,ViewChild} from '@angular/core';
import {NodeService} from '../../service/nodeservice';
import {MenuItem,TreeNode} from '../../../components/common/api';
import {Tree} from '../../../components/tree/tree';
import {TreeDragDropService} from '../../../components/common/api';
import {MessageService} from '../../../components/common/messageservice';

@Component({
    templateUrl: './treedemo.html',
    styles:[`
        h4 {
            text-align: center;
            margin: 0 0 8px 0;
        }

        .ui-inputtext {
            padding-top: 0;
            padding-bottom: 0;
            font-size: 12px;
        }
    `],
    providers: [TreeDragDropService,MessageService]
})
export class TreeDemo implements OnInit {

    @ViewChild('expandingTree')
    expandingTree: Tree;

    filesTree0: TreeNode[];
    filesTree1: TreeNode[];
    filesTree2: TreeNode[];
    filesTree3: TreeNode[];
    filesTree4: TreeNode[];
    filesTree5: TreeNode[];
    filesTree6: TreeNode[];
    filesTree7: TreeNode[];
    filesTree8: TreeNode[];
    filesTree9: TreeNode[];
    filesTree10: TreeNode[];
    filesTree11: TreeNode[];
    
    lazyFiles: TreeNode[];
    
    selectedFile: TreeNode;
    
    selectedFile2: TreeNode;
    
    selectedFile3: TreeNode;
    
    selectedFiles: TreeNode[];
    
    selectedFiles2: TreeNode[];
    
    items: MenuItem[];
    
    loading: boolean;
    
    constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
        this.loading = true;
        this.nodeService.getFiles().then(files => this.filesTree0 = files);
        setTimeout(() => {
            this.nodeService.getFiles().then(files => this.filesTree1 = files);
            this.loading = false;
        }, 3000);
        this.nodeService.getFiles().then(files => this.filesTree2 = files);
        this.nodeService.getFiles().then(files => this.filesTree3 = files);
        this.nodeService.getFiles().then(files => this.filesTree4 = files);
        this.nodeService.getFiles().then(files => this.filesTree5 = files);
        this.nodeService.getFiles().then(files => this.filesTree6 = files);
        this.nodeService.getFiles().then(files => this.filesTree7 = files);
        this.filesTree8 = [
            {
                label: "Backup",
                data: "Backup Folder",
                expandedIcon: "fa fa-folder-open",
                collapsedIcon: "fa fa-folder"
            }
        ];
        this.filesTree9 = [
            {
                label: "Storage",
                data: "Storage Folder",
                expandedIcon: "fa fa-folder-open",
                collapsedIcon: "fa fa-folder"
            }
        ];
        this.nodeService.getFiles().then(files => this.filesTree10 = files);
        this.nodeService.getFiles().then(files => {
            this.filesTree11 = [{
                label: 'Root',
                children: files
            }];
        });

        this.nodeService.getLazyFiles().then(files => this.lazyFiles = files);
        
        this.items = [
            {label: 'View', icon: 'fa fa-search', command: (event) => this.viewFile(this.selectedFile2)},
            {label: 'Unselect', icon: 'fa fa-close', command: (event) => this.unselectFile()}
        ];
    }
    
    nodeSelect(event) {
        this.messageService.add({severity: 'info', summary: 'Node Selected', detail: event.node.label});
    }
    
    nodeUnselect(event) {
        this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }

    nodeExpandMessage(event) {
        this.messageService.add({severity: 'info', summary: 'Node Expanded', detail: event.node.label});
    }
    
    nodeExpand(event) {
        if(event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);
        }
    }
    
    viewFile(file: TreeNode) {
        this.messageService.add({severity: 'info', summary: 'Node Selected with Right Click', detail: file.label});
    }
    
    unselectFile() {
        this.selectedFile2 = null;
    }

    expandAll(){
        this.filesTree10.forEach( node => {
            this.expandRecursive(node, true);
        } );
    }

    collapseAll(){
        this.filesTree10.forEach( node => {
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