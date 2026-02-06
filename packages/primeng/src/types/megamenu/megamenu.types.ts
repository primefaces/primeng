import { TemplateRef } from '@angular/core';
import type { MegaMenuItem, MenuItem, PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Orientation of the megamenu.
 * @group Types
 */
export type MegaMenuOrientation = 'horizontal' | 'vertical';

/**
 * Processed menu item structure used internally.
 * @group Interface
 */
export interface ProcessedMegaMenuItem {
    item: MegaMenuItem;
    index: number;
    level: number;
    key: string;
    parent: ProcessedMegaMenuItem | Record<string, never>;
    parentKey: string;
    columnIndex?: number;
    items?: ProcessedMegaMenuItem[][] | ProcessedMegaMenuItem[];
}

/**
 * Focused item info structure.
 * @group Interface
 */
export interface MegaMenuFocusedItemInfo {
    index: number;
    level: number;
    parentKey: string;
    key?: string;
    item: MegaMenuItem | null;
}

/**
 * Item click event.
 * @group Events
 */
export interface MegaMenuItemClickEvent {
    originalEvent: Event;
    processedItem: ProcessedMegaMenuItem;
    isFocus?: boolean;
}

/**
 * Item mouse enter event.
 * @group Events
 */
export interface MegaMenuItemMouseEnterEvent {
    originalEvent: Event;
    processedItem: ProcessedMegaMenuItem;
}

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link MegaMenu.pt}
 * @group Interface
 */
export interface MegaMenuPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the start's DOM element.
     */
    start?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the button's DOM element.
     */
    button?: PassThroughOption<HTMLAnchorElement, I>;
    /**
     * Used to pass attributes to the button icon's DOM element.
     */
    buttonIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root list's DOM element.
     */
    rootList?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the submenu label's DOM element.
     */
    submenuLabel?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the separator's DOM element.
     */
    separator?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the item's DOM element.
     */
    item?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the item content's DOM element.
     */
    itemContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the item link's DOM element.
     */
    itemLink?: PassThroughOption<HTMLAnchorElement, I>;
    /**
     * Used to pass attributes to the item icon's DOM element.
     */
    itemIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the item label's DOM element.
     */
    itemLabel?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the submenu icon's DOM element.
     */
    submenuIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the overlay's DOM element.
     */
    overlay?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the grid's DOM element.
     */
    grid?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the column's DOM element.
     */
    column?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the submenu's DOM element.
     */
    submenu?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the end's DOM element.
     */
    end?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in MegaMenu.
 * @see {@link MegaMenuPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type MegaMenuPassThrough<I = unknown> = PassThrough<I, MegaMenuPassThroughOptions<I>>;

/**
 * Custom item template context.
 * @group Interface
 */
export interface MegaMenuItemTemplateContext {
    /**
     * Menu item instance.
     */
    $implicit: MenuItem;
}

/**
 * Defines valid templates in MegaMenu.
 * @group Templates
 */
export interface MegaMenuTemplates {
    /**
     * Custom item template.
     * @param {Object} context - item context.
     */
    item(context: MegaMenuItemTemplateContext): TemplateRef<MegaMenuItemTemplateContext>;
    /**
     * Custom template of start.
     */
    start(): TemplateRef<void>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<void>;
    /**
     * Custom template of submenu icon.
     */
    submenuicon(): TemplateRef<void>;
    /**
     * Custom menu button template on responsive mode.
     */
    button(): TemplateRef<void>;
    /**
     * Custom menu button icon template on responsive mode.
     */
    buttonicon(): TemplateRef<void>;
    /**
     * Custom menu icon template.
     */
    menuicon(): TemplateRef<void>;
}
