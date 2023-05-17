import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in ScrollTop.
 * @group Templates
 */
export interface ScrollTopTemplates {
    /**
     * Icon of the component.
     */
    icon(context: { styleClass: 'p-scrolltop-icon' }): TemplateRef<any>;
}
