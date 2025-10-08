import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ProgressBarProps.pt}
 * @group Interface
 */
export interface ProgressBarPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the value's DOM element.
     */
    value?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in ProgressBar.
 * @see {@link ProgressBarPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ProgressBarPassThrough<I = unknown> = PassThrough<I, ProgressBarPassThroughOptions<I>>;
