import type { MotionOptions } from '@primeuix/motion';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link OverlayProps.pt}
 * @group Interface
 */
export interface OverlayPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in Overlay component.
 * @see {@link OverlayPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type OverlayPassThrough<I = unknown> = PassThrough<I, OverlayPassThroughOptions<I>>;
