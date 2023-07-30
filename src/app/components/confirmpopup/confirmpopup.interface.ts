import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in ConfirmPopup.
 * @group Templates
 */
export interface ConfirmPopupTemplates {
    /**
     * Custom template of rejecticon.
     */
    rejecticon(): TemplateRef<any>;
    /**
     * Custom template of accepticon.
     */
    accepticon(): TemplateRef<any>;
}
