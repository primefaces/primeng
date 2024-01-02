import { TemplateRef } from '@angular/core';

/**
 * Defines valid templates in Column Filter.
 * @group Templates
 */
export interface TableColumnFilterTemplates {
    /**
     * Custom filter template.
     */
    filterTemplate(): TemplateRef<any>;
    /**
     * Custom header template.
     */
    headerTemplate(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footerTemplate(): TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filterIconTemplate(): TemplateRef<any>;
    /**
     * Custom remove rule icon template.
     */
    removeRuleIconTemplate(): TemplateRef<any>;
    /**
     * Custom add rule icon template.
     */
    addRuleIconTemplate(): TemplateRef<any>;
    /**
     * Custom clear filter icon template.
     */
    clearFilterIconTemplate(): TemplateRef<any>;
}
