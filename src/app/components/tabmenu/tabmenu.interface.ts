import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in TabMenu.
 * @group Templates
 */
export interface TabMenuTemplates {
    /**
     * Custom template of item.
     */
    item: TemplateRef<any> | null;
    /**
     * Custom template of nexticon.
     */
    nexticon: TemplateRef<any> | null;
    /**
     * Custom template of previousicon.
     */
    previousicon: TemplateRef<any> | null;
}
