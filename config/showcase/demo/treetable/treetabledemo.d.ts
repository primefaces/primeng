import { OnInit } from '@angular/core';
import { NodeService } from '../service/nodeservice';
import { Message, TreeNode } from '../../../components/common/api';
export declare class TreeTableDemo implements OnInit {
    private nodeService;
    msgs: Message[];
    files1: TreeNode[];
    files2: TreeNode[];
    files3: TreeNode[];
    files4: TreeNode[];
    files5: TreeNode[];
    lazyFiles: TreeNode[];
    selectedFile: TreeNode;
    selectedFiles: TreeNode[];
    selectedFiles2: TreeNode[];
    constructor(nodeService: NodeService);
    ngOnInit(): void;
    nodeSelect(event: any): void;
    nodeUnselect(event: any): void;
    nodeExpand(event: any): void;
}
