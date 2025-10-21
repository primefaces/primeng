import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { InputGroup } from 'primeng/inputgroup';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link InputGroup.pt}
 * @group Interface
 */
export interface InputGroupPassThroughOptions<I = unknown> {
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
 * Defines valid pass-through options in InputGroup.
 * @see {@link InputGroupPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type InputGroupPassThrough<I = unknown> = PassThrough<I, InputGroupPassThroughOptions<I>>;
