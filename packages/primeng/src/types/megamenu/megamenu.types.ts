import { TemplateRef } from '@angular/core';
import type { MenuItem, PassThrough, PassThroughOption } from 'primeng/api';
import type { MegaMenu } from 'primeng/megamenu';

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
 * Defines valid templates in MegaMenu.
 * @group Templates
 */
export interface MegaMenuTemplates {
    /**
     * Custom item template.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: MenuItem;
    }): TemplateRef<{ $implicit: MenuItem }>;
    /**
     * Custom template of start.
     */
    start(): TemplateRef<any>;
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<any>;
}
