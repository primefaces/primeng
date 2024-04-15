import { TemplateRef } from '@angular/core';
import { MenuItem } from '@alamote/primeng/api';

/**
 * Defines valid templates in SpeedDial.
 * @group Templates
 */
export interface SpeedDialTemplates {
    /**
     * Custom template of item.
     */
    item(context: {
        /**
         * Data of the item.
         */
        $implicit: MenuItem[];
        /**
         * Index of the item.
         */
        index: number;
    }): TemplateRef<{ $implicit: MenuItem[]; index: number }>;
    /**
     * Custom template of button.
     */
    button(): TemplateRef<any>;
}
