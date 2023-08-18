import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Toolbar.
 * @group Templates
 */
export interface ToolbarTemplates {
    /**
     * Custom start content.
     */
    start(): TemplateRef<any>;
    /**
     * Custom end content.
     */
    end(): TemplateRef<any>;
    /**
     * Custom center content.
     */
    center(): TemplateRef<any>;
}
