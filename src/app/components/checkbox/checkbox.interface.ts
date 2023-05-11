/**
 * Custom change event.
 * @see {@link Checkbox.onChange}
 * @event
 */
export interface CheckboxChangeEvent {
    /**
     * Checked value.
     */
    checked?: any, 
    /**
     * Browser event.
     */
    originalEvent?: Event
}