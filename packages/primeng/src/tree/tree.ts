import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    model,
    NgModule,
    numberAttribute,
    output,
    TemplateRef,
    untracked,
    viewChild,
    ViewEncapsulation,
    contentChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { removeAccents, resolveFieldData } from '@primeuix/utils';
import { BlockableUI, ScrollerOptions, TranslationKeys, TreeDragDropService, TreeNode } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { IconField } from 'primeng/iconfield';
import { SearchIcon, SpinnerIcon } from 'primeng/icons';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Scroller } from 'primeng/scroller';
import {
    TreeCheckboxIconTemplateContext,
    TreeFilterEvent,
    TreeFilterTemplateContext,
    TreeLazyLoadEvent,
    TreeLoaderTemplateContext,
    TreeNodeCollapseEvent,
    TreeNodeContextMenuSelectEvent,
    TreeNodeDoubleClickEvent,
    TreeNodeDropEvent,
    TreeNodeExpandEvent,
    TreeNodeSelectEvent,
    TreeNodeUnSelectEvent,
    TreePassThrough,
    TreeScrollEvent,
    TreeLoadingMode,
    TreeScrollIndexChangeEvent,
    TreeSelectionMode,
    TreeTogglerIconTemplateContext
} from 'primeng/types/tree';
import { UITreeNode } from './tree-node';
import { TREE_INSTANCE } from './tree-token';
import { TreeStyle } from './style/treestyle';

/**
 * Tree is used to display hierarchical data.
 * @group Components
 */
