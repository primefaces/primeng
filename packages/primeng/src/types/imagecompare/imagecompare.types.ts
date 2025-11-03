import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ImageCompare.pt}
 * @group Interface
 */
export interface ImageComparePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the slider's DOM element.
     */
    slider?: PassThroughOption<HTMLInputElement, I>;
}

/**
 * Defines valid pass-through options in ImageCompare.
 * @see {@link ImageComparePassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ImageComparePassThrough<I = unknown> = PassThrough<I, ImageComparePassThroughOptions<I>>;
