import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';
import type { MenuItem, PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Processed menu item used internally.
 * @group Interface
 */
export interface TieredMenuProcessedItem {
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
    parent: TieredMenuProcessedItem | Record<string, never>;
    /**
     * Parent key.
     */
    parentKey: string;
    /**
     * Child processed items.
     */
    items: TieredMenuProcessedItem[];
}

/**
 * Focused item info used internally.
 * @group Interface
 */
export interface TieredMenuFocusedItemInfo {
    /**
     * Index of the focused item.
     */
    index: number;
    /**
     * Nesting level of the focused item.
     */
    level?: number;
    /**
     * Parent key of the focused item.
     */
    parentKey: string;
    /**
     * Focused item instance.
     */
    item?: MenuItem | null;
}

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
 * Item click event.
 * @group Interface
 */
export interface TieredMenuItemClickEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Processed item instance.
     */
    processedItem: TieredMenuProcessedItem;
    /**
     * Whether to focus the menu.
     */
    isFocus?: boolean;
}

/**
 * Item mouse enter event.
 * @group Interface
 */
export interface TieredMenuItemMouseEnterEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Processed item instance.
     */
    processedItem: TieredMenuProcessedItem;
    /**
     * Whether to focus the menu.
     */
    focus?: boolean;
}

/**
 * Toggle event.
 * @group Interface
 */
export interface TieredMenuToggleEvent {
    /**
     * Current target element.
     */
    currentTarget?: EventTarget | null;
    /**
     * Related target element.
     */
    relatedTarget?: EventTarget | null;
    /**
     * Whether to use relative alignment.
     */
    relativeAlign?: boolean;
}

/**
 * Custom item template context.
 * @group Interface
 */
export interface TieredMenuItemTemplateContext {
    /**
     * Item instance.
     */
    $implicit: MenuItem;
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
