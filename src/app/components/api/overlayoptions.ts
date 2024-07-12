import { AnimationEvent } from '@angular/animations';

/**
 * Represents the type of overlay mode, which can be 'modal', 'overlay', or undefined.
 * @group Types
 */
export type OverlayModeType = 'modal' | 'overlay' | undefined;

/**
 * Represents the type of maximum width option, which can be a number, a number followed by 'px', or a number followed by 'vw'.
 * @group Types
 */
export type MaxWidthOption = number | `${number}px` | `${number}vw`;

/**
 * Represents the type of maximum width options, which can be a boolean, a number, a number followed by 'px', a number followed by 'vw', or an array of values.
 * @group Types
 */
export type MaxWidthOptions = boolean | MaxWidthOption | MaxWidthOption[];

/**
 * Represents the type of direction for a responsive overlay, which can be one of the specified values or undefined.
 * @group Types
 */
export type ResponsiveOverlayDirectionType = 'center' | 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | undefined;

/**
 * Represents the options for an overlay listener.
 * @group Interface
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
 * @group Events
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
 * @group Events
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
 * @extends {OverlayOnShowEvent}
 * @group Events
 */
export interface OverlayOnBeforeShowEvent extends OverlayOnShowEvent {}
/**
 * Represents an event that occurs before an overlay is hidden.
 * @extends {OverlayOnBeforeShowEvent}
 * @group Events
 */
export interface OverlayOnBeforeHideEvent extends OverlayOnBeforeShowEvent {}
/**
 * Represents an event that occurs when an overlay is hidden.
 * @extends {OverlayOnShowEvent}
 * @group Events
 */
export interface OverlayOnHideEvent extends OverlayOnShowEvent {}
/**
 * Represents the options for an overlay.
 * @group Interface
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
     * Controls whether the overlay should have the minimum width of the control.
     * @default true
     */
    calculateMinWidth?: boolean;
    /**
     * Controls whether the overlay should have a maximum width.
     * - `true` will set the maximum width to the control's width.
     * - `false` will not set a maximum width.
     * - A number will set the maximum width to a multiple of the control's width.
     * - A number followed by 'px' will set the maximum width to a fixed size in pixels.
     * - A number followed by 'vw' will set the maximum width to a percentage of the viewport width.
     * Also accepts an array of values. The smallest value will be used.
     * @default false
     */
    calculateMaxWidth?: MaxWidthOptions;
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
