import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines the layout orientation of the divider.
 * @group Types
 */
export type DividerLayout = 'horizontal' | 'vertical';

/**
 * Defines the border style type of the divider.
 * @group Types
 */
export type DividerType = 'solid' | 'dashed' | 'dotted';

/**
 * Defines the alignment of the divider content.
 * @group Types
 */
export type DividerAlign = 'left' | 'center' | 'right' | 'top' | 'bottom';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Divider.pt}
 * @group Interface
 */
export interface DividerPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Divider component.
 * @see {@link DividerPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type DividerPassThrough<I = unknown> = PassThrough<I, DividerPassThroughOptions<I>>;
