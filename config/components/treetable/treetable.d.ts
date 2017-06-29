import { EventEmitter, QueryList, OnInit } from '@angular/core';
import { TreeNode } from '../common/api';
import { Header, Footer, Column } from '../common/shared';
export declare class UITreeRow implements OnInit {
    treeTable: TreeTable;
    node: TreeNode;
    parentNode: TreeNode;
    level: number;
    labelExpand: string;
    labelCollapse: string;
    constructor(treeTable: TreeTable);
    ngOnInit(): void;
    toggle(event: Event): void;
    isLeaf(): boolean;
    isSelected(): boolean;
    onRowClick(event: MouseEvent): void;
    onRowTouchEnd(): void;
    resolveFieldData(data: any, field: string): any;
}
export declare class TreeTable {
    value: TreeNode[];
    selectionMode: string;
    selection: any;
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    style: any;
    styleClass: string;
    labelExpand: string;
    labelCollapse: string;
    metaKeySelection: boolean;
    header: Header;
    footer: Footer;
    columns: QueryList<Column>;
    rowTouched: boolean;
    onRowClick(event: MouseEvent, node: TreeNode): void;
    onRowTouchEnd(): void;
    findIndexInSelection(node: TreeNode): number;
    propagateSelectionUp(node: TreeNode, select: boolean): void;
    propagateSelectionDown(node: TreeNode, select: boolean): void;
    isSelected(node: TreeNode): boolean;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
    isCheckboxSelectionMode(): boolean;
    hasFooter(): boolean;
}
export declare class TreeTableModule {
}
