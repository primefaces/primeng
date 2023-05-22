import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Image.
 * @group Templates
 */
export interface ImageTemplates {
    /**
     * Custom template of indicator.
     */
    indicator: TemplateRef<any> | null;
    /**
     * Custom template of rotaterighticon.
     */
    rotaterighticon: TemplateRef<any> | null;
    /**
     * Custom template of rotatelefticon.
     */
    rotatelefticon: TemplateRef<any> | null;
    /**
     * Custom template of zoomouticon.
     */
    zoomouticon: TemplateRef<any> | null;
    /**
     * Custom template of zoominicon.
     */
    zoominicon: TemplateRef<any> | null;
    /**
     * Custom template of closeicon.
     */
    closeicon: TemplateRef<any> | null;
}
