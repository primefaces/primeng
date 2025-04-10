import { TreeNode } from './treenode';

/**
 * Tree table node element.
 * @extends {TreeNode}
 * @group Interface
 */
export interface TreeTableNode<T = any> extends TreeNode {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Row of the node.
     */
    rowNode?: any;
    /**
     * Node instance.
     */
    node?: TreeNode<T>;
    /**
     * Selection type.
     */
    type?: string;
    /**
     * Node index.
     */
    index?: number;
    /**
     * Node level.
     */
    level?: number;
    /**
     * Boolean value indicates if node is in viewport.
     */
    visible?: boolean;
}
