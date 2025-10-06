import { PassThrough, PassThroughOption } from 'primeng/api';
import { Button } from '../button/button';
import { Badge } from './badge';

/**
 * Defines passthrough(pt) options type in component.
 */
export declare type BadgePassThroughOption<E> = PassThroughOption<E, Button>;

/**
 * Custom passthrough(pt) options.
 * @see {@link BadgeProps.pt}
 */
export type BadgePassThrough = PassThrough<Badge, BadgePassThroughOptions>;

export interface BadgePassThroughOptions<T = any> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: BadgePassThroughOption<HTMLElement>;
}
