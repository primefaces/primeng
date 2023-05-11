/**
 * Custom change event.
 * @see {@link InputSwitch.onChange}
 * @event
 */
export interface InputSwitchOnChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Checked state.
     */
    checked: boolean;
}
