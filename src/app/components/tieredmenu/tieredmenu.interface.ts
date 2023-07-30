import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in TieredMenu.
 * @group Templates
 */
export interface TieredMenuTemplates {
    /**
     * Custom template of submenuicon.
     */
    submenuicon(): TemplateRef<any>;
}
