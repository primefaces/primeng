import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines the size of the badge.
 * @group Types
 */
export type BadgeSize = 'small' | 'large' | 'xlarge' | null;

/**
 * Defines the severity of the badge.
 * @group Types
 */
export type BadgeSeverity = 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null;

/**
 * Custom passthrough(pt) options.
 * @see {@link Badge.pt}
 * @group Interface
 */

export interface BadgePassThroughOptions<I = unknown> {
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
 * Defines valid pass-through options in Badge component.
 * @see {@link BadgePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type BadgePassThrough<I = unknown> = PassThrough<I, BadgePassThroughOptions<I>>;
