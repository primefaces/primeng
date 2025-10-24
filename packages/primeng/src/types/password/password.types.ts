import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { InputTextPassThrough } from 'primeng/types/inputtext';
import type { Password } from 'primeng/password';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Password.pt}
 * @group Interface
 */
export interface PasswordPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host element.
     */
    host?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the InputText component.
     * @see {@link InputTextPassThrough}
     */
    pcInputText?: InputTextPassThrough;
    /**
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the mask icon's DOM element.
     */
    maskIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the unmask icon's DOM element.
     */
    unmaskIcon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the overlay's DOM element.
     */
    overlay?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the meter's DOM element.
     */
    meter?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the meter label's DOM element.
     */
    meterLabel?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the meter text's DOM element.
     */
    meterText?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Password.
 * @see {@link PasswordPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type PasswordPassThrough<I = unknown> = PassThrough<I, PasswordPassThroughOptions<I>>;
