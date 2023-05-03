/**
 *
 * Accordion groups a collection of contents in tabs.
 *
 * [Live Demo](https://www.primeng.org/accordion/)
 *
 * Helper Components:
 *
 * - {@link AccordionTab}
 *
 * @module accordion
 *
 */

import { TemplateRef } from "@angular/core";

/**
 * Custom tab open event.
 * @category Emits
 */
export interface AccordionTabOpenEvent {
    /**
     * Browser mouse event.
     */
    originalEvent: Event;
    /**
     * Opened tab index.
     */
    index: number;
  }  

/**
 * Custom tab close event.
 * @extends {AccordionTabOpenEvent}
 * @category Emits
 */
export interface AccordionTabCloseEvent extends AccordionTabOpenEvent {}

export interface AccordionTemplates {
  contentTemplate: TemplateRef<any>;

  headerTemplate: TemplateRef<any>;

  iconTemplate: TemplateRef<any>;

}