import { Slider } from './slider';
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
