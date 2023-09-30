import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in SlideMenu.
 * @group Templates
 */
export interface SlideMenuTemplates {
    /**
     * Custom template of icon.
     * @param {Object} context - item data.
     */
    icon(context: {
        /**
         * Item icon.
         */
        $implicit: any;
    }): TemplateRef<{ $implicit: any }>;
    /**
     * Custom template of backicon.
     */
    backicon(): TemplateRef<any>;
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
}
