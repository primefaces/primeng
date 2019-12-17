import {
    NgModule, Component, Input, AfterContentInit, OnDestroy, Output, EventEmitter, OnInit,
    ContentChildren, QueryList, TemplateRef, Inject, ElementRef, forwardRef
} from '@angular/core';
import {Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from 'primeng/api';
import {SharedModule} from 'primeng/api';
import {PrimeTemplate} from 'primeng/api';
import {TreeDragDropService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {BlockableUI} from 'primeng/api';
import {ObjectUtils} from 'primeng/utils';
import {DomHandler} from 'primeng/dom';

@Component({
    selector: 'p-treeNode',
    template: `
        <ng-template [ngIf]="node">
            <li *ngIf="tree.droppableNodes" class="ui-treenode-droppoint"
                [ngClass]="{'ui-treenode-droppoint-active ui-state-highlight':draghoverPrev}"
                (drop)="onDropPoint($event,-1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,-1)"
                (dragleave)="onDropPointDragLeave()"></li>
            <li *ngIf="!tree.horizontal" role="treeitem" [ngClass]="['ui-treenode',node.styleClass||'', isLeaf() ? 'ui-treenode-leaf': '']">
                <div class="ui-treenode-content" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)"
                     (touchend)="onNodeTouchEnd()"
                     (drop)="onDropNode($event)" (dragover)="onDropNodeDragOver($event)" (dragenter)="onDropNodeDragEnter()"
                     (dragleave)="onDropNodeDragLeave($event)"
                     [draggable]="tree.draggableNodes" (dragstart)="onDragStart($event)" (dragend)="onDragStop()" tabIndex="0"
                     [ngClass]="{'ui-treenode-selectable':tree.selectionMode && node.selectable !== false,'ui-treenode-dragover':draghoverNode, 'ui-treenode-content-selected':isSelected()}"
                     (keydown)="onKeyDown($event)" [attr.aria-posinset]="this.index + 1" [attr.aria-expanded]="this.node.expanded"
                     [attr.aria-selected]="isSelected()">
                    <span class="ui-tree-toggler pi pi-fw ui-unselectable-text"
                          [ngClass]="{'pi-caret-right':!node.expanded,'pi-caret-down':node.expanded}"
                          (click)="toggle($event)"></span
                    >
                    <div class="ui-chkbox" *ngIf="tree.selectionMode == 'checkbox'">
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"
                             [ngClass]="{'ui-state-disabled': node.selectable === false}">
                        <span class="ui-chkbox-icon ui-clickable pi"
                              [ngClass]="{'pi-check':isSelected(),'pi-minus':node.partialSelected}"></span></div>
                    </div
                    >
                    <span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                    ><span class="ui-treenode-label ui-corner-all"
                           [ngClass]="{'ui-state-highlight':isSelected()}">
                            <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                            <span *ngIf="tree.getTemplateForNode(node)">
                                <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                            </span>
                    </span>
                </div>
                <ul class="ui-treenode-children" style="display: none;" *ngIf="node.children && node.expanded"
                    [style.display]="node.expanded ? 'block' : 'none'" role="group">
                    <p-treeNode
                            *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; let index=index; trackBy: tree.nodeTrackBy"
                            [node]="childNode" [parentNode]="node"
                            [firstChild]="firstChild" [lastChild]="lastChild" [index]="index"></p-treeNode>
                </ul>
            </li>
            <li *ngIf="tree.droppableNodes&&lastChild" class="ui-treenode-droppoint"
                [ngClass]="{'ui-treenode-droppoint-active ui-state-highlight':draghoverNext}"
                (drop)="onDropPoint($event,1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,1)"
                (dragleave)="onDropPointDragLeave()"></li>
            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                <tr>
                    <td class="ui-treenode-connector" *ngIf="!root">
                        <table class="ui-treenode-connector-table">
                            <tbody>
                            <tr>
                                <td [ngClass]="{'ui-treenode-connector-line':!firstChild}"></td>
                            </tr>
                            <tr>
                                <td [ngClass]="{'ui-treenode-connector-line':!lastChild}"></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                    <td class="ui-treenode" [ngClass]="{'ui-treenode-collapsed':!node.expanded}">
                        <div class="ui-treenode-content ui-state-default ui-corner-all"
                             [ngClass]="{'ui-treenode-selectable':tree.selectionMode,'ui-state-highlight':isSelected()}"
                             (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)"
                             (touchend)="onNodeTouchEnd()">
                                <span class="ui-tree-toggler pi pi-fw ui-unselectable-text"
                                      [ngClass]="{'pi-plus':!node.expanded,'pi-minus':node.expanded}" *ngIf="!isLeaf()"
                                      (click)="toggle($event)"></span
                                ><span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                        ><span class="ui-treenode-label ui-corner-all">
                                        <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                                        <span *ngIf="tree.getTemplateForNode(node)">
                                            <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: {$implicit: node}">
                                            </ng-container>
                                        </span>
                                </span>
                        </div>
                    </td>
                    <td class="ui-treenode-children-container" *ngIf="node.children && node.expanded"
                        [style.display]="node.expanded ? 'table-cell' : 'none'">
                        <div class="ui-treenode-children">
                            <p-treeNode
                                    *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; trackBy: tree.nodeTrackBy"
                                    [node]="childNode"
                                    [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </ng-template>
    `
})
export class UITreeNode implements OnInit {

    static ICON_CLASS = 'ui-treenode-icon ';

    @Input() node: TreeNode;

    @Input() parentNode: TreeNode;

    @Input() root: boolean;

    @Input() index: number;

    @Input() firstChild: boolean;

    @Input() lastChild: boolean;

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
        this.tree.onNodeExpand.emit({originalEvent: event, node: this.node});
    }

    collapse(event: Event) {
        this.node.expanded = false;
        this.tree.onNodeCollapse.emit({originalEvent: event, node: this.node});
    }

    onNodeClick(event: MouseEvent) {
        this.tree.onNodeClick(event, this.node);
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
            if (this.tree.validateDrop) {
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode,
                    dropNode: this.node,
                    dropIndex: this.index,
                    accept: () => {
                        this.processPointDrop(dragNode, dragNodeIndex, position);
                    }
                });
            } else {
                this.processPointDrop(dragNode, dragNodeIndex, position);
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

    processPointDrop(dragNode, dragNodeIndex, position) {
        const newNodeList = this.node.parent ? this.node.parent.children : this.tree.value;
        this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);

        if (position < 0) {
            const dropIndex = (this.tree.dragNodeSubNodes === newNodeList)
                ? ((this.tree.dragNodeIndex > this.index)
                    ? this.index
                    : this.index - 1)
                : this.index;
            newNodeList.splice(dropIndex, 0, dragNode);
        } else {
            newNodeList.push(dragNode);
        }

        this.tree.dragDropService.stopDrag({
            node: dragNode,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: dragNodeIndex
        });
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

    onDropPointDragLeave() {
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

    onDragStop() {
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
            event.preventDefault();
            event.stopPropagation();
            const dragNode = this.tree.dragNode;
            if (this.tree.allowDrop(dragNode, this.node, this.tree.dragNodeScope)) {
                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode,
                        dropNode: this.node,
                        index: this.index,
                        accept: () => {
                            this.processNodeDrop(dragNode);
                        }
                    });
                } else {
                    this.processNodeDrop(dragNode);
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode,
                        dropNode: this.node,
                        index: this.index
                    });
                }
            }
        }

        this.draghoverNode = false;
    }

    processNodeDrop(dragNode) {
        const dragNodeIndex = this.tree.dragNodeIndex;
        this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);

        if (this.node.children) {
            this.node.children.push(dragNode);
        } else {
            this.node.children = [dragNode];
        }

        this.tree.dragDropService.stopDrag({
            node: dragNode,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.tree.dragNodeIndex
        });
    }

    onDropNodeDragEnter() {
        if (this.tree.droppableNodes && this.node.droppable !== false &&
            this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }

    onDropNodeDragLeave(event) {
        if (this.tree.droppableNodes) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height)
                || event.y < rect.top) {
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
                if (!this.node.expanded) {
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
        const childrenListElement = nodeElement.children[0].children[1];
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
        <div
                [ngClass]="{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode,'ui-treenode-dragover':dragHover,'ui-tree-loading': loading}"
                [ngStyle]="style" [class]="styleClass" *ngIf="!horizontal"
                (drop)="onDrop($event)" (dragover)="onDragOver($event)" (dragenter)="onDragEnter()" (dragleave)="onDragLeave($event)">
            <div class="ui-tree-loading-mask ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-tree-loading-content" *ngIf="loading">
                <i [class]="'ui-tree-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="filter" class="ui-tree-filter-container">
                <input #filter type="text" autocomplete="off" class="ui-tree-filter ui-inputtext ui-widget ui-state-default ui-corner-all"
                       [attr.placeholder]="filterPlaceholder"
                       (keydown.enter)="$event.preventDefault()" (input)="onFilter($event)">
                <span class="ui-tree-filter-icon pi pi-search"></span>
            </div>
            <ul class="ui-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy">
                <p-treeNode
                        *ngFor="let node of getRootNode(); let firstChild=first;let lastChild=last; let index=index; trackBy: nodeTrackBy"
                        [node]="node"
                        [firstChild]="firstChild" [lastChild]="lastChild" [index]="index"></p-treeNode>
            </ul>
            <div class="ui-tree-empty-message" *ngIf="!loading && (value == null || value.length === 0)">{{emptyMessage}}</div>
        </div>
        <div [ngClass]="{'ui-tree ui-tree-horizontal ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}"
             [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <div class="ui-tree-loading ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-tree-loading-content" *ngIf="loading">
                <i [class]="'ui-tree-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <table *ngIf="value&&value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="ui-tree-empty-message" *ngIf="!loading && (value == null || value.length === 0)">{{emptyMessage}}</div>
        </div>
    `
})
export class Tree implements OnInit, AfterContentInit, OnDestroy, BlockableUI {

    constructor(public el: ElementRef, @Optional() public dragDropService: TreeDragDropService) {
    }

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

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

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

    @Input() nodeTrackBy = (index: number, item: any) => item;

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
                () => {
                    this.dragNodeTree = null;
                    this.dragNode = null;
                    this.dragNodeSubNodes = null;
                    this.dragNodeIndex = null;
                    this.dragNodeScope = null;
                    this.dragHover = false;
                });
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

    onNodeClick(event, node: TreeNode) {
        const eventTarget = (event.target as Element);

        if (DomHandler.hasClass(eventTarget, 'ui-tree-toggler')) {
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

            if (eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
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
                index = areNodesEqual ? 0 : -1;
            } else {
                for (let i = 0; i < this.selection.length; i++) {
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
        const nodeWithKey = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
        if (nodeWithKey) {
            nodeWithKey[option] = value || node[option];
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

                node.partialSelected = childPartialSelected || selectedCount > 0 && selectedCount !== node.children.length;
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

    isNodeLeaf(node: TreeNode) {
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

    onDragEnter() {
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

    onFilter(event) {
        const filterValue = event.target.value;
        if (filterValue === '') {
            this.filteredNodes = null;
        } else {
            this.filteredNodes = [];
            const searchFields: string[] = this.filterBy.split(',');
            const filterText = ObjectUtils.removeAccents(filterValue).toLowerCase();
            const isStrictMode = this.filterMode === 'strict';
            for (const node of this.value) {
                const copyNode = {...node};
                const paramsWithoutNode = {searchFields, filterText, isStrictMode};
                if ((
                        isStrictMode
                        &&
                        (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))
                    )
                    ||
                    (
                        !isStrictMode
                        &&
                        (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode))
                    )) {
                    this.filteredNodes.push(copyNode);
                }
            }
        }
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
            const fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(node, field))).toLowerCase();
            if (fieldValue.indexOf(filterText) > -1) {
                matched = true;
            }
        }

        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, {searchFields, filterText, isStrictMode}) || matched;
        }

        return matched;
    }

    getBlockableElement(): HTMLElement {
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
    imports: [CommonModule],
    exports: [Tree, SharedModule],
    declarations: [Tree, UITreeNode]
})
export class TreeModule {
}
