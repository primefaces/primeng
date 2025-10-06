import type { PassThrough, PassThroughOption } from 'primeng/api';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from './accordion';

/**
 * Defines passthrough(pt) options type in Accordion component.
 */
export declare type AccordionPassThroughOption<E> = PassThroughOption<E, Accordion>;

/**
 * Custom passthrough(pt) options for Accordion.
 * @see {@link AccordionProps.pt}
 */
export interface AccordionPassThroughOptions {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: AccordionPassThroughOption<HTMLElement>;
}

export type AccordionPassThrough = PassThrough<Accordion, AccordionPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in AccordionPanel component.
 */
export declare type AccordionPanelPassThroughOption<E> = PassThroughOption<E, AccordionPanel>;

/**
 * Custom passthrough(pt) options for AccordionPanel.
 * @see {@link AccordionPanelProps.pt}
 */
export interface AccordionPanelPassThroughOptions {
    /**
     * Used to pass attributes to the panel's DOM element.
     */
    root?: AccordionPanelPassThroughOption<HTMLElement>;
}

export type AccordionPanelPassThrough = PassThrough<AccordionPanel, AccordionPanelPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in AccordionHeader component.
 */
export declare type AccordionHeaderPassThroughOption<E> = PassThroughOption<E, AccordionHeader>;

/**
 * Custom passthrough(pt) options for AccordionHeader.
 * @see {@link AccordionHeaderProps.pt}
 */
export interface AccordionHeaderPassThroughOptions {
    /**
     * Used to pass attributes to the header's DOM element.
     */
    root?: AccordionHeaderPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the toggle icon's DOM element.
     */
    toggleicon?: AccordionHeaderPassThroughOption<SVGElement>;
}

export type AccordionHeaderPassThrough = PassThrough<AccordionHeader, AccordionHeaderPassThroughOptions>;

/**
 * Defines passthrough(pt) options type in AccordionContent component.
 */
export declare type AccordionContentPassThroughOption<E> = PassThroughOption<E, AccordionContent>;

/**
 * Custom passthrough(pt) options for AccordionContent.
 * @see {@link AccordionContentProps.pt}
 */
export interface AccordionContentPassThroughOptions {
    /**
     * Used to pass attributes to the content container's DOM element.
     */
    root?: AccordionContentPassThroughOption<HTMLElement>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: AccordionContentPassThroughOption<HTMLDivElement>;
}

export type AccordionContentPassThrough = PassThrough<AccordionContent, AccordionContentPassThroughOptions>;
