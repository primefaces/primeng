import type { PassThrough, PassThroughOption } from 'primeng/api';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link InputGroupAddon.pt}
 * @group Interface
 */
export interface InputGroupAddonPassThroughOptions<I = unknown> {
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
 * Defines valid pass-through options in InputGroupAddon.
 * @see {@link InputGroupAddonPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type InputGroupAddonPassThrough<I = unknown> = PassThrough<I, InputGroupAddonPassThroughOptions<I>>;
