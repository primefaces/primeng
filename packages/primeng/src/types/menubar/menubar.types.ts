import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import type { BadgePassThrough } from 'primeng/types/badge';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Menubar.pt}
 * @group Interface
 */
export interface MenubarPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the root list's DOM element.
     */
    rootList?: PassThroughOption<HTMLUListElement, I>;
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
     * Used to pass attributes to the separator's DOM element.
     */
    separator?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the mobile menu button's DOM element.
     */
    button?: PassThroughOption<HTMLAnchorElement, I>;
    /**
     * Used to pass attributes to the mobile menu button icon's DOM element.
     */
    buttonIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the submenu's DOM element.
     */
    submenu?: PassThroughOption<HTMLUListElement, I>;
    /**
     * Used to pass attributes to the start of the component.
     */
    start?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the end of the component.
     */
    end?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to Badge component.
     * @see {@link BadgePassThrough}
     */
    pcBadge?: BadgePassThrough;
}

/**
 * Defines valid pass-through options in Menubar.
 * @see {@link MenubarPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type MenubarPassThrough<I = unknown> = PassThrough<I, MenubarPassThroughOptions<I>>;

/**
 * Defines valid templates in Menubar.
 * @group Templates
 */
export interface MenubarTemplates {
    /**
     * Custom item template.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: MenuItem;
        /**
         * Whether root or not
         */
        root: boolean;
    }): TemplateRef<{ $implicit: MenuItem; root: boolean }>;
    /**
     * Custom template of start.
     */
    start(): TemplateRef<any>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<any>;
    /**
     * Custom template of menuicon.
     */
    menuicon(): TemplateRef<any>;
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
}
