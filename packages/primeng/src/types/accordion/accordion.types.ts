import type { MotionOptions } from '@primeuix/motion';
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Defines valid pass-through options in Accordion component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface AccordionPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}

/**
 * Defines valid pass-through options in Accordion component.
 * @see {@link AccordionPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type AccordionPassThrough<I = unknown> = PassThrough<I, AccordionPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in AccordionPanel component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface AccordionPanelPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}

/**
 * Defines valid pass-through options in AccordionPanel component.
 * @see {@link AccordionPanelPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type AccordionPanelPassThrough<I = unknown> = PassThrough<I, AccordionPanelPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in AccordionHeader component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface AccordionHeaderPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the header's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the toggle icon's DOM element.
     */
    toggleicon?: PassThroughOption<SVGElement, I>;
}

/**
 * Defines valid pass-through options in AccordionHeader component.
 * @see {@link AccordionHeaderPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type AccordionHeaderPassThrough<I = unknown> = PassThrough<I, AccordionHeaderPassThroughOptions<I>>;

/**
 * Defines valid pass-through options in AccordionContent component.
 * @template I Type of instance.
 *
 * @group Interface
 */
export interface AccordionContentPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in AccordionContent component.
 * @see {@link AccordionContentPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type AccordionContentPassThrough<I = unknown> = PassThrough<I, AccordionContentPassThroughOptions<I>>;
