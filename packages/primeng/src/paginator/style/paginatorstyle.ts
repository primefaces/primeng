import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/paginator';
import { BaseStyle } from 'primeng/base';

const classes = {
    paginator: ({ instance }) => ['p-paginator p-component'],
    content: 'p-paginator-content',
    contentStart: 'p-paginator-content-start',
    contentEnd: 'p-paginator-content-end',
    first: ({ instance }) => [
        'p-paginator-first',
        {
            'p-disabled': instance.isFirstPage() || instance.empty()
        }
    ],
    firstIcon: 'p-paginator-first-icon',
    prev: ({ instance }) => [
        'p-paginator-prev',
        {
            'p-disabled': instance.isFirstPage() || instance.empty()
        }
    ],
    prevIcon: 'p-paginator-prev-icon',
    next: ({ instance }) => [
        'p-paginator-next',
        {
            'p-disabled': instance.isLastPage() || instance.empty()
        }
    ],
    nextIcon: 'p-paginator-next-icon',
    last: ({ instance }) => [
        'p-paginator-last',
        {
            'p-disabled': instance.isLastPage() || instance.empty()
        }
    ],
    lastIcon: 'p-paginator-last-icon',
    pages: 'p-paginator-pages',
    page: ({ instance, pageLink }) => [
        'p-paginator-page',
        {
            'p-paginator-page-selected': pageLink - 1 == instance.getPage()
        }
    ],
    current: 'p-paginator-current',
    pcRowPerPageDropdown: 'p-paginator-rpp-dropdown',
    pcJumpToPageDropdown: 'p-paginator-jtp-dropdown',
    pcJumpToPageInput: 'p-paginator-jtp-input'
};

@Injectable()
export class PaginatorStyle extends BaseStyle {
    name = 'paginator';

    theme = style;

    classes = classes;
}

/**
 *
 * Paginator is a generic component to display content in paged format.
 *
 * [Live Demo](https://www.primeng.org/paginator)
 *
 * @module paginatorstyle
 *
 */

export enum PaginatorClasses {
    /**
     * Class name of the paginator element
     */
    paginator = 'p-paginator',
    /**
     * Class name of the content start element
     */
    contentStart = 'p-paginator-content-start',
    /**
     * Class name of the content end element
     */
    contentEnd = 'p-paginator-content-end',
    /**
     * Class name of the first element
     */
    first = 'p-paginator-first',
    /**
     * Class name of the first icon element
     */
    firstIcon = 'p-paginator-first-icon',
    /**
     * Class name of the prev element
     */
    prev = 'p-paginator-prev',
    /**
     * Class name of the prev icon element
     */
    prevIcon = 'p-paginator-prev-icon',
    /**
     * Class name of the next element
     */
    next = 'p-paginator-next',
    /**
     * Class name of the next icon element
     */
    nextIcon = 'p-paginator-next-icon',
    /**
     * Class name of the last element
     */
    last = 'p-paginator-last',
    /**
     * Class name of the last icon element
     */
    lastIcon = 'p-paginator-last-icon',
    /**
     * Class name of the pages element
     */
    pages = 'p-paginator-pages',
    /**
     * Class name of the page element
     */
    page = 'p-paginator-page',
    /**
     * Class name of the current element
     */
    current = 'p-paginator-current',
    /**
     * Class name of the row per page dropdown element
     */
    pcRowPerPageDropdown = 'p-paginator-rpp-dropdown',
    /**
     * Class name of the jump to page dropdown element
     */
    pcJumpToPageDropdown = 'p-paginator-jtp-dropdown',
    /**
     * Class name of the jump to page input element
     */
    pcJumpToPageInput = 'p-paginator-jtp-input'
}

export interface PaginatorStyle extends BaseStyle {}
