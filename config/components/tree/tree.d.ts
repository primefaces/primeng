import { AfterContentInit, EventEmitter, OnInit, OnDestroy, EmbeddedViewRef, ViewContainerRef, QueryList, TemplateRef } from '@angular/core';
import { TreeNode } from '../common/api';
export declare class TreeNodeTemplateLoader implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    node: any;
    template: TemplateRef<any>;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class UITreeNode implements OnInit {
    tree: Tree;
    static ICON_CLASS: string;
    node: TreeNode;
    parentNode: TreeNode;
    root: boolean;
    firstChild: boolean;
    lastChild: boolean;
    constructor(tree: Tree);
    ngOnInit(): void;
    getIcon(): string;
    isLeaf(): boolean;
    toggle(event: Event): void;
    onNodeClick(event: MouseEvent): void;
    onNodeTouchEnd(): void;
    onNodeRightClick(event: MouseEvent): void;
    isSelected(): boolean;
}
export declare class Tree implements AfterContentInit {
    value: TreeNode[];
    selectionMode: string;
    selection: any;
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    onNodeContextMenuSelect: EventEmitter<any>;
    style: any;
    styleClass: string;
    contextMenu: any;
    layout: string;
    metaKeySelection: boolean;
    templates: QueryList<any>;
    templateMap: any;
    nodeTouched: boolean;
    readonly horizontal: boolean;
    ngAfterContentInit(): void;
    onNodeClick(event: MouseEvent, node: TreeNode): void;
    onNodeTouchEnd(): void;
    onNodeRightClick(event: MouseEvent, node: TreeNode): void;
    findIndexInSelection(node: TreeNode): number;
    propagateSelectionUp(node: TreeNode, select: boolean): void;
    propagateSelectionDown(node: TreeNode, select: boolean): void;
    isSelected(node: TreeNode): boolean;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
    isCheckboxSelectionMode(): boolean;
    getTemplateForNode(node: TreeNode): TemplateRef<any>;
}
export declare class TreeModule {
}
