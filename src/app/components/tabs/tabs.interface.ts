import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Tabs.
 * @group Templates
 */
export interface TabsTemplates {
    /**
     * Previous button icon template for the scrollable component.
     */
    previousicon(): TemplateRef<any>;
    /**
     * Next button icon template for the scrollable component.
     */
    nexticon(): TemplateRef<any>;
}
