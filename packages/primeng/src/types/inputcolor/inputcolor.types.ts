import type { PassThrough, PassThroughOption } from 'primeng/api';

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
