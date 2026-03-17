import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';

/**
 * Defines valid pass-through options in InputColor component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColor component.
 * @see {@link InputColorPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type InputColorPassThrough<I = unknown> = PassThrough<I, InputColorPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorArea component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorAreaPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorArea component.
 */
export type InputColorAreaPassThrough<I = unknown> = PassThrough<I, InputColorAreaPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorSlider component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorSliderPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorSlider component.
 */
export type InputColorSliderPassThrough<I = unknown> = PassThrough<I, InputColorSliderPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorAreaBackground component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorAreaBackgroundPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorAreaBackground component.
 */
export type InputColorAreaBackgroundPassThrough<I = unknown> = PassThrough<I, InputColorAreaBackgroundPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorAreaThumb component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorAreaThumbPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorAreaThumb component.
 */
export type InputColorAreaThumbPassThrough<I = unknown> = PassThrough<I, InputColorAreaThumbPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorSliderTrack component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorSliderTrackPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorSliderTrack component.
 */
export type InputColorSliderTrackPassThrough<I = unknown> = PassThrough<I, InputColorSliderTrackPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorSliderThumb component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorSliderThumbPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorSliderThumb component.
 */
export type InputColorSliderThumbPassThrough<I = unknown> = PassThrough<I, InputColorSliderThumbPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorSwatch component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorSwatchPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorSwatch component.
 */
export type InputColorSwatchPassThrough<I = unknown> = PassThrough<I, InputColorSwatchPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorSwatchBackground component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorSwatchBackgroundPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorSwatchBackground component.
 */
export type InputColorSwatchBackgroundPassThrough<I = unknown> = PassThrough<I, InputColorSwatchBackgroundPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorTransparencyGrid component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorTransparencyGridPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in InputColorTransparencyGrid component.
 */
export type InputColorTransparencyGridPassThrough<I = unknown> = PassThrough<I, InputColorTransparencyGridPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in InputColorEyeDropper component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface InputColorEyeDropperPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the Button component.
     */
    pcButton?: ButtonPassThrough;
}

/**
 * Defines valid pass-through options in InputColorEyeDropper component.
 */
export type InputColorEyeDropperPassThrough<I = unknown> = PassThrough<I, InputColorEyeDropperPassThroughOptions<I>>;

/**
 * Custom value change event.
 * @group Interface
 */
export interface InputColorValueChangeEvent {
    /**
     * The color instance.
     */
    color: any;
    /**
     * Browser native event.
     */
    originalEvent?: Event;
}
