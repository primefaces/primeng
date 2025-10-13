import type { PassThrough, PassThroughOption } from 'primeng/api';
import { InputIcon } from 'primeng/inputicon';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link InputIcon.pt}
 * @group Interface
 */
export interface InputIconPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLSpanElement, I>;
}

/**
 * Custom passthrough attributes for each DOM elements
 * @group Interface
 */
export type InputIconPassThrough<I = unknown> = PassThrough<I, InputIconPassThroughOptions<I>>;
