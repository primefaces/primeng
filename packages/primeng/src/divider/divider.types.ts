import { PassThrough, PassThroughOption } from 'primeng/api';
import { Divider } from './divider';
/**
 * Defines passthrough(pt) options type in component.
 */
export declare type DividerPassThroughOption<E> = PassThroughOption<E, Divider>;

/**
 * Custom passthrough(pt) options.
 * @see {@link DividerProps.pt}
 */
export interface DividerPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: DividerPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: DividerPassThroughOption<HTMLDivElement>;
}

export type DividerPassThrough = PassThrough<Divider, DividerPassThroughOptions>;
