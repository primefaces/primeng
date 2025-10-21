import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { IconField } from 'primeng/iconfield';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link IconField.pt}
 * @group Interface
 */
export interface IconFieldPassThroughOptions<I = unknown> {
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
export type IconFieldPassThrough<I = unknown> = PassThrough<I, IconFieldPassThroughOptions<I>>;
