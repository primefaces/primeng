import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in MegaMenu.
 * @group Templates
 */
export interface MegaMenuTemplates {
    /**
     * Custom template of start.
     */
    start(): TemplateRef<any>;
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
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
    /**
     * Custom template of end.
     */
    end(): TemplateRef<any>;
}
