import type { TreeNode } from 'primeng/api';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';
import { TreeSelect } from 'primeng/treeselect';
import { TreePassThrough } from 'primeng/tree';
import { OverlayPassThrough } from 'primeng/types/overlay';
import { ChipPassThrough } from 'primeng/chip';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link TreeSelect.pt}
 * @group Interface
 */
export interface TreeSelectPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the hidden input container's DOM element.
     */
    hiddenInputContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the hidden input's DOM element.
     */
    hiddenInput?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the label container's DOM element.
     */
    labelContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the chip item's DOM element.
     */
    chipItem?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Chip component.
     */
    pcChip?: ChipPassThrough;
    /**
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the dropdown's DOM element.
     */
    dropdown?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the dropdown icon's DOM element.
     */
    dropdownIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    panel?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the first hidden focusable element's DOM element.
     */
    hiddenFirstFocusableEl?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the tree container's DOM element.
     */
    treeContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Tree component.
     */
    pcTree?: TreePassThrough;
    /**
     * Used to pass attributes to the last hidden focusable element's DOM element.
     */
    hiddenLastFocusableEl?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the Overlay component.
     */
    pcOverlay?: OverlayPassThrough;
}

/**
 * Custom passthrough attributes for each DOM elements
 * @group Interface
 */
export type TreeSelectPassThrough<I = unknown> = PassThrough<I, TreeSelectPassThroughOptions<I>>;

/**
 * Defines valid properties in TreeSelectNodeExpandEvent.
 * @group Interface
 */
export interface TreeSelectNodeExpandEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Expanded node instance.
     */
    node: TreeNode;
}

/**
 * Defines valid properties in TreeSelectNodeCollapseEvent.
 * @group Interface
 */
export interface TreeSelectNodeCollapseEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Collapsed node instance.
     */
    node: TreeNode;
}

/**
 * Custom node collapse event.
 * @see {@link TreeSelect.onNodeCollapse}
 * @group Events
 */
export interface TreeSelectNodeCollapseEvent {
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
 * Custom node expand event.
 * @see {@link TreeSelect.onNodeExpand}
 * @group Events
 */
export interface TreeSelectNodeExpandEvent extends TreeSelectNodeCollapseEvent {}
/**
 * Defines valid templates in TreeSelect.
 * @group Templates
 */
export interface TreeSelectTemplates {
    /**
     * Custom value template.
     * @param {Object} context - value data.
     */
    value(context: {
        /**
         * Value of the component.
         */
        $implicit: TreeNode<any> | null;
        /**
         * Placeholder of the component.
         */
        placeholder: string;
    }): TemplateRef<{ $implicit: TreeNode<any> | null; placeholder: string }>;
    /**
     * Custom header template.
     * @param {Object} context - header data.
     */
    header(context: {
        /**
         * Value of the component.
         */
        $implicit: TreeNode<any> | null | undefined;
        /**
         * Placeholder of the component.
         */
        options: TreeNode<any>[] | undefined;
    }): TemplateRef<{ $implicit: TreeNode<any> | null; options: TreeNode[] | null | undefined }>;
    /**
     * Custom empty template.
     */
    empty(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<any>;
    /**
     * Custom dropdown trigger icon template.
     */
    triggericon(): TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<any>;
    /**
     * Custom close icon template.
     */
    closeicon(): TemplateRef<any>;
    /**
     * Custom node toggler template.
     * @param {Object} context - toggler icon data.
     */
    itemtogglericon(context: {
        /**
         * Expanded state of the node.
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: TreeNode<any> | null }>;
    /**
     * Custom node checkbox icon template.
     */
    itemcheckboxicon(): TemplateRef<any>;
    /**
     * Custom loading icon template.
     */
    itemloadingicon(): TemplateRef<any>;
}
