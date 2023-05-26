import { TemplateRef } from '@angular/core';
import { Accordion } from './accordion';

/**
 * Custom tab open event.
 * @see {@link Accordion.onOpen}
 * @group Events
 */
export interface AccordionTabOpenEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Opened tab index.
     */
    index: number;
}

/**
 * Custom tab close event.
 * @see {@link Accordion.onClose}
 * @extends {AccordionTabOpenEvent}
 * @group Events
 */
export interface AccordionTabCloseEvent extends AccordionTabOpenEvent {}

/**
 * Defines valid templates in Accordion.
 * @group Templates
 */
export interface AccordionTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any> | null;
    /**
     * Custom template of header.
     */
    header(): TemplateRef<any> | null;
    /**
     * Custom template of icon.
     * @param {Object} context - icon data.
     */
    icon(context: {
        /**
         * Data of the selected.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}
