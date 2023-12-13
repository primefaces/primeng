import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in ConfirmPopup.
 * @group Templates
 */
export interface ConfirmPopupTemplates {
    /**
     * Custom content template.
     */
    content(context:{
        $implicit?:any
    }): TemplateRef<any>;
    /**
     * Custom template of rejecticon.
     */
    rejecticon(): TemplateRef<any>;
    /**
     * Custom template of accepticon.
     */
    accepticon(): TemplateRef<any>;
    /**
     * Headless template.
     */
    headless(context:{
        $implicit?:any
    }): TemplateRef<any>;
}
