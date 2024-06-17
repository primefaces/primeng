import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in ScrollTop.
 * @group Templates
 */
export interface ScrollTopTemplates {
    /**
     * Icon of the component.
     */
    icon(context: {
        /**
         * Style class of the icon.
         */
        styleClass: 'p-scrolltop-icon';
    }): TemplateRef<{ styleClass: string }>;
}
