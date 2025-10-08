import { TemplateRef } from '@angular/core';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines valid templates in Chip.
 * @group Templates
 */
export interface ChipTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of remove icon.
     */
    removeicon(): TemplateRef<any>;
}

export interface ChipProps {
    label?: string;
    icon?: string | undefined;
    image?: string | undefined;
    alt?: string | undefined;
    style?: { [klass: string]: any } | null | undefined;
    styleClass?: string | undefined;
    removable?: boolean | undefined;
    removeIcon?: string | undefined;
}

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ChipProps.pt}
 * @group Interface
 */
export interface ChipPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the image's DOM element.
     */
    image?: PassThroughOption<HTMLImageElement, I>;
    /**
     * Used to pass attributes to the icon's DOM element.
     */
    icon?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the label's DOM element.
     */
    label?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the remove icon's DOM element.
     */
    removeIcon?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in Chip component.
 * @see {@link ChipPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ChipPassThrough<I = unknown> = PassThrough<I, ChipPassThroughOptions<I>>;
