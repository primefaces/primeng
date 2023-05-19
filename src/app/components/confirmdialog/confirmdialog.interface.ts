import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in ConfirmDialog.
 * @group Templates
 */
export interface ConfirmDialogTemplates {
    /**
     * Custom template of header.
     */
    header: TemplateRef<any> | null;
    /**
     * Custom template of footer.
     */
    footer: TemplateRef<any> | null;
    /**
     * Custom template of rejecticon.
     */
    rejecticon: TemplateRef<any> | null;
    /**
     * Custom template of accepticon.
     */
    accepticon: TemplateRef<any> | null;
}
