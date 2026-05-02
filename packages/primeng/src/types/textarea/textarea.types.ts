import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Textarea.pt}
 * @group Interface
 */
export interface TextareaPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLTextAreaElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLTextAreaElement, I>;
}

/**
 * Defines valid pass-through options in Textarea.
 * @see {@link TextareaPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TextareaPassThrough<I = unknown> = PassThrough<I, TextareaPassThroughOptions<I>>;
