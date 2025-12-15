import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom passthrough(pt) options.
 * @see {@link Motion.pt}
 * @group Interface
 */

export interface MotionPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Motion component.
 * @see {@link MotionPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type MotionPassThrough<I = unknown> = PassThrough<I, MotionPassThroughOptions<I>>;
