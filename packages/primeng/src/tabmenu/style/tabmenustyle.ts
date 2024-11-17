import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `

/* For PrimeNG */
.p-tabmenu.p-component {
    display: flex;
    flex-direction: column;
}

.p-tabmenu-nav-container {
    display: flex;
    position: relative;
}

.p-tabmenu.p-tabmenu-scrollable .p-tabmenu-nav-container {
    overflow: hidden;
}

.p-tabmenu-nav-content {
    flex-grow: 1;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tabmenu-nav {
    padding: 0;
    margin: 0;
    list-style-type: none;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    background: ${dt('tabs.tablist.background')};
    border-style: solid;
    border-color: ${dt('tabs.tablist.border.color')};
    border-width: ${dt('tabs.tablist.border.width')};
}

.p-tabmenuitem {
    display: flex;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;
    border-style: solid;
    background: ${dt('tabs.tab.background')};
    border-width: ${dt('tabs.tab.border.width')};
    border-color: ${dt('tabs.tab.border.color')};
    padding: ${dt('tabs.tab.padding')};
    transition: background ${dt('tabs.transition.duration')}, border-color ${dt('tabs.transition.duration')}, color ${dt('tabs.transition.duration')}, outline-color ${dt('tabs.transition.duration')}, box-shadow ${dt('tabs.transition.duration')};
    margin: ${dt('tabs.tab.margin')};
    outline-color: transparent;
}

.p-tabmenuitem > .p-menuitem-link {
    white-space: nowrap;
    user-select: none;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    gap: ${dt('tabs.tab.gap')};
    color: ${dt('tabs.tab.color')};
    font-weight: ${dt('tabs.tab.font.weight')};
}

.p-tabmenuitem.p-tabmenuitem-active .p-menuitem-link {
    color: ${dt('tabs.tab.active.color')};
}

.p-tabmenuitem:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: ${dt('tabs.tab.focus.ring.shadow')};
    outline: ${dt('tabs.tab.focus.ring.width')} ${dt('tabs.tab.focus.ring.style')} ${dt('tabs.tab.focus.ring.color')};
    outline-offset: ${dt('tabs.tab.focus.ring.offset')};
}

.p-tabmenuitem:not(.p-tabmenuitem-active):not(.p-disabled):hover {
    background: ${dt('tabs.tab.hover.background')};
    border-color: ${dt('tabs.tab.hover.border.color')};
    color: ${dt('tabs.tab.hover.color')};
}

.p-tabmenuitem-active {
    background: ${dt('tabs.tab.active.background')};
    border-color: ${dt('tabs.tab.active.border.color')};
    color: ${dt('tabs.tab.active.color')};
}

.p-tabmenuitem-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    bottom: ${dt('tabs.active.bar.bottom')};
    height: ${dt('tabs.active.bar.height')};
    background: ${dt('tabs.active.bar.background')};
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}

.p-tabmenu-nav-button {
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

.p-tabmenu-nav-button:focus-visible {
    z-index: 1;
    box-shadow: ${dt('tabs.nav.button.focus.ring.shadow')};
    outline: ${dt('tabs.nav.button.focus.ring.width')} ${dt('tabs.nav.button.focus.ring.style')} ${dt('tabs.nav.button.focus.ring.color')};
    outline-offset: ${dt('tabs.nav.button.focus.ring.offset')};
}

.p-tabmenu-nav-button:hover {
    color: ${dt('tabs.nav.button.hover.color')};
}

.p-tabmenu-nav-prev-button {
    left: 0;
}

.p-tabmenu-nav-next-button {
    right: 0;
}`;

@Injectable()
export class TabMenuStyle extends BaseStyle {
    name = 'tabs';

    theme = theme;
}

/**
 *
 * TabMenu is a navigation component that displays items as tab headers. Example below uses nested routes with TabMenu.
 *
 * [Live Demo](https://www.primeng.org/tabmenu/)
 *
 * @module tabmenustyle
 *
 */
export enum TabMenuClasses {
    /**
     * Class name of the root element
     */
    root = 'p-tabmenu',
    /**
     * Class name of the tablist element
     */
    tablist = 'p-tabmenu-tablist',
    /**
     * Class name of the item element
     */
    item = 'p-tabmenu-item',
    /**
     * Class name of the item link element
     */
    itemLink = 'p-tabmenu-item-link',
    /**
     * Class name of the item icon element
     */
    itemIcon = 'p-tabmenu-item-icon',
    /**
     * Class name of the item label element
     */
    itemLabel = 'p-tabmenu-item-label',
    /**
     * Class name of the inkbar element
     */
    inkbar = 'p-tabmenu-ink-bar'
}

export interface TabMenuStyle extends BaseStyle {}
