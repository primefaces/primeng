import { QueryParamsHandling } from '@angular/router';
import { MenuItem } from './menuitem';

/**
 * MegaMenuItem API provides the following properties.
 */
export interface MegaMenuItem {
    /**
     * Text of the item.
     */
    label?: string;
    /**
     * Icon of the item.
     */
    icon?: string;
    /**
     * Callback to execute when item is clicked.
     */
    command?: (event?: any) => void;
    /**
     * External link to navigate when item is clicked.
     */
    url?: string;
    /**
     * An array of children menuitems.
     */
    items?: MenuItem[][];
    /**
     * Specifies whether the mega menu item is expanded.
     */
    expanded?: boolean;
    /**
     * When set as true, disables the menuitem.
     */
    disabled?: boolean;
    /**
     * Whether the dom element of menuitem is created or not.
     */
    visible?: boolean;
    /**
     * Specifies where to open the linked document.
     */
    target?: string;
    /**
     * Configuration for active router link.
     */
    routerLinkActiveOptions?: any;
    /**
     * Defines the item as a separator.
     */
    separator?: boolean;
    /**
     * Value of the badge.
     */
    badge?: string;
    /**
     * Style class of the badge.
     */
    badgeStyleClass?: string;
    /**
     * Inline style of the menuitem.
     */
    style?: any;
    /**
     * Style class of the menuitem.
     */
    styleClass?: string;
    /**
     * Inline style of the item's icon.
     */
    iconStyle?: any;
    /**
     * Tooltip text of the item.
     */
    title?: string;
    /**
     * Identifier of the element.
     */
    id?: string;
    /**
     * Value of HTML data-* attribute.
     */
    automationId?: any;
    /**
     * Specifies tab order of the item.
     */
    tabindex?: string;
    /**
     * RouterLink definition for internal navigation.
     */
    routerLink?: any;
    /**
     * Query parameters for internal navigation via routerLink.
     */
    queryParams?: { [k: string]: any };
    /**
     * Sets the hash fragment for the URL.
     */
    fragment?: string;
    /**
     *  How to handle query parameters in the router link for the next navigation. One of:
        merge : Merge new with current parameters.
        preserve : Preserve current parameters.k.
     */
    queryParamsHandling?: QueryParamsHandling;
    /**
     * When true, preserves the URL fragment for the next navigation.
     */
    preserveFragment?: boolean;
    /**
     * When true, navigates without pushing a new state into history.
     */
    skipLocationChange?: boolean;
    /**
     * When true, navigates while replacing the current state in history.
     */
    replaceUrl?: boolean;
    /**
     * Developer-defined state that can be passed to any navigation.
     */
    state?: {
        [k: string]: any;
    };
}
