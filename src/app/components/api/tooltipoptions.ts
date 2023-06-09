import { ElementRef, TemplateRef } from "@angular/core";

/**
 * Defines options of Tooltip.
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
}
