import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import type { BadgePassThrough } from 'primeng/types/badge';
import type { CSSProperties } from 'primeng/types/shared';

/**
 * Processed menu item structure used internally.
 * @group Interface
 */
export interface ProcessedMenuItem {
    item: MenuItem;
    index: number;
    level: number;
    key: string;
    parent: ProcessedMenuItem | Record<string, never>;
    parentKey: string;
    items?: ProcessedMenuItem[];
}

/**
 * Focused item info structure.
 * @group Interface
 */
export interface FocusedItemInfo {
    index: number;
    level: number;
    parentKey: string;
    item: MenuItem | null;
}

/**
 * Item click event.
 * @group Events
 */
export interface MenubarItemClickEvent {
    originalEvent: Event;
    processedItem: ProcessedMenuItem;
    isFocus?: boolean;
}

/**
 * Item mouse enter event.
 * @group Events
 */
export interface MenubarItemMouseEnterEvent {
    originalEvent: Event;
    processedItem: ProcessedMenuItem;
}

/**
 * Menubar inline styles.
 * @group Interface
 */
export interface MenubarInlineStyles {
    root?: CSSProperties;
    submenu?: CSSProperties;
}

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
 * Custom item template context.
 * @group Interface
 */
export interface MenubarItemTemplateContext {
    /**
     * Menu item instance.
     */
    $implicit: MenuItem;
    /**
     * Whether the item is at the root level.
     */
    root: boolean;
}

/**
 * Defines valid templates in Menubar.
 * @group Templates
 */
export interface MenubarTemplates {
    /**
     * Custom item template.
     * @param {Object} context - item context.
     */
    item(context: MenubarItemTemplateContext): TemplateRef<MenubarItemTemplateContext>;
    /**
     * Custom template of start.
     */
    start(): TemplateRef<void>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<void>;
    /**
     * Custom template of menu icon.
     */
    menuicon(): TemplateRef<void>;
    /**
     * Custom template of submenu icon.
     */
    submenuicon(): TemplateRef<void>;
}
