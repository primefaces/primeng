import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';
import type { DialogPassThrough } from 'primeng/types/dialog';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ConfirmDialogProps.pt}
 * @group Interface
 */
export interface ConfirmDialogPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the message's DOM element.
     */
    message?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the Dialog component.
     * @see {@link DialogPassThrough}
     */
    pcDialog?: DialogPassThrough;
    /**
     * Used to pass attributes to the accept Button component.
     * @see {@link ButtonPassThrough}
     */
    pcAcceptButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the reject Button component.
     * @see {@link ButtonPassThrough}
     */
    pcRejectButton?: ButtonPassThrough;
}

/**
 * Defines valid pass-through options in ConfirmDialog.
 * @see {@link ConfirmDialogPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ConfirmDialogPassThrough<I = unknown> = PassThrough<I, ConfirmDialogPassThroughOptions<I>>;
