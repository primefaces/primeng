import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption, TreeNode } from 'primeng/api';
import { ChipPassThrough } from 'primeng/types/chip';
import { OverlayPassThrough } from 'primeng/types/overlay';
import { TreePassThrough } from 'primeng/types/tree';

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
 * Custom value template context.
 * @group Interface
 */
export interface TreeSelectValueTemplateContext {
    /**
     * Value of the component.
     */
    $implicit: any;
    /**
     * Placeholder of the component.
     */
    placeholder: string | undefined;
}

/**
 * Custom header/footer template context.
 * @group Interface
 */
export interface TreeSelectHeaderTemplateContext {
    /**
     * Value of the component.
     */
    $implicit: any;
    /**
     * Options of the component.
     */
    options: TreeNode<any>[] | undefined;
}

/**
 * Custom item toggler icon template context.
 * @group Interface
 */
export interface TreeSelectItemTogglerIconTemplateContext {
    /**
     * Expanded state of the node.
     */
    $implicit: boolean;
}

/**
 * Custom item checkbox icon template context.
 * @group Interface
 */
export interface TreeSelectItemCheckboxIconTemplateContext {
    /**
     * Selected state of the node.
     */
    $implicit: boolean;
    /**
     * Partial selection state of the node.
     */
    partialSelected: boolean;
}

/**
 * Defines valid templates in TreeSelect.
 * @group Templates
 */
export interface TreeSelectTemplates {
    /**
     * Custom value template.
     * @param {TreeSelectValueTemplateContext} context - value context.
     */
    value(context: TreeSelectValueTemplateContext): TemplateRef<TreeSelectValueTemplateContext>;
    /**
     * Custom header template.
     * @param {TreeSelectHeaderTemplateContext} context - header context.
     */
    header(context: TreeSelectHeaderTemplateContext): TemplateRef<TreeSelectHeaderTemplateContext>;
    /**
     * Custom footer template.
     * @param {TreeSelectHeaderTemplateContext} context - footer context.
     */
    footer(context: TreeSelectHeaderTemplateContext): TemplateRef<TreeSelectHeaderTemplateContext>;
    /**
     * Custom empty template.
     */
    empty(): TemplateRef<void>;
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<void>;
    /**
     * Custom dropdown trigger icon template.
     */
    triggericon(): TemplateRef<void>;
    /**
     * Custom dropdown icon template.
     */
    dropdownicon(): TemplateRef<void>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<void>;
    /**
     * Custom close icon template.
     */
    closeicon(): TemplateRef<void>;
    /**
     * Custom item toggler icon template.
     * @param {TreeSelectItemTogglerIconTemplateContext} context - toggler icon context.
     */
    itemtogglericon(context: TreeSelectItemTogglerIconTemplateContext): TemplateRef<TreeSelectItemTogglerIconTemplateContext>;
    /**
     * Custom item checkbox icon template.
     * @param {TreeSelectItemCheckboxIconTemplateContext} context - checkbox icon context.
     */
    itemcheckboxicon(context: TreeSelectItemCheckboxIconTemplateContext): TemplateRef<TreeSelectItemCheckboxIconTemplateContext>;
    /**
     * Custom item loading icon template.
     */
    itemloadingicon(): TemplateRef<void>;
}
