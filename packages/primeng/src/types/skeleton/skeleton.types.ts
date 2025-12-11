import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Skeleton.pt}
 * @group Interface
 */
export interface SkeletonPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Skeleton.
 * @see {@link SkeletonPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type SkeletonPassThrough<I = unknown> = PassThrough<I, SkeletonPassThroughOptions<I>>;
