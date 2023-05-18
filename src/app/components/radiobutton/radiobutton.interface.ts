import { RadioButton } from './radiobutton';
/**
 * Custom click event.
 * @see {@link RadioButton.onClick}
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
