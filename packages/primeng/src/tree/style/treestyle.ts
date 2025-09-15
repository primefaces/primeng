import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/tree';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-tree p-component',
        {
            'p-tree-selectable': instance.selectionMode != null,
            'p-tree-loading': instance.loading,
            'p-tree-flex-scrollable': instance.scrollHeight === 'flex',
            'p-tree-node-dragover': instance.dragHover
        }
    ],
    mask: 'p-tree-mask p-overlay-mask',
    loadingIcon: 'p-tree-loading-icon',
    pcFilterInput: 'p-tree-filter-input',
    wrapper: 'p-tree-root',
    rootChildren: 'p-tree-root-children',
    node: ({ instance }) => ({ 'p-tree-node': true, 'p-tree-node-leaf': instance.isLeaf() }),
    nodeContent: ({ instance }) => ({
        'p-tree-node-content': true,
        'p-tree-node-selectable': instance.selectable,
        'p-tree-node-dragover': instance.draghoverNode,
        'p-tree-node-selected': instance.selectionMode === 'checkbox' && instance.tree.highlightOnSelect ? instance.checked : instance.selected
    }),
    nodeToggleButton: 'p-tree-node-toggle-button',
    nodeToggleIcon: 'p-tree-node-toggle-icon',
    nodeCheckbox: 'p-tree-node-checkbox',
    nodeIcon: 'p-tree-node-icon',
    nodeLabel: 'p-tree-node-label',
    nodeChildren: 'p-tree-node-children',
    emptyMessage: 'p-tree-empty-message',
    dropPoint: ({ param }) => ['p-tree-node-droppoint', { 'p-tree-node-droppoint-active': param }]
};

@Injectable()
export class TreeStyle extends BaseStyle {
    name = 'tree';

    theme = style;

    classes = classes;
}

/**
 *
 * Tree is used to display hierarchical data.
 *
 * [Live Demo](https://www.primeng.org/tree/)
 *
 * @module treestyle
 *
 */
export enum TreeClasses {
    /**
     * Class name of the root element
     */
    root = 'p-tree',
    /**
     * Class name of the mask element
     */
    mask = 'p-tree-mask',
    /**
     * Class name of the loading icon element
     */
    loadingIcon = 'p-tree-loading-icon',
    /**
     * Class name of the filter input element
     */
    pcFilterInput = 'p-tree-filter-input',
    /**
     * Class name of the wrapper element
     */
    wrapper = 'p-tree-root',
    /**
     * Class name of the root children element
     */
    rootChildren = 'p-tree-root-children',
    /**
     * Class name of the node element
     */
    node = 'p-tree-node',
    /**
     * Class name of the node content element
     */
    nodeContent = 'p-tree-node-content',
    /**
     * Class name of the node toggle button element
     */
    nodeToggleButton = 'p-tree-node-toggle-button',
    /**
     * Class name of the node toggle icon element
     */
    nodeToggleIcon = 'p-tree-node-toggle-icon',
    /**
     * Class name of the node checkbox element
     */
    nodeCheckbox = 'p-tree-node-checkbox',
    /**
     * Class name of the node icon element
     */
    nodeIcon = 'p-tree-node-icon',
    /**
     * Class name of the node label element
     */
    nodeLabel = 'p-tree-node-label',
    /**
     * Class name of the node children element
     */
    nodeChildren = 'p-tree-node-children',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-tree-empty-message',
    /**
     * Class name of the drop point element
     */
    dropPoint = 'p-tree-node-droppoint'
}

export interface TreeStyle extends BaseStyle {}
