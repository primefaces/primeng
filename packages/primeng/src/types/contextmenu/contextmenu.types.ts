import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { MenuItem, PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ContextMenu.pt}
 * @group Interface
 */
export interface ContextMenuPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the root list's DOM element.
     */
    rootList?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the submenu's DOM element.
     */
    submenu?: PassThroughOption<HTMLUListElement, I>;
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
    submenuIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in ContextMenu.
 * @see {@link ContextMenuPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ContextMenuPassThrough<I = unknown> = PassThrough<I, ContextMenuPassThroughOptions<I>>;

/**
 * Processed menu item used internally.
 * @group Interface
 */
export interface ContextMenuProcessedItem {
    /**
     * Menu item instance.
     */
    item: MenuItem;
    /**
     * Index of the item in its parent.
     */
    index: number;
    /**
     * Nesting level of the item.
     */
    level: number;
    /**
     * Unique key of the item.
     */
    key: string;
    /**
     * Parent processed item.
     */
    parent: ContextMenuProcessedItem | Record<string, never>;
    /**
     * Parent key.
     */
    parentKey: string;
    /**
     * Child processed items.
     */
    items?: ContextMenuProcessedItem[];
}

/**
 * Custom item template context.
 * @group Interface
 */
export interface ContextMenuItemTemplateContext {
    /**
     * Menu item instance.
     */
    $implicit: MenuItem;
}

/**
 * Custom submenu icon template context.
 * @group Interface
 */
export interface ContextMenuSubmenuIconTemplateContext {
    /**
     * Style class of the submenu icon.
     */
    class: string;
}

/**
 * Defines valid templates in ContextMenu.
 * @group Templates
 */
export interface ContextMenuTemplates {
    /**
     * Custom item template.
     * @param {Object} context - item context.
     */
    item(context: ContextMenuItemTemplateContext): TemplateRef<ContextMenuItemTemplateContext>;
    /**
     * Custom submenu icon template.
     * @param {Object} context - icon context.
     */
    submenuicon(context: ContextMenuSubmenuIconTemplateContext): TemplateRef<ContextMenuSubmenuIconTemplateContext>;
}
