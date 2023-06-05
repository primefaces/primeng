import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in OverlayPanel.
 * @group Templates
 */
export interface OverlayPanelTemplates {
    /**
     * Custom template of content.
     */
    content: TemplateRef<any> | null;
    /**
     * Custom template of closeicon.
     */
    closeicon: TemplateRef<any> | null;
}
