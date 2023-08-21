import { TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from './breadcrumb';
/**
 * Defines valid templates in Breadcumb.
 * @group Templates
 */
export interface BreadcumbTemplates {
    /**
     * Custom template of seperator.
     */
    seperator(): TemplateRef<any>;
}
/**
 * Custom select event.
 * @see {@link Breadcrumb.onItemClick}
 * @group Events
 */
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
