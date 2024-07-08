import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Chart.
 * @group Templates
 */
export interface ChartTemplates {
    /**
     * Custom template of header.
     */
    header(): TemplateRef<any>;
    /**
     * Custom template of footer.
     */
    footer(): TemplateRef<any>;
}
