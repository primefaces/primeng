import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link AvatarGroupProps.pt}
 * @group Interface
 */
export interface AvatarGroupPassThroughOptions<I = unknown> {
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
 * Defines valid pass-through options in AvatarGroup.
 * @see {@link AvatarGroupPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type AvatarGroupPassThrough<I = unknown> = PassThrough<I, AvatarGroupPassThroughOptions<I>>;
