import { ElementRef, TemplateRef } from '@angular/core';
import { QueryParamsHandling } from '@angular/router';

/**
 * MenuItem provides the following properties. Note that not all of them may be utilized by the tabmenu component.
 * @group Interface
 */
export interface MenuItem {
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
    items?: MenuItem[];
    /**
     * Visibility of submenu.
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
     * Whether to escape the label or not. Set to false to display html content.
     */
    escape?: boolean;
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
     * Tooltip of the item.
     */
    tooltip?: string;
    /**
     * Position of the tooltip item.
     */
    tooltipPosition?: string;
    /**
     * Style class of the badge.
     */
    badgeStyleClass?: string;
    /**
     * Inline style of the menuitem.
     */
    style?: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the menuitem.
     */
    styleClass?: string;
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
     * Inline style of the item's icon.
     */
    iconStyle?: { [klass: string]: any } | null | undefined;
    /**
     * Class of the item's icon.
     */
    iconClass?: string;
    /**
     * Developer-defined state that can be passed to any navigation.
     * @see {MenuItemState}
     */
    state?: {[k: string]: any};
    /**
     * Options of the item's tooltip.
     * @see {TooltipOptions}
     */
    tooltipOptions?: TooltipOptions;
}
/**
 * Tooltip options of MenuItem provides the following properties.
 * @group Interface
 */
export interface TooltipOptions {
    /**
     * Label of tooltip.
     */
    tooltipLabel?: string;
    /**
     * Position of tooltip.
     */
    tooltipPosition?:  'right' | 'left' | 'top' | 'bottom';
    /**
     * Position of tooltip.
     */
    tooltipEvent?: 'hover' | 'focus';
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     */
    appendTo?: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Type of CSS position.
     */
    positionStyle?: string;
    /**
     * Style class of the tooltip.
     */
    tooltipStyleClass?: string;
    /**
     * Whether the z-index should be managed automatically to always go on top or have a fixed value.
     */
    tooltipZIndex?: string;
    /**
     * By default the tooltip contents are rendered as text. Set to false to support html tags in the content.
     */
    escape?: boolean;
    /**
     * When present, it specifies that the component should be disabled.
     */
    disabled?: boolean;
    /**
     * Specifies the additional vertical offset of the tooltip from its default position.
     */
    positionTop?: number;
    /**
     * Specifies the additional horizontal offset of the tooltip from its default position.
     */
    positionLeft?: number;
    /**
     * Delay to show the tooltip in milliseconds.
     */
    showDelay?: number;
    /**
     * Delay to hide the tooltip in milliseconds.
     */
    hideDelay?: number;
    /**
     * Time to wait in milliseconds to hide the tooltip even it is active.
     */
    life?: number;
};