import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom passthrough(pt) options.
 * @see {@link BadgeProps.pt}
 * @group Interface
 */

export interface BadgePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Badge component.
 * @see {@link BadgePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type BadgePassThrough<I = unknown> = PassThrough<I, BadgePassThroughOptions<I>>;
