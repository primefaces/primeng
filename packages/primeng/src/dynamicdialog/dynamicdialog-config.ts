import { Type } from '@angular/core';

/**
 * Dialogs can be created dynamically with any component as the content using a DialogService.
 * @group Components
 */
export class DynamicDialogConfig<DataType = any, InputValuesType extends Record<string, any> = {}> {
    /**
     * An object to pass to the component loaded inside the Dialog.
     * @group Props
     */
    data?: DataType;
    /**
     * An object to pass to the component loaded inside the Dialog.
     * @group Props
     */
    inputValues?: InputValuesType;
    /**
     * Header text of the dialog.
     * @group Props
     */
    header?: string;
    /**
     * Identifies the element (or elements) that labels the element it is applied to.
     * @group Props
     */
    ariaLabelledBy?: string;
    /**
     * Footer text of the dialog.
     * @group Props
     */
    footer?: string;
    /**
     * Width of the dialog.
     * @group Props
     */
    width?: string;
    /**
     * Height of the dialog.
     * @group Props
     */
    height?: string;
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @group Props
     */
    closeOnEscape?: boolean = false;
    /**
     * Specifies if autofocus should happen on show.
     * @group Props
     */
    focusOnShow?: boolean = true;
    /**
     * When enabled, can only focus on elements inside the dialog.
     * @group Props
     */
    focusTrap?: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex?: number;
    /**
     * Whether to re-enforce layering through applying zIndex.
     * @group Props
     */
    autoZIndex?: boolean = false;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    dismissableMask?: boolean = false;
    /**
     * Inline style of the component.
     * @group Props
     */
    rtl?: boolean = false;
    /**
     * Inline style of the comopnent.
     * @group Props
     */
    style?: { [klass: string]: any } | null | undefined;
    /**
     * Inline style of the content.
     * @group Props
     */
    contentStyle?: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass?: string;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions?: string;
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    closable?: boolean = false;
    /**
     * Whether to show the header or not.
     * @group Props
     */
    showHeader?: boolean = false;
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @group Props
     */
    modal?: boolean = false;
    /**
     * Style class of the mask.
     * @group Props
     */
    maskStyleClass?: string;
    /**
     * Enables resizing of the content.
     * @group Props
     */
    resizable?: boolean = false;
    /**
     * Enables dragging to change the position using header.
     * @group Props
     */
    draggable?: boolean = false;
    /**
     * Keeps dialog in the viewport.
     * @group Props
     */
    keepInViewport?: boolean = false;
    /**
     * Minimum value for the left coordinate of dialog in dragging.
     * @group Props
     */
    minX?: number;
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     * @group Props
     */
    minY?: number;
    /**
     * Whether the dialog can be displayed full screen.
     * @group Props
     */
    maximizable?: boolean = false;
    /**
     * Name of the maximize icon.
     * @group Props
     */
    maximizeIcon?: string;
    /**
     * Name of the minimize icon.
     * @group Props
     */
    minimizeIcon?: string;
    /**
     * Position of the dialog, options are "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left" or "bottom-right".
     * @group Props
     */
    position?: string;
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    closeAriaLabel?: string;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo?: any;
    /**
     * A boolean to determine if it can be duplicate.
     * @group Props
     */
    duplicate?: boolean = false;
    /**
     * Object literal to define widths per screen size.
     * @group Props
     */
    breakpoints?: any;
    /**
     * Dialog templates.
     * @group Props
     */
    templates?: DynamicDialogTemplates;
}

/**
 * Defines valid templates in Dynamic Dialog.
 * @group Interface
 */
export interface DynamicDialogTemplates {
    /**
     * Template of the header.
     */
    header?: Type<any>;
    /**
     * Template of the content.
     */
    content?: Type<any>;
    /**
     * Template of the footer.
     */
    footer?: Type<any>;
    /**
     * Template of the minimize icon.
     */
    minimizeicon?: Type<any>;
    /**
     * Template of the maximize icon.
     */
    maximizeicon?: Type<any>;
    /**
     * Template of the close icon.
     */
    closeicon?: Type<any>;
}
