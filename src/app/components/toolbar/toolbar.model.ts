import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Toolbar.
 * @group Templates
 */
export interface ToolbarTemplates {
    /**
     * Custom start content.
     */
    start: TemplateRef<any> | null;
    /**
     * Custom end content.
     */
    end: TemplateRef<any> | null;
    /**
     * Custom center content.
     */
    center: TemplateRef<any> | null;
}
