import { TemplateRef } from '@angular/core';

/**
 * Custom panel toggle event, emits before panel toggle.
 * @see {@link Panel.onBeforeToggle}
 * @event
 */
export interface PanelBeforeToggleEvent {
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
 * Custom panel toggle event, emits after panel toggle.
 * @see {@link Panel.onAfterToggle}
 * @event
 */
export interface PanelAfterToggleEvent extends PanelBeforeToggleEvent {}
/**
 * Defines valid templates in Panel.
 * @group Templates
 */
export interface PanelTemplates {
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
    footer: TemplateRef<any> | null;
    /**
     * Custom icons template of the panel toggler.
     */
    headericons(scope: {
        /**
         * Collapsed state as a boolean
         */
        collapsed: boolean;
    }): TemplateRef<any> | null;
    /**
     * Custom icons template of the panel header.
     */
    icons: TemplateRef<any> | null;
}
