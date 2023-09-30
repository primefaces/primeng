import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Menu.
 * @group Templates
 */
export interface MenuTemplates {
    /**
     * Custom template of icon.
     * @param {Object} context - item data.
     */
    icon(context: {
        /**
         * Item icon.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}
