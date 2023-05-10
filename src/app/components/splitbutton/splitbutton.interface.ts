import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in SplitButton.
 * @group Templates
 */
export interface SplitButtonTemplates {
    /**
     * Custom template of content.
     */
    content: TemplateRef<any> | null;
    /**
     * Custom template of dropdownicon.
     */
    dropdownicon: TemplateRef<any> | null;
}
