import { TreeNode } from './treenode';

export interface TreeNodeDragEvent {
    tree?: any;
    node?: TreeNode;
    subNodes?: TreeNode[];
    index?: number;
    scope?: any;
}