import { TemplateRef } from '@angular/core';
/**
 * Defines valid templates in Messages.
 * @group Templates
 */
export interface MessagesTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
}
