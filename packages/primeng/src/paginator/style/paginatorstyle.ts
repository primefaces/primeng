import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-paginator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    background: ${dt('paginator.background')};
    color: ${dt('paginator.color')};
    padding: ${dt('paginator.padding')};
    border-radius: ${dt('paginator.border.radius')};
    gap: ${dt('paginator.gap')};
}

.p-paginator-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${dt('paginator.gap')};
}

.p-paginator-content-start {
    margin-right: auto;
}

.p-paginator-content-end {
    margin-left: auto;
}

.p-paginator-page,
.p-paginator-next,
.p-paginator-last,
.p-paginator-first,
.p-paginator-prev {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    user-select: none;
    overflow: hidden;
    position: relative;
    background: ${dt('paginator.nav.button.background')};
    border: 0 none;
    color: ${dt('paginator.nav.button.color')};
    min-width: ${dt('paginator.nav.button.width')};
    height: ${dt('paginator.nav.button.height')};
    transition: background ${dt('paginator.transition.duration')}, color ${dt('paginator.transition.duration')}, outline-color ${dt('paginator.transition.duration')}, box-shadow ${dt('paginator.transition.duration')};
    border-radius: ${dt('paginator.nav.button.border.radius')};
    padding: 0;
    margin: 0;
}

.p-paginator-page:focus-visible,
.p-paginator-next:focus-visible,
.p-paginator-last:focus-visible,
.p-paginator-first:focus-visible,
.p-paginator-prev:focus-visible {
    box-shadow: ${dt('paginator.nav.button.focus.ring.shadow')};
    outline: ${dt('paginator.nav.button.focus.ring.width')} ${dt('paginator.nav.button.focus.ring.style')} ${dt('paginator.nav.button.focus.ring.color')};
    outline-offset: ${dt('paginator.nav.button.focus.ring.offset')};
}

.p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover,
.p-paginator-first:not(.p-disabled):hover,
.p-paginator-prev:not(.p-disabled):hover,
.p-paginator-next:not(.p-disabled):hover,
.p-paginator-last:not(.p-disabled):hover {
    background: ${dt('paginator.nav.button.hover.background')};
    color: ${dt('paginator.nav.button.hover.color')};
}

.p-paginator-page.p-paginator-page-selected {
    background: ${dt('paginator.nav.button.selected.background')};
    color: ${dt('paginator.nav.button.selected.color')};
}

.p-paginator-current {
    color: ${dt('paginator.current.page.report.color')};
}

.p-paginator-pages {
    display: flex;
    align-items: center;
    gap: ${dt('paginator.gap')};
}

.p-paginator-jtp-input .p-inputtext {
    max-width: ${dt('paginator.jump.to.page.input.max.width')};
}
`;

const classes = {
    paginator: ({ instance, key }) => [
        'p-paginator p-component',
        {
            'p-paginator-default': !instance.hasBreakpoints(),
            [`p-paginator-${key}`]: instance.hasBreakpoints()
        }
    ],
    content: 'p-paginator-content',
    contentStart: 'p-paginator-content-start',
    contentEnd: 'p-paginator-content-end',
    first: ({ instance }) => [
        'p-paginator-first',
        {
            'p-disabled': instance.$attrs.disabled
        }
    ],
    firstIcon: 'p-paginator-first-icon',
    prev: ({ instance }) => [
        'p-paginator-prev',
        {
            'p-disabled': instance.$attrs.disabled
        }
    ],
    prevIcon: 'p-paginator-prev-icon',
    next: ({ instance }) => [
        'p-paginator-next',
        {
            'p-disabled': instance.$attrs.disabled
        }
    ],
    nextIcon: 'p-paginator-next-icon',
    last: ({ instance }) => [
        'p-paginator-last',
        {
            'p-disabled': instance.$attrs.disabled
        }
    ],
    lastIcon: 'p-paginator-last-icon',
    pages: 'p-paginator-pages',
    page: ({ props, pageLink }) => [
        'p-paginator-page',
        {
            'p-paginator-page-selected': pageLink - 1 === props.page
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

    theme = theme;

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
