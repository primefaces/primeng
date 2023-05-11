import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Menubar.
 * @group Templates
 */
export interface MenubarTemplates {
    /**
     * Custom template of start.
     */
    start: TemplateRef<any> | null;
    /**
     * Custom template of end.
     */
    end: TemplateRef<any> | null;
    /**
     * Custom template of menuicon.
     */
    menuicon: TemplateRef<any> | null;
    /**
     * Custom template of submenuicon.
     */
    submenuicon: TemplateRef<any> | null;
}
