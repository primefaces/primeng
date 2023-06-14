import { TemplateRef } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeSelect } from './treeselect';
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
        $implicit: TreeNode | null;
        /**
         * Placeholder of the component.
         */
        placeholder: string;
    }): TemplateRef<{ $implicit: TreeNode | null; placeholder: string }>;
    /**
     * Custom header template.
     * @param {Object} context - header data.
     */
    header(context: {
        /**
         * Value of the component.
         */
        $implicit: TreeNode | null | undefined;
        /**
         * Placeholder of the component.
         */
        options: TreeNode[] | undefined;
    }): TemplateRef<{ $implicit: TreeNode | null; options: TreeNode[] | null | undefined }>;
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
    }): TemplateRef<{ $implicit: TreeNode | null }>;
    /**
     * Custom node checkbox icon template.
     */
    itemcheckboxicon(): TemplateRef<any>;
    /**
     * Custom loading icon template.
     */
    itemloadingicon(): TemplateRef<any>;
}
