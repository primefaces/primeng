import { PassThrough, PassThroughOption } from 'primeng/api';
import { RadioButton } from 'primeng/radiobutton';

/**
 * Custom passthrough(pt) options.
 * @template I Type of instance.
 *
 * @see {@link RadioButton.pt}
 * @group Interface
 */
export interface RadioButtonPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the input's DOM element.
     */
    input?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the box's DOM element.
     */
    box?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in RadioButton component.
 * @see {@link RadioButtonPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type RadioButtonPassThrough<I = unknown> = PassThrough<I, RadioButtonPassThroughOptions<I>>;

/**
 * Custom click event.
 * @see {@link RadioButton.onClick}
 * @group Events
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
