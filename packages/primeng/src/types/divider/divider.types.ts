import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { Divider } from 'primeng/divider';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Divider.pt}
 * @group Interface
 */
export interface DividerPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Divider component.
 * @see {@link DividerPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type DividerPassThrough<I = unknown> = PassThrough<I, DividerPassThroughOptions<I>>;
