/**
 * Custom change event.
 * @see {@link Rating.onRate}
 */
export interface RatingRateEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Selected option value
     */
    value: number;
}