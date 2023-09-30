import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in TieredMenu.
 * @group Templates
 */
export interface TieredMenuTemplates {
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
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
}
