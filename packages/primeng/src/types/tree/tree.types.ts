import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import { ScrollerOptions, TreeNode } from 'primeng/api';
import type { InputTextPassThrough } from 'primeng/types/inputtext';
import type { ScrollerPassThrough } from 'primeng/types/scroller';
import type { CheckboxPassThrough } from 'primeng/types/checkbox';
import type { IconFieldPassThrough } from 'primeng/types/iconfield';
import type { InputIconPassThrough } from 'primeng/types/inputicon';
import type { Tree } from 'primeng/tree';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Tree.pt}
 * @group Interface
 */
export interface TreePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading mask's DOM element.
     */
    mask?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the loading icon's DOM element.
     */
    loadingIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the filter container's DOM element.
     */
    pcFilterContainer?: IconFieldPassThrough;
    /**
     * Used to pass attributes to the filter icon container's DOM element.
     */
    pcFilterIconContainer?: InputIconPassThrough;
    /**
     * Used to pass attributes to the filter input's DOM element.
     */
    pcFilterInput?: InputTextPassThrough;
    /**
     * Used to pass attributes to the filter icon's DOM element.
     */
    filterIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the Scroller component.
     */
    pcScroller?: ScrollerPassThrough;
    /**
     * Used to pass attributes to the wrapper's DOM element.
     */
    wrapper?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the root children's DOM element.
     */
    rootChildren?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the node's DOM element.
     */
    node?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the drop point's DOM element.
     */
    dropPoint?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the node content's DOM element.
     */
    nodeContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the node toggle button's DOM element.
     */
    nodeToggleButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the node toggle icon's DOM element.
     */
    nodeTogglerIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the node checkbox's DOM element.
     */
    pcNodeCheckbox?: CheckboxPassThrough;
    /**
     * Used to pass attributes to the node icon's DOM element.
     */
    nodeIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the node label's DOM element.
     */
    nodeLabel?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the node children's DOM element.
     */
    nodeChildren?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the empty message's DOM element.
     */
    emptyMessage?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Tree.
 * @see {@link TreePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TreePassThrough<I = unknown> = PassThrough<I, TreePassThroughOptions<I>>;

/**
 * Custom node select event.
 * @see {@link Tree.onNodeSelect}
 * @group Events
 */
export interface TreeNodeSelectEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Node instance.
     */
    node: TreeNode<any>;
}

/**
 * Custom node unselect event.
 * @see {@link Tree.onNodeUnSelect}
 * @extends {TreeNodeSelectEvent}
 * @group Events
 */
export interface TreeNodeUnSelectEvent extends TreeNodeSelectEvent {}

/**
 * Custom node expand event.
 * @see {@link Tree.onNodeExpand}
 * @extends {TreeNodeSelectEvent}
 * @group Events
 */
export interface TreeNodeExpandEvent extends TreeNodeSelectEvent {}

/**
 * Custom node collapse event.
 * @see {@link Tree.onNodeCollapse}
 * @extends {TreeNodeSelectEvent}
 * @group Events
 */
export interface TreeNodeCollapseEvent extends TreeNodeSelectEvent {}

/**
 * Custom context menu select event.
 * @see {@link Tree.onNodeContextMenuSelect}
 * @extends {TreeNodeSelectEvent}
 * @group Events
 */
export interface TreeNodeContextMenuSelectEvent extends TreeNodeSelectEvent {}

/**
 * Custom node double click event.
 * @see {@link Tree.onNodeDoubleClick}
 * @extends {TreeNodeSelectEvent}
 * @group Events
 */
export interface TreeNodeDoubleClickEvent extends TreeNodeSelectEvent {}

/**
 * Custom node drop event.
 * @see {@link Tree.onNodeDrop}
 * @group Events
 */
export interface TreeNodeDropEvent {
    /**
     * Browser drag event.
     */
    originalEvent?: DragEvent;
    /**
     * Dragged node instance.
     */
    dragNode?: TreeNode<any> | null;
    /**
     * Dropped node instance.
     */
    dropNode?: TreeNode<any> | null;
    /**
     * Index of the dragged node.
     */
    index?: number;
    /**
     * Callback to invoke on drop.
     */
    accept?: Function;
}

/**
 * Custom lazy load event.
 * @see {@link Tree.onLazyLoad}
 * @group Events
 */
export interface TreeLazyLoadEvent {
    /**
     * First element index in viewport.
     */
    first: number;
    /**
     * Last element index in viewport.
     */
    last: number;
}

/**
 * Custom scroll index change event.
 * @see {@link Tree.onScrollIndexChange}
 * @group Events
 */
export interface TreeScrollIndexChangeEvent extends TreeLazyLoadEvent {}

/**
 * Custom scroll event.
 * @see {@link Tree.onScroll}
 * @group Events
 */
export interface TreeScrollEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
}

/**
 * Custom filter event.
 * @see {@link Tree.onFilter}
 * @group Events
 */
export interface TreeFilterEvent {
    /**
     * Filter value.
     */
    filter: string;
    /**
     * Filtered nodes.
     */
    filteredValue: TreeNode<any>[] | null | undefined;
}

/**
 * Defines valid templates in Tree.
 * @group Templates
 */
export interface TreeTemplates {
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom empty message template.
     */
    empty(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom loader template.
     * @param {Object} context - loader options.
     */
    loader(context: {
        /**
         * Scroller options.
         * @see {@link ScrollerOptions}
         */
        options: ScrollerOptions;
    }): TemplateRef<{ options: ScrollerOptions }>;
    /**
     * Custom toggler icon template.
     * @param {Object} context - expand data.
     */
    togglericon(context: {
        /**
         * Expanded state of the node.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom checkbox icon template.
     * @param {Object} context - node data.
     */
    checkboxicon(context: {
        /**
         * Checked state of the node.
         */
        $implicit: boolean;
        /**
         * Partial selection state of the node.
         */
        partialSelected: boolean;
    }): TemplateRef<{ $implicit: boolean; partialSelected: boolean }>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<any>;
}
