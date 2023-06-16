import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in SplitButton.
 * @group Templates
 */
export interface SplitButtonTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of dropdownicon.
     */
    dropdownicon(): TemplateRef<any>;
}
