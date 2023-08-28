import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Menubar.
 * @group Templates
 */
export interface MenubarTemplates {
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
