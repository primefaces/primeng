import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-tabs {
    display: flex;
    flex-direction: column;
}

.p-tablist {
    display: flex;
    position: relative;
}

.p-tabs-scrollable > .p-tablist {
    overflow: hidden;
}

.p-tablist-viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tablist-viewport::-webkit-scrollbar {
    display: none;
}

.p-tablist-tab-list {
    position: relative;
    display: flex;
    background: ${dt('tabs.tablist.background')};
    border-style: solid;
    border-color: ${dt('tabs.tablist.border.color')};
    border-width: ${dt('tabs.tablist.border.width')};
}

.p-tablist-content {
    flex-grow: 1;
}

.p-tablist-nav-button {
    all: unset;
    position: absolute !important;
    flex-shrink: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${dt('tabs.nav.button.background')};
    color: ${dt('tabs.nav.button.color')};
    width: ${dt('tabs.nav.button.width')};
    transition: color ${dt('tabs.transition.duration')}, outline-color ${dt('tabs.transition.duration')}, box-shadow ${dt('tabs.transition.duration')};
    box-shadow: ${dt('tabs.nav.button.shadow')};
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: ${dt('tabs.nav.button.focus.ring.shadow')};
    outline: ${dt('tabs.nav.button.focus.ring.width')} ${dt('tabs.nav.button.focus.ring.style')} ${dt('tabs.nav.button.focus.ring.color')};
    outline-offset: ${dt('tabs.nav.button.focus.ring.offset')};
}

.p-tablist-nav-button:hover {
    color: ${dt('tabs.nav.button.hover.color')};
}

.p-tablist-prev-button {
    left: 0;
}

.p-tablist-next-button {
    right: 0;
}

.p-tab {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    position: relative;
    border-style: solid;
    white-space: nowrap;
    gap: ${dt('tabs.tab.gap')};
    background: ${dt('tabs.tab.background')};
    border-width: ${dt('tabs.tab.border.width')};
    border-color: ${dt('tabs.tab.border.color')};
    color: ${dt('tabs.tab.color')};
    padding: ${dt('tabs.tab.padding')};
    font-weight: ${dt('tabs.tab.font.weight')};
    transition: background ${dt('tabs.transition.duration')}, border-color ${dt('tabs.transition.duration')}, color ${dt('tabs.transition.duration')}, outline-color ${dt('tabs.transition.duration')}, box-shadow ${dt('tabs.transition.duration')};
    margin: ${dt('tabs.tab.margin')};
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: ${dt('tabs.tab.focus.ring.shadow')};
    outline: ${dt('tabs.tab.focus.ring.width')} ${dt('tabs.tab.focus.ring.style')} ${dt('tabs.tab.focus.ring.color')};
    outline-offset: ${dt('tabs.tab.focus.ring.offset')};
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: ${dt('tabs.tab.hover.background')};
    border-color: ${dt('tabs.tab.hover.border.color')};
    color: ${dt('tabs.tab.hover.color')};
}

.p-tab-active {
    background: ${dt('tabs.tab.active.background')};
    border-color: ${dt('tabs.tab.active.border.color')};
    color: ${dt('tabs.tab.active.color')};
}

.p-tabpanels {
    background: ${dt('tabs.tabpanel.background')};
    color: ${dt('tabs.tabpanel.color')};
    padding: ${dt('tabs.tabpanel.padding')};
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: ${dt('tabs.tabpanel.focus.ring.shadow')};
    outline: ${dt('tabs.tabpanel.focus.ring.width')} ${dt('tabs.tabpanel.focus.ring.style')} ${dt('tabs.tabpanel.focus.ring.color')};
    outline-offset: ${dt('tabs.tabpanel.focus.ring.offset')};
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    bottom: ${dt('tabs.active.bar.bottom')};
    height: ${dt('tabs.active.bar.height')};
    background: ${dt('tabs.active.bar.background')};
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`;

const classes = {
    root: ({ props }) => [
        'p-tabs p-component',
        {
            'p-tabs-scrollable': props.scrollable
        }
    ]
};

@Injectable()
export class TabsStyle extends BaseStyle {
    name = 'tabs';

    theme = theme;

    classes = classes;
}

/**
 *
 * Tabs facilitates seamless switching between different views.
 *
 * [Live Demo](https://www.primeng.org/tabs/)
 *
 * @module tabsstyle
 *
 */

export enum TabsClasses {
    /**
     * Class name of the root element
     */
    root = 'p-tabs',
    /**
     * Class name of the wrapper element
     */
    list = 'p-tablist',
    /**
     * Class name of the content element
     */
    content = 'p-tablist-content',
    /**
     * Class name of the tab list element
     */
    tablist = 'p-tablist-tab-list',
    /**
     * Class name of the tab list element
     */
    tab = 'p-tab',
    /**
     * Class name of the inkbar element
     */
    inkbar = 'p-tablist-active-bar',
    /**
     * Class name of the navigation buttons
     */
    button = 'p-tablist-nav-button',
    /**
     * Class name of the tab panels wrapper
     */
    tabpanels = 'p-tabpanels',
    /**
     * Class name of the tab panel element
     */
    tabpanel = 'p-tabs-panel'
}

export interface TabsStyle extends BaseStyle {}
