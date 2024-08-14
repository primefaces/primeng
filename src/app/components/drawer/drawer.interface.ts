import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Drawer.
 * @group Templates
 */
export interface DrawerTemplates {
    /**
     * Custom template of header.
     */
    header(): TemplateRef<any>;
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of footer.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
    /**
     * Headless template.
     */
    headless(): TemplateRef<any>;
}
