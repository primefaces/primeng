import { TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';

/**
 * Defines valid templates in PanelMenu.
 * @group Templates
 */
export interface PanelMenuTemplates {
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
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
}
