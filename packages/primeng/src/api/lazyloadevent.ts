import { FilterMetadata } from './filtermetadata';
import { SortMeta } from './sortmeta';

/**
 * Represents an event object for lazy loading data.
 * @group Interface
 */
export interface LazyLoadEvent {
    /**
     * The index of the first record to be loaded.
     */
    first?: number;
    /**
     * The index of the last record to be loaded.
     */
    last?: number;
    /**
     * The number of rows to load.
     */
    rows?: number;
    /**
     * The field to be used for sorting.
     */
    sortField?: string;
    /**
     * The sort order for the field.
     */
    sortOrder?: number;
    /**
     * An array of sort metadata objects for multiple column sorting.
     */
    multiSortMeta?: SortMeta[];
    /**
     * An object containing filter metadata for filtering the data.
     * The keys represent the field names, and the values represent the corresponding filter metadata.
     */
    filters?: { [s: string]: FilterMetadata };
    /**
     * The global filter value for filtering across all columns.
     */
    globalFilter?: any;
    /**
     * A function that can be called to force an update in the lazy loaded data.
     */
    forceUpdate?: () => void;
}
