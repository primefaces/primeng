import { TemplateRef } from '@angular/core';
/**
 * Defines valid templates in ConfirmDialog.
 * @group Templates
 */
export interface ConfirmDialogTemplates {
    /**
     * Custom template of header.
     */
    header(): TemplateRef<any>;
    /**
     * Custom template of footer.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom template of message.
     */
    message(): TemplateRef<any>;
    /**
     * Custom template of icon.
     */
    icon(): TemplateRef<any>;
    /**
     * Custom template of rejecticon.
     */
    rejecticon(): TemplateRef<any>;
    /**
     * Custom template of accepticon.
     */
    accepticon(): TemplateRef<any>;
}
