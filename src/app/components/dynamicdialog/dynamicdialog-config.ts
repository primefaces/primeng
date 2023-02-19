/**
 * Dialogs can be created dynamically with any component as the content using a DialogService.
 * @group Interface
 */
export class DynamicDialogConfig<T = any> {
    /**
     * An object to pass to the component loaded inside the Dialog.
     */
    data?: T;
    /**
     * Header text of the dialog.
     */
    header?: string;
    /**
     * Footer text of the dialog.
     */
    footer?: string;
    /**
     * Width of the dialog.
     */
    width?: string;
    /**
     * Height of the dialog.
     */
    height?: string;
    /**
     * Specifies if pressing escape key should hide the dialog.
     */
    closeOnEscape?: boolean;
    /**
     * Base zIndex value to use in layering.
     */
    baseZIndex?: number;
    /**
     * Whether to automatically manage layering.
     */
    autoZIndex?: boolean;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     */
    dismissableMask?: boolean;
    /**
     * Inline style of the component.
     */
    rtl?: boolean;
    /**
     * Inline style of the comopnent.
     */
    style?: { [klass: string]: any } | null | undefined;
    /**
     * Inline style of the content.
     */
    contentStyle?: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     */
    styleClass?: string;
    /**
     * Transition options of the animation.
     */
    transitionOptions?: string;
    /**
     * Adds a close icon to the header to hide the dialog.
     */
    closable?: boolean;
    /**
     * Whether to show the header or not.
     */
    showHeader?: boolean;
    /**
     * Defines if background should be blocked when dialog is displayed.
     */
    modal?: boolean;
    /**
     * Style class of the mask.
     */
    maskStyleClass?: string;
    /**
     * Enables resizing of the content.
     */
    resizable?: boolean;
    /**
     * Enables dragging to change the position using header.
     */
    draggable?: boolean;
    /**
     * Keeps dialog in the viewport.
     */
    keepInViewport?: boolean;
    /**
     * Minimum value for the left coordinate of dialog in dragging.
     */
    minX?: number;
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     */
    minY?: number;
    /**
     * Whether the dialog can be displayed full screen.
     */
    maximizable?: boolean;
    /**
     * Name of the maximize icon.
     */
    maximizeIcon?: string;
    /**
     * Name of the minimize icon.
     */
    minimizeIcon?: string;
    /**
     * Position of the dialog, options are "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left" or "bottom-right".
     */
    position?: string;
    /**
     * Whether to automatically focus.
     */
    autoFocus?: boolean;
}
