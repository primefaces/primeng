import { TemplateRef } from '@angular/core';
import { MenuItem } from '../api/menuitem';

/**
 * Defines valid templates in Breadcumb.
 * @group Templates
 */
export interface BreadcumbTemplates {
    /**
     * Custom template of seperator.
     */
    seperator: TemplateRef<any> | null;
}

export interface BreadcrumbItemClickEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected menu item .
     */
    item: MenuItem;
}
