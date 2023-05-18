import { ColorPicker } from './colorpicker';
/**
 * Custom change event.
 * @see {@link ColorPicker.onChange}
 */
export interface ColorPickerChangeEvent {
    /**
     * Browser event
     */
    originalEvent: Event;
    /**
     * Selected color value.
     */
    value: string | object;
}
