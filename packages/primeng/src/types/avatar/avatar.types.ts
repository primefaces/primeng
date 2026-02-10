import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines the size of the avatar.
 * @group Types
 */
export type AvatarSize = 'normal' | 'large' | 'xlarge';

/**
 * Defines the shape of the avatar.
 * @group Types
 */
export type AvatarShape = 'square' | 'circle';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Avatar.pt}
 * @group Interface
 */
export interface AvatarPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the image's DOM element.
     */
    image?: PassThroughOption<HTMLImageElement, I>;
}

/**
 * Defines valid pass-through options in Avatar component.
 * @see {@link AvatarPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type AvatarPassThrough<I = unknown> = PassThrough<I, AvatarPassThroughOptions<I>>;
