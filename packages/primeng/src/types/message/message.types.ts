import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Message.pt}
 * @group Interface
 */
export interface MessagePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the text's DOM element.
     */
    text?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the close button's DOM element.
     */
    closeButton?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the close icon's DOM element.
     */
    closeIcon?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Message.
 * @see {@link MessagePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type MessagePassThrough<I = unknown> = PassThrough<I, MessagePassThroughOptions<I>>;
