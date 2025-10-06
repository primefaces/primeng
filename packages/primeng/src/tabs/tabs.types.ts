import { PassThrough, PassThroughOption } from 'primeng/api';
import { Tab } from './tab';
import { TabList } from './tablist';
import { TabPanel } from './tabpanel';
import { TabPanels } from './tabpanels';
import { Tabs } from './tabs';

/**
 * Defines passthrough(pt) options type in Tabs component.
 */
export declare type TabsPassThroughOption<E> = PassThroughOption<E, Tabs>;

/**
 * Custom passthrough(pt) options for Tabs.
 * @see {@link TabsProps.pt}
 */
export interface TabsPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: TabsPassThroughOption<HTMLElement>;
}

export type TabsPassThrough = PassThrough<Tabs, TabsPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in TabList component.
 */
export declare type TabListPassThroughOption<E> = PassThroughOption<E, TabList>;

/**
 * Custom passthrough(pt) options for TabList.
 * @see {@link TabListProps.pt}
 */
export interface TabListPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: TabListPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the previous button's DOM element.
     */
    prevButton?: TabListPassThroughOption<HTMLButtonElement>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: TabListPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the tab list's DOM element.
     */
    tabList?: TabListPassThroughOption<HTMLDivElement>;
    /**
     * Used to pass attributes to the active bar's DOM element.
     */
    activeBar?: TabListPassThroughOption<HTMLSpanElement>;
    /**
     * Used to pass attributes to the next button's DOM element.
     */
    nextButton?: TabListPassThroughOption<HTMLButtonElement>;
}

export type TabListPassThrough = PassThrough<TabList, TabListPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in Tab component.
 */
export declare type TabPassThroughOption<E> = PassThroughOption<E, Tab>;

/**
 * Custom passthrough(pt) options for Tab.
 * @see {@link TabProps.pt}
 */
export interface TabPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: TabPassThroughOption<HTMLElement>;
}

export type TabPassThrough = PassThrough<Tab, TabPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in TabPanel component.
 */
export declare type TabPanelPassThroughOption<E> = PassThroughOption<E, TabPanel>;

/**
 * Custom passthrough(pt) options for TabPanel.
 * @see {@link TabPanelProps.pt}
 */
export interface TabPanelPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: TabPanelPassThroughOption<HTMLElement>;
}

export type TabPanelPassThrough = PassThrough<TabPanel, TabPanelPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in TabPanels component.
 */
export declare type TabPanelsPassThroughOption<E> = PassThroughOption<E, TabPanels>;

/**
 * Custom passthrough(pt) options for TabPanels.
 * @see {@link TabPanelsProps.pt}
 */
export interface TabPanelsPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: TabPanelsPassThroughOption<HTMLElement>;
}

export type TabPanelsPassThrough = PassThrough<TabPanels, TabPanelsPassThroughOptions>;
