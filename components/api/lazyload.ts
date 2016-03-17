import {SortMeta} from './sortmeta';

export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {[s: string]: FilterMetadata;};
}

export interface FilterMetadata {
    value?: string;
    matchMode?: string;
}