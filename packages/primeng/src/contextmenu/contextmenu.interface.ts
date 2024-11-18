import { TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';

/**
 * Defines valid templates in ContextMenu.
 * @group Templates
 */
export interface ContextMenuTemplates {
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
    submenuicon(context: {
        /**
         * Style class of the submenu icon.
         */
        class: string;
    }): TemplateRef<{ class: string }>;
}
