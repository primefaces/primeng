import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in TieredMenu.
 * @group Templates
 */
export interface TieredMenuTemplates {
    /**
     * Custom template of item.
     */
    item(context: {
        /**
         * Item instance.
         */
        $implicit: any;
         /**
         * Submenu control of the item.
         */
         hasSubmenu: boolean;
    }): TemplateRef<{ $implicit: any; hasSubmenu:boolean }>;
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
}
