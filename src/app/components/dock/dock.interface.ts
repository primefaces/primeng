import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Dock.
 * @group Templates
 */
export interface DockTemplates {
    /**
     * Custom template of item.
     */
    item(context: {
        /**
         * Data of the menu.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
}
