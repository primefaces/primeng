import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TreeNode } from 'primeng/api';

/**
 * Represents a node in the OrganizationChart with additional properties.
 * @extends TreeNode
 * @group Interface
 */
export interface OrgChartNode<T = any> extends TreeNode<T> {
    /**
     * An array of child nodes.
     */
    children?: OrgChartNode<T>[];
    /**
     * Whether the node can be collapsed/expanded.
     */
    collapsible?: boolean;
    /**
     * Whether the node should be selected by default.
     * @defaultValue false
     */
    selectedByDefault?: boolean;
    /**
     * Whether the node should be collapsed by default.
     * @defaultValue false
     */
    collapsedByDefault?: boolean;
}

/**
 * Defines the selection mode.
 */
export type OrganizationChartSelectionMode = 'single' | 'multiple';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link OrganizationChart.pt}
 * @group Interface
 */
export interface OrganizationChartPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the subtree's DOM element.
     */
    subtree?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the tree's DOM element.
     */
    tree?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the node's DOM element.
     */
    node?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the node content's DOM element.
     */
    nodeContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the collapse button's DOM element.
     */
    collapseButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the collapse button down icon's DOM element.
     */
    collapseButtonDownIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the collapse button up icon's DOM element.
     */
    collapseButtonUpIcon?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in OrganizationChart.
 * @see {@link OrganizationChartPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type OrganizationChartPassThrough<I = unknown> = PassThrough<I, OrganizationChartPassThroughOptions<I>>;

/**
 * Custom node select event.
 * @see {@link OrganizationChart.onNodeSelect}
 * @group Events
 */
export interface OrganizationChartNodeSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Node instance.
     */
    node: TreeNode;
}
/**
 * Custom node unselect event.
 * @see {@link OrganizationChart.onNodeUnSelect}
 * @extends {OrganizationChartNodeSelectEvent}
 * @group Events
 */
export interface OrganizationChartNodeUnSelectEvent extends OrganizationChartNodeSelectEvent {}
/**
 * Custom node expand event.
 * @see {@link OrganizationChart.onNodeExpand}
 * @extends {OrganizationChartNodeSelectEvent}
 * @group Events
 */
export interface OrganizationChartNodeExpandEvent extends OrganizationChartNodeSelectEvent {}
/**
 * Custom node collapse event.
 * @see {@link OrganizationChart.onNodeCollapse}
 * @extends {OrganizationChartNodeSelectEvent}
 * @group Events
 */
export interface OrganizationChartNodeCollapseEvent extends OrganizationChartNodeSelectEvent {}
/**
 * Defines valid templates in OrganizationChart.
 * @group Templates
 */
export interface OrganizationChartTemplates {
    /**
     * Custom node template.
     * @param {Object} context - node data.
     */
    node(context: {
        /**
         * Node instance.
         */
        $implicit: TreeNode;
    }): TemplateRef<{ $implicit: TreeNode }>;
    /**
     * Custom toggler icon template.
     * @param {Object} context - item data.
     */
    togglericon(context: {
        /**
         * Expanded state of the node.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom collapse button template.
     * @param {Object} context - collapse button data.
     */
    collapsebutton(context: {
        /**
         * Node instance.
         */
        $implicit: TreeNode;
        /**
         * Whether the node is expanded.
         */
        expanded: boolean;
        /**
         * Whether the node is collapsed.
         */
        collapsed: boolean;
        /**
         * Number of child nodes.
         */
        childCount: number;
        /**
         * Function to toggle the node.
         */
        toggle: (event: Event, node: TreeNode) => void;
    }): TemplateRef<any>;
}
