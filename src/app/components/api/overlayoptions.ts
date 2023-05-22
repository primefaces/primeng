import { AnimationEvent } from '@angular/animations';

/**
 * Represents the type of overlay mode, which can be 'modal', 'overlay', or undefined.
 */
export type OverlayModeType = 'modal' | 'overlay' | undefined;

/**
 * Represents the type of direction for a responsive overlay, which can be one of the specified values or undefined.
 */
export type ResponsiveOverlayDirectionType = 'center' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | undefined;

/**
 * Represents the options for an overlay listener.
 */
export interface OverlayListenerOptions {
    /**
     * The type of listener, which can be 'scroll', 'outside', 'resize', or undefined.
     */
    type?: 'scroll' | 'outside' | 'resize' | undefined;
    /**
     * The mode of the overlay listener.
     */
    mode?: OverlayModeType;
    /**
     * Indicates whether the overlay listener is valid.
     */
    valid?: boolean;
}

/**
 * Represents the options for a responsive overlay.
 */
export interface ResponsiveOverlayOptions {
    /**
     * The inline style for the responsive overlay.
     */
    style?: any;
    /**
     * The CSS class for the responsive overlay.
     */
    styleClass?: string;
    /**
     * The inline style for the content of the responsive overlay.
     */
    contentStyle?: any;
    /**
     * The CSS class for the content of the responsive overlay.
     */
    contentStyleClass?: string;
    /**
     * The breakpoint for the responsive overlay.
     */
    breakpoint?: string;
    /**
     * The media query for the responsive overlay.
     */
    media?: string;
    /**
     * The direction for the responsive overlay.
     */
    direction?: ResponsiveOverlayDirectionType;
}

/**
 * Represents an event that occurs when an overlay is shown.
 */
export interface OverlayOnShowEvent {
    /**
     * The overlay element.
     */
    overlay?: HTMLElement | undefined;
    /**
     * The target element.
     */
    target?: HTMLElement | undefined;
    /**
     * The mode of the overlay.
     */
    mode?: OverlayModeType;
}

/**
 * Represents an event that occurs before an overlay is shown.
 */
export interface OverlayOnBeforeShowEvent extends OverlayOnShowEvent {}
/**
 * Represents an event that occurs before an overlay is hidden.
 */
export interface OverlayOnBeforeHideEvent extends OverlayOnBeforeShowEvent {}
/**
 * Represents an event that occurs when an overlay is hidden.
 */
export interface OverlayOnHideEvent extends OverlayOnShowEvent {}
/**
 * Represents the options for an overlay.
 */
export interface OverlayOptions {
    /**
     * The mode of the overlay.
     */
    mode?: OverlayModeType;
    /**
     * The inline style for the overlay.
     */
    style?: any;
    /**
     * The CSS class for the overlay.
     */
    styleClass?: string;
    /**
     * The inline style for the content of the overlay.
     */
    contentStyle?: any;
    /**
     * The CSS class for the content of the overlay.
     */
    contentStyleClass?: string;
    /**
     * The target element.
     */
    target?: any;
    /**
     * The element or location where the overlay should be appended.
     */
    appendTo?: 'body' | HTMLElement | undefined;
    /**
     * Indicates whether the overlay should have an auto-generated z-index.
     */
    autoZIndex?: boolean;
    /**
     * The base z-index value for the overlay.
     */
    baseZIndex?: number;
    /**
     * The transition options for showing the overlay.
     */
    showTransitionOptions?: string;
    /**
     * The transition options for hiding the overlay.
     */
    hideTransitionOptions?: string;
    /**
     * Indicates whether the overlay should be hidden when the escape key is pressed.
     */
    hideOnEscape?: boolean;
    /**
     * A listener function for handling events related to the overlay.
     */
    listener?: (event: Event, options?: OverlayListenerOptions) => boolean | void;
    /**
     * The options for a responsive overlay.
     */
    responsive?: ResponsiveOverlayOptions | undefined;
    /**
     * A callback function that is invoked before the overlay is shown.
     */
    onBeforeShow?: (event?: OverlayOnBeforeShowEvent) => void;
    /**
     * A callback function that is invoked when the overlay is shown.
     */
    onShow?: (event?: OverlayOnShowEvent) => void;
    /**
     * A callback function that is invoked before the overlay is hidden.
     */
    onBeforeHide?: (event?: OverlayOnBeforeHideEvent) => void;
    /**
     * A callback function that is invoked when the overlay is hidden.
     */
    onHide?: (event?: OverlayOnHideEvent) => void;
    /**
     * A callback function that is invoked when the overlay's animation starts.
     */
    onAnimationStart?: (event?: AnimationEvent) => void;
    /**
     * A callback function that is invoked when the overlay's animation is done.
     */
    onAnimationDone?: (event?: AnimationEvent) => void;
}
