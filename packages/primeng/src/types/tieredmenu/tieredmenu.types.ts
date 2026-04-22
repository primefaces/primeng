import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link TieredMenu.pt}
 * @group Interface
 */
export interface TieredMenuPassThroughOptions<I = unknown> {
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
    submenuIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the separator's DOM element.
     */
    separator?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in TieredMenu.
 * @see {@link TieredMenuPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TieredMenuPassThrough<I = unknown> = PassThrough<I, TieredMenuPassThroughOptions<I>>;

/**
 * Custom item template context.
 * @group Interface
 */
export interface TieredMenuItemTemplateContext {
    /**
     * Item instance.
     */
    $implicit: any;
    /**
     * Whether the item has a submenu.
     */
    hasSubmenu: boolean;
}

/**
 * Defines valid templates in TieredMenu.
 * @group Templates
 */
export interface TieredMenuTemplates {
    /**
     * Custom item template.
     * @param {TieredMenuItemTemplateContext} context - item context.
     */
    item(context: TieredMenuItemTemplateContext): TemplateRef<TieredMenuItemTemplateContext>;
    /**
     * Custom submenu icon template.
     */
    submenuicon(): TemplateRef<void>;
}
