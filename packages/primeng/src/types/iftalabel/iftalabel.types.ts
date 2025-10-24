import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { IftaLabel } from 'primeng/iftalabel';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link IftaLabel.pt}
 * @group Interface
 */
export interface IftaLabelPassThroughOptions<I = unknown> {
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
export type IftaLabelPassThrough<I = unknown> = PassThrough<I, IftaLabelPassThroughOptions<I>>;
