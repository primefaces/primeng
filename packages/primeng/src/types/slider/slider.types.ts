import { PassThrough, PassThroughOption } from 'primeng/api';
import type { Slider } from 'primeng/slider';

/**
 * Custom passthrough(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Slider.pt}
 * @group Interface
 */
export interface SliderPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the range's DOM element.
     */
    range?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the handle's DOM element.
     */
    handle?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the start handler's DOM element.
     */
    startHandler?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the end handler's DOM element.
     */
    endHandler?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Defines valid pass-through options in Slider component.
 * @see {@link SliderPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type SliderPassThrough<I = unknown> = PassThrough<I, SliderPassThroughOptions<I>>;

/**
 * Custom change event.
 * @see {@link Slider.onChange}
 * @group Events
 */
export interface SliderChangeEvent {
    /**
     * Browser event.
     */
    event: Event;
    /**
     * New values.
     */
    values?: number[];
    /**
     * New value.
     */
    value?: number;
}
/**
 * Custom slide end event.
 * @see {@link Slider.onSlideEnd}
 * @group Events
 */
export interface SliderSlideEndEvent {
    /**
     * Original event
     */
    originalEvent: Event;
    /**
     * New value.
     */
    value?: number;
    /**
     * New values.
     */
    values?: number[];
}
