import type { PassThrough, PassThroughOption } from 'primeng/api';
import { Accordion } from './accordion';

/**
 * Defines passthrough(pt) options type in component.
 */
export declare type AccordionPassThroughOption<E> = PassThroughOption<E, Accordion>;

/**
 * Custom passthrough(pt) options.
 * @see {@link AccordionProps.pt}
 */
export interface AccordionPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: AccordionPassThroughOption<HTMLElement>;
}

export type AccordionPassThrough = PassThrough<Accordion, AccordionPassThroughOptions>;
