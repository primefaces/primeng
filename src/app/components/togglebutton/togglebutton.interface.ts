/**
 * Custom change event.
 * @see {@link ToggleButton.onChange}
 * @event
 */
export interface ToggleButtonChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Boolean value to represent checked state.
     */
    checked: boolean | undefined;
}
