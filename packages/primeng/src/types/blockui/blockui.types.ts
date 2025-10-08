import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines valid templates in BlockUI.
 * @group Templates
 */
export interface BlockUITemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
}

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link BlockUIProps.pt}
 * @group Interface
 */
export interface BlockUIPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in BlockUI component.
 * @see {@link BlockUIPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type BlockUIPassThrough<I = unknown> = PassThrough<I, BlockUIPassThroughOptions<I>>;
