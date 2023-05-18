import { TemplateRef } from '@angular/core';
/**
 * Defines valid templates in Dock.
 * @group Templates
 */
export interface DockTemplates {
    /**
     * Custom template of item.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}
