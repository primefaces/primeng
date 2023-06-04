import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Chip.
 * @group Templates
 */
export interface ChipTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of remove icon.
     */
    removeicon(): TemplateRef<any>;
}