@Component({
    selector: 'p-tree',
    standalone: true,
    imports: [NgTemplateOutlet, Scroller, SearchIcon, SpinnerIcon, InputText, IconField, InputIcon, UITreeNode, AutoFocusModule, Bind],
    template: `
        @if (showLoadingMask()) {
            <div [class]="cx('mask')" [pBind]="ptm('mask')" animate.enter="p-overlay-mask-enter-active" animate.leave="p-overlay-mask-leave-active">
                @if (loadingIcon()) {
                    <i [class]="cn(cx('loadingIcon'), 'pi-spin' + loadingIcon())" [pBind]="ptm('loadingIcon')"></i>
                }
                @if (!loadingIcon()) {
                    @if (!loadingIconTemplate()) {
                        <svg data-p-icon="spinner" spin [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')" />
                    }
                    @if (loadingIconTemplate()) {
                        <span [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')">
                            <ng-template *ngTemplateOutlet="loadingIconTemplate()!"></ng-template>
                        </span>
                    }
                }
            </div>
        }
        <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
        @if (filterTemplate()) {
            <ng-container *ngTemplateOutlet="filterTemplate()!; context: { $implicit: filterOptions }"></ng-container>
        } @else {
            @if (filter()) {
                <p-iconfield [class]="cx('pcFilterContainer')" [pt]="ptm('pcFilterContainer')" [unstyled]="unstyled()">
                    <input
                        #filter
                        [pAutoFocus]="filterInputAutoFocus()"
                        pInputText
                        type="search"
                        autocomplete="off"
                        [class]="cx('pcFilterInput')"
                        [attr.placeholder]="filterPlaceholder()"
                        (keydown.enter)="$event.preventDefault()"
                        (input)="_filter($event.target?.value)"
                        [pt]="ptm('pcFilterInput')"
                        [unstyled]="unstyled()"
                    />
                    <p-inputicon [pt]="ptm('pcFilterIconContainer')" [unstyled]="unstyled()">
                        @if (!filterIconTemplate()) {
                            <svg data-p-icon="search" [class]="cx('filterIcon')" [pBind]="ptm('filterIcon')" />
                        }
                        @if (filterIconTemplate()) {
                            <span [class]="cx('filterIcon')" [pBind]="ptm('filterIcon')">
                                <ng-template *ngTemplateOutlet="filterIconTemplate()!"></ng-template>
                            </span>
                        }
                    </p-inputicon>
                </p-iconfield>
            }
        }

        @if (getRootNode()?.length) {
            @if (virtualScroll()) {
                <p-scroller
                    #scroller
                    [items]="serializedValue"
                    [tabindex]="-1"
                    [styleClass]="cx('wrapper')"
                    [style]="{ height: scrollerStyleHeight() }"
                    [scrollHeight]="scrollerScrollHeight()"
                    [itemSize]="virtualScrollItemSize()"
                    [lazy]="lazy()"
                    (onScroll)="onScroll.emit($event)"
                    (onScrollIndexChange)="onScrollIndexChange.emit($event)"
                    (onLazyLoad)="onLazyLoad.emit($event)"
                    [options]="virtualScrollOptions()"
                    [pt]="ptm('virtualScroller')"
                    hostName="tree"
                    [attr.data-p]="wrapperDataP"
                >
                    <ng-template #content let-items let-scrollerOptions="options">
                        @if (items) {
                            <ul
                                #content
                                [class]="cn(cx('rootChildren'), scrollerOptions.contentStyleClass)"
                                [style]="scrollerOptions.contentStyle"
                                role="tree"
                                [attr.aria-label]="ariaLabel()"
                                [attr.aria-labelledby]="ariaLabelledBy()"
                                [pBind]="ptm('rootChildren')"
                            >
                                @for (rowNode of items; track trackBy()($index, rowNode); let firstChild = $first; let lastChild = $last; let idx = $index) {
                                    <p-treenode
                                        #treeNode
                                        [level]="rowNode.level"
                                        [rowNode]="rowNode"
                                        [node]="rowNode.node"
                                        [parentNode]="rowNode.parent"
                                        [firstChild]="firstChild"
                                        [lastChild]="lastChild"
                                        [index]="getIndex(scrollerOptions, idx)"
                                        [itemSize]="scrollerOptions.itemSize"
                                        [indentation]="indentation()"
                                        [loadingMode]="loadingMode()"
                                        [pt]="pt"
                                        [unstyled]="unstyled()"
                                    />
                                }
                            </ul>
                        }
                    </ng-template>
                    @if (loaderTemplate()) {
                        <ng-template #loader let-scrollerOptions="options">
                            <ng-container *ngTemplateOutlet="loaderTemplate()!; context: { options: scrollerOptions }"></ng-container>
                        </ng-template>
                    }
                </p-scroller>
            }
            @if (!virtualScroll()) {
                <div #wrapper [class]="cx('wrapper')" [style.max-height]="scrollHeight()" [pBind]="ptm('wrapper')" [attr.data-p]="wrapperDataP">
                    @if (getRootNode()) {
                        <ul #content [class]="cx('rootChildren')" role="tree" [attr.aria-label]="ariaLabel()" [attr.aria-labelledby]="ariaLabelledBy()" [pBind]="ptm('rootChildren')">
                            @for (node of getRootNode(); track trackBy().bind(this)($index, node); let firstChild = $first; let lastChild = $last; let idx = $index) {
                                <p-treenode [node]="node" [firstChild]="firstChild" [lastChild]="lastChild" [index]="idx" [level]="0" [loadingMode]="loadingMode()" [pt]="pt" [unstyled]="unstyled()" />
                            }
                        </ul>
                    }
                </div>
            }
        }

        @if (showEmptyMessage) {
            <div [class]="cx('emptyMessage')" [pBind]="ptm('emptyMessage')">
                @if (!emptyTemplate()) {
                    {{ emptyMessageLabel }}
                }
                @if (emptyTemplate()) {
                    <ng-template *ngTemplateOutlet="emptyTemplate()!"></ng-template>
                }
            </div>
        }
        <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TreeStyle, { provide: TREE_INSTANCE, useExisting: Tree }, { provide: PARENT_INSTANCE, useExisting: Tree }],
    host: {
        '[class]': "cx('root')",
        '[attr.data-p]': 'containerDataP',
        '(drop)': 'onDrop($event)',
        '(dragover)': 'onDragOver($event)',
        '(dragenter)': 'onDragEnter()',
        '(dragleave)': 'onDragLeave($event)'
    },
    hostDirectives: [Bind]
})
export class Tree extends BaseComponent<TreePassThrough> implements BlockableUI {
    componentName = 'Tree';

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcTree: Tree | undefined = inject(TREE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    /**
     * An array of treenodes.
     * @group Props
     */
    value = input<TreeNode<any> | TreeNode<any>[] | any[] | any>();
    /**
     * Defines the selection mode.
     * @group Props
     */
    selectionMode = input<TreeSelectionMode>();
    /**
     * Loading mode display.
     * @group Props
     */
    loadingMode = input<TreeLoadingMode>('mask');
    /**
     * A single treenode instance or an array to refer to the selections.
     * @group Props
     */
    selection = model<TreeNode<any> | TreeNode<any>[] | null | undefined>(null);
    /**
     * Context menu instance.
     * @group Props
     */
    contextMenu = input<any>();
    /**
     * Selected node with a context menu.
     * @group Props
     */
    contextMenuSelection = model<TreeNode<any> | null>(null);
    /**
     * Scope of the draggable nodes to match a droppableScope.
     * @group Props
     */
    draggableScope = input<any>();
    /**
     * Scope of the droppable nodes to match a draggableScope.
     * @group Props
     */
    droppableScope = input<any>();
    /**
     * Whether the nodes are draggable.
     * @group Props
     */
    draggableNodes = input(false, { transform: booleanAttribute });
    /**
     * Whether the nodes are droppable.
     * @group Props
     */
    droppableNodes = input(false, { transform: booleanAttribute });
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = input(false, { transform: booleanAttribute });
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @group Props
     */
    propagateSelectionUp = input(true, { transform: booleanAttribute });
    /**
     * Whether checkbox selections propagate to descendant nodes.
     * @group Props
     */
    propagateSelectionDown = input(true, { transform: booleanAttribute });
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading = input(false, { transform: booleanAttribute });
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon = input<string | undefined>();
    /**
     * Text to display when there is no data.
     * @group Props
     */
    emptyMessage = input('');
    /**
     * Used to define a string that labels the tree.
     * @group Props
     */
    ariaLabel = input<string | undefined>();
    /**
     * Defines a string that labels the toggler icon for accessibility.
     * @group Props
     */
    togglerAriaLabel = input<string | undefined>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string | undefined>();
    /**
     * When enabled, drop can be accepted or rejected based on condition defined at onNodeDrop.
     * @group Props
     */
    validateDrop = input(false, { transform: booleanAttribute });
    /**
     * When specified, displays an input field to filter the items.
     * @group Props
     */
    filter = input(false, { transform: booleanAttribute });
    /**
     * Determines whether the filter input should be automatically focused when the component is rendered.
     * @group Props
     */
    filterInputAutoFocus = input(false, { transform: booleanAttribute });
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy = input('label');
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    filterMode = input('lenient');
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    filterOptions: any;
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    filterPlaceholder = input<string | undefined>();
    /**
     * Values after the tree nodes are filtered.
     * @group Props
     */
    filteredNodes: TreeNode<any>[] | undefined | null;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale = input<string | undefined>();
    /**
     * Height of the scrollable viewport.
     * @group Props
     */
    scrollHeight = input<string | undefined>();
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = input(false, { transform: booleanAttribute });
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll = input(false, { transform: booleanAttribute });
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize = input<number | undefined>();
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions = input<ScrollerOptions | undefined>();
    /**
     * Indentation factor for spacing of the nested node when virtual scrolling is enabled.
     * @group Props
     */
    indentation = input(1.5, { transform: numberAttribute });
    /**
     * Function to optimize the node list rendering, default algorithm checks for object identity.
     * @group Props
     */
    trackBy = input<Function>((index: number, item: any) => item);
    /**
     * Highlights the node on select.
     * @group Props
     */
    highlightOnSelect = input(false, { transform: booleanAttribute });
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeNodeSelectEvent} event - Node select event.
     * @group Emits
     */
    onNodeSelect = output<TreeNodeSelectEvent>();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeNodeUnSelectEvent} event - Node unselect event.
     * @group Emits
     */
    onNodeUnselect = output<TreeNodeUnSelectEvent>();
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeNodeExpandEvent} event - Node expand event.
     * @group Emits
     */
    onNodeExpand = output<TreeNodeExpandEvent>();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeNodeCollapseEvent} event - Node collapse event.
     * @group Emits
     */
    onNodeCollapse = output<TreeNodeCollapseEvent>();
    /**
     * Callback to invoke when a node is selected with right click.
     * @param {onNodeContextMenuSelect} event - Node context menu select event.
     * @group Emits
     */
    onNodeContextMenuSelect = output<TreeNodeContextMenuSelectEvent>();
    /**
     * Callback to invoke when a node is double clicked.
     * @param {TreeNodeDoubleClickEvent} event - Node double click event.
     * @group Emits
     */
    onNodeDoubleClick = output<TreeNodeDoubleClickEvent>();
    /**
     * Callback to invoke when a node is dropped.
     * @param {TreeNodeDropEvent} event - Node drop event.
     * @group Emits
     */
    onNodeDrop = output<TreeNodeDropEvent>();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {TreeLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = output<TreeLazyLoadEvent>();
    /**
     * Callback to invoke in virtual scroll mode when scroll position changes.
     * @param {TreeScrollEvent} event - Custom scroll event.
     * @group Emits
     */
    onScroll = output<TreeScrollEvent>();
    /**
     * Callback to invoke in virtual scroll mode when scroll position and item's range in view changes.
     * @param {TreeScrollIndexChangeEvent} event - Scroll index change event.
     * @group Emits
     */
    onScrollIndexChange = output<TreeScrollIndexChangeEvent>();
    /**
     * Callback to invoke when data is filtered.
     * @param {TreeFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter = output<TreeFilterEvent>();
    /**
     * Custom filter template.
     * @param {TreeFilterTemplateContext} context - filter context.
     * @see {@link TreeFilterTemplateContext}
     * @group Templates
     */
    filterTemplate = contentChild<TemplateRef<TreeFilterTemplateContext>>('filter', { descendants: false });
    /**
     * Custom node template.
     * @group Templates
     */
    nodeTemplate = contentChild<TemplateRef<any>>('node', { descendants: false });
    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });
    /**
     * Custom footer template.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer', { descendants: false });
    /**
     * Custom loader template.
     * @param {TreeLoaderTemplateContext} context - loader context.
     * @see {@link TreeLoaderTemplateContext}
     * @group Templates
     */
    loaderTemplate = contentChild<TemplateRef<TreeLoaderTemplateContext>>('loader', { descendants: false });
    /**
     * Custom empty message template.
     * @group Templates
     */
    emptyTemplate = contentChild<TemplateRef<void>>('empty', { descendants: false });
    /**
     * Custom toggler icon template.
     * @param {TreeTogglerIconTemplateContext} context - toggler icon context.
     * @see {@link TreeTogglerIconTemplateContext}
     * @group Templates
     */
    togglerIconTemplate = contentChild<TemplateRef<TreeTogglerIconTemplateContext>>('togglericon', { descendants: false });
    /**
     * Custom checkbox icon template.
     * @param {TreeCheckboxIconTemplateContext} context - checkbox icon context.
     * @see {@link TreeCheckboxIconTemplateContext}
     * @group Templates
     */
    checkboxIconTemplate = contentChild<TemplateRef<TreeCheckboxIconTemplateContext>>('checkboxicon', { descendants: false });
    /**
     * Custom loading icon template.
     * @group Templates
     */
    loadingIconTemplate = contentChild<TemplateRef<void>>('loadingicon', { descendants: false });
    /**
     * Custom filter icon template.
     * @group Templates
     */
    filterIconTemplate = contentChild<TemplateRef<void>>('filtericon', { descendants: false });

    filterViewChild = viewChild<ElementRef>('filter');

    scroller = viewChild<Scroller>('scroller');

    wrapperViewChild = viewChild<ElementRef>('wrapper');

    contentViewChild = viewChild<ElementRef>('content');

    serializedValue: TreeNode<any>[] | null | undefined;

    public nodeTouched: boolean | undefined | null;

    public dragNodeTree: Tree | undefined | null;

    public dragNode: TreeNode<any> | undefined | null;

    public dragNodeSubNodes: TreeNode<any>[] | undefined | null;

    public dragNodeIndex: number | undefined | null;

    public dragNodeScope: any;

    public dragHover: boolean | undefined | null;

    _componentStyle = inject(TreeStyle);

    dragDropService = inject(TreeDragDropService, { optional: true });

    private destroyRef = inject(DestroyRef);

    constructor() {
        super();

        effect(() => {
            this.value();
            untracked(() => {
                this.updateSerializedValue();
                if (this.hasFilterActive()) {
                    this._filter(this.filterViewChild()?.nativeElement?.value);
                }
            });
        });
    }

    onInit() {
        if (this.filterBy()) {
            this.filterOptions = {
                filter: (value) => this._filter(value),
                reset: () => this.resetFilter()
            };
        }
        if (this.droppableNodes()) {
            this.dragDropService?.dragStart$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
                this.dragNodeTree = event.tree;
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
                this.dragNodeScope = event.scope;
            });

            this.dragDropService?.dragStop$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
                this.dragNodeTree = null;
                this.dragNode = null;
                this.dragNodeSubNodes = null;
                this.dragNodeIndex = null;
                this.dragNodeScope = null;
                this.dragHover = false;
            });
        }
    }

    showLoadingMask = computed(() => this.loading() && this.loadingMode() === 'mask');

    get showEmptyMessage() {
        return !this.loading() && (this.getRootNode() == null || this.getRootNode()!.length === 0);
    }

    scrollerStyleHeight = computed(() => (this.scrollHeight() !== 'flex' ? this.scrollHeight() : undefined));

    scrollerScrollHeight = computed(() => (this.scrollHeight() !== 'flex' ? undefined : '100%'));

    get emptyMessageLabel(): string {
        return this.emptyMessage() || this.translate(TranslationKeys.EMPTY_MESSAGE);
    }

    updateSerializedValue() {
        this.serializedValue = [];
        this.serializeNodes(null, this.getRootNode(), 0, true);
    }

    serializeNodes(parent: TreeNode<any> | null, nodes: TreeNode<any>[] | any, level: number, visible: boolean) {
        if (nodes && nodes.length) {
            for (let node of nodes) {
                node.parent = parent;
                const rowNode = {
                    node: node,
                    parent: parent,
                    level: level,
                    visible: visible && (parent ? parent.expanded : true)
                };
                (this.serializedValue as TreeNode<any>[]).push(<TreeNode>rowNode);

                if (rowNode.visible && node.expanded) {
                    this.serializeNodes(node, node.children, level + 1, rowNode.visible);
                }
            }
        }
    }

    onNodeClick(event: Event, node: TreeNode) {
        let eventTarget = <Element>event.target;
        const section = eventTarget?.getAttribute?.('data-pc-section');
        if (section === 'nodetogglebutton' || section === 'nodetoggleicon') {
            return;
        }

        if (this.selectionMode()) {
            if (node.selectable === false) {
                node.style = '--p-focus-ring-color: none;';
                return;
            } else {
                if (!node.style?.includes('--p-focus-ring-color')) {
                    node.style = node.style ? `${node.style}--p-focus-ring-color: var(--primary-color)` : '--p-focus-ring-color: var(--primary-color)';
                }
            }

            if (this.hasFilteredNodes()) {
                node = this.getNodeWithKey(<string>node.key, <TreeNode<any>[]>this.filteredNodes) as TreeNode;
                if (!node) {
                    return;
                }
            }

            let index = this.findIndexInSelection(node);
            let selected = index >= 0;
            const currentSelection = this.selection();

            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown()) this.propagateDown(node, false);
                    else this.selection.set((currentSelection as TreeNode[]).filter((_val: TreeNode, i: number) => i != index));

                    if (this.propagateSelectionUp() && node.parent) {
                        this.propagateUp(node.parent, false);
                    }

                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                } else {
                    if (this.propagateSelectionDown()) this.propagateDown(node, true);
                    else this.selection.set([...((currentSelection as TreeNode[]) || []), node]);

                    if (this.propagateSelectionUp() && node.parent) {
                        this.propagateUp(node.parent, true);
                    }

                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            } else {
                let metaSelection = this.nodeTouched ? false : this.metaKeySelection();

                if (metaSelection) {
                    let metaKey = (<KeyboardEvent>event).metaKey || (<KeyboardEvent>event).ctrlKey;

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selection.set(null);
                        } else {
                            this.selection.set((currentSelection as TreeNode[]).filter((_val: TreeNode, i: number) => i != index));
                        }

                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    } else {
                        if (this.isSingleSelectionMode()) {
                            this.selection.set(node);
                        } else if (this.isMultipleSelectionMode()) {
                            const base = !metaKey ? [] : (currentSelection as TreeNode[]) || [];
                            this.selection.set([...base, node]);
                        }

                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                } else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection.set(null);
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        } else {
                            this.selection.set(node);
                            setTimeout(() => {
                                this.onNodeSelect.emit({ originalEvent: event, node: node });
                            });
                        }
                    } else {
                        if (selected) {
                            this.selection.set((currentSelection as TreeNode[]).filter((_val: TreeNode, i: number) => i != index));
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        } else {
                            this.selection.set([...((currentSelection as TreeNode[]) || []), node]);
                            setTimeout(() => {
                                this.onNodeSelect.emit({ originalEvent: event, node: node });
                            });
                        }
                    }
                }
            }
        }

        this.nodeTouched = false;
    }

    onNodeTouchEnd() {
        this.nodeTouched = true;
    }

    onNodeRightClick(event: MouseEvent, node: TreeNode<any>) {
        if (this.contextMenu()) {
            let eventTarget = <Element>event.target;
            const section = eventTarget.getAttribute('data-pc-section');

            if (section === 'nodetogglebutton' || section === 'nodetoggleicon') {
                return;
            }

            let index = this.findIndexInSelection(node);
            let isNodeSelected = index >= 0;

            const onContextMenuCallback = () => {
                this.contextMenu().show(event);
                this.contextMenu().hideCallback = () => {
                    this.contextMenuSelection.set(null);
                };

                this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
            };

            this.contextMenuSelection.set(node);
            onContextMenuCallback();
        }
    }

    onNodeDblClick(event: MouseEvent, node: TreeNode<any>) {
        this.onNodeDoubleClick.emit({ originalEvent: event, node: node });
    }

    findIndexInSelection(node: TreeNode) {
        let index: number = -1;
        const currentSelection = this.selection();
        if (this.selectionMode() && currentSelection) {
            if (this.isSingleSelectionMode()) {
                const sel = currentSelection as TreeNode;
                let areNodesEqual = (sel.key && sel.key === node.key) || sel == node;
                index = areNodesEqual ? 0 : -1;
            } else {
                const selArray = currentSelection as TreeNode[];
                for (let i = 0; i < selArray.length; i++) {
                    let selectedNode = selArray[i];
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

    syncNodeOption(node: TreeNode, parentNodes: TreeNode<any>[], option: any, value?: any) {
        // to synchronize the node option between the filtered nodes and the original nodes(this.value)
        const _node = this.hasFilteredNodes() ? this.getNodeWithKey(<string>node.key, parentNodes) : null;
        if (_node) {
            (<any>_node)[option] = value || (<any>node)[option];
        }
    }

    hasFilteredNodes() {
        return this.filter() && this.filteredNodes && this.filteredNodes.length;
    }

    hasFilterActive() {
        return this.filter() && this.filterViewChild()?.nativeElement?.value.length > 0;
    }

    getNodeWithKey(key: string, nodes: TreeNode<any>[]): TreeNode<any> | undefined {
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

            const currentSelection = (this.selection() as TreeNode[]) || [];
            if (select && selectedCount == node.children.length) {
                this.selection.set([...currentSelection, node]);
                node.partialSelected = false;
            } else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this.selection.set(currentSelection.filter((_val: TreeNode, i: number) => i != index));
                    }
                }

                if (childPartialSelected || (selectedCount > 0 && selectedCount != node.children.length)) node.partialSelected = true;
                else node.partialSelected = false;
            }

            this.syncNodeOption(node, <TreeNode<any>[]>this.filteredNodes, 'partialSelected');
        }

        let parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    }

    propagateDown(node: TreeNode, select: boolean) {
        let index = this.findIndexInSelection(node);
        const currentSelection = (this.selection() as TreeNode[]) || [];

        if (select && index == -1) {
            this.selection.set([...currentSelection, node]);
        } else if (!select && index > -1) {
            this.selection.set(currentSelection.filter((_val: TreeNode, i: number) => i != index));
        }

        node.partialSelected = false;

        this.syncNodeOption(node, <TreeNode<any>[]>this.filteredNodes, 'partialSelected');

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
        return this.selectionMode() && this.selectionMode() == 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode() && this.selectionMode() == 'multiple';
    }

    isCheckboxSelectionMode() {
        return this.selectionMode() && this.selectionMode() == 'checkbox';
    }

    isNodeLeaf(node: TreeNode): boolean {
        return node.leaf == false ? false : !(node.children && node.children.length);
    }

    getRootNode() {
        return this.filteredNodes ? this.filteredNodes : this.value();
    }

    getTemplateForNode(node: TreeNode): TemplateRef<any> | null {
        return this.nodeTemplate() ?? null;
    }

    onDragOver(event: DragEvent) {
        if (this.droppableNodes() && this.allowDrop(<TreeNode>this.dragNode, null, this.dragNodeScope)) {
            (<any>event).dataTransfer.dropEffect = 'copy';
            event.preventDefault();
        }
    }

    onDrop(event: DragEvent) {
        if (this.droppableNodes()) {
            event.preventDefault();
            let dragNode = this.dragNode as TreeNode;

            if (this.isSameTreeScope(this.dragNodeScope)) {
                return;
            }

            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                let dragNodeIndex = <number>this.dragNodeIndex;
                let currentValue = this.value() || [];

                if (this.validateDrop()) {
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
        (<TreeNode<any>[]>this.dragNodeSubNodes).splice(dragNodeIndex, 1);
        (this.value() as TreeNode<any>[]).push(dragNode);
        this.dragDropService!.stopDrag({
            node: dragNode
        });
    }

    onDragEnter() {
        if (this.droppableNodes() && this.allowDrop(<TreeNode>this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }

    onDragLeave(event: DragEvent) {
        if (this.droppableNodes()) {
            let rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
            if (event.x > parseInt(rect.left as any) + rect.width || event.x < parseInt(rect.left as any) || event.y > parseInt(rect.top as any) + rect.height || event.y < parseInt(rect.top as any)) {
                this.dragHover = false;
            }
        }
    }

    allowDrop(dragNode: TreeNode, dropNode: TreeNode<any> | null, dragNodeScope: any): boolean {
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

    hasCommonScope(dragScope: any, dropScope: any): boolean {
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
    }

    isSameTreeScope(dragScope: any): boolean {
        return this.hasCommonScope(dragScope, this.draggableScope());
    }

    isValidDragScope(dragScope: any): boolean {
        let dropScope = this.droppableScope();

        if (dropScope) {
            return this.hasCommonScope(dragScope, dropScope);
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
            const searchFields: string[] = this.filterBy().split(',');
            const filterText = removeAccents(filterValue).toLocaleLowerCase(this.filterLocale());
            const isStrictMode = this.filterMode() === 'strict';
            for (let node of <TreeNode<any>[]>this.value()) {
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

    /**
     * Resets filter.
     * @group Method
     */
    public resetFilter() {
        this.filteredNodes = null;

        const filterEl = this.filterViewChild();
        if (filterEl && filterEl.nativeElement) {
            filterEl.nativeElement.value = '';
        }
    }
    /**
     * Scrolls to virtual index.
     * @param {number} number - Index to be scrolled.
     * @group Method
     */
    public scrollToVirtualIndex(index: number) {
        this.virtualScroll() && this.scroller()?.scrollToIndex(index);
    }
    /**
     * Scrolls to virtual index.
     * @param {ScrollToOptions} options - Scroll options.
     * @group Method
     */
    public scrollTo(options: any) {
        if (this.virtualScroll()) {
            this.scroller()?.scrollTo(options);
        } else {
            const wrapper = this.wrapperViewChild();
            if (wrapper && wrapper.nativeElement) {
                if (wrapper.nativeElement.scrollTo) {
                    wrapper.nativeElement.scrollTo(options);
                } else {
                    wrapper.nativeElement.scrollLeft = options.left;
                    wrapper.nativeElement.scrollTop = options.top;
                }
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
            let fieldValue = removeAccents(String(resolveFieldData(node, field))).toLocaleLowerCase(this.filterLocale());
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

    get containerDataP() {
        return this.cn({
            loading: this.loading(),
            scrollable: this.scrollHeight() === 'flex'
        });
    }

    get wrapperDataP() {
        return this.cn({
            scrollable: this.scrollHeight() === 'flex'
        });
    }
}
@NgModule({
    imports: [Tree],
    exports: [Tree]
})
export class TreeModule {}
