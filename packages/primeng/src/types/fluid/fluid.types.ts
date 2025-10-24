import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { Fluid } from 'primeng/fluid';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Fluid.pt}
 * @group Interface
 */
export interface FluidPassThroughOptions<I = unknown> {
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
 * Defines valid pass-through options in Fluid component.
 * @see {@link FluidPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type FluidPassThrough<I = unknown> = PassThrough<I, FluidPassThroughOptions<I>>;
