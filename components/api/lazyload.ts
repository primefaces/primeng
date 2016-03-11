export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    filters?: {[s: string]: FilterMetadata;};
}

export interface FilterMetadata {
    value?: string;
    matchMode?: string;
}