import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/dataview';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-dataview p-component',
        {
            'p-dataview-list': instance.layout === 'list',
            'p-dataview-grid': instance.layout === 'grid'
        }
    ],
    header: 'p-dataview-header',
    loading: 'p-dataview-loading',
    loadingOverlay: 'p-dataview-loading-overlay p-overlay-mask',
    loadingIcon: 'p-dataview-loading-icon',
    pcPaginator: ({ position }) => 'p-dataview-paginator-' + position,
    content: 'p-dataview-content',
    emptyMessage: 'p-dataview-empty-message',
    footer: 'p-dataview-footer'
};

@Injectable()
export class DataViewStyle extends BaseStyle {
    name = 'dataview';

    theme = style;

    classes = classes;
}

/**
 *
 * DataView displays data in grid or list layout with pagination and sorting features.
 *
 * [Live Demo](https://www.primeng.org/dataview/)
 *
 * @module dataviewstyle
 *
 */
export enum DataViewClasses {
    /**
     * Class name of the root element
     */
    root = 'p-dataview',
    /**
     * Class name of the header element
     */
    header = 'p-dataview-header',
    /**
     * Class name of the loading element
     */
    loading = 'p-dataview-loading',
    /**
     * Class name of the loading overlay element
     */
    loadingOverlay = 'p-dataview-loading-overlay',
    /**
     * Class name of the loading icon element
     */
    loadingIcon = 'p-dataview-loading-icon',
    /**
     * Class name of the paginator element
     */
    pcPaginator = 'p-dataview-paginator-[position]',
    /**
     * Class name of the content element
     */
    content = 'p-dataview-content',
    /**
     * Class name of the empty message element
     */
    emptyMessage = 'p-dataview-empty-message',
    /**
     * Class name of the footer element
     */
    footer = 'p-dataview-footer'
}

export interface DataViewStyle extends BaseStyle {}
