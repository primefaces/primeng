import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in TabMenu.
 * @group Templates
 */
export interface TabMenuTemplates {
    /**
     * Custom template of item.
     * @param {Object} context - item data.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
        /**
         * Item index.
         */
        index: number;
    }): TemplateRef<{ $implicit: any; index: number }>;
    /**
     * Custom template of nexticon.
     */
    nexticon(): TemplateRef<any>;
    /**
     * Custom template of previousicon.
     */
    previousicon(): TemplateRef<any>;
}
