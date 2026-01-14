import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { MenuItem, PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Menu.pt}
 * @group Interface
 */
export interface MenuPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the start's DOM element.
     */
    start?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the list's DOM element.
     */
    list?: PassThroughOption<HTMLUListElement, I>;
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
     * Used to pass attributes to the end's DOM element.
     */
    end?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in Menu.
 * @see {@link MenuPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type MenuPassThrough<I = unknown> = PassThrough<I, MenuPassThroughOptions<I>>;

/**
 * Custom item template context.
 * @group Interface
 */
export interface MenuItemTemplateContext {
    /**
     * Menu item instance.
     */
    $implicit: MenuItem;
}

/**
 * Custom submenu header template context.
 * @group Interface
 */
export interface MenuSubmenuHeaderTemplateContext {
    /**
     * Submenu item instance.
     */
    $implicit: MenuItem;
}

/**
 * Defines valid templates in Menu.
 * @group Templates
 */
export interface MenuTemplates {
    /**
     * Custom template of start.
     */
    start(): TemplateRef<void>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<void>;
    /**
     * Custom template of item.
     * @param {Object} context - item context.
     */
    item(context: MenuItemTemplateContext): TemplateRef<MenuItemTemplateContext>;
    /**
     * Custom template of submenu header.
     * @param {Object} context - submenu header context.
     */
    submenuheader(context: MenuSubmenuHeaderTemplateContext): TemplateRef<MenuSubmenuHeaderTemplateContext>;
}
