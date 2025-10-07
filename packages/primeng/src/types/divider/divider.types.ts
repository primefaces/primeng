import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link DividerProps.pt}
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
