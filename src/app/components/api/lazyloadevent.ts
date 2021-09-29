import { SortMeta } from './sortmeta';
import { FilterMetadata, FilterMetadataWithOperator } from './filtermetadata';

export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {[s: string]: FilterMetadata | FilterMetadataWithOperator[];};
    globalFilter?: any;
}