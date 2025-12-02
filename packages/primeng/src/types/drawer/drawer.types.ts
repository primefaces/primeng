import type { PassThrough, PassThroughOption } from 'primeng/api';
import type { ButtonPassThrough } from 'primeng/types/button';
import { TemplateRef } from '@angular/core';
import type { MotionOptions } from '@primeuix/motion';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Drawer.pt}
 * @group Interface
 */
export interface DrawerPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the title's DOM element.
     */
    title?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the close Button component.
     * @see {@link ButtonPassThrough}
     */
    pcCloseButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the footer's DOM element.
     */
    footer?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in Drawer.
 * @see {@link DrawerPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type DrawerPassThrough<I = unknown> = PassThrough<I, DrawerPassThroughOptions<I>>;

/**
 * Defines valid templates in Drawer.
 * @group Templates
 */
export interface DrawerTemplates {
    /**
     * Custom template of header.
     */
    header(): TemplateRef<void>;
    /**
     * Custom template of content.
     */
    content(): TemplateRef<void>;
    /**
     * Custom template of footer.
     */
    footer(): TemplateRef<void>;
    /**
     * Custom template of close icon.
     */
    closeicon(): TemplateRef<void>;
    /**
     * Headless template to replace the entire drawer content.
     */
    headless(): TemplateRef<void>;
}
