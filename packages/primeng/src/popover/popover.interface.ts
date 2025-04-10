import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in OverlayPanel.
 * @group Templates
 */
export interface PopoverTemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
}
