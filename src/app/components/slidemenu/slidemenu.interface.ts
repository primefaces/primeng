import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in SlideMenu.
 * @group Templates
 */
export interface SlideMenuTemplates {
    /**
     * Custom template of backicon.
     */
    backicon(): TemplateRef<any>;
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
}
