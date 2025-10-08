import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link PanelMenuProps.pt}
 * @group Interface
 */
export interface PanelMenuPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    panel?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header content's DOM element.
     */
    headerContent?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header link's DOM element.
     */
    headerLink?: PassThroughOption<HTMLAnchorElement, I>;
    /**
     * Used to pass attributes to the submenu icon's DOM element.
     */
    submenuIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the header icon's DOM element.
     */
    headerIcon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the header label's DOM element.
     */
    headerLabel?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the toggleable content's DOM element.
     */
    contentContainer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the menu content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
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
     * Used to pass attributes to the separator's DOM element.
     */
    separator?: PassThroughOption<HTMLLIElement, I>;
}

/**
 * Defines valid pass-through options in PanelMenu.
 * @see {@link PanelMenuPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type PanelMenuPassThrough<I = unknown> = PassThrough<I, PanelMenuPassThroughOptions<I>>;
