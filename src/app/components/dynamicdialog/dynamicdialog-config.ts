/**
 * Dialogs can be created dynamically with any component as the content using a DialogService.
 * @group Components
 */
export class DynamicDialogConfig<T = any> {
    /**
     * An object to pass to the component loaded inside the Dialog.
     * @group Props
     */
    data?: T;
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
    closeOnEscape?: boolean;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex?: number;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex?: boolean;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    dismissableMask?: boolean;
    /**
     * Inline style of the component.
     * @group Props
     */
    rtl?: boolean;
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
    closable?: boolean;
    /**
     * Whether to show the header or not.
     * @group Props
     */
    showHeader?: boolean;
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @group Props
     */
    modal?: boolean;
    /**
     * Style class of the mask.
     * @group Props
     */
    maskStyleClass?: string;
    /**
     * Enables resizing of the content.
     * @group Props
     */
    resizable?: boolean;
    /**
     * Enables dragging to change the position using header.
     * @group Props
     */
    draggable?: boolean;
    /**
     * Keeps dialog in the viewport.
     * @group Props
     */
    keepInViewport?: boolean;
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
     * When enabled, first button receives focus on show.
     * @group Props
     */
    focusOnShow?: boolean;
    /**
     * Whether the dialog can be displayed full screen.
     * @group Props
     */
    maximizable?: boolean;
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
    duplicate?: boolean;
}
