import { FilterMetadata } from './filtermetadata';
import { SortMeta } from './sortmeta';

/**
 * Represents the state of a table component.
 */
export interface TableState {
    /**
     * The index of the first row to be displayed.
     */
    first?: number;
    /**
     * The number of rows to be displayed per page.
     */
    rows?: number;
    /**
     * The field used for sorting.
     */
    sortField?: string;
    /**
     * The sort order.
     */
    sortOrder?: number;
    /**
     * An array of sort metadata when multiple sorting is applied.
     */
    multiSortMeta?: SortMeta[];
    /**
     * The filters to be applied to the table.
     */
    filters?: { [s: string]: FilterMetadata | FilterMetadata[] };
    /**
     * The column widths for the table.
     */
    columnWidths?: string;
    /**
     * The width of the table.
     */
    tableWidth?: string;
    /**
     * The width of the wrapper element containing the table.
     */
    wrapperWidth?: string;
    /**
     * The selected item(s) in the table.
     */
    selection?: any;
    /**
     * The order of the columns in the table.
     */
    columnOrder?: string[];
    /**
     * The keys of the expanded rows in the table.
     */
    expandedRowKeys?: { [s: string]: boolean };
}
