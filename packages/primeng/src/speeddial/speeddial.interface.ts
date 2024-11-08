import { TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';

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
        /**
         * Item click function
         */
        toggleCallback: Function;
    }): TemplateRef<{ $implicit: MenuItem[]; index: number; toggleCallback: Function }>;
    /**
     * Custom template of button.
     */
    button(context: {
        /**
         * Button click function
         */
        toggleCallback: Function;
    }): TemplateRef<{ toggleCallback: Function }>;
    /**
     * Custom template of icon.
     */
    icon(): TemplateRef<any>;
}
