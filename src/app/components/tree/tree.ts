import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    NgModule,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { BlockableUI, PrimeNGConfig, PrimeTemplate, SharedModule, TranslationKeys, TreeDragDropService, TreeNode } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { ScrollerOptions } from 'primeng/scroller';
import { ObjectUtils } from 'primeng/utils';
import { Subscription } from 'rxjs';
import { CheckIcon } from 'primeng/icons/check';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { MinusIcon } from 'primeng/icons/minus';
import { SearchIcon } from 'primeng/icons/search';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { Nullable } from 'primeng/ts-helpers';
import {
    TreeFilterEvent,
    TreeLazyLoadEvent,
    TreeNodeCollapseEvent,
    TreeNodeContextMenuSelectEvent,
    TreeNodeDropEvent,
    TreeNodeExpandEvent,
    TreeNodeSelectEvent,
    TreeNodeUnSelectEvent,
    TreeScrollEvent,
    TreeScrollIndexChangeEvent
} from './tree.interface';

@Component({
    selector: 'p-treeNode',
    template: `
        <ng-template [ngIf]="node">
            <li
                *ngIf="tree.droppableNodes"
                class="p-treenode-droppoint"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverPrev }"
                (drop)="onDropPoint($event, -1)"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, -1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>
            <li *ngIf="!tree.horizontal" [ngClass]="['p-treenode', node.styleClass || '', isLeaf() ? 'p-treenode-leaf' : '']" [ngStyle]="{ height: itemSize + 'px' }" [style]="node.style">
                <div
                    class="p-treenode-content"
                    [style.paddingLeft]="level * indentation + 'rem'"
                    (click)="onNodeClick($event)"
                    (contextmenu)="onNodeRightClick($event)"
                    (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)"
                    (dragover)="onDropNodeDragOver($event)"
                    (dragenter)="onDropNodeDragEnter($event)"
                    (dragleave)="onDropNodeDragLeave($event)"
                    [draggable]="tree.draggableNodes"
                    (dragstart)="onDragStart($event)"
                    (dragend)="onDragStop($event)"
                    [attr.tabindex]="0"
                    [ngClass]="{ 'p-treenode-selectable': tree.selectionMode && node.selectable !== false, 'p-treenode-dragover': draghoverNode, 'p-highlight': isSelected() }"
                    role="treeitem"
                    (keydown)="onKeyDown($event)"
                    [attr.aria-posinset]="this.index + 1"
                    [attr.aria-expanded]="this.node.expanded"
                    [attr.aria-selected]="isSelected()"
                    [attr.aria-label]="node.label"
                    [attr.data-id]="node.key"
                >
                    <button type="button" [attr.aria-label]="tree.togglerAriaLabel" class="p-tree-toggler p-link" (click)="toggle($event)" pRipple tabindex="-1">
                        <ng-container *ngIf="!tree.togglerIconTemplate">
                            <ChevronRightIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                            <ChevronDownIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                        </ng-container>
                        <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                            <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                        </span>
                    </button>
                    <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-disabled': node.selectable === false }" *ngIf="tree.selectionMode == 'checkbox'" [attr.aria-checked]="isSelected()">
                        <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': isSelected(), 'p-indeterminate': node.partialSelected }">
                            <ng-container *ngIf="!tree.checkboxIconTemplate">
                                <CheckIcon *ngIf="isSelected()" [styleClass]="'p-checkbox-icon'" />
                                <MinusIcon *ngIf="node.partialSelected" [styleClass]="'p-checkbox-icon'" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="tree.checkboxIconTemplate; context: { $implicit: isSelected(), partialSelected: node.partialSelected }"></ng-template>
                        </div>
                    </div>
                    <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                    <span class="p-treenode-label">
                        <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                        <span *ngIf="tree.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                        </span>
                    </span>
                </div>
                <ul class="p-treenode-children" style="display: none;" *ngIf="!tree.virtualScroll && node.children && node.expanded" [style.display]="node.expanded ? 'block' : 'none'" role="group">
                    <p-treeNode
                        *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; let index = index; trackBy: tree.trackBy"
                        [node]="childNode"
                        [parentNode]="node"
                        [firstChild]="firstChild"
                        [lastChild]="lastChild"
                        [index]="index"
                        [itemSize]="itemSize"
                        [level]="level + 1"
                    ></p-treeNode>
                </ul>
            </li>
            <li
                *ngIf="tree.droppableNodes && lastChild"
                class="p-treenode-droppoint"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverNext }"
                (drop)="onDropPoint($event, 1)"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, 1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>
            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                    <tr>
                        <td class="p-treenode-connector" *ngIf="!root">
                            <table class="p-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !firstChild }"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !lastChild }"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="p-treenode" [ngClass]="{ 'p-treenode-collapsed': !node.expanded }">
                            <div
                                class="p-treenode-content"
                                tabindex="0"
                                [ngClass]="{ 'p-treenode-selectable': tree.selectionMode, 'p-highlight': isSelected() }"
                                (click)="onNodeClick($event)"
                                (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()"
                                (keydown)="onNodeKeydown($event)"
                            >
                                <span *ngIf="!isLeaf()" [ngClass]="'p-tree-toggler'" (click)="toggle($event)">
                                    <ng-container *ngIf="!tree.togglerIconTemplate">
                                        <PlusIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                        <MinusIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                    </ng-container>
                                    <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                                        <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                                    </span>
                                </span>
                                <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                                <span class="p-treenode-label">
                                    <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                                    <span *ngIf="tree.getTemplateForNode(node)">
                                        <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                                    </span>
                                </span>
                            </div>
                        </td>
                        <td class="p-treenode-children-container" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'table-cell' : 'none'">
                            <div class="p-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; trackBy: tree.trackBy" [node]="childNode" [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class UITreeNode implements OnInit {
    static ICON_CLASS: string = 'p-treenode-icon ';

    @Input() rowNode: any;

    @Input() node: TreeNode | undefined;

    @Input() parentNode: TreeNode | undefined;

    @Input() root: boolean | undefined;

    @Input() index: number | undefined;

    @Input() firstChild: boolean | undefined;

    @Input() lastChild: boolean | undefined;

    @Input() level: number | undefined;

    @Input() indentation: number | undefined;

    @Input() itemSize: number | undefined;

    tree: Tree;

    timeout: any;

    draghoverPrev: boolean | undefined;

    draghoverNext: boolean | undefined;

    draghoverNode: boolean | undefined;

    constructor(@Inject(forwardRef(() => Tree)) tree: Tree) {
        this.tree = tree as Tree;
    }

    ngOnInit() {
        (<TreeNode>this.node).parent = this.parentNode;
        if (this.parentNode) {
            this.tree.syncNodeOption(<TreeNode>this.node, <TreeNode[]>this.tree.value, 'parent', this.tree.getNodeWithKey(<string>this.parentNode.key, <TreeNode[]>this.tree.value));
        }
    }

    getIcon() {
        let icon: string;

        if ((<TreeNode>this.node).icon) icon = (<TreeNode>this.node).icon as string;
        else icon = (<TreeNode>this.node).expanded && (<TreeNode>this.node).children && (<TreeNode>this.node).children?.length ? (<TreeNode>this.node).expandedIcon : (<TreeNode>this.node).collapsedIcon;

        return UITreeNode.ICON_CLASS + ' ' + icon;
    }

    isLeaf() {
        return this.tree.isNodeLeaf(<TreeNode>this.node);
    }

    toggle(event: Event) {
        if ((<TreeNode>this.node).expanded) this.collapse(event);
        else this.expand(event);

        event.stopPropagation();
    }

    expand(event: Event) {
        (<TreeNode>this.node).expanded = true;
        if (this.tree.virtualScroll) {
            this.tree.updateSerializedValue();
            this.focusVirtualNode();
        }
        this.tree.onNodeExpand.emit({ originalEvent: event, node: <TreeNode>this.node });
    }

    collapse(event: Event) {
        (<TreeNode>this.node).expanded = false;
        if (this.tree.virtualScroll) {
            this.tree.updateSerializedValue();
            this.focusVirtualNode();
        }
        this.tree.onNodeCollapse.emit({ originalEvent: event, node: <TreeNode>this.node });
    }

    onNodeClick(event: MouseEvent) {
        this.tree.onNodeClick(event, <TreeNode>this.node);
    }

    onNodeKeydown(event: KeyboardEvent) {
        if (event.which === 13) {
            this.tree.onNodeClick(event, <TreeNode>this.node);
        }
    }

    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }

    onNodeRightClick(event: MouseEvent) {
        this.tree.onNodeRightClick(event, <TreeNode>this.node);
    }

    isSelected() {
        return this.tree.isSelected(<TreeNode>this.node);
    }

    onDropPoint(event: DragEvent, position: number) {
        event.preventDefault();
        let dragNode = this.tree.dragNode;
        let dragNodeIndex = this.tree.dragNodeIndex;
        let dragNodeScope = this.tree.dragNodeScope;
        let isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? position === 1 || dragNodeIndex !== <number>this.index - 1 : true;

        if (this.tree.allowDrop(<TreeNode>dragNode, <TreeNode>this.node, dragNodeScope) && isValidDropPointIndex) {
            let dropParams = { ...this.createDropPointEventMetadata(<number>position) };

            if (this.tree.validateDrop) {
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    index: this.index,
                    accept: () => {
                        this.processPointDrop(dropParams);
                    }
                });
            } else {
                this.processPointDrop(dropParams);
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    index: this.index
                });
            }
        }

        this.draghoverPrev = false;
        this.draghoverNext = false;
    }

    processPointDrop(event: any) {
        let newNodeList = event.dropNode.parent ? event.dropNode.parent.children : this.tree.value;
        event.dragNodeSubNodes.splice(event.dragNodeIndex, 1);
        let dropIndex = this.index;

        if (event.position < 0) {
            dropIndex = event.dragNodeSubNodes === newNodeList ? (event.dragNodeIndex > event.index ? event.index : event.index - 1) : event.index;
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

    createDropPointEventMetadata(position: number) {
        return {
            dragNode: this.tree.dragNode,
            dragNodeIndex: this.tree.dragNodeIndex,
            dragNodeSubNodes: this.tree.dragNodeSubNodes,
            dropNode: this.node,
            index: this.index,
            position: position
        };
    }

    onDropPointDragOver(event: any) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }

    onDropPointDragEnter(event: Event, position: number) {
        if (this.tree.allowDrop(<TreeNode>this.tree.dragNode, <TreeNode>this.node, this.tree.dragNodeScope)) {
            if (position < 0) this.draghoverPrev = true;
            else this.draghoverNext = true;
        }
    }

    onDropPointDragLeave(event: Event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }

    onDragStart(event: any) {
        if (this.tree.draggableNodes && (<TreeNode>this.node).draggable !== false) {
            event.dataTransfer.setData('text', 'data');

            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node?.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        } else {
            event.preventDefault();
        }
    }

    onDragStop(event: any) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node?.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    }

    onDropNodeDragOver(event: any) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    onDropNode(event: any) {
        if (this.tree.droppableNodes && this.node?.droppable !== false) {
            let dragNode = this.tree.dragNode;

            if (this.tree.allowDrop(<TreeNode>dragNode, <TreeNode>this.node, this.tree.dragNodeScope)) {
                let dropParams = { ...this.createDropNodeEventMetadata() };

                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
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
                        dragNode: dragNode,
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
            dragNodeIndex: this.tree.dragNodeIndex,
            dragNodeSubNodes: this.tree.dragNodeSubNodes,
            dropNode: this.node
        };
    }

    processNodeDrop(event: any) {
        let dragNodeIndex = event.dragNodeIndex;
        event.dragNodeSubNodes.splice(dragNodeIndex, 1);

        if (event.dropNode.children) event.dropNode.children.push(event.dragNode);
        else event.dropNode.children = [event.dragNode];

        this.tree.dragDropService.stopDrag({
            node: event.dragNode,
            subNodes: event.dropNode.parent ? event.dropNode.parent.children : this.tree.value,
            index: dragNodeIndex
        });
    }

    onDropNodeDragEnter(event: any) {
        if (this.tree.droppableNodes && this.node?.droppable !== false && this.tree.allowDrop(<TreeNode>this.tree.dragNode, <TreeNode>this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }

    onDropNodeDragLeave(event: any) {
        if (this.tree.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                this.draghoverNode = false;
            }
        }
    }

    onKeyDown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target).parentElement?.parentElement;

        if (nodeElement?.nodeName !== 'P-TREENODE' || (this.tree.contextMenu && this.tree.contextMenu.containerViewChild.nativeElement.style.display === 'block')) {
            return;
        }

        switch (event.which) {
            //down arrow
            case 40:
                const listElement = this.tree.droppableNodes ? nodeElement.children[1].children[1] : nodeElement.children[0].children[1];
                if (listElement && listElement.children.length > 0) {
                    this.focusNode(listElement.children[0]);
                } else {
                    const nextNodeElement = nodeElement.nextElementSibling;
                    if (nextNodeElement) {
                        this.focusNode(nextNodeElement);
                    } else {
                        let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);
                        if (nextSiblingAncestor) {
                            this.focusNode(nextSiblingAncestor);
                        }
                    }
                }
                event.preventDefault();
                break;

            //up arrow
            case 38:
                if (nodeElement.previousElementSibling) {
                    this.focusNode(this.findLastVisibleDescendant(nodeElement.previousElementSibling));
                } else {
                    let parentNodeElement = this.getParentNodeElement(nodeElement);
                    if (parentNodeElement) {
                        this.focusNode(parentNodeElement);
                    }
                }

                event.preventDefault();
                break;

            //right arrow
            case 39:
                if (!this.node?.expanded && !this.tree.isNodeLeaf(<TreeNode>this.node)) {
                    this.expand(event);
                }
                event.preventDefault();
                break;

            //left arrow
            case 37:
                if (this.node?.expanded) {
                    this.collapse(event);
                } else {
                    let parentNodeElement = this.getParentNodeElement(nodeElement);
                    if (parentNodeElement) {
                        this.focusNode(parentNodeElement);
                    }
                }

                event.preventDefault();
                break;

            //enter
            case 13:
                this.tree.onNodeClick(event, <TreeNode>this.node);
                event.preventDefault();
                break;

            default:
                //no op
                break;
        }
    }

    findNextSiblingOfAncestor(nodeElement: any): any {
        let parentNodeElement = this.getParentNodeElement(nodeElement);
        if (parentNodeElement) {
            if (parentNodeElement.nextElementSibling) return parentNodeElement.nextElementSibling;
            else return this.findNextSiblingOfAncestor(parentNodeElement);
        } else {
            return null;
        }
    }

    findLastVisibleDescendant(nodeElement: any): any {
        const listElement = <HTMLElement>Array.from(nodeElement.children).find((el) => DomHandler.hasClass(el, 'p-treenode'));
        const childrenListElement = listElement.children[1];
        if (childrenListElement && childrenListElement.children.length > 0) {
            const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];

            return this.findLastVisibleDescendant(lastChildElement);
        } else {
            return nodeElement;
        }
    }

    getParentNodeElement(nodeElement: HTMLElement) {
        const parentNodeElement = nodeElement.parentElement?.parentElement?.parentElement;

        return parentNodeElement?.tagName === 'P-TREENODE' ? parentNodeElement : null;
    }

    focusNode(element: any) {
        if (this.tree.droppableNodes) (element.children[1].children[0] as HTMLElement).focus();
        else (element.children[0].children[0] as HTMLElement).focus();
    }

    focusVirtualNode() {
        this.timeout = setTimeout(() => {
            let node = DomHandler.findSingle(document.body, `[data-id="${<TreeNode>this.node?.key ?? <TreeNode>this.node?.data}"]`);
            DomHandler.focus(node);
        }, 1);
    }
}

@Component({
    selector: 'p-tree',
    template: `
        <div
            [ngClass]="{ 'p-tree p-component': true, 'p-tree-selectable': selectionMode, 'p-treenode-dragover': dragHover, 'p-tree-loading': loading, 'p-tree-flex-scrollable': scrollHeight === 'flex' }"
            [ngStyle]="style"
            [class]="styleClass"
            *ngIf="!horizontal"
            (drop)="onDrop($event)"
            (dragover)="onDragOver($event)"
            (dragenter)="onDragEnter()"
            (dragleave)="onDragLeave($event)"
        >
            <div class="p-tree-loading-overlay p-component-overlay" *ngIf="loading">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div *ngIf="filter" class="p-tree-filter-container">
                <input #filter type="text" autocomplete="off" class="p-tree-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder" (keydown.enter)="$event.preventDefault()" (input)="_filter($event.target.value)" />
                <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-tree-filter-icon'" />
                <span *ngIf="filterIconTemplate" class="p-tree-filter-icon">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </div>

            <p-scroller
                #scroller
                *ngIf="virtualScroll"
                [items]="serializedValue"
                [tabindex]="-1"
                styleClass="p-tree-wrapper"
                [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                [itemSize]="virtualScrollItemSize || _virtualNodeHeight"
                [lazy]="lazy"
                (onScroll)="onScroll.emit($event)"
                (onScrollIndexChange)="onScrollIndexChange.emit($event)"
                (onLazyLoad)="onLazyLoad.emit($event)"
                [options]="virtualScrollOptions"
            >
                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                    <ul *ngIf="items" class="p-tree-container" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                        <p-treeNode
                            #treeNode
                            *ngFor="let rowNode of items; let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                            [level]="rowNode.level"
                            [rowNode]="rowNode"
                            [node]="rowNode.node"
                            [firstChild]="firstChild"
                            [lastChild]="lastChild"
                            [index]="getIndex(scrollerOptions, index)"
                            [itemSize]="scrollerOptions.itemSize"
                            [indentation]="indentation"
                        ></p-treeNode>
                    </ul>
                </ng-template>
                <ng-container *ngIf="loaderTemplate">
                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                    </ng-template>
                </ng-container>
            </p-scroller>
            <ng-container *ngIf="!virtualScroll">
                <div #wrapper class="p-tree-wrapper" [style.max-height]="scrollHeight">
                    <ul class="p-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                        <p-treeNode
                            *ngFor="let node of getRootNode(); let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                            [node]="node"
                            [firstChild]="firstChild"
                            [lastChild]="lastChild"
                            [index]="index"
                            [level]="0"
                        ></p-treeNode>
                    </ul>
                </div>
            </ng-container>

            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
        <div [ngClass]="{ 'p-tree p-tree-horizontal p-component': true, 'p-tree-selectable': selectionMode }" [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div class="p-tree-loading-mask p-component-overlay" *ngIf="loading">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <table *ngIf="value && value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tree.css'],
    host: {
        class: 'p-element'
    }
})
export class Tree implements OnInit, AfterContentInit, OnChanges, OnDestroy, BlockableUI {
    /**
     * An array of treenodes.
     * @group Props
     */
    @Input() value: TreeNode[] | undefined;
    /**
     * Defines the selection mode, valid values "single", "multiple", and "checkbox".
     * @group Props
     */
    @Input() selectionMode: 'single' | 'multiple' | 'checkbox' | null | undefined;
    /**
     * A single treenode instance or an array to refer to the selections.
     * @group Props
     */
    @Input() selection: any;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Context menu instance.
     * @group Props
     */
    @Input() contextMenu: any;
    /**
     * Defines the orientation of the tree, valid values are 'vertical' and 'horizontal'.
     * @group Props
     */
    @Input() layout: string = 'vertical';
    /**
     * Scope of the draggable nodes to match a droppableScope.
     * @group Props
     */
    @Input() draggableScope: any;
    /**
     * Scope of the droppable nodes to match a draggableScope.
     * @group Props
     */
    @Input() droppableScope: any;
    /**
     * Whether the nodes are draggable.
     * @group Props
     */
    @Input() draggableNodes: boolean | undefined;
    /**
     * Whether the nodes are droppable.
     * @group Props
     */
    @Input() droppableNodes: boolean | undefined;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    @Input() metaKeySelection: boolean = true;
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @group Props
     */
    @Input() propagateSelectionUp: boolean = true;
    /**
     * Whether checkbox selections propagate to descendant nodes.
     * @group Props
     */
    @Input() propagateSelectionDown: boolean = true;
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    @Input() loading: boolean | undefined;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    @Input() loadingIcon: string | undefined;
    /**
     * Text to display when there is no data.
     * @group Props
     */
    @Input() emptyMessage: string = '';
    /**
     * Used to define a string that labels the tree.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Defines a string that labels the toggler icon for accessibility.
     * @group Props
     */
    @Input() togglerAriaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * When enabled, drop can be accepted or rejected based on condition defined at onNodeDrop.
     * @group Props
     */
    @Input() validateDrop: boolean | undefined;
    /**
     * When specified, displays an input field to filter the items.
     * @group Props
     */
    @Input() filter: boolean | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    @Input() filterBy: string = 'label';
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    @Input() filterMode: string = 'lenient';
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    @Input() filterPlaceholder: string | undefined;
    /**
     * No description available.
     * @group Props
     */
    @Input() filteredNodes: TreeNode[] | undefined | null;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    @Input() filterLocale: string | undefined;
    /**
     * Height of the scrollable viewport.
     * @group Props
     */
    @Input() scrollHeight: string | undefined;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    @Input() lazy: boolean = false;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    @Input() virtualScroll: boolean | undefined;
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    @Input() virtualScrollItemSize: number | undefined;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    @Input() virtualScrollOptions: ScrollerOptions | undefined;
    /**
     * Indentation factor for spacing of the nested node when virtual scrolling is enabled.
     * @group Props
     */
    @Input() indentation: number = 1.5;
    /**
     * Custom templates of the component.
     * @group Props
     */
    @Input() _templateMap: any;
    /**
     * Function to optimize the node list rendering, default algorithm checks for object identity.
     * @group Props
     */
    @Input() trackBy: Function = (index: number, item: any) => item;
    /**
     * @deprecated use virtualScrollItemSize property instead.
     * Height of the node.
     * @group Props
     */
    _virtualNodeHeight: number | undefined;
    @Input() get virtualNodeHeight(): number | undefined {
        return this._virtualNodeHeight;
    }
    set virtualNodeHeight(val: number | undefined) {
        this._virtualNodeHeight = val;
        console.warn('The virtualNodeHeight property is deprecated, use virtualScrollItemSize property instead.');
    }
    /**
     * Callback to invoke on selection change.
     * @param {(TreeNode | TreeNode[] | null)} event - custom selection change event.
     * @group Emits
     */
    @Output() selectionChange: EventEmitter<TreeNode[] | TreeNode | null> = new EventEmitter<TreeNode[] | TreeNode | null>();
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeNodeSelectEvent} event - node select event.
     * @group Emits
     */
    @Output() onNodeSelect: EventEmitter<TreeNodeSelectEvent> = new EventEmitter<TreeNodeSelectEvent>();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeNodeUnSelectEvent} event - node unselect event.
     * @group Emits
     */
    @Output() onNodeUnselect: EventEmitter<TreeNodeUnSelectEvent> = new EventEmitter<TreeNodeUnSelectEvent>();
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeNodeExpandEvent} event - node expand event.
     * @group Emits
     */
    @Output() onNodeExpand: EventEmitter<TreeNodeExpandEvent> = new EventEmitter<TreeNodeExpandEvent>();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeNodeCollapseEvent} event - node collapse event.
     * @group Emits
     */
    @Output() onNodeCollapse: EventEmitter<TreeNodeCollapseEvent> = new EventEmitter<TreeNodeCollapseEvent>();
    /**
     * Callback to invoke when a node is selected with right click.
     * @param {onNodeContextMenuSelect} event - node context menu select event.
     * @group Emits
     */
    @Output() onNodeContextMenuSelect: EventEmitter<TreeNodeContextMenuSelectEvent> = new EventEmitter<TreeNodeContextMenuSelectEvent>();
    /**
     * Callback to invoke when a node is dropped.
     * @param {TreeNodeDropEvent} event - node drop event.
     * @group Emits
     */
    @Output() onNodeDrop: EventEmitter<TreeNodeDropEvent> = new EventEmitter<TreeNodeDropEvent>();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {TreeLazyLoadEvent} event - custom lazy load event.
     * @group Emits
     */
    @Output() onLazyLoad: EventEmitter<TreeLazyLoadEvent> = new EventEmitter<TreeLazyLoadEvent>();
    /**
     * Callback to invoke in virtual scroll mode when scroll position changes.
     * @param {TreeScrollEvent} event - custom scroll event.
     * @group Emits
     */
    @Output() onScroll: EventEmitter<TreeScrollEvent> = new EventEmitter<TreeScrollEvent>();
    /**
     * Callback to invoke in virtual scroll mode when scroll position and item's range in view changes.
     * @param {TreeScrollIndexChangeEvent} event - scroll index change event.
     * @group Emits
     */
    @Output() onScrollIndexChange: EventEmitter<TreeScrollIndexChangeEvent> = new EventEmitter<TreeScrollIndexChangeEvent>();
    /**
     * Callback to invoke when data is filtered.
     * @param {TreeFilterEvent} event - custom filter event.
     * @group Emits
     */
    @Output() onFilter: EventEmitter<TreeFilterEvent> = new EventEmitter<TreeFilterEvent>();

    @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<any>>;

    @ViewChild('filter') filterViewChild: Nullable<ElementRef>;

    @ViewChild('scroller') scroller: Nullable<Scroller>;

    @ViewChild('wrapper') wrapperViewChild: Nullable<ElementRef>;

    serializedValue: Nullable<TreeNode[]>;

    headerTemplate: Nullable<TemplateRef<any>>;

    footerTemplate: Nullable<TemplateRef<any>>;

    loaderTemplate: Nullable<TemplateRef<any>>;

    emptyMessageTemplate: Nullable<TemplateRef<any>>;

    togglerIconTemplate: Nullable<TemplateRef<any>>;

    checkboxIconTemplate: Nullable<TemplateRef<any>>;

    loadingIconTemplate: Nullable<TemplateRef<any>>;

    filterIconTemplate: Nullable<TemplateRef<any>>;

    public nodeTouched: boolean | undefined | null;

    public dragNodeTree: Tree | undefined | null;

    public dragNode: TreeNode | undefined | null;

    public dragNodeSubNodes: TreeNode[] | undefined | null;

    public dragNodeIndex: number | undefined | null;

    public dragNodeScope: any;

    public dragHover: boolean | undefined | null;

    public dragStartSubscription: Subscription | undefined | null;

    public dragStopSubscription: Subscription | undefined | null;

    constructor(public el: ElementRef, @Optional() public dragDropService: TreeDragDropService, public config: PrimeNGConfig, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe((event) => {
                this.dragNodeTree = event.tree;
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
                this.dragNodeScope = event.scope;
            });

            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe((event) => {
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

    get horizontal(): boolean {
        return this.layout == 'horizontal';
    }

    get emptyMessageLabel(): string {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }

    ngAfterContentInit() {
        if ((this.templates as QueryList<PrimeTemplate>).length) {
            this._templateMap = {};
        }

        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'empty':
                    this.emptyMessageTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'loader':
                    this.loaderTemplate = item.template;
                    break;

                case 'togglericon':
                    this.togglerIconTemplate = item.template;
                    break;

                case 'checkboxicon':
                    this.checkboxIconTemplate = item.template;
                    break;

                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;

                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;

                default:
                    this._templateMap[item.name] = item.template;
                    break;
            }
        });
    }

    updateSerializedValue() {
        this.serializedValue = [];
        this.serializeNodes(null, this.getRootNode(), 0, true);
    }

    serializeNodes(parent: TreeNode | null, nodes: TreeNode[] | any, level: number, visible: boolean) {
        if (nodes && nodes.length) {
            for (let node of nodes) {
                node.parent = parent;
                const rowNode = {
                    node: node,
                    parent: parent,
                    level: level,
                    visible: visible && (parent ? parent.expanded : true)
                };
                (this.serializedValue as TreeNode[]).push(<TreeNode>rowNode);

                if (rowNode.visible && node.expanded) {
                    this.serializeNodes(node, node.children, level + 1, rowNode.visible);
                }
            }
        }
    }

    onNodeClick(event: Event, node: TreeNode) {
        let eventTarget = <Element>event.target;
        if (DomHandler.hasClass(eventTarget, 'p-tree-toggler') || DomHandler.hasClass(eventTarget, 'p-tree-toggler-icon')) {
            return;
        } else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }

            if (this.hasFilteredNodes()) {
                node = this.getNodeWithKey(<string>node.key, <TreeNode[]>this.value) as TreeNode;

                if (!node) {
                    return;
                }
            }

            let index = this.findIndexInSelection(node);
            let selected = index >= 0;

            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown) this.propagateDown(node, false);
                    else this.selection = this.selection.filter((val: TreeNode, i: number) => i != index);

                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }

                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                } else {
                    if (this.propagateSelectionDown) this.propagateDown(node, true);
                    else this.selection = [...(this.selection || []), node];

                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }

                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            } else {
                let metaSelection = this.nodeTouched ? false : this.metaKeySelection;

                if (metaSelection) {
                    let metaKey = (<KeyboardEvent>event).metaKey || (<KeyboardEvent>event).ctrlKey;

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        } else {
                            this.selection = this.selection.filter((val: TreeNode, i: number) => i != index);
                            this.selectionChange.emit(this.selection);
                        }

                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    } else {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(<TreeNode>node);
                        } else if (this.isMultipleSelectionMode()) {
                            this.selection = !metaKey ? [] : this.selection || [];
                            this.selection = [...this.selection, node];
                            this.selectionChange.emit(this.selection);
                        }

                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                } else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        } else {
                            this.selection = node;
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    } else {
                        if (selected) {
                            this.selection = this.selection.filter((val: TreeNode, i: number) => i != index);
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        } else {
                            this.selection = [...(this.selection || []), node];
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
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
            let eventTarget = <Element>event.target;

            if (eventTarget.className && eventTarget.className.indexOf('p-tree-toggler') === 0) {
                return;
            } else {
                let index = this.findIndexInSelection(node);
                let selected = index >= 0;

                if (!selected) {
                    if (this.isSingleSelectionMode()) this.selectionChange.emit(node);
                    else this.selectionChange.emit([node]);
                }

                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
            }
        }
    }

    findIndexInSelection(node: TreeNode) {
        let index: number = -1;

        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                let areNodesEqual = (this.selection.key && this.selection.key === node.key) || this.selection == node;
                index = areNodesEqual ? 0 : -1;
            } else {
                for (let i = 0; i < this.selection.length; i++) {
                    let selectedNode = this.selection[i];
                    let areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }

    syncNodeOption(node: TreeNode, parentNodes: TreeNode[], option: any, value?: any) {
        // to synchronize the node option between the filtered nodes and the original nodes(this.value)
        const _node = this.hasFilteredNodes() ? this.getNodeWithKey(<string>node.key, parentNodes) : null;
        if (_node) {
            (<any>_node)[option] = value || (<any>node)[option];
        }
    }

    hasFilteredNodes() {
        return this.filter && this.filteredNodes && this.filteredNodes.length;
    }

    getNodeWithKey(key: string, nodes: TreeNode[]): TreeNode | undefined {
        for (let node of nodes) {
            if (node.key === key) {
                return node;
            }

            if (node.children) {
                let matchedNode = this.getNodeWithKey(key, node.children);
                if (matchedNode) {
                    return matchedNode;
                }
            }
        }
    }

    propagateUp(node: TreeNode, select: boolean) {
        if (node.children && node.children.length) {
            let selectedCount: number = 0;
            let childPartialSelected: boolean = false;
            for (let child of node.children) {
                if (this.isSelected(child)) {
                    selectedCount++;
                } else if (child.partialSelected) {
                    childPartialSelected = true;
                }
            }

            if (select && selectedCount == node.children.length) {
                this.selection = [...(this.selection || []), node];
                node.partialSelected = false;
            } else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this.selection = this.selection.filter((val: TreeNode, i: number) => i != index);
                    }
                }

                if (childPartialSelected || (selectedCount > 0 && selectedCount != node.children.length)) node.partialSelected = true;
                else node.partialSelected = false;
            }

            this.syncNodeOption(node, <TreeNode[]>this.filteredNodes, 'partialSelected');
        }

        let parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    }

    propagateDown(node: TreeNode, select: boolean) {
        let index = this.findIndexInSelection(node);

        if (select && index == -1) {
            this.selection = [...(this.selection || []), node];
        } else if (!select && index > -1) {
            this.selection = this.selection.filter((val: TreeNode, i: number) => i != index);
        }

        node.partialSelected = false;

        this.syncNodeOption(node, <TreeNode[]>this.filteredNodes, 'partialSelected');

        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }

    isSelected(node: TreeNode) {
        return this.findIndexInSelection(node) != -1;
    }

    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'multiple';
    }

    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode == 'checkbox';
    }

    isNodeLeaf(node: TreeNode): boolean {
        return node.leaf == false ? false : !(node.children && node.children.length);
    }

    getRootNode() {
        return this.filteredNodes ? this.filteredNodes : this.value;
    }

    getTemplateForNode(node: TreeNode): TemplateRef<any> | null {
        if (this._templateMap) return node.type ? this._templateMap[node.type] : this._templateMap['default'];
        else return null;
    }

    onDragOver(event: DragEvent) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            (<any>event).dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    }

    onDrop(event: DragEvent) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            let dragNode = this.dragNode as TreeNode;

            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                let dragNodeIndex = <number>this.dragNodeIndex;
                this.value = this.value || [];

                if (this.validateDrop) {
                    this.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: null,
                        index: dragNodeIndex,
                        accept: () => {
                            this.processTreeDrop(dragNode, dragNodeIndex);
                        }
                    });
                } else {
                    this.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: null,
                        index: dragNodeIndex
                    });

                    this.processTreeDrop(dragNode, dragNodeIndex);
                }
            }
        }
    }

    processTreeDrop(dragNode: TreeNode, dragNodeIndex: number) {
        (<TreeNode[]>this.dragNodeSubNodes).splice(dragNodeIndex, 1);
        (this.value as TreeNode[]).push(dragNode);
        this.dragDropService.stopDrag({
            node: dragNode
        });
    }

    onDragEnter() {
        if (this.droppableNodes && this.allowDrop(<TreeNode>this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }

    onDragLeave(event: DragEvent) {
        if (this.droppableNodes) {
            let rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                this.dragHover = false;
            }
        }
    }

    allowDrop(dragNode: TreeNode, dropNode: TreeNode | null, dragNodeScope: any): boolean {
        if (!dragNode) {
            //prevent random html elements to be dragged
            return false;
        } else if (this.isValidDragScope(dragNodeScope)) {
            let allow: boolean = true;
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
        let dropScope = this.droppableScope;

        if (dropScope) {
            if (typeof dropScope === 'string') {
                if (typeof dragScope === 'string') return dropScope === dragScope;
                else if (Array.isArray(dragScope)) return (<Array<any>>dragScope).indexOf(dropScope) != -1;
            } else if (Array.isArray(dropScope)) {
                if (typeof dragScope === 'string') {
                    return (<Array<any>>dropScope).indexOf(dragScope) != -1;
                } else if (Array.isArray(dragScope)) {
                    for (let s of dropScope) {
                        for (let ds of dragScope) {
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

    public _filter(value: string) {
        let filterValue = value;
        if (filterValue === '') {
            this.filteredNodes = null;
        } else {
            this.filteredNodes = [];
            const searchFields: string[] = this.filterBy.split(',');
            const filterText = ObjectUtils.removeAccents(filterValue).toLocaleLowerCase(this.filterLocale);
            const isStrictMode = this.filterMode === 'strict';
            for (let node of <TreeNode[]>this.value) {
                let copyNode = { ...node };
                let paramsWithoutNode = { searchFields, filterText, isStrictMode };
                if (
                    (isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                    (!isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))
                ) {
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

    public resetFilter() {
        this.filteredNodes = null;

        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
    }

    public scrollToVirtualIndex(index: number) {
        this.virtualScroll && this.scroller?.scrollToIndex(index);
    }

    public scrollTo(options: any) {
        if (this.virtualScroll) {
            this.scroller?.scrollTo(options);
        } else if (this.wrapperViewChild && this.wrapperViewChild.nativeElement) {
            if (this.wrapperViewChild.nativeElement.scrollTo) {
                this.wrapperViewChild.nativeElement.scrollTo(options);
            } else {
                this.wrapperViewChild.nativeElement.scrollLeft = options.left;
                this.wrapperViewChild.nativeElement.scrollTop = options.top;
            }
        }
    }

    findFilteredNodes(node: TreeNode, paramsWithoutNode: any) {
        if (node) {
            let matched = false;
            if (node.children) {
                let childNodes = [...node.children];
                node.children = [];
                for (let childNode of childNodes) {
                    let copyChildNode = { ...childNode };
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

    isFilterMatched(node: TreeNode, params: any) {
        let { searchFields, filterText, isStrictMode } = params;
        let matched = false;
        for (let field of searchFields) {
            let fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(node, field))).toLocaleLowerCase(this.filterLocale);
            if (fieldValue.indexOf(filterText) > -1) {
                matched = true;
            }
        }

        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, { searchFields, filterText, isStrictMode }) || matched;
        }

        return matched;
    }

    getIndex(options: any, index: number) {
        const getItemOptions = options['getItemOptions'];
        return getItemOptions ? getItemOptions(index).index : index;
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
    imports: [CommonModule, SharedModule, RippleModule, ScrollerModule, CheckIcon, ChevronDownIcon, ChevronRightIcon, MinusIcon, SearchIcon, SpinnerIcon],
    exports: [Tree, SharedModule, ScrollerModule],
    declarations: [Tree, UITreeNode]
})
export class TreeModule {}
