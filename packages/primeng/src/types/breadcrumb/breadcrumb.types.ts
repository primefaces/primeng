import { TemplateRef } from '@angular/core';
import type { MenuItem, PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Breadcrumb.pt}
 * @group Interface
 */
export interface BreadcrumbPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the list's DOM element.
     */
    list?: PassThroughOption<HTMLOListElement, I>;
    /**
     * Used to pass attributes to the home item's DOM element.
     */
    homeItem?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the item's DOM element.
     */
    item?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the item link's DOM element.
     */
    itemLink?: PassThroughOption<HTMLAnchorElement, I>;
    /**
     * Used to pass attributes to the item icon's DOM element.
     */
    itemIcon?: PassThroughOption<HTMLSpanElement | SVGElement, I>;
    /**
     * Used to pass attributes to the item label's DOM element.
     */
    itemLabel?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the separator's DOM element.
     */
    separator?: PassThroughOption<HTMLLIElement, I>;
    /**
     * Used to pass attributes to the separator icon's DOM element.
     */
    separatorIcon?: PassThroughOption<SVGElement, I>;
}

/**
 * Defines valid pass-through options in Breadcrumb.
 * @see {@link BreadcrumbPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type BreadcrumbPassThrough<I = unknown> = PassThrough<I, BreadcrumbPassThroughOptions<I>>;

/**
 * Defines clicked item event.
 * @see {@link BreadcrumbEmitsOptions.itemClick}
 */
export interface BreadcrumbItemClickEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Clicked item instance.
     */
    item: MenuItem;
}

/**
 * Custom item template context.
 * @group Interface
 */
export interface BreadcrumbItemTemplateContext {
    /**
     * Menu item instance.
     */
    $implicit: MenuItem;
}

/**
 * Defines valid templates in Breadcrumb.
 * @group Templates
 */
export interface BreadcrumbTemplates {
    /**
     * Custom item template.
     * @param {Object} context - item data.
     */
    item(context: BreadcrumbItemTemplateContext): TemplateRef<BreadcrumbItemTemplateContext>;
    /**
     * Custom separator template.
     */
    separator(): TemplateRef<void>;
}
