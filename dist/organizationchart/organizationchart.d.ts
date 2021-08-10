import { ElementRef, AfterContentInit, EventEmitter, TemplateRef, QueryList, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
export declare class OrganizationChartNode implements OnDestroy {
    cd: ChangeDetectorRef;
    node: TreeNode;
    root: boolean;
    first: boolean;
    last: boolean;
    chart: OrganizationChart;
    subscription: Subscription;
    constructor(chart: any, cd: ChangeDetectorRef);
    get leaf(): boolean;
    get colspan(): number;
    onNodeClick(event: Event, node: TreeNode): void;
    toggleNode(event: Event, node: TreeNode): void;
    isSelected(): boolean;
    ngOnDestroy(): void;
}
export declare class OrganizationChart implements AfterContentInit {
    el: ElementRef;
    cd: ChangeDetectorRef;
    value: TreeNode[];
    style: any;
    styleClass: string;
    selectionMode: string;
    preserveSpace: boolean;
    get selection(): any;
    set selection(val: any);
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    templates: QueryList<any>;
    templateMap: any;
    private selectionSource;
    _selection: any;
    initialized: boolean;
    selectionSource$: import("rxjs").Observable<any>;
    constructor(el: ElementRef, cd: ChangeDetectorRef);
    get root(): TreeNode;
    ngAfterContentInit(): void;
    getTemplateForNode(node: TreeNode): TemplateRef<any>;
    onNodeClick(event: Event, node: TreeNode): void;
    findIndexInSelection(node: TreeNode): number;
    isSelected(node: TreeNode): boolean;
}
export declare class OrganizationChartModule {
}
