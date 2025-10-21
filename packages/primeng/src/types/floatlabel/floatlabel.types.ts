import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { FloatLabel } from 'primeng/floatlabel';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link FloatLabel.pt}
 * @group Interface
 */
export interface FloatLabelPassThroughOptions<I = unknown> {
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
export type FloatLabelPassThrough<I = unknown> = PassThrough<I, FloatLabelPassThroughOptions<I>>;
