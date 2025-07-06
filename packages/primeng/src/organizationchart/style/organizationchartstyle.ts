import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/organizationchart';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => ['p-organizationchart p-component', { 'p-organizationchart-preservespace': instance.preserveSpace }],
    table: 'p-organizationchart-table',
    node: ({ instance }) => [
        'p-organizationchart-node',
        { 'p-organizationchart-node': true, 'p-organizationchart-node-selectable': instance.chart.selectionMode && instance.node.selectable !== false, 'p-organizationchart-node-selected': instance.isSelected() }
    ],
    nodeToggleButton: 'p-organizationchart-node-toggle-button',
    nodeToggleButtonIcon: 'p-organizationchart-node-toggle-button-icon',
    connectors: 'p-organizationchart-connectors',
    connectorDown: 'p-organizationchart-connector-down',
    connectorLeft: ({ first }) => ['p-organizationchart-connector-left', { 'p-organizationchart-connector-top': !first }],
    connectorRight: ({ last }) => ['p-organizationchart-connector-right', { 'p-organizationchart-connector-top': !last }],
    nodeChildren: 'p-organizationchart-node-children'
};

@Injectable()
export class OrganizationChartStyle extends BaseStyle {
    name = 'organizationchart';

    theme = style;

    classes = classes;
}

/**
 *
 * OrganizationChart visualizes hierarchical organization data.
 *
 * [Live Demo](https://www.primeng.org/organizationchart)
 *
 * @module organizationchartstyle
 *
 */
export enum OrganizationChartClasses {
    /**
     * Class name of the root element
     */
    root = 'p-organizationchart',
    /**
     * Class name of the table element
     */
    table = 'p-organizationchart-table',
    /**
     * Class name of the node element
     */
    node = 'p-organizationchart-node',
    /**
     * Class name of the node toggle button element
     */
    nodeToggleButton = 'p-organizationchart-node-toggle-button',
    /**
     * Class name of the node toggle button icon element
     */
    nodeToggleButtonIcon = 'p-organizationchart-node-toggle-button-icon',
    /**
     * Class name of the connectors element
     */
    connectors = 'p-organizationchart-connectors',
    /**
     * Class name of the connector down element
     */
    connectorDown = 'p-organizationchart-connector-down',
    /**
     * Class name of the connector left element
     */
    connectorLeft = 'p-organizationchart-connector-left',
    /**
     * Class name of the connector right element
     */
    connectorRight = 'p-organizationchart-connector-right',
    /**
     * Class name of the node children element
     */
    nodeChildren = 'p-organizationchart-node-children'
}

export interface OrganizationChartStyle extends BaseStyle {}
