import { TemplateRef } from '@angular/core';

/**
 * Custom panel toggle event.
 * @see {@link Panel.onBeforeToggle}
 * @see {@link Panel.onAfterToggle}
 * @event
 */
export interface PanelToggleEvent {
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
