/**
 * Custom click event.
 * @see {@link RadioButton.onClick}
 * @event
 */
export interface RadioButtonClickEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Browser event.
     */
    value: any;
}
