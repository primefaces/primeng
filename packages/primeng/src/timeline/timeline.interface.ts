import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Timeline.
 * @group Templates
 */
export interface TimelineTemplates {
    /**
     * Custom content template.
     * @param {Object} context - item data.
     */
    content(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom opposite item template.
     * @param {Object} context - item data.
     */
    opposite(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom marker template.
     * @param {Object} context - item data.
     */
    marker(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}
