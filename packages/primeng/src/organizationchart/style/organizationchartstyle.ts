import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = `
.p-organizationchart {
    display: block; /* for primeng */
    width: 100%;
    overflow: auto;
    padding: 1rem 0;
}

.p-organizationchart-subtree {
    position: relative;
    display: flex;
    padding-inline-start: 0;
    margin: 0;
    padding-top: calc(var(--gap-y) * 1px * 2/3);
    gap: calc(var(--gap-x) * 1px);
}

.p-organizationchart-subtree-root {
    padding-top: 0;
}

.p-organizationchart-subtree-root::before {
    content: none !important;
}

.p-organizationchart-subtree::before {
    content: "";
    position: absolute;
    top: 0;
    height: calc(var(--gap-y) * 1px * 2/3);
    box-sizing: border-box;
    left: calc(50% - 1px / 2);
    width: 0;
    border-left: 1px solid dt('organizationchart.connector.color');
}

.p-organizationchart-tree {
    flex-shrink: 0;
    text-align: center;
    list-style-type: none;
    margin: 0 auto;
    position: relative;
    padding: calc(var(--gap-y) * 1px * 1/3) 0 0 0;
}

.p-organizationchart-tree::before,
.p-organizationchart-tree::after {
    content: "";
    position: absolute;
    height: calc(var(--gap-y) * 1px * 1/3);
    width: calc(50% + calc(var(--gap-x) / 2 * 1px));
    top: 0;
    right: 50%;
    border-top: 1px solid dt('organizationchart.connector.color');
    box-sizing: border-box;
}

.p-organizationchart-tree::after {
    left: 50%;
    border-left: 1px solid dt('organizationchart.connector.color');
}

.p-organizationchart-tree:only-of-type {
    padding: 0;
}

.p-organizationchart-tree:only-of-type::before,
.p-organizationchart-tree:only-of-type::after {
    display: none;
}

.p-organizationchart-tree:first-of-type::before {
    border: none;
}

.p-organizationchart-tree:first-of-type::after {
    border-radius: dt('organizationchart.connector.border.radius') 0 0 0;
}

.p-organizationchart-tree:last-of-type::before {
    border-right: 1px solid dt('organizationchart.connector.color');
    border-radius: 0 dt('organizationchart.connector.border.radius') 0 0;
}

.p-organizationchart-tree:last-of-type::after {
    border: 0 none;
}

.p-organizationchart-node {
    position: relative;
    min-width: 4rem;
    width: fit-content;
    margin: 0 auto;
    background: dt('organizationchart.node.background');
    border: 1px solid dt('organizationchart.node.border.color');
    border-radius: dt('organizationchart.node.border.radius');
    color: dt('organizationchart.node.color');
    transition:
        background dt('organizationchart.transition.duration'),
        border-color dt('organizationchart.transition.duration'),
        color dt('organizationchart.transition.duration'),
        box-shadow dt('organizationchart.transition.duration');
}

.p-organizationchart-node-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: dt('organizationchart.node.padding');
}

.p-organizationchart-node[data-selectable="true"]:not([data-selected="true"]):hover {
    background: dt('organizationchart.node.hover.background');
    color: dt('organizationchart.node.hover.color');
}

.p-organizationchart-node[data-selectable="true"][data-selected="true"] {
    background: dt('organizationchart.node.selected.background');
    color: dt('organizationchart.node.selected.color');
}

.p-organizationchart-node[data-selectable="true"] {
    cursor: pointer;
    user-select: none;
}

.p-organizationchart-collapse-button {
    pointer-events: auto;
    padding: 0.1rem 0.3rem;
    gap: 0.2rem;
    position: absolute;
    z-index: 2;
    font-size: 0.75rem;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    cursor: pointer;
    user-select: none;
    background: dt('organizationchart.node.toggle.button.background');
    color: dt('organizationchart.node.toggle.button.color');
    border-radius: 99999px;
    border: 1px solid dt('organizationchart.node.toggle.button.border.color');
    display: inline-flex;
    justify-content: center;
    align-items: center;
    outline-color: transparent;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    transition:
        background dt('organizationchart.transition.duration'),
        color dt('organizationchart.transition.duration'),
        border-color dt('organizationchart.transition.duration'),
        outline-color dt('organizationchart.transition.duration'),
        box-shadow dt('organizationchart.transition.duration');
}

.p-organizationchart-node[data-collapsible="true"][data-collapsed="false"] .p-organizationchart-collapse-button {
    bottom: 0;
    transform: translateX(-50%) translateY(calc(50% + calc(var(--gap-y) / 2 * 1px * 2/3)));
}

.p-organizationchart-node:focus-visible {
    box-shadow: dt('organizationchart.node.toggle.button.focus.ring.shadow');
    outline: dt('organizationchart.node.toggle.button.focus.ring.width') dt('organizationchart.node.toggle.button.focus.ring.style') dt('organizationchart.node.toggle.button.focus.ring.color');
    outline-offset: dt('organizationchart.node.toggle.button.focus.ring.offset');
}

.p-organizationchart-collapse-button:hover {
    background: dt('organizationchart.node.toggle.button.hover.background');
    color: dt('organizationchart.node.toggle.button.hover.color');
}

.p-organizationchart-collapse-button:focus-visible {
    box-shadow: dt('organizationchart.node.toggle.button.focus.ring.shadow');
    outline: dt('organizationchart.node.toggle.button.focus.ring.width') dt('organizationchart.node.toggle.button.focus.ring.style') dt('organizationchart.node.toggle.button.focus.ring.color');
    outline-offset: dt('organizationchart.node.toggle.button.focus.ring.offset');
}

.p-organizationchart-collapse-button > svg {
    width: 0.65rem !important;
    height: 0.65rem !important;
}
`;

const classes = {
    root: 'p-organizationchart p-component',
    subtree: ({ root }) => ['p-organizationchart-subtree', { 'p-organizationchart-subtree-root': root }],
    tree: 'p-organizationchart-tree',
    node: 'p-organizationchart-node',
    nodeContent: 'p-organizationchart-node-content',
    collapseButton: 'p-organizationchart-collapse-button',
    collapseButtonDownIcon: 'p-organizationchart-collapse-button-down-icon',
    collapseButtonUpIcon: 'p-organizationchart-collapse-button-up-icon'
};

@Injectable()
export class OrganizationChartStyle extends BaseStyle {
    name = 'organizationchart';

    style = theme;

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
     * Class name of the subtree element
     */
    subtree = 'p-organizationchart-subtree',
    /**
     * Class name of the tree element
     */
    tree = 'p-organizationchart-tree',
    /**
     * Class name of the node element
     */
    node = 'p-organizationchart-node',
    /**
     * Class name of the node content element
     */
    nodeContent = 'p-organizationchart-node-content',
    /**
     * Class name of the collapse button element
     */
    collapseButton = 'p-organizationchart-collapse-button',
    /**
     * Class name of the collapse button down icon element
     */
    collapseButtonDownIcon = 'p-organizationchart-collapse-button-down-icon',
    /**
     * Class name of the collapse button up icon element
     */
    collapseButtonUpIcon = 'p-organizationchart-collapse-button-up-icon'
}

export interface OrganizationChartStyle extends BaseStyle {}
