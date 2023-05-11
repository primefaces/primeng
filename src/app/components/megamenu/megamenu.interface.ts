import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in MegaMenu.
 * @group Templates
 */
export interface MegaMenuTemplates {
    /**
     * Custom template of start.
     */
    start: TemplateRef<any> | null;
    /**
     * Custom template of submenuicon.
     */
    submenuicon: TemplateRef<any> | null;
    /**
     * Custom template of end.
     */
    end: TemplateRef<any> | null;
}
