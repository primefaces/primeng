import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { find, findSingle, focus, getOuterHeight, getOuterWidth } from '@primeuix/utils';
import { TreeNode } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Checkbox } from 'primeng/checkbox';
import { ChevronDown as ChevronDownIcon } from '@primeicons/angular/chevron-down';
import { ChevronRight as ChevronRightIcon } from '@primeicons/angular/chevron-right';
import { Spinner as SpinnerIcon } from '@primeicons/angular/spinner';
import { Ripple } from 'primeng/ripple';
import { TreeLoadingMode, TreePassThrough } from 'primeng/types/tree';
import type { Tree } from './tree';
import { TREE_INSTANCE, TREENODE_INSTANCE } from './tree-token';
import { TreeStyle } from './style/treestyle';

@Component({
    selector: 'p-treenode',
    standalone: true,
    imports: [NgTemplateOutlet, Ripple, Checkbox, FormsModule, ChevronRightIcon, ChevronDownIcon, SpinnerIcon, Bind],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (node()) {
            <li
                [class]="cn(cx('node'), node()!.styleClass)"
                [style.height.px]="itemSize()"
                [style]="node()!.style"
                [attr.aria-label]="node()!.label"
                [attr.aria-checked]="checked"
                [attr.aria-setsize]="ariaSetSize"
                [attr.aria-selected]="selected"
                [attr.aria-expanded]="ariaExpanded"
                [attr.aria-posinset]="ariaPosInSet()"
                [attr.aria-level]="ariaLevel()"
                [attr.tabindex]="nodeTabindex()"
                [attr.data-id]="node()!.key"
                role="treeitem"
                (keydown)="onKeyDown($event)"
                [pBind]="getPTOptions('node')"
            >
                @if (isPrevDropPointActive()) {
                    <div [class]="cx('dropPoint')" [attr.aria-hidden]="true" [pBind]="getPTOptions('dropPoint')"></div>
                }
                <div
                    [class]="cx('nodeContent')"
                    [style.paddingLeft]="nodeContentPaddingLeft()"
                    (click)="onNodeClick($event)"
                    (contextmenu)="onNodeRightClick($event)"
                    (dblclick)="onNodeDblClick($event)"
                    (touchend)="onNodeTouchEnd()"
                    (drop)="onNodeDrop($event)"
                    (dragstart)="onNodeDragStart($event)"
                    (dragover)="onNodeDragOver($event)"
                    (dragleave)="onNodeDragLeave($event)"
                    (dragend)="onNodeDragEnd($event)"
                    [draggable]="tree.draggableNodes()"
                    [pBind]="getPTOptions('nodeContent')"
                >
                    <button type="button" [class]="cx('nodeToggleButton')" (click)="toggle($event)" pRipple tabindex="-1" [pBind]="getPTOptions('nodeToggleButton')">
                        @if (!tree.togglerIconTemplate()) {
                            @if (!node()!.loading) {
                                @if (!node()!.expanded) {
                                    <svg data-p-icon="chevron-right" [class]="cx('nodeToggleIcon')" [pBind]="getPTOptions('nodeToggleIcon')" />
                                }
                                @if (node()!.expanded) {
                                    <svg data-p-icon="chevron-down" [class]="cx('nodeToggleIcon')" [pBind]="getPTOptions('nodeToggleIcon')" />
                                }
                            }
                            @if (showLoadingSpinner) {
                                <svg data-p-icon="spinner" [class]="cn(cx('nodeToggleIcon'), 'animate-spin')" [pBind]="getPTOptions('nodeToggleIcon')" />
                            }
                        }
                        @if (tree.togglerIconTemplate()) {
                            <span [class]="cx('nodeToggleIcon')" [pBind]="getPTOptions('nodeToggleIcon')">
                                <ng-template *ngTemplateOutlet="tree.togglerIconTemplate()!; context: togglerIconContext"></ng-template>
                            </span>
                        }
                    </button>

                    @if (tree.selectionMode() == 'checkbox') {
                        <p-checkbox
                            [ngModel]="isSelected()"
                            [class]="cx('nodeCheckbox')"
                            [binary]="true"
                            [indeterminate]="node()!.partialSelected"
                            [disabled]="node()!.selectable === false"
                            [variant]="checkboxVariant()"
                            [attr.data-p-partialchecked]="node()!.partialSelected"
                            [tabindex]="-1"
                            (click)="$event.preventDefault()"
                            [pt]="getPTOptions('pcNodeCheckbox')"
                            [unstyled]="unstyled()"
                        >
                            @if (tree.checkboxIconTemplate()) {
                                <ng-template #icon>
                                    <ng-template *ngTemplateOutlet="tree.checkboxIconTemplate()!; context: checkboxIconContext"></ng-template>
                                </ng-template>
                            }
                        </p-checkbox>
                    }

                    @if (hasNodeIcon) {
                        <span [class]="getIcon()" [pBind]="getPTOptions('nodeIcon')"></span>
                    }
                    <span [class]="cx('nodeLabel')" [pBind]="getPTOptions('nodeLabel')">
                        @if (!tree.getTemplateForNode(node()!)) {
                            <span>{{ node()!.label }}</span>
                        }
                        @if (tree.getTemplateForNode(node()!)) {
                            <span>
                                <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node()!)!; context: { $implicit: node() }"></ng-container>
                            </span>
                        }
                    </span>
                </div>
                @if (isNextDropPointActive()) {
                    <div [class]="cx('dropPoint', { next: true })" [attr.aria-hidden]="true" [pBind]="getPTOptions('dropPoint')"></div>
                }
                @if (showChildren) {
                    <ul [class]="cx('nodeChildren')" role="group" [pBind]="ptm('nodeChildren')">
                        @for (childNode of node()!.children; track tree.trackBy()($index, childNode); let firstChild = $first; let lastChild = $last; let idx = $index) {
                            <p-treenode
                                [node]="childNode"
                                [parentNode]="node()"
                                [firstChild]="firstChild"
                                [lastChild]="lastChild"
                                [index]="idx"
                                [itemSize]="itemSize()"
                                [level]="level()! + 1"
                                [loadingMode]="loadingMode()"
                                [pt]="pt"
                                [unstyled]="unstyled()"
                            />
                        }
                    </ul>
                }
            </li>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [TreeStyle, { provide: TREENODE_INSTANCE, useExisting: UITreeNode }, { provide: PARENT_INSTANCE, useExisting: UITreeNode }]
})
export class UITreeNode extends BaseComponent<TreePassThrough> {
    $pcTreeNode: UITreeNode | undefined = inject(TREENODE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    static ICON_CLASS: string = 'p-tree-node-icon ';

    rowNode = input<any>();

    node = input<TreeNode<any> | undefined>();

    parentNode = input<TreeNode<any> | undefined>();

    root = input(false, { transform: booleanAttribute });

    index = input<number | undefined>();

    firstChild = input(false, { transform: booleanAttribute });

    lastChild = input(false, { transform: booleanAttribute });

    level = input<number | undefined>();

    indentation = input<number | undefined>();

    itemSize = input<number | undefined>();

    loadingMode = input<TreeLoadingMode>();

    tree = inject<Tree>(TREE_INSTANCE);

    timeout: any;

    isPrevDropPointHovered = signal<boolean>(false);

    isNextDropPointHovered = signal<boolean>(false);

    isNodeDropHovered = signal<boolean>(false);

    isPrevDropPointActive = computed(() => this.isPrevDropPointHovered() && this.isDroppable());

    isNextDropPointActive = computed(() => this.isNextDropPointHovered() && this.isDroppable());

    isNodeDropActive = computed(() => this.isNodeDropHovered() && this.isNodeDroppable());

    dropPosition = computed(() => (this.isPrevDropPointActive() ? -1 : this.isNextDropPointActive() ? 1 : 0));

    get ariaSetSize() {
        return this.node()?.children?.length ?? 0;
    }

    get ariaExpanded() {
        return this.node()?.expanded;
    }

    ariaPosInSet = computed(() => (this.index() ?? 0) + 1);

    ariaLevel = computed(() => (this.level() ?? 0) + 1);

    nodeTabindex = computed(() => (this.index() === 0 ? 0 : -1));

    nodeContentPaddingLeft = computed(() => this.level()! * this.indentation()! + 'rem');

    get hasNodeIcon() {
        return !!(this.node()?.icon || this.node()?.expandedIcon || this.node()?.collapsedIcon);
    }

    get showChildren() {
        return !this.tree.virtualScroll() && !!this.node()?.children && !!this.node()?.expanded;
    }

    get showLoadingSpinner() {
        return this.loadingMode() === 'icon' && !!this.node()?.loading;
    }

    checkboxVariant = computed(() => this.tree?.config.inputVariant() || 'outlined');

    get togglerIconContext() {
        return {
            $implicit: this.node()?.expanded,
            loading: this.node()?.loading
        };
    }

    get checkboxIconContext() {
        return {
            $implicit: this.isSelected(),
            partialSelected: this.node()?.partialSelected,
            class: this.cx('nodeCheckbox')
        };
    }

    _componentStyle = inject(TreeStyle);

    /**
     * Computed signal that reactively tracks selection state.
     */
    private _selected = computed(() => {
        // Reading selection() makes this computed reactive to selection changes
        this.tree.selection();
        return this.tree.isSelected(<TreeNode>this.node());
    });

    /**
     * Computed signal that reactively tracks context menu selection state.
     */
    private _contextMenuSelected = computed(() => {
        const selection = this.tree.contextMenuSelection();
        const node = this.node();
        if (!selection || !node) {
            return false;
        }
        return selection === node || (selection.key && selection.key === node.key);
    });

    get selected() {
        return this.tree.selectionMode() === 'single' || this.tree.selectionMode() === 'multiple' ? this._selected() : undefined;
    }

    get checked() {
        return this.tree.selectionMode() === 'checkbox' ? this._selected() : undefined;
    }

    get nodeClass() {
        return this.tree._componentStyle.classes.node({ instance: this });
    }

    get selectable() {
        return this.node()?.selectable === false ? false : this.tree?.selectionMode() != null;
    }

    get subNodes(): TreeNode[] | undefined {
        return this.node()?.parent ? this.node()!.parent!.children : this.tree.value();
    }

    getPTOptions(key: string) {
        return this.ptm(key, {
            context: {
                node: this.node(),
                index: this.index(),
                expanded: this.node()?.expanded,
                selected: this.selected,
                checked: this.checked,
                partialChecked: this.node()?.partialSelected,
                leaf: this.isLeaf()
            }
        });
    }

    onInit() {
        (<TreeNode>this.node()).parent = this.parentNode();
        const nativeElement = this.tree.el.nativeElement;
        const pDialogWrapper = nativeElement.closest('p-dialog');
        if (this.parentNode() && !pDialogWrapper) {
            this.setAllNodesTabIndexes();
            this.tree.syncNodeOption(<TreeNode>this.node(), <TreeNode<any>[]>this.tree.value(), 'parent', this.tree.getNodeWithKey(<string>this.parentNode()!.key, <TreeNode<any>[]>this.tree.value()));
        }
    }

    getIcon() {
        let icon: string | undefined;
        const node = this.node();

        if ((<TreeNode>node).icon) icon = (<TreeNode>node).icon as string;
        else icon = (<TreeNode>node).expanded && (<TreeNode>node).children && (<TreeNode>node).children?.length ? (<TreeNode>node).expandedIcon : (<TreeNode>node).collapsedIcon;

        return UITreeNode.ICON_CLASS + ' ' + icon + ' p-tree-node-icon';
    }

    isLeaf() {
        return this.tree.isNodeLeaf(<TreeNode>this.node());
    }

    isSelected() {
        return this._selected();
    }

    isContextMenuSelected() {
        return this._contextMenuSelected();
    }

    isSameNode(event) {
        return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('[role="treeitem"]')));
    }

    isDraggable() {
        return this.tree.draggableNodes();
    }

    isDroppable() {
        return this.tree.droppableNodes() && this.tree.allowDrop(<TreeNode>this.tree.dragNode, <TreeNode>this.node(), this.tree.dragNodeScope);
    }

    isNodeDroppable() {
        return (<TreeNode>this.node())?.droppable !== false && this.isDroppable();
    }

    isNodeDraggable() {
        return (<TreeNode>this.node())?.draggable !== false && this.isDraggable();
    }

    toggle(event: Event) {
        if ((<TreeNode>this.node()).expanded) this.collapse(event);
        else this.expand(event);

        event.stopPropagation();
    }

    expand(event: Event) {
        (<TreeNode>this.node()).expanded = true;
        if (this.tree.virtualScroll()) {
            this.tree.updateSerializedValue();
            this.focusVirtualNode();
        }
        this.tree.onNodeExpand.emit({ originalEvent: event, node: <TreeNode>this.node() });
    }

    collapse(event: Event) {
        (<TreeNode>this.node()).expanded = false;
        if (this.tree.virtualScroll()) {
            this.tree.updateSerializedValue();
        }
        this.tree.onNodeCollapse.emit({ originalEvent: event, node: <TreeNode>this.node() });
        this.focusVirtualNode();
    }

    onNodeClick(event: MouseEvent) {
        this.tree.onNodeClick(event, <TreeNode>this.node());
    }

    onNodeKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.tree.onNodeClick(event, <TreeNode>this.node());
        }
    }

    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }

    onNodeRightClick(event: MouseEvent) {
        this.tree.onNodeRightClick(event, <TreeNode>this.node());
    }

    onNodeDblClick(event: MouseEvent) {
        this.tree.onNodeDblClick(event, <TreeNode>this.node());
    }

    insertNodeOnDrop() {
        const { dragNode, dragNodeIndex, dragNodeSubNodes } = this.tree;

        if (!this.node() || dragNodeIndex == null || !dragNode || !dragNodeSubNodes) {
            return;
        }

        const position = this.dropPosition();
        const subNodes = this.subNodes || [];
        const index = this.index() || 0;
        const dropIndex = dragNodeSubNodes === subNodes ? (dragNodeIndex > index ? index : index - 1) : index;

        dragNodeSubNodes.splice(dragNodeIndex, 1);

        if (position < 0) {
            // insert before a Node
            subNodes.splice(dropIndex, 0, dragNode);
        } else if (position > 0) {
            // insert after a Node
            subNodes.splice(dropIndex + 1, 0, dragNode);
        } else {
            // insert as child of a Node
            this.node()!.children = this.node()!.children || [];
            this.node()!.children!.push(dragNode);
        }

        this.tree.dragDropService!.stopDrag({
            node: dragNode,
            subNodes,
            index: dragNodeIndex
        });
    }

    onNodeDrop(event: any) {
        event.preventDefault();
        event.stopPropagation();

        if (this.isDroppable()) {
            const { dragNode } = this.tree;
            const position = this.dropPosition();
            const isValidDrop = position !== 0 || (position === 0 && this.isNodeDroppable());

            if (isValidDrop) {
                if (this.tree.validateDrop()) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node(),
                        index: this.index(),
                        accept: () => {
                            this.insertNodeOnDrop();
                        }
                    });
                } else {
                    this.insertNodeOnDrop();
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node(),
                        index: this.index()
                    });
                }
            }
        }

        this.isPrevDropPointHovered.set(false);
        this.isNextDropPointHovered.set(false);
        this.isNodeDropHovered.set(false);
    }

    onNodeDragStart(event: any) {
        if (this.isNodeDraggable()) {
            event.dataTransfer.effectAllowed = 'all';
            event.dataTransfer?.setData('text', 'data');

            const target = event.currentTarget as HTMLElement;
            const dragEl = target.cloneNode(true) as HTMLElement;
            const toggler = <HTMLElement>dragEl.querySelector('[data-pc-section="nodetogglebutton"]');
            const checkbox = <HTMLElement>dragEl.querySelector('[data-pc-name="pcnodecheckbox"]');

            target.setAttribute('data-p-dragging', 'true');
            dragEl.style.width = getOuterWidth(target) + 'px';
            dragEl.style.height = getOuterHeight(target) + 'px';
            dragEl.setAttribute('data-pc-section', 'drag-image');
            toggler.style.visibility = 'hidden';
            checkbox?.remove();
            document.body.appendChild(dragEl);

            event.dataTransfer?.setDragImage(dragEl, 0, 0);

            setTimeout(() => document.body.removeChild(dragEl), 0);

            this.tree.dragDropService!.startDrag({
                tree: this,
                node: this.node(),
                subNodes: this.subNodes,
                index: this.index(),
                scope: this.tree.draggableScope()
            });
        } else {
            event.preventDefault();
        }
    }

    onNodeDragOver(event: any) {
        if (this.isDroppable()) {
            event.dataTransfer.dropEffect = 'copy';

            const nodeElement = event.currentTarget as HTMLElement;
            const rect = nodeElement.getBoundingClientRect();
            const y = event.clientY - parseInt(rect.top as any);

            this.isPrevDropPointHovered.set(false);
            this.isNextDropPointHovered.set(false);
            this.isNodeDropHovered.set(false);

            if (y < rect.height * 0.25) {
                this.isPrevDropPointHovered.set(true);
            } else if (y > rect.height * 0.75) {
                this.isNextDropPointHovered.set(true);
            } else if (this.isNodeDroppable()) {
                this.isNodeDropHovered.set(true);
            }
        } else {
            event.dataTransfer.dropEffect = 'none';
        }

        if (this.tree.droppableNodes()) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    onNodeDragLeave() {
        this.isPrevDropPointHovered.set(false);
        this.isNextDropPointHovered.set(false);
        this.isNodeDropHovered.set(false);
    }

    onNodeDragEnd(event: any) {
        event.currentTarget?.removeAttribute('data-p-dragging');

        this.tree.dragDropService!.stopDrag({
            node: this.node(),
            subNodes: this.subNodes,
            index: this.index()
        });
    }

    onKeyDown(event: KeyboardEvent) {
        if (!this.isSameNode(event) || (this.tree.contextMenu() && this.tree.contextMenu().containerViewChild?.nativeElement.style.display === 'block')) {
            return;
        }

        switch (event.code) {
            //down arrow
            case 'ArrowDown':
                this.onArrowDown(event);
                break;

            //up arrow
            case 'ArrowUp':
                this.onArrowUp(event);
                break;

            //right arrow
            case 'ArrowRight':
                this.onArrowRight(event);
                break;

            //left arrow
            case 'ArrowLeft':
                this.onArrowLeft(event);
                break;

            //enter
            case 'Enter':
            case 'Space':
            case 'NumpadEnter':
                this.onEnter(event);
                break;
            //tab
            case 'Tab':
                this.setAllNodesTabIndexes();
                break;

            default:
                //no op
                break;
        }
    }

    onArrowUp(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target).getAttribute('data-pc-section') === 'nodetogglebutton' ? (<HTMLDivElement>event.target).closest('[role="treeitem"]') : (<HTMLDivElement>event.target).parentElement;

        if (nodeElement?.previousElementSibling) {
            this.focusRowChange(nodeElement, nodeElement.previousElementSibling, this.findLastVisibleDescendant(nodeElement.previousElementSibling));
        } else {
            let parentNodeElement = this.getParentNodeElement(nodeElement!);

            if (parentNodeElement) {
                this.focusRowChange(nodeElement, parentNodeElement);
            }
        }

        event.preventDefault();
    }

    onArrowDown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target).getAttribute('data-pc-section') === 'nodetogglebutton' ? (<HTMLDivElement>event.target).closest('[role="treeitem"]') : <HTMLDivElement>event.target;
        const listElement = nodeElement?.children[1];

        if (listElement && listElement.children.length > 0) {
            this.focusRowChange(nodeElement, listElement.children[0]);
        } else {
            if (nodeElement?.parentElement?.nextElementSibling) {
                this.focusRowChange(nodeElement, nodeElement.parentElement.nextElementSibling);
            } else {
                let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement?.parentElement!);

                if (nextSiblingAncestor) {
                    this.focusRowChange(nodeElement, nextSiblingAncestor);
                }
            }
        }
        event.preventDefault();
    }

    onArrowRight(event: KeyboardEvent) {
        if (!this.node()?.expanded && !this.tree.isNodeLeaf(<TreeNode>this.node())) {
            this.expand(event);
            (<HTMLDivElement>event.currentTarget).tabIndex = -1;

            setTimeout(() => {
                this.onArrowDown(event);
            }, 1);
        }
        event.preventDefault();
    }

    onArrowLeft(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target).getAttribute('data-pc-section') === 'nodetogglebutton' ? (<HTMLDivElement>event.target).closest('[role="treeitem"]') : <HTMLDivElement>event.target;

        if (this.level() === 0 && !this.node()?.expanded) {
            return false;
        }

        if (this.node()?.expanded) {
            this.collapse(event);
            return;
        }

        let parentNodeElement = this.getParentNodeElement(nodeElement?.parentElement!);

        if (parentNodeElement) {
            this.focusRowChange(event.currentTarget, parentNodeElement);
        }

        event.preventDefault();
    }

    onEnter(event: KeyboardEvent) {
        this.tree.onNodeClick(event, <TreeNode>this.node());
        this.setTabIndexForSelectionMode(event, this.tree.nodeTouched);
        event.preventDefault();
    }

    setAllNodesTabIndexes() {
        const nodes = <any>find(this.tree.el.nativeElement, '[data-pc-section="node"]');

        const hasSelectedNode = [...nodes].some((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');

        [...nodes].forEach((node) => {
            node.tabIndex = -1;
        });

        if (hasSelectedNode) {
            const selectedNodes = [...nodes].filter((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');

            selectedNodes[0].tabIndex = 0;

            return;
        }

        if (nodes.length) {
            ([...nodes][0] as any).tabIndex = 0;
        }
    }

    setTabIndexForSelectionMode(event, nodeTouched) {
        if (this.tree.selectionMode() !== null) {
            const elements = [...find(this.tree.el.nativeElement, '[role="treeitem"]')];

            event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;

            if (elements.every((element: any) => element.tabIndex === -1)) {
                (elements[0] as any).tabIndex = 0;
            }
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
        const listElement = <HTMLElement>Array.from(nodeElement.children).find((el: any) => el.getAttribute('data-pc-section') === 'node');
        const childrenListElement = listElement?.children[1];
        if (childrenListElement && childrenListElement.children.length > 0) {
            const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];

            return this.findLastVisibleDescendant(lastChildElement);
        } else {
            return nodeElement;
        }
    }

    getParentNodeElement(nodeElement: HTMLElement | Element) {
        const parentNodeElement = nodeElement.parentElement?.parentElement?.parentElement;

        return parentNodeElement?.tagName === 'P-TREENODE' ? parentNodeElement : null;
    }

    focusNode(element: any) {
        (element.children[0] as HTMLElement).focus();
    }

    focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant?) {
        firstFocusableRow.tabIndex = '-1';
        currentFocusedRow.children[0].tabIndex = '0';

        this.focusNode(lastVisibleDescendant || currentFocusedRow);
    }

    focusVirtualNode() {
        this.timeout = setTimeout(() => {
            let node = <any>findSingle(this.tree?.contentViewChild()?.nativeElement, `[data-id="${<TreeNode>this.node()?.key ?? <TreeNode>this.node()?.data}"]`);
            focus(node);
        }, 1);
    }
}
