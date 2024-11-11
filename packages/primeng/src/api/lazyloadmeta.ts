import { SortMeta, FilterMetadata } from '@primeng/core/api';
/**
 * Meta data for lazy load event.
 * @group Interface
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
