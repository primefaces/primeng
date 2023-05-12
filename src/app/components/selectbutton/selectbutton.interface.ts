/**
 * Custom click event.
 * @see {@link SelectButton.onOptionClick}
 * @event
 */
export interface SelectButtonOptionClickEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Selected option.
     */
    option?: any;
    /**
     * Index of the selected option.
     */
    index?: number;
}
/**
 * Custom change event.
 * @see {@link SelectButton.onChange}
 * @event
 */
export interface SelectButtonChangeEvent {
    /**
     * Browser event.
     */
    originalEvent?: Event;
    /**
     * Selected option.
     */
    value?: any;
}