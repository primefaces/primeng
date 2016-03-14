export interface TreeNode {
    label?: string;
    data?: any;
    icon?: string;
    expandedIcon?: string;
    collapsedIcon?: string;
    children?: TreeNode[];
}