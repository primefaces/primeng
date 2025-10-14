import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { Tooltip } from 'primeng/tooltip';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Tooltip.pt}
 * @group Interface
 */
export interface TooltipPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the arrow's DOM element.
     */
    arrow?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the text's DOM element.
     */
    text?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Tooltip.
 * @see {@link TooltipPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type TooltipPassThrough<I = unknown> = PassThrough<I, TooltipPassThroughOptions<I>>;
