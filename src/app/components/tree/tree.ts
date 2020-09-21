import { NgModule, Component, Input, AfterContentInit, OnDestroy, Output, EventEmitter, OnInit, OnChanges,
    ContentChildren, QueryList, TemplateRef, Inject, ElementRef, forwardRef, ChangeDetectionStrategy, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from 'primeng/api';
import { SharedModule } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import { TreeDragDropService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BlockableUI } from 'primeng/api';
import { ObjectUtils } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'p-treeNode',
    template: `
        <ng-template [ngIf]="node">
            <li *ngIf="tree.droppableNodes" class="p-treenode-droppoint" [ngClass]="{'p-treenode-droppoint-active':draghoverPrev}"
            (drop)="onDropPoint($event,-1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,-1)" (dragleave)="onDropPointDragLeave($event)"></li>
            <li *ngIf="!tree.horizontal" role="treeitem" [ngClass]="['p-treenode',node.styleClass||'', isLeaf() ? 'p-treenode-leaf': '']">
                <div class="p-treenode-content" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)" (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)" (dragover)="onDropNodeDragOver($event)" (dragenter)="onDropNodeDragEnter($event)" (dragleave)="onDropNodeDragLeave($event)"
                    [draggable]="tree.draggableNodes" (dragstart)="onDragStart($event)" (dragend)="onDragStop($event)" [attr.tabindex]="0"
                    [ngClass]="{'p-treenode-selectable':tree.selectionMode && node.selectable !== false,'p-treenode-dragover':draghoverNode, 'p-highlight':isSelected()}"
                    (keydown)="onKeyDown($event)" [attr.aria-posinset]="this.index + 1" [attr.aria-expanded]="this.node.expanded" [attr.aria-selected]="isSelected()" [attr.aria-label]="node.label">
                    <button type="button" class="p-tree-toggler p-link" (click)="toggle($event)" pRipple>
                        <span class="p-tree-toggler-icon pi pi-fw" [ngClass]="{'pi-chevron-right':!node.expanded,'pi-chevron-down':node.expanded}"></span>
                    </button>
                    <div class="p-checkbox p-component" *ngIf="tree.selectionMode === 'checkbox'" [attr.aria-checked]="isSelected()">
                        <div class="p-checkbox-box" [ngClass]="{'p-highlight': isSelected(), 'p-indeterminate': node.partialSelected}">
                            <span class="p-checkbox-icon pi" [ngClass]="{'pi-check':isSelected(),'pi-minus':node.partialSelected}"></span>
                        </div>
                    </div>
                    <span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span>
                    <span class="p-treenode-label">
                            <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                            <span *ngIf="tree.getTemplateForNode(node)">
                                <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                            </span>
                    </span>
                </div>
                <ul class="p-treenode-children" style="display: none;" *ngIf="!tree.virtualScroll && node.children && node.expanded" [style.display]="node.expanded ? 'block' : 'none'" role="group">
                    <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; let index=index; trackBy: tree.trackBy" [node]="childNode" [parentNode]="node"
                        [firstChild]="firstChild" [lastChild]="lastChild" [index]="index" [style.height.px]="tree.virtualNodeHeight" [level]="level + 1"></p-treeNode>
                </ul>
            </li>
            <li *ngIf="tree.droppableNodes&&lastChild" class="p-treenode-droppoint" [ngClass]="{'p-treenode-droppoint-active':draghoverNext}"
            (drop)="onDropPoint($event,1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,1)" (dragleave)="onDropPointDragLeave($event)"></li>
            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                    <tr>
                        <td class="p-treenode-connector" *ngIf="!root">
                            <table class="p-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{'p-treenode-connector-line':!firstChild}"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{'p-treenode-connector-line':!lastChild}"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="p-treenode" [ngClass]="{'p-treenode-collapsed':!node.expanded}">
                            <div class="p-treenode-content" tabindex="0" [ngClass]="{'p-treenode-selectable':tree.selectionMode,'p-highlight':isSelected()}" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()" (keydown)="onNodeKeydown($event)">
                                <span class="p-tree-toggler pi pi-fw" [ngClass]="{'pi-plus':!node.expanded,'pi-minus':node.expanded}" *ngIf="!isLeaf()" (click)="toggle($event)"></span>
                                <span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span>
                                <span class="p-treenode-label">
                                    <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                                    <span *ngIf="tree.getTemplateForNode(node)">
                                        <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                                    </span>
                                </span>
                            </div>
                        </td>
                        <td class="p-treenode-children-container" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'table-cell' : 'none'">
                            <div class="p-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; trackBy: tree.trackBy" [node]="childNode"
                                        [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None
})
export class UITreeNode implements OnInit {

    static ICON_CLASS = 'p-treenode-icon ';

    @Input() rowNode: any;

    @Input() node: TreeNode;

    @Input() parentNode: TreeNode;

    @Input() root: boolean;

    @Input() index: number;

    @Input() firstChild: boolean;

    @Input() lastChild: boolean;

    @Input() level: number;

    tree: Tree;

    constructor(@Inject(forwardRef(() => Tree)) tree) {
        this.tree = tree as Tree;
    }

    draghoverPrev: boolean;

    draghoverNext: boolean;

    draghoverNode: boolean;

    ngOnInit() {
        this.node.parent = this.parentNode;

        if (this.parentNode) {
            this.tree.syncNodeOption(this.node, this.tree.value, 'parent', this.tree.getNodeWithKey(this.parentNode.key, this.tree.value));
        }
    }

    getIcon() {
        let icon: string;

        if (this.node.icon) {
            icon = this.node.icon;
        } else {
            icon = this.node.expanded && this.node.children && this.node.children.length ? this.node.expandedIcon : this.node.collapsedIcon;
        }

        return UITreeNode.ICON_CLASS + ' ' + icon;
    }

    isLeaf() {
        return this.tree.isNodeLeaf(this.node);
    }

    toggle(event: Event) {
        if (this.node.expanded) {
            this.collapse(event);
        } else {
            this.expand(event);
        }
    }

    expand(event: Event) {
        this.node.expanded = true;
        if (this.tree.virtualScroll) {
            this.tree.updateSerializedValue();
        }
        this.tree.onNodeExpand.emit({originalEvent: event, node: this.node});
    }

    collapse(event: Event) {
        this.node.expanded = false;
        if (this.tree.virtualScroll) {
            this.tree.updateSerializedValue();
        }
        this.tree.onNodeCollapse.emit({originalEvent: event, node: this.node});
    }

    onNodeClick(event: MouseEvent) {
        this.tree.onNodeClick(event, this.node);
    }

    onNodeKeydown(event: KeyboardEvent) {
        if (event.which === 13) {
            this.tree.onNodeClick(event, this.node);
        }
    }

    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }

    onNodeRightClick(event: MouseEvent) {
        this.tree.onNodeRightClick(event, this.node);
    }

    isSelected() {
        return this.tree.isSelected(this.node);
    }

    onDropPoint(event: Event, position: number) {
        event.preventDefault();
        const dragNode = this.tree.dragNode;
        const dragNodeIndex = this.tree.dragNodeIndex;
        const dragNodeScope = this.tree.dragNodeScope;
        const isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? (position === 1 || dragNodeIndex !== this.index - 1) : true;

        if (this.tree.allowDrop(dragNode, this.node, dragNodeScope) && isValidDropPointIndex) {
            const dropParams = {...this.createDropPointEventMetadata(position)};

            if (this.tree.validateDrop) {
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode,
                    dropNode: this.node,
                    dropIndex: this.index,
                    accept: () => {
                        this.processPointDrop(dropParams);
                    }
                });
            } else {
                this.processPointDrop(dropParams);
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode,
                    dropNode: this.node,
                    dropIndex: this.index
                });
            }
        }

        this.draghoverPrev = false;
        this.draghoverNext = false;
    }

    processPointDrop(event) {
        const newNodeList = event.dropNode.parent ? event.dropNode.parent.children : this.tree.value;
        event.dragNodeSubNodes.splice(event.dragNodeIndex, 1);
        let dropIndex = this.index;

        if (event.position < 0) {
            dropIndex = (event.dragNodeSubNodes === newNodeList) ? ((event.dragNodeIndex > event.index) ? event.index : event.index - 1) : event.index;
            newNodeList.splice(dropIndex, 0, event.dragNode);
        } else {
            dropIndex = newNodeList.length;
            newNodeList.push(event.dragNode);
        }

        this.tree.dragDropService.stopDrag({
            node: event.dragNode,
            subNodes: event.dropNode.parent ? event.dropNode.parent.children : this.tree.value,
            index: event.dragNodeIndex
        });
    }

    createDropPointEventMetadata(position) {
        return {
            dragNode: this.tree.dragNode,
            dragNodeIndex:  this.tree.dragNodeIndex,
            dragNodeSubNodes: this.tree.dragNodeSubNodes,
            dropNode: this.node,
            index: this.index,
            position
        };
    }

    onDropPointDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }

    onDropPointDragEnter(event: Event, position: number) {
        if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            if (position < 0) {
                this.draghoverPrev = true;
            } else {
                this.draghoverNext = true;
            }
        }
    }

    onDropPointDragLeave(event: Event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }

    onDragStart(event) {
        if (this.tree.draggableNodes && this.node.draggable !== false) {
            event.dataTransfer.setData('text', 'data');

            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        } else {
            event.preventDefault();
        }
    }

    onDragStop(event) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    }

    onDropNodeDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    onDropNode(event) {
        if (this.tree.droppableNodes && this.node.droppable !== false) {
            const dragNode = this.tree.dragNode;

            if (this.tree.allowDrop(dragNode, this.node, this.tree.dragNodeScope)) {
                const dropParams = {...this.createDropNodeEventMetadata()};

                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode,
                        dropNode: this.node,
                        index: this.index,
                        accept: () => {
                            this.processNodeDrop(dropParams);
                        }
                    });
                } else {
                    this.processNodeDrop(dropParams);
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode,
                        dropNode: this.node,
                        index: this.index
                    });
                }
            }
        }

        event.preventDefault();
        event.stopPropagation();
        this.draghoverNode = false;
    }

    createDropNodeEventMetadata() {
        return {
            dragNode: this.tree.dragNode,
            dragNodeIndex:  this.tree.dragNodeIndex,
            dragNodeSubNodes: this.tree.dragNodeSubNodes,
            dropNode: this.node
        };
    }

    processNodeDrop(event) {
        const dragNodeIndex = event.dragNodeIndex;
        event.dragNodeSubNodes.splice(dragNodeIndex, 1);

        if (event.dropNode.children) {
            event.dropNode.children.push(event.dragNode);
        } else {
            event.dropNode.children = [event.dragNode];
        }

        this.tree.dragDropService.stopDrag({
            node: event.dragNode,
            subNodes: event.dropNode.parent ? event.dropNode.parent.children : this.tree.value,
            index: dragNodeIndex
        });
    }

    onDropNodeDragEnter(event) {
        if (this.tree.droppableNodes && this.node.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }

    onDropNodeDragLeave(event) {
        if (this.tree.droppableNodes) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
               this.draghoverNode = false;
            }
        }
    }

    onKeyDown(event: KeyboardEvent) {
        const nodeElement = (event.target as HTMLDivElement).parentElement.parentElement;

        if (nodeElement.nodeName !== 'P-TREENODE') {
            return;
        }

        switch (event.which) {
            // down arrow
            case 40:
                const listElement = (this.tree.droppableNodes) ? nodeElement.children[1].children[1] : nodeElement.children[0].children[1];
                if (listElement && listElement.children.length > 0) {
                    this.focusNode(listElement.children[0]);
                } else {
                    const nextNodeElement = nodeElement.nextElementSibling;
                    if (nextNodeElement) {
                        this.focusNode(nextNodeElement);
                    } else {
                        const nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);
                        if (nextSiblingAncestor) {
                            this.focusNode(nextSiblingAncestor);
                        }
                    }
                }

                event.preventDefault();
                break;

            // up arrow
            case 38:
                if (nodeElement.previousElementSibling) {
                    this.focusNode(this.findLastVisibleDescendant(nodeElement.previousElementSibling));
                } else {
                    const parentNodeElement = this.getParentNodeElement(nodeElement);
                    if (parentNodeElement) {
                        this.focusNode(parentNodeElement);
                    }
                }

                event.preventDefault();
                break;

            // right arrow
            case 39:
                if (!this.node.expanded && !this.tree.isNodeLeaf(this.node)) {
                    this.expand(event);
                }

                event.preventDefault();
                break;

            // left arrow
            case 37:
                if (this.node.expanded) {
                    this.collapse(event);
                } else {
                    const parentNodeElement = this.getParentNodeElement(nodeElement);
                    if (parentNodeElement) {
                        this.focusNode(parentNodeElement);
                    }
                }

                event.preventDefault();
                break;

            // enter
            case 13:
                this.tree.onNodeClick(event, this.node);
                event.preventDefault();
                break;

            default:
                // no op
            break;
        }
    }

    findNextSiblingOfAncestor(nodeElement) {
        const parentNodeElement = this.getParentNodeElement(nodeElement);
        if (parentNodeElement) {
            if (parentNodeElement.nextElementSibling) {
                return parentNodeElement.nextElementSibling;
            } else {
                return this.findNextSiblingOfAncestor(parentNodeElement);
            }
        } else {
            return null;
        }
    }

    findLastVisibleDescendant(nodeElement) {
        const listElement = Array.from(nodeElement.children).find(el => DomHandler.hasClass(el, 'p-treenode')) as HTMLElement;
        const childrenListElement = listElement.children[1];
        if (childrenListElement && childrenListElement.children.length > 0) {
            const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];

            return this.findLastVisibleDescendant(lastChildElement);
        } else {
            return nodeElement;
        }
    }

    getParentNodeElement(nodeElement) {
        const parentNodeElement = nodeElement.parentElement.parentElement.parentElement;

        return parentNodeElement.tagName === 'P-TREENODE' ? parentNodeElement : null;
    }

    focusNode(element) {
        if (this.tree.droppableNodes) {
            element.children[1].children[0].focus();
        } else {
            element.children[0].children[0].focus();
        }
    }
}

@Component({
    selector: 'p-tree',
    template: `
        <div [ngClass]="{'p-tree p-component':true,'p-tree-selectable':selectionMode,
                'p-treenode-dragover':dragHover,'p-tree-loading': loading, 'p-tree-flex-scrollable': scrollHeight === 'flex'}"
            [ngStyle]="style" [class]="styleClass" *ngIf="!horizontal"
            (drop)="onDrop($event)" (dragover)="onDragOver($event)" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)">
            <div class="p-tree-loading-overlay p-component-overlay" *ngIf="loading">
                <i [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="filter" class="p-tree-filter-container">
                <input #filter type="text" autocomplete="off" class="p-tree-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder"
                    (keydown.enter)="$event.preventDefault()" (input)="_filter($event)">
                    <span class="p-tree-filter-icon pi pi-search"></span>
            </div>
            <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                <div class="p-tree-wrapper" [style.max-height]="scrollHeight">
                    <ul class="p-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                        <p-treeNode *ngFor="let node of getRootNode(); let firstChild=first;let lastChild=last; let index=index; trackBy: trackBy" [node]="node"
                                    [firstChild]="firstChild" [lastChild]="lastChild" [index]="index" [level]="0"></p-treeNode>
                    </ul>
                </div>
            </ng-container>
            <ng-template #virtualScrollList>
                <cdk-virtual-scroll-viewport class="p-tree-wrapper" [style.height]="scrollHeight" [itemSize]="virtualNodeHeight" [minBufferPx]="minBufferPx" [maxBufferPx]="maxBufferPx">
                    <ul class="p-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                        <p-treeNode *cdkVirtualFor="let rowNode of serializedValue; let firstChild=first; let lastChild=last; let index=index; trackBy: trackBy; templateCacheSize: 0"  [level]="rowNode.level"
                                    [rowNode]="rowNode" [node]="rowNode.node" [firstChild]="firstChild" [lastChild]="lastChild" [index]="index" [style.height.px]="virtualNodeHeight"></p-treeNode>
                    </ul>
                </cdk-virtual-scroll-viewport>
            </ng-template>
            <div class="p-tree-empty-message" *ngIf="!loading && (value === null || value.length === 0)">{{emptyMessage}}</div>
        </div>
        <div [ngClass]="{'p-tree p-tree-horizontal p-component':true,'p-tree-selectable':selectionMode}"  [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <div class="p-tree-loading-mask p-component-overlay" *ngIf="loading">
                <i [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <table *ngIf="value&&value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="p-tree-empty-message" *ngIf="!loading && (value === null || value.length === 0)">{{emptyMessage}}</div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tree.css']
})
export class Tree implements OnInit, AfterContentInit, OnChanges, OnDestroy, BlockableUI {

    constructor(public el: ElementRef, @Optional() public dragDropService: TreeDragDropService) {}

    get horizontal(): boolean {
        return this.layout === 'horizontal';
    }

    @Input() value: TreeNode[];

    @Input() selectionMode: string;

    @Input() selection: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onNodeContextMenuSelect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeDrop: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() contextMenu: any;

    @Input() layout = 'vertical';

    @Input() draggableScope: any;

    @Input() droppableScope: any;

    @Input() draggableNodes: boolean;

    @Input() droppableNodes: boolean;

    @Input() metaKeySelection = true;

    @Input() propagateSelectionUp = true;

    @Input() propagateSelectionDown = true;

    @Input() loading: boolean;

    @Input() loadingIcon = 'pi pi-spinner';

    @Input() emptyMessage = 'No records found';

    @Input() ariaLabel: string;

    @Input() ariaLabelledBy: string;

    @Input() validateDrop: boolean;

    @Input() filter: boolean;

    @Input() filterBy = 'label';

    @Input() filterMode = 'lenient';

    @Input() filterPlaceholder: string;

    @Input() filterLocale: string;

    @Input() scrollHeight: string;

    @Input() virtualScroll: boolean;

    @Input() virtualNodeHeight: string;

    @Input() minBufferPx: number;

    @Input() maxBufferPx: number;

    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    serializedValue: any[];

    public templateMap: any;

    public nodeTouched: boolean;

    public dragNodeTree: Tree;

    public dragNode: TreeNode;

    public dragNodeSubNodes: TreeNode[];

    public dragNodeIndex: number;

    public dragNodeScope: any;

    public dragHover: boolean;

    public dragStartSubscription: Subscription;

    public dragStopSubscription: Subscription;

    public filteredNodes: TreeNode[];

    @Input() trackBy: (index: number, item: any) => any = (index: number, item: any) => item;

    ngOnInit() {
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe(
              event => {
                this.dragNodeTree = event.tree;
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
                this.dragNodeScope = event.scope;
            });

            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe(
              event => {
                this.dragNodeTree = null;
                this.dragNode = null;
                this.dragNodeSubNodes = null;
                this.dragNodeIndex = null;
                this.dragNodeScope = null;
                this.dragHover = false;
            });
        }
    }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.value) {
            this.updateSerializedValue();
        }
    }

    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }

        this.templates.forEach((item) => {
            this.templateMap[item.name] = item.template;
        });
    }

    updateSerializedValue() {
        this.serializedValue = [];
        this.serializeNodes(null, this.getRootNode(), 0, true);
    }

    serializeNodes(parent, nodes, level, visible) {
        if (nodes && nodes.length) {
            for (const node of nodes) {
                node.parent = parent;
                const rowNode = {
                    node,
                    parent,
                    level,
                    visible: visible && (parent ? parent.expanded : true)
                };
                this.serializedValue.push(rowNode);

                if (rowNode.visible && node.expanded) {
                    this.serializeNodes(node, node.children, level + 1, rowNode.visible);
                }
            }
        }
    }

    onNodeClick(event, node: TreeNode) {
        const eventTarget = (event.target as Element);

        if (DomHandler.hasClass(eventTarget, 'p-tree-toggler') || DomHandler.hasClass(eventTarget, 'p-tree-toggler-icon')) {
            return;
        } else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }

            if (this.hasFilteredNodes()) {
                node = this.getNodeWithKey(node.key, this.value);

                if (!node) {
                    return;
                }
            }

            const index = this.findIndexInSelection(node);
            const selected = (index >= 0);

            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown) {
                        this.propagateDown(node, false);
                    } else {
                        this.selection = this.selection.filter((val, i) => i !== index);
                    }

                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }

                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({originalEvent: event, node});
                } else {
                    if (this.propagateSelectionDown) {
                        this.propagateDown(node, true);
                    } else {
                        this.selection = [...this.selection || [], node];
                    }

                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }

                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({originalEvent: event, node});
                }
            } else {
                const metaSelection = this.nodeTouched ? false : this.metaKeySelection;

                if (metaSelection) {
                    const metaKey = (event.metaKey || event.ctrlKey);

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        } else {
                            this.selection = this.selection.filter((val, i) => i !== index);
                            this.selectionChange.emit(this.selection);
                        }

                        this.onNodeUnselect.emit({originalEvent: event, node});
                    } else {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(node);
                        } else if (this.isMultipleSelectionMode()) {
                            this.selection = (!metaKey) ? [] : this.selection || [];
                            this.selection = [...this.selection, node];
                            this.selectionChange.emit(this.selection);
                        }

                        this.onNodeSelect.emit({originalEvent: event, node});
                    }
                } else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({originalEvent: event, node});
                        } else {
                            this.selection = node;
                            this.onNodeSelect.emit({originalEvent: event, node});
                        }
                    } else {
                        if (selected) {
                            this.selection = this.selection.filter((val, i) => i !== index);
                            this.onNodeUnselect.emit({originalEvent: event, node});
                        } else {
                            this.selection = [...this.selection || [], node];
                            this.onNodeSelect.emit({originalEvent: event, node});
                        }
                    }

                    this.selectionChange.emit(this.selection);
                }
            }
        }

        this.nodeTouched = false;
    }

    onNodeTouchEnd() {
        this.nodeTouched = true;
    }

    onNodeRightClick(event: MouseEvent, node: TreeNode) {
        if (this.contextMenu) {
            const eventTarget = (event.target as Element);

            if (eventTarget.className && eventTarget.className.indexOf('p-tree-toggler') === 0) {
                return;
            } else {
                const index = this.findIndexInSelection(node);
                const selected = (index >= 0);

                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selectionChange.emit(node);
                    } else {
                        this.selectionChange.emit([node]);
                    }
                }

                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({originalEvent: event, node});
            }
        }
    }

    findIndexInSelection(node: TreeNode) {
        let index = -1;

        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                const areNodesEqual = (this.selection.key && this.selection.key === node.key) || this.selection === node;
                index = areNodesEqual ? 0 : - 1;
            } else {
                for (let i = 0; i  < this.selection.length; i++) {
                    const selectedNode = this.selection[i];
                    const areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode === node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }

    syncNodeOption(node, parentNodes, option, value?: any) {
        // to synchronize the node option between the filtered nodes and the original nodes(this.value)
        // tslint:disable-next-line:variable-name
        const _node = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
        if (_node) {
            _node[option] = value || node[option];
        }
    }

    hasFilteredNodes() {
        return this.filter && this.filteredNodes && this.filteredNodes.length;
    }

    getNodeWithKey(key: string, nodes: TreeNode[]) {
        for (const node of nodes) {
            if (node.key === key) {
                return node;
            }

            if (node.children) {
                const matchedNode = this.getNodeWithKey(key, node.children);
                if (matchedNode) {
                    return matchedNode;
                }
            }
        }
    }

    propagateUp(node: TreeNode, select: boolean) {
        if (node.children && node.children.length) {
            let selectedCount = 0;
            let childPartialSelected = false;
            for (const child of node.children) {
                if (this.isSelected(child)) {
                    selectedCount++;
                } else if (child.partialSelected) {
                    childPartialSelected = true;
                }
            }

            if (select && selectedCount === node.children.length) {
                this.selection = [...this.selection || [], node];
                node.partialSelected = false;
            } else {
                if (!select) {
                    const index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this.selection = this.selection.filter((val, i) => i !== index);
                    }
                }

                if (childPartialSelected || selectedCount > 0 && selectedCount !== node.children.length) {
                    node.partialSelected = true;
                } else {
                    node.partialSelected = false;
                }
            }

            this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        }

        const parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    }

    propagateDown(node: TreeNode, select: boolean) {
        const index = this.findIndexInSelection(node);

        if (select && index === -1) {
            this.selection = [...this.selection || [], node];
        } else if (!select && index > -1) {
            this.selection = this.selection.filter((val, i) => i !== index);
        }

        node.partialSelected = false;

        this.syncNodeOption(node, this.filteredNodes, 'partialSelected');

        if (node.children && node.children.length) {
            for (const child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }

    isSelected(node: TreeNode) {
        return this.findIndexInSelection(node) !== -1;
    }

    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode === 'multiple';
    }

    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode === 'checkbox';
    }

    isNodeLeaf(node) {
        return node.leaf === false ? false : !(node.children && node.children.length);
    }

    getRootNode() {
        return this.filteredNodes ? this.filteredNodes : this.value;
    }

    getTemplateForNode(node: TreeNode): TemplateRef<any> {
        if (this.templateMap) {
            return node.type ? this.templateMap[node.type] : this.templateMap.default;
        } else {
            return null;
        }
    }

    onDragOver(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    }

    onDrop(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            const dragNode = this.dragNode;
            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                const dragNodeIndex = this.dragNodeIndex;
                this.dragNodeSubNodes.splice(dragNodeIndex, 1);
                this.value = this.value || [];
                this.value.push(dragNode);

                this.dragDropService.stopDrag({
                    node: dragNode
                });
            }
        }
    }

    onDragEnter(event) {
        if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }

    onDragLeave(event) {
        if (this.droppableNodes) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
               this.dragHover = false;
            }
        }
    }

    allowDrop(dragNode: TreeNode, dropNode: TreeNode, dragNodeScope: any): boolean {
        if (!dragNode) {
            // prevent random html elements to be dragged
            return false;
        } else if (this.isValidDragScope(dragNodeScope)) {
            let allow = true;
            if (dropNode) {
                if (dragNode === dropNode) {
                    allow = false;
                } else {
                    let parent = dropNode.parent;
                    while (parent != null) {
                        if (parent === dragNode) {
                            allow = false;
                            break;
                        }
                        parent = parent.parent;
                    }
                }
            }

            return allow;
        } else {
            return false;
        }
    }

    isValidDragScope(dragScope: any): boolean {
        const dropScope = this.droppableScope;

        if (dropScope) {
            if (typeof dropScope === 'string') {
                if (typeof dragScope === 'string') {
                    return dropScope === dragScope;
                } else if (dragScope instanceof Array) {
                    return (dragScope as Array<any>).indexOf(dropScope) !== -1;
 }
            } else if (dropScope instanceof Array) {
                if (typeof dragScope === 'string') {
                    return (dropScope as Array<any>).indexOf(dragScope) !== -1;
                } else if (dragScope instanceof Array) {
                    for (const s of dropScope) {
                        for (const ds of dragScope) {
                            if (s === ds) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        } else {
            return true;
        }
    }

    _filter(event) {
        const filterValue = event.target.value;
        if (filterValue === '') {
            this.filteredNodes = null;
        } else {
            this.filteredNodes = [];
            const searchFields: string[] = this.filterBy.split(',');
            const filterText = ObjectUtils.removeAccents(filterValue).toLocaleLowerCase(this.filterLocale);
            const isStrictMode = this.filterMode === 'strict';
            for (const node of this.value) {
                const copyNode = {...node};
                const paramsWithoutNode = {searchFields, filterText, isStrictMode};
                if ((isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                    (!isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                    this.filteredNodes.push(copyNode);
                }
            }
        }

        this.updateSerializedValue();
        this.onFilter.emit({
            filter: filterValue,
            filteredValue: this.filteredNodes
        });
    }

    findFilteredNodes(node, paramsWithoutNode) {
        if (node) {
            let matched = false;
            if (node.children) {
                const childNodes = [...node.children];
                node.children = [];
                for (const childNode of childNodes) {
                    const copyChildNode = {...childNode};
                    if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                        matched = true;
                        node.children.push(copyChildNode);
                    }
                }
            }

            if (matched) {
                node.expanded = true;
                return true;
            }
        }
    }

    isFilterMatched(node, {searchFields, filterText, isStrictMode}) {
        let matched = false;
        for (const field of searchFields) {
            const fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(node, field))).toLocaleLowerCase(this.filterLocale);
            if (fieldValue.indexOf(filterText) > -1) {
                matched = true;
            }
        }

        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, {searchFields, filterText, isStrictMode}) || matched;
        }

        return matched;
    }

    getBlockableElement(): HTMLElement {
      return this.el.nativeElement.children[0];
    }

    ngOnDestroy() {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }

        if (this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    }
}
@NgModule({
    imports: [CommonModule, ScrollingModule, RippleModule],
    exports: [Tree, SharedModule, ScrollingModule],
    declarations: [Tree, UITreeNode]
})
export class TreeModule { }
