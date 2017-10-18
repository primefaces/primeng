import { ElementRef, OnInit, AfterContentInit, OnDestroy, EventEmitter, TemplateRef, EmbeddedViewRef, ViewContainerRef, QueryList } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { TreeNode } from '../common/treenode';
export declare class OrganizationChartNodeTemplateLoader implements OnInit, OnDestroy {
    viewContainer: ViewContainerRef;
    node: any;
    template: TemplateRef<any>;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare class OrganizationChartNode {
    chart: OrganizationChart;
    node: TreeNode;
    root: boolean;
    first: boolean;
    last: boolean;
    constructor(chart: OrganizationChart);
    readonly leaf: boolean;
    readonly colspan: number;
    onNodeClick(event: Event, node: TreeNode): void;
    toggleNode(event: Event, node: TreeNode): void;
    isSelected(): boolean;
}
export declare class OrganizationChart implements AfterContentInit {
    el: ElementRef;
    domHandler: DomHandler;
    value: TreeNode[];
    style: any;
    styleClass: string;
    selectionMode: string;
    selection: any;
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    templates: QueryList<any>;
    templateMap: any;
    constructor(el: ElementRef, domHandler: DomHandler);
    readonly root: TreeNode;
    ngAfterContentInit(): void;
    getTemplateForNode(node: TreeNode): TemplateRef<any>;
    onNodeClick(event: Event, node: TreeNode): void;
    findIndexInSelection(node: TreeNode): number;
    isSelected(node: TreeNode): boolean;
}
export declare class OrganizationChartModule {
}
