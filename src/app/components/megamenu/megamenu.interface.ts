import { TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';

/**
 * Defines valid templates in MegaMenu.
 * @group Templates
 */
export interface MegaMenuTemplates {
    /**
     * Custom item template.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: MenuItem;
    }): TemplateRef<{ $implicit: MenuItem }>;
    /**
     * Custom template of start.
     */
    start(): TemplateRef<any>;
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<any>;
}
