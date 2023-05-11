import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Dock.
 * @group Templates
 */
export interface DockTemplates {
    /**
     * Custom template of item.
     */
    item: TemplateRef<any> | null;
}
