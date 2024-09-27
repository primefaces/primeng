import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in TabList.
 * @group Templates
 */
export interface TabListTemplates {
    /**
     * Previous button icon template for the scrollable component.
     */
    previousicon(): TemplateRef<any>;
    /**
     * Next button icon template for the scrollable component.
     */
    nexticon(): TemplateRef<any>;
}
