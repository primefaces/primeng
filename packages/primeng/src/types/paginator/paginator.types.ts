import type { PassThrough, PassThroughOption } from 'primeng/api';
import { TemplateRef } from '@angular/core';

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
    dropdownicon(): TemplateRef<any>;
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

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link PaginatorProps.pt}
 * @group Interface
 */
export interface PaginatorPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content start's DOM element.
     */
    contentStart?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the current page report's DOM element.
     */
    current?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the first page button's DOM element.
     */
    first?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the first page button icon's DOM element.
     */
    firstIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the previous page button's DOM element.
     */
    prev?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the previous page button icon's DOM element.
     */
    prevIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the pages container's DOM element.
     */
    pages?: PassThroughOption<HTMLSpanElement, I>;
    /**
     * Used to pass attributes to the page button's DOM element.
     */
    page?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the next page button's DOM element.
     */
    next?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the next page button icon's DOM element.
     */
    nextIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the last page button's DOM element.
     */
    last?: PassThroughOption<HTMLButtonElement, I>;
    /**
     * Used to pass attributes to the last page button icon's DOM element.
     */
    lastIcon?: PassThroughOption<SVGElement, I>;
    /**
     * Used to pass attributes to the content end's DOM element.
     */
    contentEnd?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Select component (jump to page dropdown).
     */
    pcJumpToPageDropdown?: any;
    /**
     * Used to pass attributes to the InputNumber component (jump to page input).
     */
    pcJumpToPageInput?: any;
    /**
     * Used to pass attributes to the Select component (rows per page dropdown).
     */
    pcRowPerPageDropdown?: any;
}

/**
 * Defines valid pass-through options in Paginator.
 * @see {@link PaginatorPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type PaginatorPassThrough<I = unknown> = PassThrough<I, PaginatorPassThroughOptions<I>>;
