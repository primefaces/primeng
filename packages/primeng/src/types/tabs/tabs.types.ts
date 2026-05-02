import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines valid pass-through options in Tabs component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface TabsPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Tabs component.
 * @see {@link TabsPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TabsPassThrough<I = unknown> = PassThrough<I, TabsPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in TabList component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface TabListPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the previous button's DOM element.
     */
    prevButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the tab list's DOM element.
     */
    tabList?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the active bar's DOM element.
     */
    activeBar?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the next button's DOM element.
     */
    nextButton?: PassThroughOption<HTMLButtonElement, I>;
}

/**
 * Defines valid pass-through options in TabList component.
 * @see {@link TabListPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TabListPassThrough<I = unknown> = PassThrough<I, TabListPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in Tab component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface TabPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Tab component.
 * @see {@link TabPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TabPassThrough<I = unknown> = PassThrough<I, TabPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in TabPanel component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface TabPanelPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in TabPanel component.
 * @see {@link TabPanelPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TabPanelPassThrough<I = unknown> = PassThrough<I, TabPanelPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in TabPanels component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface TabPanelsPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in TabPanels component.
 * @see {@link TabPanelsPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TabPanelsPassThrough<I = unknown> = PassThrough<I, TabPanelsPassThroughOptions<I>>;
