import { TemplateRef } from "@angular/core";

/**
 * Custom panel toggle event.
 * @see {@link Fieldset.onBeforeToggle}
 * @see {@link Fieldset.onAfterToggle}
 * @event
 */
export interface FieldsetToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Collapsed state of the panel.
     */
    collapsed: boolean;
}

/**
 * Defines valid templates in Fieldset.
 * @group Templates
 */
export interface FieldsetTemplates { 
    /**
     * Custom header template.
     */
    header: TemplateRef<any> | null;
    /**
     * Custom content template.
     */
    content: TemplateRef<any> | null;
    /**
     * Custom footer template.
     */
    expandicon: TemplateRef<any> | null;
    /**
     * Custom icons template of the panel toggler.
     */
    collapseicon: TemplateRef<any> | null;
}