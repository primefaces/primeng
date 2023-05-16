import { SortMeta } from "./sortmeta";
/**
 * Meta data for lazy load event.
 */
export interface LazyLoadMeta {
    first?: number | undefined | null;
    rows?: number | undefined | null;
    sortField?: string | string[];
    sortOrder?: number | undefined | null;
    filters?: string | string[] | undefined | null;
    globalFilter?: string | string[] | undefined | null;
    multiSortMeta?: SortMeta[] | undefined | null;
    forceUpdate?: number | undefined | null;   
}