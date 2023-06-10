import { TreeNode } from './treenode';

/**
 * Represents the event data for a tree node drag operation.
 * @group Interface
 */
export interface TreeNodeDragEvent {
    /**
     * Tree instance.
     */
    tree?: any;
    /**
     * Node to be dragged.
     */
    node?: TreeNode;
    /**
     * Child nodes of dragged node.
     */
    subNodes?: TreeNode[];
    /**
     * Index of dragged node.
     */
    index?: number;
    /**
     * Scope of dragged node.
     */
    scope?: any;
}
