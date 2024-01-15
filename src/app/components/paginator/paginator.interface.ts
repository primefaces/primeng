import { TemplateRef } from '@angular/core';
import { Paginator } from './paginator';

/**
 * Paginator state.
 * @group Interface
 */
export interface PaginatorState {
    page?: number;
    first?: number;
    rows?: number;
    pageCount?: number;
}
/**
 * Defines valid templates in PaginatorTemplates.
 * @group Templates
 */
export interface PaginatorTemplates {
    /**
     * Custom dropdown trigger icon template.
     */
    dropdownicon(): TemplateRef<any>
    /**
     * Custom first page link icon template.
     */
    firstpagelinkicon(): TemplateRef<any>;
    /**
     * Custom previous page link icon template.
     */
    previouspagelinkicon(): TemplateRef<any>;
    /**
     * Custom last page link icon template.
     */
    lastpagelinkicon(): TemplateRef<any>;
    /**
     * Custom next page link icon template.
     */
    nextpagelinkicon(): TemplateRef<any>;
}
