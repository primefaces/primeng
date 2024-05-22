import { TemplateRef } from '@angular/core';
import { MenuItem } from '../api/menuitem';

/**
 * Defines valid templates in Menu.
 * @group Templates
 */
export interface MenuTemplates {
    /**
     * Custom template of start.
     */
    start(): TemplateRef<any>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<any>;
    /**
     * Custom template of item.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: MenuItem;
    }): TemplateRef<{ $implicit: MenuItem }>;
    /**
     * Custom template of submenuheader.
     */
    submenuheader(context: {
        /**
         * Item instance.
         */
        $implicit: MenuItem;
    }): TemplateRef<{ $implicit: MenuItem }>;
}
