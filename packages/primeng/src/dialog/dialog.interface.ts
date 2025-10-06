import { TemplateRef } from '@angular/core';

export type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
/**
 * Defines valid templates in Dialog.
 * @group Templates
 */
export interface DialogTemplates {
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
     * Custom template of maximizeicon.
     */
    maximizeicon(): TemplateRef<any>;
    /**
     * Custom template of minimizeicon.
     */
    minimizeicon(): TemplateRef<any>;
}
