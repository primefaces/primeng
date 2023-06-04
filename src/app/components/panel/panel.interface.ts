import { TemplateRef } from '@angular/core';
import { Panel } from './panel';
/**
 * Custom panel toggle event, emits before panel toggle.
 * @see {@link Panel.onBeforeToggle}
 * @group Events
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
 * @extends {PanelBeforeToggleEvent}
 * @group Events
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
    header(): TemplateRef<any>;
    /**
     * Custom content template.
     */
    content(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom icons template of the panel toggler.
     * @param {Object} context - header icon data.
     */
    headericons(context: {
        /**
         * Collapsed state as a boolean
         */
        $implicit: boolean;
    }): TemplateRef<{ $implicit: boolean }>;
    /**
     * Custom icons template of the panel header.
     */
    icons(): TemplateRef<any>;
}
