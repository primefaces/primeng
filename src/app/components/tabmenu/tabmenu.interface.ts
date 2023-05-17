import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in TabMenu.
 * @group Templates
 */
export interface TabMenuTemplates {
    /**
     * Custom template of item.
     */
    item(context: {
        /**
         * Data of the menu item .
         */
        $implicit: any;
        /**
         * Index of the option
         */
        index: number;
    }): TemplateRef<{ $implicit: any; index: number }>;
    /**
     * Custom template of nexticon.
     */
    nexticon: TemplateRef<any> | null;
    /**
     * Custom template of previousicon.
     */
    previousicon: TemplateRef<any> | null;
}
