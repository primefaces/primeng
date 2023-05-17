import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in BlockUI.
 * @group Templates
 */
export interface BlockUITemplates {
    /**
     * Custom template of content.
     */
    content: TemplateRef<any> | null;
}
