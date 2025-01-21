import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in OverlayPanel.
 * @group Templates
 */
export interface PopoverTemplates {
    /**
     * Custom template of content.
     * @param {Object} context - closeCallback.
     */
    content(context: { closeCallback: VoidFunction }): TemplateRef<{ closeCallback: VoidFunction }>;
    /**
     * Custom template of closeicon.
     */
    closeicon(): TemplateRef<any>;
}
