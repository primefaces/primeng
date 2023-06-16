import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Image.
 * @group Templates
 */
export interface ImageTemplates {
    /**
     * Custom template of indicator.
     */
    indicator(): TemplateRef<any>;
    /**
     * Custom template of rotaterighticon.
     */
    rotaterighticon(): TemplateRef<any>;
    /**
     * Custom template of rotatelefticon.
     */
    rotatelefticon(): TemplateRef<any>;
    /**
     * Custom template of zoomouticon.
     */
    zoomouticon(): TemplateRef<any>;
    /**
     * Custom template of zoominicon.
     */
    zoominicon(): TemplateRef<any>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
}
