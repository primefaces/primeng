import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Dialog.
 * @group Templates
 */
export interface DialogTemplates {
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
    /**
     * Custom template of maximizeicon.
     */
    maximizeicon: TemplateRef<any> | null;
    /**
     * Custom template of minimizeicon.
     */
    minimizeicon: TemplateRef<any> | null;
}
