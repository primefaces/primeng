import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ProgressSpinnerProps.pt}
 * @group Interface
 */
export interface ProgressSpinnerPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<SVGSVGElement, I>;
    /**
     * Used to pass attributes to the spin's DOM element.
     */
    spin?: PassThroughOption<SVGSVGElement, I>;
    /**
     * Used to pass attributes to the circle's DOM element.
     */
    circle?: PassThroughOption<SVGCircleElement, I>;
}

/**
 * Defines valid pass-through options in ProgressSpinner.
 * @see {@link ProgressSpinnerPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ProgressSpinnerPassThrough<I = unknown> = PassThrough<I, ProgressSpinnerPassThroughOptions<I>>;
