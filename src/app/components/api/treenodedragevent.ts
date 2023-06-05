import { TreeNode } from './treenode';

/**
 * Represents the event data for a tree node drag operation.
 */
export interface TreeNodeDragEvent {
    tree?: any;
    node?: TreeNode;
    subNodes?: TreeNode[];
    index?: number;
    scope?: any;
}
