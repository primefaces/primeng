import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Sidebar.
 * @group Templates
 */
export interface SidebarTemplates {
    /**
     * Custom template of header.
     */
    header: TemplateRef<any> | null;
    /**
     * Custom template of content.
     */
    content: TemplateRef<any> | null;
    /**
     * Custom template of footer.
     */
    footer: TemplateRef<any> | null;
    /**
     * Custom template of closeicon.
     */
    closeicon: TemplateRef<any> | null;
}
