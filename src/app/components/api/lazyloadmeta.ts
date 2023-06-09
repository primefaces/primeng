import { FilterMetadata } from './filtermetadata';
import { SortMeta } from './sortmeta';
/**
 * Meta data for lazy load event.
 */
export interface LazyLoadMeta {
    first?: number | undefined | null;
    rows?: number | undefined | null;
    sortField?: string | string[] | null | undefined;
    sortOrder?: number | undefined | null;
    filters?: { [s: string]: FilterMetadata | FilterMetadata[] | undefined };
    globalFilter?: string | string[] | undefined | null;
    multiSortMeta?: SortMeta[] | undefined | null;
    forceUpdate?: Function;
    last?: number | undefined | null;
}
