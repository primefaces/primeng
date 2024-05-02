import { TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';

/**
 * Defines valid templates in Menubar.
 * @group Templates
 */
export interface MenubarTemplates {
      /**
     * Custom item template.
     */
      item(context: {
        /**
         * Item instance.
         */
        $implicit: MenuItem

    }): TemplateRef<{ $implicit: MenuItem }>;
    /**
     * Custom template of start.
     */
    start(): TemplateRef<any>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<any>;
    /**
     * Custom template of menuicon.
     */
    menuicon(): TemplateRef<any>;
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
}
