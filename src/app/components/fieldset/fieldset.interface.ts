import { TemplateRef } from '@angular/core';
import { Fieldset } from './fieldset';
/**
 * Custom panel toggle event, emits after toggle.
 * @see {@link Fieldset.onAfterToggle}
 */
export interface FieldsetAfterToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Collapsed state of the panel.
     */
    collapsed: boolean | undefined;
}

/**
 * Custom panel toggle event, emits before toggle.
 * @see {@link Fieldset.onBeforeToggle}
 * @extends {FieldsetAfterToggleEvent}
 */
export interface FieldsetBeforeToggleEvent extends FieldsetAfterToggleEvent {}

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
