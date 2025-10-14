import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ColorPicker } from 'primeng/colorpicker';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ColorPicker.pt}
 * @group Interface
 */
export interface ColorPickerPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the preview input's DOM element.
     */
    preview?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    panel?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the color selector's DOM element.
     */
    colorSelector?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the color background's DOM element.
     */
    colorBackground?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the color handle's DOM element.
     */
    colorHandle?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the hue's DOM element.
     */
    hue?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the hue handle's DOM element.
     */
    hueHandle?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Custom passthrough attributes for each DOM elements
 * @group Interface
 */
export type ColorPickerPassThrough<I = unknown> = PassThrough<I, ColorPickerPassThroughOptions<I>>;

/**
 * Custom change event.
 * @see {@link ColorPicker.onChange}
 * @group Events
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
